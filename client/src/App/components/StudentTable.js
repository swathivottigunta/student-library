import React from 'react';
import { Link } from 'react-router-dom';




function StudentRow(props) {
    const student = props.student;
    return (
        <tr>
            <td>{student.id}</td>
            <td>{student.firstName}</td>
            <td>{student.lastName}</td>
            <td>{student.phoneNumber}</td>
            <td>{student.status}</td>
            <td><Link to={`/edit/${student.id}`}><input type="button" value="EDIT" /></Link></td>
        </tr>
    );
}
class StudentTable extends React.Component {


    render() {
        let studentRows = ''
        
        if (this.props.students) {
            studentRows = this.props.students.map(student =>
                <StudentRow key={student.id} student={student} />
            );

            return (
                <div className="student-table">
                    <table>
                        <thead>
                            <tr>
                                <th scope="column">Student ID</th>
                                <th scope="column">First Name</th>
                                <th scope="column">Last Name</th>
                                <th scope="column">Phone Number</th>
                                <th scope="column">Status</th>
                                <th scope="column">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentRows}

                        </tbody>
                    </table>

                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
}
export default StudentTable;


