import os
from importlib import import_module
from dotenv import load_dotenv

# Automatically finds and parses your .env file
load_dotenv()

if __name__ == "__main__":
    uvicorn = import_module("uvicorn")
    host = os.environ.get("SERVER_HOST", "127.0.0.1")
    port = int(os.environ.get("SERVER_PORT", 8000))
    
    uvicorn.run("main:app", host=host, port=port, reload=True)
