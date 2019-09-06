# React Express Student Library
This project displays student list and enables to add/edit/change status of a student

## Prerequisites
In order to run this project node.js and npm both need to have been installed.
## Dependencies - Client App
"react": "^16.9.0",
"react-dom": "^16.9.0",
"react-paginating": "^1.3.0-hook.2",
"react-router-dom": "^5.0.1",
"react-scripts": "3.1.1",
"react-smooth-dnd": "^0.11.0"

To install Client App from root folder
/student-library> create-react-app client
/student-library> cd client
/student-library/client> npm install react-router-dom
/student-library/client> npm install react-smooth-dnd
/student-library/client> npm install react-paginating


## Dependencies - Database
"body-parser": "^1.19.0",
"cors": "^2.8.5",
"express": "^4.17.1",
"sqlite3": "^4.1.0"

To install Express with database sqlite
/student-library> npm install express
/student-library> npm install sqlite3
/student-library> npm install body-parser
/student-library> npm install cors

In Package.json file add the below object
"scripts": {
    "start": "node index.js"
}

## Database 
<ol>
<li>Creates a new table and insert items</li>
<li>Run node sql.js from student-library to drop existing table and create a new Student table</li>
<li>Run node seed.js from student-library to insert 2 rows into Student Table</li>
</ol>

## Deployment
<ol>
<li>Run npm start from student-library to start the Express app</li>
<li>Run npm start from the client directory to start the React app</li>
<li>Visit http://localhost:3000/</li>
</ol>


