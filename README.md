Add the following content to the README.md file:
# My Web Application
## Project Setup
To get started with the project, follow these steps:
1. **Clone the Repository:**
   ```sh
   git clone <repository-url>
   cd my-web-application

2. run npm install in terminal 
3. download dependencies 
3. npm start 

General:
My project is an Aritist Portfolio. To naviage the site after downloading the dependencies run npm start in terminal. Navigate by hovering on the home button shaped like a star. This will make subpages appear. Click on the subpages to view its contents. Leave an Idea in the idea form box. Read about me in the about me subpage. 

Backend: 
install required packages:
npm install --save pouchdb Make sure to have pouchdb and express.js installed 
express
npm start 


API Documentation:
The backend integration of this project was completed through an idea submission form which recieves user input which is submitted. It displays it, edits it and deletes it based on respective buttons. It handels these actions using RESTful API, express.js, POUCHDB and CRUD operations on the server side to recieve requests from the client and respond accordingly. 

1. Endpoint: http://localhost:3000/create
2. HTTP Method: (POST)
3. Description: This endpoint recieves the submitted idea and creates a new _id name and idea body in the POUCHDB database. 
4. Parameters: _id: String and idea: String 
5. Request Body (if applicable): {"_id":"_"id","idea","idea"}
6. Response Body: Response data in JSON format: {_id,idea}. Success send status 200. Error send 500 internal server error, with erver message. 

7. Examples: 
Request 
{"id":"Eliana","idea":"Idea1"}
Response
200 Status Ok 


1. Endpoint: http://localhost:3000/create
2. HTTP Method: (POST)
3. Description: This endpoint recieves the submitted idea and creates a new _id name and idea body in the POUCHDB database. 
4. Parameters: _id: String and idea: String 
5. Request Body (if applicable): {"_id":"_"id","idea","idea"}
6. Response Body: Response data in JSON format: {_id,idea}. 

Success send status 200 : Idea from _id Created.
Error send 500 internal server error, with erver message. 

7. Examples: 
Request 
{"id":"Eliana","idea":"Idea1"}
Response
200 Status Ok 
Idea from Eliana created 




1. Endpoint: http://localhost:3000/create
2. HTTP Method: (POST)
3. Description: This endpoint recieves the submitted idea and creates a new _id name and idea body in the POUCHDB database. 
4. Parameters: _id: String and idea: String 
5. Request Body (if applicable): {"_id":"_"id","idea","idea"}
6. Response Body: Response data in JSON format: {_id,idea}. Success send status 200. Error send 500 internal server error, with error message. 

7. Examples: 
Request 
{"id":"Eliana","idea":"Idea1"}
Response
200 Status Ok 


1. Endpoint: http://localhost:3000/all
2. HTTP Method: (Get)
3. Description: This endpoint recieves displays all ideas in the POUCHDB database. 
4. Parameters: none
5. Response Body: Response data in JSON format: 

Success send status 200 : send JSON stringfied data 
Error send 500 internal server error, with error message. 

6. Examples: 

Response
200 Status Ok 


1. Endpoint: http://localhost:3000/update
2. HTTP Method: (PUT)
3. Description: This endpoint recieves an _id as a paramete and updates the idea with the text in the idea submission box. 
4. Parameters: _id
5. Request Body: {"idea":"idea"}
6. Response Body: Response data in JSON format: 

Response data in JSON format: {idea} = req.body. Success send status 200. Error send 500 internal server error, with error message. 


7. Examples: 

Request 
{"idea":"Idea1update"}

Response

200 Status Ok: Idea updated 



1. Endpoint: http://localhost:3000/delete
2. HTTP Method: (delete)
3. Description: This endpoint recieves an _id as a parameter and deletes the idea from the database. 
4. Parameters: _id
5. Request Body: none
6. Response Body: Response data in JSON format: 
Success send status 200. 
Error send 500 internal server error, with error message. 


7. Examples: 


Response
if _id provided
200 Status Ok: Idea deleted 
no _id
400 Status: _id missing  



Status Codes: 
200 Success 
400 Bad Request, missing parameter or data in request body
500 internal server error





sources: 
https://www.npmjs.com/package/body-parser 
https://pouchdb.com/api.html#create_document
https://pouchdb.com/api.html#batch_fetch
https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data
https://youtu.be/_1Qhmn5cUGg?si=006SRuhmYHxYkdZv
https://stackoverflow.com/questions/35223460/update-data-in-list-dynamically
