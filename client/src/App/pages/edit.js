import React from 'react';
import StudentEdit from '../components/StudentEdit'
import { Link } from 'react-router-dom';


class Edit extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="outer-container">
                <div className="page-links">
                        <Link to={'/'}><button variant="raised">Home</button></Link>
                    </div>
                    <h2>Edit Student</h2>
                    <StudentEdit props={this.props} />
                </div>
            </div>
        );
    }
}

export default Edit;