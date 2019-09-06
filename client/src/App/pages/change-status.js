import React from 'react';
import StudentChangeStatus from '../components/StudentChangeStatus'


class ChangeStatus extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="outer-container">
                <div className="page-links">
                        <a href="/"><button variant="raised">Home</button></a>
                    </div>
                    <h2>Change Status</h2>
                    <StudentChangeStatus />
                </div>
            </div>
        );
    }
}
export default ChangeStatus;