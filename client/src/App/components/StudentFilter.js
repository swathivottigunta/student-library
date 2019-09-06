import React from 'react';
import Pagination from 'react-paginating'

import StudentTable from './StudentTable'

import Student from '../utils/Student'


const pageCount = 3;

class StudentFilter extends React.Component {
    constructor() {
        super();
        this.filterBy = ['all', 'active', 'delinquent', 'dropped']
        this.onChange = this.onChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleLimitChange = this.handleLimitChange.bind(this)

        this.state = {
            students: '',
            message: '',
            limit: 10,
            currentPage: 1,
            status: 'all',
            totalCount: 0
        }
    }
    componentDidMount() {        
        if (this.state.students === '') this.loadData(1, this.state.status, this.state.limit);
    }
    loadData(page, status, limit) {
        this.setState({
            message: "Loading",
            students: ''
        })
        let newOffset = (limit * (page - 1));
        Student.getStudentsByStatus(status, limit, newOffset).then(jsonResponse => {
            if (jsonResponse.totalCount > 0) {
                this.setState({
                    students: jsonResponse.students,
                    totalCount: jsonResponse.totalCount,
                    message: ''
                })
            }
            else {
                this.setState({
                    message: "No Records Found",
                    students: '',
                    totalCount: 0
                })
            }

        }).catch(err => {
            this.setState({
                message: "Something went wrong. Not able to connect database"               
            })
        })
    }
    onChange(event) {
        this.setState({ status: event.target.value, currentPage: 1 })
        this.loadData(1, event.target.value, this.state.limit)
    }
    handlePageChange = (page, e) => {
        this.setState({
            currentPage: page
        });        
        this.loadData(page, this.state.status, this.state.limit)
    };
    handleLimitChange = ( e) => {
        this.setState({
            limit: e.target.value,
            currentPage: 1
        });        
        this.loadData(1, this.state.status, e.target.value)
    };
    render() {
        let pagination
        if (this.state.totalCount > 0) {
            pagination = (
                <div id="pagination-records">
                    <div><label htmlFor="row-limit" >Records per rows </label><select id="row-limit" onChange={this.handleLimitChange} value={this.state.limit}><option value='10'>10</option><option value='20'>20</option></select></div>
                    <Pagination
                        total={this.state.totalCount}
                        limit={this.state.limit}
                        pageCount={pageCount}
                        currentPage={this.state.currentPage}
                    >
                        {({
                            pages,
                            currentPage,
                            hasNextPage,
                            hasPreviousPage,
                            previousPage,
                            nextPage,
                            totalPages,
                            getPageItemProps
                        }) => (
                                <div>
                                    <button {...getPageItemProps({pageValue: 1, onPageChange: this.handlePageChange})}>first</button>
                                    {hasPreviousPage && (<button {...getPageItemProps({pageValue: previousPage,onPageChange: this.handlePageChange})}>
                                            {"<"}</button>)}

                                    {pages.map(page => {
                                        let activePage = null;
                                        if (currentPage === page) {
                                            activePage = { backgroundColor: "#fdce09" };
                                        }
                                        return (
                                            <button {...getPageItemProps({ pageValue: page, key: page, style: activePage, onPageChange: this.handlePageChange })}>
                                                {page}
                                            </button>);
                                    })}

                                    {hasNextPage && ( <button{...getPageItemProps({pageValue: nextPage, onPageChange: this.handlePageChange })} >
                                            {">"}
                                        </button>)}

                                    <button {...getPageItemProps({pageValue: totalPages, onPageChange: this.handlePageChange })}>
                                        last 
                                    </button>
                                </div>
                            )}
                    </Pagination>
                </div>
            )
        }
        return (
            <div>
                <div className="content-buttons-right">
                    <div>Filter By:</div>
                    <div className="dropdown" id="status-filter">
                        <select className="dropdown-content" onChange={this.onChange}>
                            {
                                this.filterBy.map(filter => {
                                    return (
                                        <option key={filter} >{filter}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div >

                <div className="result">{this.state.message}</div>
                <div>
                    <StudentTable students={this.state.students} />
                    {pagination}
                </div>
            </div>
        )
    }
}
export default StudentFilter;