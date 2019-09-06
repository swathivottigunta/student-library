import React from 'react';
import StudentAdd from '../components/StudentAdd'
import { Link } from 'react-router-dom';


class Add extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="outer-container">
                    <div className="page-links">
                        <Link to={'/'}><button variant="raised">Home</button></Link>
                    </div>
                    <h2>Add Student</h2>
                    <StudentAdd />
                </div>
            </div>
        );
    }
}

export default Add;