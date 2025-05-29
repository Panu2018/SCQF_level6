#Author Pranoti
#Date 06/03/2025
#Calculate Student Percentage using Functions

#creating function to calculate Grade
def startcode():
  stud_name=str(input("Please enter student name:")) # get student name
  course_mark = int(input("Enter your course marks: ")) # get course mark name
  prelim_mark = int(input("Enter your prelim marks : ")) # get prelim mark name
  grade_percentage = ((course_mark + prelim_mark)*100) /150  
  #checking if the user entering valid info
  if(course_mark>60 and prelim_mark>90): print("Invalid input..Please enter correct marks") 
  else:  
  #allocating grades based on the percentage
   if (grade_percentage >= 70 and prelim_mark <= 100): print ("Hi",stud_name,"You got grade A") # if percentage is over 70% or over
   elif (grade_percentage >= 60 and grade_percentage <= 70): print ("Hi",stud_name,"You got grade B") # if percentage is over 60% or over
   elif (grade_percentage >= 50 and grade_percentage <= 60): print ("Hi",stud_name,"You got grade C") # if percentage is over 50% to 60%
   elif (grade_percentage >= 45 and grade_percentage <=49): print ("Hi",stud_name,"You got grade D") # if percentage is over 45% and 49%
   elif  (grade_percentage <45): print("Hi",stud_name,"You are failed and No grade") # if percentage is is less than 45
   else: print("Hi",stud_name,"No grade") # if no match use this option
     
startcode()