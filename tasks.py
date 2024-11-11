from crewai import Task
from tools import tool
from agents import generator,evaluator

## Describing the Task of the generator agent
generator_task = Task(
    description=(
        "The generator agent is responsible for creating an educational passage for a specified grade level. "
        "This passage should be tailored to a difficulty level that aligns with the student's abilities. "
        "After generating the passage, the generator agent must also frame multiple-choice questions "
        "based on the passage content. These questions should be structured to assess the student's comprehension "
        "and critical thinking, with four answer choices per question. The agent must ensure that the passage "
        "and questions are contextually and grammatically accurate for the educational setting."
    ),
    expected_output=(
        "A passage suitable for {grade} students, tailored to the {level} difficulty level. "
        "This passage includes {question_nos} multiple-choice questions, each with four answer options. "
        "The passage and questions should be clear, educational, and aligned with the specified grade and "
        "difficulty level to ensure relevance and appropriateness."
    ),
    tools=[tool],
    agent=generator,
)

## Describing the Task of the evaluator agent
evaluator_task = Task(
    description=(
        "The evaluator agent's task is to assess the student's responses to the generated questions. "
        "This involves analyzing each student-provided answer against the passage content and determining "
        "the correct answers. The evaluator agent will then assign a score based on the number of correct answers "
        "and provide personalized feedback for each question, highlighting areas of strength and areas that may need "
        "improvement. The feedback should be constructive, with a focus on encouraging further learning and development."
    ),
    expected_output=(
        "An evaluation report including the student's score as a percentage, along with detailed feedback "
        "for each question. The feedback should include whether each answer was correct or incorrect, along with "
        "explanations where necessary. The evaluation should offer a balanced view of the student's performance, "
        "recognizing strengths and identifying areas for improvement."
    ),
    tools=[tool],
    agent=evaluator,
    async_execution=False,
    # output_file=scorecard.txt
)
