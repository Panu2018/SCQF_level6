#Author Pranoti
#Date 06/03/2025
#Calculate Student Percentage using Files

def read_data_from_file(file_path):
    """
    Function to read students' data from an external file.
    Each line in the file should contain:
    Name, Coursework Mark (out of 60), Prelim Mark (out of 90)
    Example line: John Doe, 45, 80
    Returns a list of student records as tuples.
    """
    students = []
    with open(file_path, 'r') as file:  # Open the file in read mode
        for line in file:  # Read each line from the file
            data = line.strip().split(",")  # Split line into components (Name, Coursework, Prelim)
            name = data[0].strip()
            coursework = float(data[1].strip())
            prelim = float(data[2].strip())
            students.append((name, coursework, prelim))  # Append student data as a tuple
    return students

def calculate_percentage(coursework, prelim):
    """Function to calculate percentage."""
    total = coursework + prelim
    percentage = (total * 100) / 150
    return percentage

def determine_grade(percentage):
    """Function to determine the grade based on percentage."""
    if percentage >= 70:
        return "A"
    elif percentage >= 60:
        return "B"
    elif percentage >= 50:
        return "C"
    elif percentage >= 45:
        return "D"
    else:
        return "No Grade"

def count_a_grades(students):
    """
    Function to count the occurrences of "A" grades in the class.
    This implements the "Count Occurrences" standard algorithm:
    - Initialize a counter to zero.
    - Loop through the list of students.
    - If the grade is "A", increment the counter by 1.
    - Return the final count.
    """
    a_count = 0  # Initialize counter
    for student in students:
        name, coursework, prelim = student
        percentage = calculate_percentage(coursework, prelim)  # Calculate percentage
        grade = determine_grade(percentage)  # Determine grade
        if grade == "A":  # Check if grade is "A"
            a_count += 1  # Increment counter
    return a_count  # Return the final count

def process_students(file_path):
    """
    Function to process student data.
    Reads data from the file, calculates percentage and grade for each student,
    counts the number of "A" grades, and displays the results.
    """
    students = read_data_from_file(file_path)  # Retrieve students' data from the file
    if not students:  # If no data was read, stop execution
        print("No student data to process.")
        return

    print(f"{'Name':<20}{'Percentage':<15}{'Grade':<10}")  # Print header
    print("-" * 45)
    for student in students:
        name, coursework, prelim = student
        percentage = calculate_percentage(coursework, prelim)  # Calculate percentage
        grade = determine_grade(percentage)  # Determine grade
        print(f"{name:<20}{percentage:<15.2f}{grade:<10}")  # Display result for each student

    # Count and display the number of "A" grades
    a_grade_count = count_a_grades(students)
    print(f"\nNumber of 'A' grades in the class: {a_grade_count}")

def main():
    """Main function to run the program."""
    file_path = input("Enter the path to the student data file: ")  # Get file path from the user
    process_students(file_path)  # Process the data for all students

# Run the program
if __name__ == "__main__":
    main()
