import os
# 1. CORE ENVIRONMENT PROPERTIES & SECURITY CHECKS
MISTRAL_API_KEY = os.environ.get("MISTRAL_API_KEY")

if not MISTRAL_API_KEY:
    raise RuntimeError(
        "MISTRAL_API_KEY environment variable is not set."
    )
os.environ["MISTRAL_API_KEY"] = MISTRAL_API_KEY

# 2. FILE SYSTEM STORAGE CONFIGURATIONS
PERSIST_DIR = "chroma_db_storage"
UPLOAD_DIR = "uploaded_files"

os.makedirs(PERSIST_DIR, exist_ok=True)
os.makedirs(UPLOAD_DIR, exist_ok=True)

# 3. GLOBAL STATE HOLDERS
global_retriever = None

