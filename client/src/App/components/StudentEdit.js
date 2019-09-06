import React from 'react';
import Student from '../utils/Student';

class StudentEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {
                id: null,
                firstName: '',
                lastName: '',
                phoneNumber: '',
                status: ''
            },
            message: '',
            filterBy: ['active', 'delinquent', 'dropped']
        }
        this.handleEdit = this.handleEdit.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount() {
        this.loadData();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.props.match.params.id !== this.props.props.match.params.id) {
            this.loadData();
        }
    }
    onChange(event) {
        const student = Object.assign({}, this.state.student)
        student[event.target.name] = event.target.value;
        this.setState({ student })
    }
    loadData() {
        const studentId = this.props.props.match.params.id;
        let form = document.forms.studentEdit;

        this.setState({
            message: 'Loading..'
        });        
        Student.getStudentById(studentId).then(student => {
            if (student) {
                this.setState({
                    message: '',
                    student: student
                });
                form.firstName.value = student.firstName;
                form.lastName.value = student.lastName;
                form.phoneNumber.value = student.phoneNumber;
                form.status.value = student.status;
            }
            else {
                this.setState({
                    message: 'Wrong Request'
                });
            }
        });
    }
    handleEdit(e) {
        e.preventDefault();
        let student = this.state.student
        this.setState({
            message: 'Updating..'
        });
        Student.updateStudent(student).then(student => {
            if (student) {
                this.setState({
                    message: 'Updated Successfully',
                    student: student
                });
            }
            else {
                this.setState({
                    message: 'Wrong Request'
                });
            }
        });
    }
    render() {
        return (
            <div> <div className="result">{this.state.message}</div>
                <form onSubmit={this.handleEdit} name="studentEdit">
                    <div>
                        <div className="contact-input">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name="firstName" id="firstName" defaultValue='' onChange={this.onChange} required />
                        </div>
                        <div className="contact-input">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" id="lastName" defaultValue='' onChange={this.onChange} required />
                        </div>
                        <div className="contact-input">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="tel" name="phoneNumber" id="phoneNumber" defaultValue='' onChange={this.onChange} pattern="[1-9]{1}[0-9]{9}" required /><small> Format: 1234567890</small>
                        </div>
                        <div className="contact-input">
                            <label htmlFor="status">Status</label>
                            <select className="dropdown-content" name="status" defaultValue='' onChange={this.onChange} required >
                                {
                                    this.state.filterBy.map(filter => {
                                        return (
                                            <option key={filter}>{filter}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="contact-input">
                            <button>Edit Student</button>
                            {/* <input type="button" value="Add Student" id="add" /> */}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default StudentEdit;