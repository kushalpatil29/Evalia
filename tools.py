import os
from crewai_tools import SerperDevTool
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Fetch and set SERPER_API_KEY in environment if available
serper_api_key = os.getenv("SERPER_API_KEY")
if serper_api_key is None:
    raise ValueError("SERPER_API_KEY is not set. Please add it to your .env file.")
else:
    os.environ["SERPER_API_KEY"] = serper_api_key

# Instantiate the Serper dev tool
tool = SerperDevTool()
