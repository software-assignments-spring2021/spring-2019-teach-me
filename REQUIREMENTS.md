# Teach Me Project Requirements

## Functional Requirements
- Service for instructors to create profiles
- Service for instructors to set a schedule of lessons and price for each lesson
- Service for learners to browse a list of instructor profiles
- Service for learners to reserve a lesson
- Service for learners to pay for a lesson with their credit card
- Service for learners to leave a review of their instructor after completing a lesson

## Non-functional Requirements
- Technologies that will be used:
- Variable names must follow language convention
- Development process will adhere to Agile methodology, which will be implemented using the Scrum framework
- System uptime will be at least 90% after launch

## Stakeholder Interviews
---
-Wei-kai asked if our site can add more categories. Which requires us to accept instructors that techers different fields. He also asked which language and database that we should be using. Our team is yet certain regarding database, but we have decided to use React for the front-end, and Python for the back-end.

-The interview with the professor: we explained what our project is about, and how Teach-Me will work.The professor suggested that we take a look at WYZANT. He also suggested that we use React.js and node.js as front-end and back-end, along with express and mongoDB.
  
## End User Observations
---
#### Persona1:
- Brian Booth is a college student with fair amount of free time, and he would like to learn how to code in Python without taking classes in this university. He has tried various methods to achieve his goal, but there are flaws for method. Searching up videos on YouTube easy and free, but there when Brian needs further explaination on a problem or when he fails to solve a bug, there is no one to help him. As a college student, Brian thinks that the paid online courses are costing too much. He wish there is a place where he can learn the basics without guidance but not paying too much.

#### Persona2:
- Mattie Lopez is a college student who is also a very skilled guitar player. She would like to teach others how to play this instrument. She has thought of recording videos and publish it online. However, she would prefer to have some income from teaching these classes. In addition, she would also want to browse other classes avaliable. 

## Use Cases

### Use Case 1
- Title: Register for a class
- Actor: Learner
- Scenario: First, the learner browses the profiles of various instructors. The learner selects a instructor who they are interested in learning from. The learner looks at the instructor’s schedule. The learner chooses an available date and time that is convenient for them. The user reserves that lesson and pays for it using their credit card.

![Use Case Diagram 1](https://github.com/nyu-software-engineering/teach-me/blob/master/requirements_diagrams/Use%20Case%201.jpg)

### Use Case 2
- Title: filtering classes/Instructors
- Actor: Learner
- Scenario: The learner types into the search box according to his/her interest. The input can be specific class name/ instructor name/ category name. The outcomes should present the result along with other recommended classes. Each instructor and each class should be given tags by the instructor, and these tags will be used when filtering the recommended list. The result could be filtered by rating, level of difficulty, price etc. 

![Use Case Diagram 2](https://github.com/nyu-software-engineering/teach-me/blob/master/requirements_diagrams/Use%20Case%202.png)

### Use Case 3
- Title: Publish a class for others to sign up
- Actor: Instructor
- Scenario: Instructor registers an account on the website. Instructor logs in. Instructor goes into the page where (s)he can enter the details of the class, including title, skill type, cost, schedule, class details, maximum amount of students, cancellation policy, and other information. Instructor then reviews the information (s)he enters and submit the class. After submission, all users on the website can see that class on the class catalog page. Instructor will get an email confirmation of the class that (s)he just published.

![Use Case Diagram 3](https://github.com/nyu-software-engineering/teach-me/blob/master/requirements_diagrams/Use%20Case%203.png)

### Use Case 4
- Title: Modifying/Deleting an already published class
- Actor: Instructor
- Scenario: Instructor logs in to the website. Instructor goes to a “dashboard” page where (s)he can see a list of the classes published by him/her. Instructor select one class and goes to the page designated for that class. Instructor can change all information related to the class, or delete the class. Instructor submit the modification/deletion. An email will be sent to the instructor confirming his/her action. If there are learners who have signed up for the class, an email will be sent to them as well, prompting them to review the modifications.

![Use Case Diagram 4](https://github.com/nyu-software-engineering/teach-me/blob/master/requirements_diagrams/Use%20Case%204.jpg)

### Use Case 5
- Title: Communication between instructors and learners
- Actor: User (learner and instructor)
- Scenario: User (learner/ instructor) sends a message to the instructor/learner from the profile page. The system prompts a chat box. Receiver of the messages gets a notification of the received message. Receiver checks the chat box and view the message. Receiver replys the message. Sender of the message becomes receiver now and repeats the process.

![Use Case Diagram 5](https://github.com/nyu-software-engineering/teach-me/blob/master/requirements_diagrams/Use%20Case%205.jpg)

### Use Case 6
- Title: Comment and rate the learner or instructor
- Actor: User (learner and instructor)
- Scenario:  When a course is completed, the learner and instructor can find their completed course in the course history. When they click the rate button near the record, a window will pop out for them to select a score between one and five. There will also be a textbox for them to leave comment on each other. They can also select or add a tag to the comment, indicating the corresponding course.

 ![Use Case Diagram 6](https://github.com/nyu-software-engineering/teach-me/blob/master/requirements_diagrams/Use%20Case%206.jpg)