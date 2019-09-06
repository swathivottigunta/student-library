const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db.sqlite');

db.serialize(() => {


  db.run(`insert into Student(firstName, lastName, phoneNumber, status) values('Jhon', 'Smith', '4036781654', 'active')`, (err) => {
    if (err) {
      throw err;
    }
  });
  db.run(`insert into Student(firstName, lastName, phoneNumber, status) values('Joe', 'Roberts', '4036781654', 'dropped')`, (err) => {
    if (err) {
      throw err;
    }
  });
  db.run(`insert into Student(firstName, lastName, phoneNumber, status) values('Abhi', 'Varma', '4036781654', 'dropped')`, (err) => {
    if (err) {
      throw err;
    }
  });

  db.all('SELECT * FROM Student', (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(`Finished seeding. There are ${rows.length} rows into the Students table.`);
  });
});