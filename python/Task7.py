#Author Pranoti
#Date 06/03/2025
#Calculate Student Percentage using Files

#Task 7:
#Alter your program to enable it to find out how many “A” passes are in the class by using the “Count Occurrences” standard algorithm.

def readnames():
 testFile=open("namesS.txt", "r") #open file
 for line in testFile:
   stripped_line = line.strip()
   #read a line as string and remove any spaces
   names.append(stripped_line)
 testFile.close()

def readmark1():
 testFile=open("Mark1.txt", "r") #open file
 for line in testFile:
  stripped_line = line.strip()
  mark1.append(stripped_line)
 testFile.close()

def readmark2():
   testFile=open("Mark2.txt", "r") #open file
   for line in testFile:
     stripped_line = line.strip()
     mark2.append(stripped_line)
   testFile.close()

def CalcGrade():
  count=int(0)
  max=int(0) #we are looking for the max percentage
  print("\n");
  for x in range (len(names)):
   Grade=((float(mark1[x])+float(mark2[x]))*100)/150
   #print(names[x], "you have got ", Grade)
   if Grade >= 70 : # if percentage is 70% or over
    print(names[x], "you have got ", Grade ,": A Grade")
    
   elif Grade >= 60 and 69 : # if percentage is 60% or over
    print(names[x], "you have got ", Grade,": B Grade")
   elif Grade >=50 and 59 : # if percentage is 50% or over
    print(names[x], "you have got ", Grade ,": C Grade")
   elif Grade >=45 and 49 : #if percentage is 45% and 49%
    print(names[x], "you have got ", Grade ,": D Grade")
   else: # if no match we use this option
    print(names[x], "you have got ", Grade ,": No grade")
   if Grade>=70 : # check if grade is A
    count=count+1 # count get 1 added
   if ((int(Grade) > max)):
    max=int (Grade)
    print ("The number of A passes in class are ",count)
    print ("The best percentage in the class is ", max)

#create a list
names=[]
mark1=[]
mark2=[]
Grade=[]

#maincode
readnames()
readmark1()
readmark2()
CalcGrade()
