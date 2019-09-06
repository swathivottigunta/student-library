import React from 'react';
import Student from '../utils/Student';

class StudentAdd extends React.Component {

  constructor(props) {
    super(props);
    this.filterBy = ['active', 'delinquent', 'dropped']
    this.state = {
      message: ''
    }
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleAdd(e) {
    e.preventDefault();
    let form = document.forms.studentAdd;

    let newStudent = {};
    newStudent = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      phoneNumber: form.phoneNumber.value,
      status: form.status.value
    };
    this.setState({
      message: 'Please wait...'
    });
    Student.createStudent(newStudent).then(student => {
      if (student) {        
        this.setState({
          message: 'Added Successfully'
        });
        form.firstName.value = '';
        form.lastName.value = '';
        form.phoneNumber.value = '';
        form.status.selectedIndex = 0;
      }
      else {
        this.setState({
          message: 'Something went wrong. Try again!!'
        });
      }
    });
  }


  render() {
    return (
      <div>
        <div className="result">{this.state.message}</div>
        <form onSubmit={this.handleAdd} name="studentAdd">

          <div>
            <div className="contact-input">
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" id="firstName" required />
            </div>
            <div className="contact-input">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" id="lastName" required />
            </div>
            <div className="contact-input">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="tel" name="phoneNumber" id="phoneNumber" pattern="[1-9]{1}[0-9]{9}"  required/><small> Format: 1234567890</small>
            </div>
            <div className="contact-input">
              <label htmlFor="status">Status</label>
              <select className="dropdown-content" name="status">

                {
                  this.filterBy.map(filter => {
                    return (
                      <option key={filter}>{filter}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="contact-input">
              <button>Add Student</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default StudentAdd;