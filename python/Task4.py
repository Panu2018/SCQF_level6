#Author Pranoti
#Date 06/03/2025
#Calculate Student Percentage using Functions

def validateinputs(course_mark,prelim_mark):
    if prelim_mark.isdigit() or course_mark.isdigit():
      return True
    else:
      print("Invalid marks.Please give marks in positive integer number") 
      return False
 
#creating function to calculate Grade
def student_grade():
  
  #checking if the user entering valid info
  if(course_mark>60 and prelim_mark>90): print("Invalid input..Please enter correct marks") 
  else:  
  #allocating grades based on the percentage
   if (grade_percentage >= 70 and prelim_mark <= 100): print ("Hi",stud_name,"You got grade A")
   elif (grade_percentage >= 60 and grade_percentage <= 70): print ("Hi",stud_name,"You got grade B")
   elif (grade_percentage >= 50 and grade_percentage <= 60): print ("Hi",stud_name,"You got grade C")
   elif (grade_percentage >= 45 and grade_percentage <=49): print ("Hi",stud_name,"You got grade D")
   elif  (grade_percentage <45): print("Hi",stud_name,"You are failed and No grade")
#while code to run the program on user choice 
#main code starts from this line
choice = "Y"
while(choice == "Y"):
 
 #Getting inputs from user
 stud_name=str(input("Please enter your name and marks:"))
 course_mark = input("Enter your course marks out of 60: ")
 prelim_mark = input("Enter your prelim marks out of 90: ")
 isValid=validateinputs(course_mark,prelim_mark)
  #calling the function to calculate grades
 if(isValid):    
   course_mark = float(course_mark)
   prelim_mark = float(prelim_mark)
   grade_percentage = ((course_mark + prelim_mark)*100) /150
   student_grade()
   #calculating the percentage
   choice=str(input("Do you want to run the program again Y/N:"))

#print message if user chooses to exit
print("You choose to exit,Good bye..!")

