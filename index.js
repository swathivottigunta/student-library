const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db.sqlite');

const path = require('path');

const app = express();
app.use(bodyParser.json())
app.use(cors())


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Get Students list by status
app.get('/api/students/:status', (req, res, next) => {

    let offset = req.query._offset ? parseInt(req.query._offset, 10) : 0;
    let limit = req.query._limit ? parseInt(req.query._limit, 10) : 10;
    let total;
    let status = req.params.status;

    if (status === 'all') {
        status = '%'
    }

    const sql = `select * from Student where status like $status limit $limit offset $offset`;

    const values = { $status: status, $limit: limit, $offset: offset };
    db.all(`select count(*) as count from Student where status like $status`, { $status: status }, (error, count) => {
        total = count[0].count;
    })
    db.all(sql, values, (error, students) => {
        if (error) {
            next(error);
        } else if (students) {
            res.status(200).json({ totalCount: total, students: students });
        } else {
            res.sendStatus(404);
        }
    });

})
// Get Student by ID
app.param('studentId', (req, res, next, studentId) => {
    const sql = `select * from Student where id=$studentId`;
    const values = { $studentId: studentId };
    db.get(sql, values, (error, student) => {
        if (error) {
            next(error);
        } else if (student) {
            req.student = student;
            next();
        } else {
            res.sendStatus(404);
        }
    });
});

app.get('/api/student/:studentId', (req, res, next) => {
    res.status(200).json({ student: req.student });
})

// Add Student
const validateStudent = (req, res, next) => {
    const student = req.body.student
    if (!student.firstName || !student.lastName || !student.phoneNumber || !student.status) {
        return res.sendStatus(400) // bad request
    }
    next()
}

app.post('/api/students', validateStudent, (req, res, next) => {
    const student = req.body.student
    db.run(`insert into Student(firstName, lastName, phoneNumber, status) values($firstName, $lastName, $phoneNumber, $status)`,
        {
            $firstName: student.firstName,
            $lastName: student.lastName,
            $phoneNumber: student.phoneNumber,
            $status: student.status
        },
        function (err) {
            if (err)
                return res.status(500).send() // internal server error
            else {
                db.get(`select * from Student where id= $id`, { $id: this.lastID }, (err, row) => {
                    if (err)
                        return res.status(500).send() // internal server error

                    res.status(201).send({ student: row })
                })
            }
        })
})

// Update Student by ID
app.put('/api/students/:studentId', (req, res, next) => {
    const student = req.body.student

    const sql = 'UPDATE Student SET firstName = $firstName, lastName = $lastName, phoneNumber = $phoneNumber, status=$status WHERE id = $studentId';

    const values = {
        $firstName: student.firstName,
        $lastName: student.lastName,
        $phoneNumber: student.phoneNumber,
        $status: student.status,
        $studentId: student.id
    };

    db.run(sql, values, (error) => {
        if (error) {

            return res.status(500).send() // internal server error
        } else {
            db.get(`SELECT * FROM Student WHERE id = ${student.id}`,
                (error, student) => {
                    if (error)
                        return res.status(500).send() // internal server error

                    res.status(200).json({ student: student });
                });
        }
    });
});
// Update Student status by ID
app.put('/api/student/:studentId', (req, res, next) => {
    const student = req.body.student

    const sql = 'UPDATE Student SET status=$status WHERE id = $studentId';

    const values = {
        $status: student.status,
        $studentId: student.id
    };

    db.run(sql, values, (error) => {
        if (error) {
            return res.status(500).send() // internal server error
        } else {
            db.get(`SELECT * FROM Student WHERE id = ${student.id}`,
                (error, student) => {
                    if (error)
                        return res.status(500).send() // internal server error                    
                    res.status(200).json({ student: student });
                });
        }
    });
});

// Get all students
app.get('/api/allstudents', (req, res, next) => {
    let students = []
    let sql = `select * from Student where status like $status`;
    let values = { $status: 'active' };

    db.serialize(() => {
        db.all(sql, values, (error, results) => {
            if (error) {
                next(error);
                res.sendStatus(404);
            } else if (results) {
                students.push(results)
            } else {
                res.sendStatus(404);
            }
        });
        sql = `select * from Student where status like $status`;
        values = { $status: 'delinquent' };

        db.all(sql, values, (error, results) => {
            if (error) {
                next(error);
                res.sendStatus(404);
            } else if (results) {
                students.push(results)
            } else {
                res.sendStatus(404);
            }
        });
        sql = `select * from Student where status like $status`;
        values = { $status: 'dropped' };

        db.all(sql, values, (error, results) => {
            if (error) {
                next(error);
                res.sendStatus(404);
            } else if (results) {
                students.push(results)
                res.status(200).json({ students: students });
            }
            else {
                res.sendStatus(404);
            }
        });

    })

})
// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = 4000;
app.listen(port);

console.log('App is listening on port ' + port);