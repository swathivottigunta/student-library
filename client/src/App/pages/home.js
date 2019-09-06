import React from 'react';
import { Link } from 'react-router-dom';

import StudentFilter from '../components/StudentFilter'

class Home extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="outer-container">
          <div className="content-buttons">
            <div className="content-buttons-left">
              <div className="input" id="add-button">
                <Link to={'./add'}><button variant="raised">Add Student</button></Link>
              </div>
              <div className="input" id="change-status-button">
                <Link to={'./change-status'}><button variant="raised">Change Status</button></Link>
              </div>
            </div>
          </div>
          <StudentFilter />
        </div>
      </div>
    );
  }
}
export default Home;



