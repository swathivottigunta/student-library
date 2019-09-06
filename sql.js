const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db.sqlite')
db.serialize(() => {
db.run('drop table if exists Student')

db.run('create table if not exists Student (id integer primary key not null, firstName TEXT not null, lastName TEXT not null, phoneNumber INTEGER not null, status TEXT not null)', err => {
  if(err)
    console.log(err)
  console.log('Successfully created')
})
})
