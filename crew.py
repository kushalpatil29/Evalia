from crewai import Crew, Process
from tasks import generator_task,evaluator_task
from agents import generator,evaluator

##Forming the crew focused on the configuration set
main_crew = Crew(
    agents = [generator,evaluator],
    tasks = [generator_task,evaluator_task],
    process = Process.sequential,
)

grade = input("Enter the grade: ")
question_nos = int(input("Enter the number of question: "))
level = input("Enter the level of the questions: ")

result = main_crew.kickoff(inputs={
    "grade": grade,
    "question_nos": question_nos,
    "level": level
})

print(result)