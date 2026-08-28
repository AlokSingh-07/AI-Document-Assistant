# AI Document Assistant 📄🤖

An interactive, GenAI-powered Retrieval-Augmented Generation (RAG) application that allows users to upload PDF documents and query them in natural language. Built with a React.js frontend and a Python backend powered by LangChain and the Mistral LLM.

---

## 🚀 Features

 **PDF Ingestion & Processing**: Extract text from unstructured PDF documents and slice them into optimized chunks.
 **Vector Search & Embedding Retrieval**: Store and search document embeddings using a vector database for high-precision context retrieval.
 **Mistral LLM Integration**: Generates context-aware, accurate answers grounded strictly in your uploaded documents to eliminate hallucinations.
 **Interactive React UI**: Clean frontend interface for file uploads, live querying, and viewing source citations.


## 🛠️ Tech Stack

* **Frontend**: React.js, JavaScript, CSS3
* **Backend**: Python (Flask / FastAPI)
* **AI & Orchestration**: LangChain, Mistral AI API
* **Embeddings & Vector Store**: Sentence Transformers / HuggingFace Embeddings, Vector Database (FAISS / Chroma)


## 📁 Project Structure

```text
RAG/
├── backend/                  # Python API server and RAG logic
│   ├── .env                  # API keys and configuration (Ignored by Git)
│   ├── main.py               # Flask/FastAPI application entrypoint
│   └── requirements.txt      # Python dependencies
├── frontend/                 # React user interface
│   ├── src/                  # React components and styling
│   └── package.json          # Node dependencies
├── .gitignore                # Git ignore rules
└── README.md                 # Project documentation
```
