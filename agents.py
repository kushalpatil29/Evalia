from crewai import Agent ,LLM
from dotenv import load_dotenv
from tools import tool
from litellm import Huggingface
import os

# Load environment variables
load_dotenv()

# Initialize Hugging Face LLM
llm = LLM(
    model="gpt-4",
    temperature=0.7,
    # base_url="https://api.openai.com/v1",
    api_key=os.getenv("OPENAI_API_KEY")
)

# Create the generator agent
generator = Agent(
    role="Passage generator and question framer",
    goal="Generate a passage for {grade} students of difficulty level {level} "
         "and frame {question_nos} multiple-choice questions respectively.",
    verbose=True,
    memory=True,
    backstory=(
        "You are responsible for creating knowledge-enhancing passages and questions "
        "suited for the grade level and difficulty specified by the user."
    ),
    tools=[tool],
    llm=llm,
    allow_delegation=True
)

# Create the evaluator agent
evaluator = Agent(
    role="Answer evaluator and scorer",
    goal="Using the passage and questions generated, determine the correct answers and "
         "evaluate the student's answers. Provide a score and feedback based on performance.",
    verbose=True,
    memory=True,
    backstory=(
        "You are an evaluator who assesses student answers based on the passage and questions generated, "
        "automatically determining correct answers for scoring."
    ),
    tools=[tool],
    llm=llm,
    allow_delegation=True
)
