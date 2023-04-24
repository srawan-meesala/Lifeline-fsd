## FFSD PROJECT: Hospital Management System

## Project Name: LIFELINE- Find your doctor online.

## Installation and Setup: 

   Clone the repository to your local machine.

   First open terminal in directory where package.json is located.

   ### Then install all the dependencies: run
        npm init
        npm i express
        npm i ejs 
        npm i body-parser 
        npm i --save-dev nodemon npm 
        npm i mongoose 
        npm i alert 

   Add ``` "start": "nodemon app.js" ```, in package.json "scripts" part 
   
   Start the server using ```npm start```     
   
   Open a browser and go to the link ```http://localhost:9000/ ```


### Functionalities:
    
This Web Portal is designed to help people to find their Ideal Hospital or Ideal Doctor Online. 

  # Patient:
    - Create an account through patient registration page.
    - Login through login page.
    - Users can schedule appointments with doctors 
    - Users can view the patient history.
    - Users can view the blogs posted by the doctors.
    - Users can edit Profile.

  # Doctor:
    - Register through doctor registration page and get approved by the admin
    - Users can view the schedule based on the Appointments
    - Users can edit Profile.

  # Hospital:
    - Register through hospital registration page and get approved by the admin
    - Hospitals can view their profile
    - Hospitals can view the schedule based on the Appointments
  
  # Admin:
    - Admin can login through login page.
    - Admin can view all the Patients, Doctors, Hospitals.
    - Admin able to approve doctors,hospitals.
    - Admin able to remove a user.
    - Admin able to check feedback.

### Technologies Used :

     Backend: Node.js, Express.js, MongoDB
     Frontend: HTML/CSS,javascript
     Additional tools: Git, GitHub



### GitHub link:
