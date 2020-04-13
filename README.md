# React Express Student Library
This project displays student list and enables to add/edit/change-status(trello board) of a student

## Prerequisites
In order to run this project node.js and npm both need to have been installed.
## Dependencies - React Client App
"react": "^16.9.0",
"react-dom": "^16.9.0",
"react-paginating": "^1.3.0-hook.2",
"react-router-dom": "^5.0.1",
"react-scripts": "3.1.1",
"react-smooth-dnd": "^0.11.0"

<ol>
<li>Follow the below steps, if something not working while running project. Because some of the files are truncated while pushing to git remotely</li>
<li>To install Client App from root folder</li>
<li>/student-library> create-react-app client</li>
<li>/student-library> cd client</li>
<li>/student-library/client> npm install react-router-dom</li>
<li>/student-library/client> npm install react-smooth-dnd</li>
<li>/student-library/client> npm install react-paginating</li>
</ol>

## Dependencies - Express and SQLite3 Database
"body-parser": "^1.19.0",
"cors": "^2.8.5",
"express": "^4.17.1",
"sqlite3": "^4.1.0"
<ol>
<li>Follow the below steps, if something not working while running project. Because some of the files are truncated while pushing to git remotely</li>
<li>To install Express with database sqlite</li>
<li>/student-library> npm install express</li>
<li>/student-library> npm install sqlite3</li>
<li>/student-library> npm install body-parser</li>
<li>/student-library> npm install cors</li>
</ol>

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


