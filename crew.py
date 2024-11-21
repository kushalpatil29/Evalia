from crewai import Crew, Process
from tasks import generator_task, evaluator_task
from agents import generator, evaluator

# Forming the crew focused on the configuration set
main_crew = Crew(
    agents=[generator, evaluator],
    tasks=[generator_task, evaluator_task],
    process=Process.sequential,
)

try:
    # Input collection with validation
    grade = input("Enter the grade: ").strip()
    question_nos = int(input("Enter the number of questions: ").strip())
    level = input("Enter the level of the questions: ").strip()

    # Validating inputs
    if not grade or question_nos <= 0 or not level:
        raise ValueError("Invalid input values provided.")

    # Running the crew's task
    result = main_crew.kickoff(inputs={
        "grade": grade,
        "question_nos": question_nos,
        "level": level
    })

    # Printing the result
    print("Result:", result)

except ValueError as ve:
    print("Error:", ve)
except Exception as e:
    print("An unexpected error occurred:", e)
