import os
from langchain_google_genai import GoogleGenAI

# Set the GOOGLE_API_KEY environment variable
os.environ["GOOGLE_API_KEY"] = "AIzaSyBHseOl5QRZXUP-rR80IQLmYiNHztZ3qGQ"

# Optional: Clear any other Google-related environment variables
if "GOOGLE_APPLICATION_CREDENTIALS" in os.environ:
    del os.environ["GOOGLE_APPLICATION_CREDENTIALS"]

# Now initialize LangChainGoogleGenAI
model = GoogleGenAI()

# Use the model
response = model.generate("Tell me about machine learning.")
print(response)
