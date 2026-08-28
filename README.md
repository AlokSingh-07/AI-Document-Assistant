# AI Document Assistant 📄🤖

An interactive, GenAI-powered Retrieval-Augmented Generation (RAG) application that allows users to upload PDF documents and query them in natural language. Built with a React.js frontend and a Python backend powered by LangChain and the Mistral LLM.

---

## 🚀 Features

 **PDF Ingestion & Processing**: Extract text from unstructured PDF documents and slice them into optimized chunks.
 **Vector Search & Embedding Retrieval**: Store and search document embeddings using a vector database for high-precision context retrieval.
 **Mistral LLM Integration**: Generates context-aware, accurate answers grounded strictly in your uploaded documents to eliminate hallucinations.
 **Interactive React UI**: Clean frontend interface for file uploads, live querying, and viewing source citations.

---

### Workflow Diagram

```text
[ Upload PDF ] ➔ [ Text Extraction ] ➔ [ Chunking ] ➔ [ Generate Vector Embeddings ] ➔ [ Store in Vector DB ]
                                                                                               │
[ User Query ] ➔ [ Embed Query ] ➔ [ Similarity Search in Vector DB ] ➔ [ Top Chunks ] ───────┘
                                                                             │
                                                                             ▼
                                                  [ LLM + Context Prompt ] ➔ [ Grounded Answer ]


## 🛠️ Tech Stack

* **Frontend**: React.js, JavaScript, CSS3
* **Backend**: Python (Flask / FastAPI)
* **AI & Orchestration**: LangChain, Mistral AI API
* **Embeddings & Vector Store**: Sentence Transformers / HuggingFace Embeddings, Vector Database (FAISS / Chroma)


## 📁 Project Structure

```text

AI Document Assistant/
├── backend/                  
│   ├── .env                  # Environment variables and API keys (Ignored by Git)
│   ├── config.py             # Configuration settings and environment loading
│   ├── main.py               # Flask/FastAPI application setup & routes
│   ├── requirements.txt      # Python dependencies
│   ├── run.py                # Backend server entrypoint execution script
│   └── services.py           # Core RAG logic (embeddings, vector store, Mistral integration)
├── frontend/                 # React frontend client 
│   ├── node_modules/         # Installed Node package dependencies (Ignored by Git)
│   ├── public/               # Static assets (favicons, icons)
│   ├── src/                  # React components, styles, and application UI
│   ├── .oxlintrc.json        # Oxlint configuration
│   ├── index.html            # Main HTML entry file
│   ├── package-lock.json     # Locked dependency versions
│   ├── package.json          # Frontend scripts and project metadata
│   └── vite.config.js        # Vite bundler configuration
├── .gitignore                # Global Git ignore rules
└── README.md                 # Main project documentation
```

## ⚙️ Installation & Setup

### 1. Prerequisites
* **Python**: v3.14.3 or higher
* **Node.js**: v24.15.0 or higher
* **Mistral API Key**: Get one from [Mistral AI Platform](https://console.mistral.ai/)

### 2. Backend Setup
1. Open terminal and navigate to the backend directory:
   ```bash
   cd backend

  2. Create and activate a virtual environment:

     # Create virtual environment
        python -m venv venv
        
      # Activate on Windows (Command Prompt):
        venv\Scripts\activate
        
      # Activate on Windows (PowerShell):
        .\venv\Scripts\Activate.ps1
        
      # Activate on macOS/Linux:
        source venv/bin/activate

4. Install required Python packages:
       pip install -r requirements.txt

5. Create a .env file in the backend folder and add your key:
      MISTRAL_API_KEY=your_actual_mistral_api_key_here

6. Start the Backend Server:
      cd backend
      python run.py runserver



### 3. Frontend Setup

 1. Open a new terminal tab and navigate to the frontend directory:
       cd frontend
              
 2. Install Node modules:
        npm install
              
3. Start the Frontend Development Server:
      cd frontend
      npm run dev
