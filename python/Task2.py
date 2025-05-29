#Author Pranoti
#Date 06/03/2025
#Calculate Student Percentage using Files

def ReadFile():
    print("Reading file...")
    students = []
    with open("C:/Pranoti/Python/task6/studentmarks.csv", 'r') as file: 
        for line in file: 
            data = line.strip().split(",") 
            
            studentname = data[0]
            coursemark = data[1]
            prelimmarks = data[2]
            students.append((studentname,coursemark,prelimmarks))
    return students

studentvalues =[]
studentvalues = ReadFile()

def calculate_marks(course_mark,prelim_mark,stud_name):
    total = course_mark + prelim_mark
    grade_percentage = (total * 100) / 150
    if(course_mark>60 or prelim_mark>90): print("Invalid value") 
    else:  
       #allocating grades based on the percentage
       if (grade_percentage >= 70 and prelim_mark <= 100): print ("Hi",stud_name,"You got grade A")
       elif (grade_percentage >= 60 and grade_percentage <= 70): print ("Hi",stud_name,"You got grade B")
       elif (grade_percentage >= 50 and grade_percentage <= 60): print ("Hi",stud_name,"You got grade C")
       elif (grade_percentage >= 45 and grade_percentage <=49): print ("Hi",stud_name,"You got grade D")
       elif  (grade_percentage <45): print("Hi",stud_name,"You are failed and No grade")
    return grade_percentage

for s1 in studentvalues:
    name, coursework, prelim = s1
    percentage=calculate_marks(float(coursework),float(prelim),name)

    print("percentage is for ",name,"is ",percentage)


