import asyncio
import os
import shutil
from fastapi import UploadFile, HTTPException
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_mistralai import MistralAIEmbeddings, ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate

import config


def _sync_process_pdf(file_path: str):
    """Synchronous CPU/Disk heavy work: parse PDF, chunk text, embed, and update Chroma."""
    loader = PyPDFLoader(file_path)
    documents = loader.load()

    if not documents:
        raise HTTPException(
            status_code=400,
            detail="Could not extract text from PDF."
        )

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    chunks = text_splitter.split_documents(documents)

    if not chunks:
        raise HTTPException(
            status_code=400,
            detail="No text chunks were created."
        )

    embeddings = MistralAIEmbeddings(
        model="mistral-embed",
        api_key=config.MISTRAL_API_KEY
    )

    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=config.PERSIST_DIR
    )

    # Assign state to global retriever
    config.global_retriever = vectorstore.as_retriever(
        search_kwargs={"k": 3}
    )

    return len(documents), len(chunks)


async def process_pdf_upload(file: UploadFile) -> dict:
    """Validates and processes uploaded file in a non-blocking thread."""
    try:
        if not file.filename:
            raise HTTPException(
                status_code=400,
                detail="No file selected."
            )

        if not file.filename.lower().endswith(".pdf"):
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are supported."
            )

        os.makedirs(config.UPLOAD_DIR, exist_ok=True)
        file_path = os.path.join(config.UPLOAD_DIR, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Offload heavy vector processing to background thread pool
        pages_count, chunks_count = await asyncio.to_thread(_sync_process_pdf, file_path)

        return {
            "status": "success",
            "message": f"File '{file.filename}' processed successfully.",
            "pages": pages_count,
            "chunks": chunks_count
        }

    except HTTPException:
        raise
    except Exception as e:
        print("UPLOAD ERROR:", str(e))
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


async def execute_rag_query(question: str) -> str:
    """Retrieves document context and queries Mistral LLM."""
    try:
        llm = ChatMistralAI(
            model="mistral-large-latest",
            temperature=0,
            api_key=config.MISTRAL_API_KEY
        )

        retrieved_documents = await config.global_retriever.ainvoke(question)

        context = "\n\n".join(
            document.page_content for document in retrieved_documents
        )

        system_prompt = """
You are a precise document assistant.

Answer the user's question using ONLY the facts directly stated in the context.

Rules:
1. Provide only the direct facts found.
2. Do not append any commentary, meta-commentary, or summary sentences at the end.
3. Do not point out what is missing or what the context fails to provide.
4. Stop typing immediately after listing the facts found in the text.
5. Keep the answer completely concise.

DOCUMENT CONTEXT:
{context}
"""

        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", system_prompt),
                ("human", "{question}")
            ]
        )

        messages = prompt.format_messages(
            context=context,
            question=question
        )

        response = await llm.ainvoke(messages)
        return str(response.content)

    except Exception as e:
        print("ASK ERROR:", str(e))
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )