from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import config
import services

app = FastAPI(title="Mistral RAG Backend Server")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QuestionRequest(BaseModel):
    question: str


@app.get("/")
async def root():
    return {
        "status": "success",
        "message": "Mistral RAG Backend Server is running."
    }


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    return await services.process_pdf_upload(file)


@app.post("/ask")
async def ask_question(request: QuestionRequest):
    if config.global_retriever is None:
        raise HTTPException(status_code=400, detail="Please upload a PDF file first.")

    question = request.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Question cannot be empty.")

    answer = await services.execute_rag_query(question)
    return {
        "status": "success",
        "question": question,
        "answer": answer
    }