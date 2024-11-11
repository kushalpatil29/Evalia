from crewai import Agent
from dotenv import load_dotenv
from tools import tool
from langchain_google_genai import ChatGoogleGenerativeAI
from litellm import completion 
import os

##Lodaing env content
load_dotenv()

##Creating a LLM instance 
# Initialize LLM with error handling
llm=completion(model="gemini/gemini-1.5-flash",
                temperature=0.5,
                google_api_key=os.getenv("GOOGLE_API_KEY"))
## Creating generator agent
generator=Agent(
    role="Passage generator and question framer",
    goal="Generate a passage for {grade} students of difficulty level {level} and frame {question_nos} multiple choice questions repectively",
    verbose=True,
    memory=True,
    backstory=(
       "You are responsible for creating knowledge-enhancing passages and questions suited for the grade level and difficulty specified by the user."
    ),
    tools=[tool],
    llm=llm,
    allow_delegation=True
)

##Creating Evaluator agent for eavaluating the answers submited by students

evaluator = Agent(
    role="Answer evaluator and scorer",
    goal="Using the passage and questions generated, determine the correct answers and evaluate the student's answers. Provide a score and feedback based on performance.",
    verbose=True,
    memory=True,
    backstory=(
        "You are an evaluator who assesses student answers based on the passage and questions generated, automatically determining correct answers for scoring."
    ),
    tools=[tool],
    llm=llm,
    allow_delegation=True
)