import React, { Component } from 'react'
import axios from 'axios';
import {Button,ButtonToolbar, Table} from 'react-bootstrap'
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import DeleteEmployee from './DeleteEmployee';
import { Pencil,Trash,Plus } from 'react-bootstrap-icons';

export class Employee extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       persons:[],
       showCreatemodal:false,
       showEditmodal:false,
       showDeletemodal:false,
       Id:0,
       Name:'',
       Department:'',
       DateofJoining:'',
       Photo:''
    }
  }
  refreshList(){
    axios.get(`http://localhost:17924/api/Employee`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }
  componentDidMount() {
    this.refreshList();
  }
  componentDidUpdate()
  {
    this.refreshList();

  }
  render() {
    let closeModal=()=>{this.setState({showCreatemodal:false})};
    let closeEditModal=()=>{this.setState({showEditmodal:false})};
    let closeDeleteModal = ()=>{this.setState({showDeletemodal:false})};
    return (

      <div>
        <ButtonToolbar>
          <DeleteEmployee onShow={this.state.showDeletemodal} onHide={closeDeleteModal} Id={this.state.Id}/>
        <Button variant='primary' class="right" onClick={()=>{this.setState({showCreatemodal:true})}}><Plus color='white' size={35}></Plus> Add Employee</Button>
        <AddEmployee onShow={this.state.showCreatemodal} onHide={closeModal}></AddEmployee>
        <EditEmployee onShow={this.state.showEditmodal} onHide={closeEditModal} Id={this.state.Id} Name={this.state.Name} Department={this.state.Department} DateofJoining={this.state.DateofJoining} Photo={this.state.Photo}></EditEmployee>
        </ButtonToolbar>
        
        <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Employee Id</th>
      <th>Employee Name</th>
      <th>Department</th>
      <th>Photo</th>
      <th>DateofJoining</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
      {
        this.state.persons
        .map(person =>
          <tr key={person.EmployeeId}>
            <td>{person.EmployeeId}</td>
            <td>{person.EmployeeName}</td>
            <td>{person.Department}</td>
            <td>{person.Photo}</td>
            <td>{person.DateofJoining}</td>
            <td><Pencil color="royalblue" size={25} onClick={()=>{this.setState({showEditmodal:true,Id:person.EmployeeId,Name:person.EmployeeName,Photo:person.Photo,Department:person.Department,DateofJoining:person.DateofJoining})}} /><Trash color="red" size={25} onClick={()=>{this.setState({showDeletemodal:true,Id:person.EmployeeId})}} /></td>
            </tr>
        )
      }     
  </tbody>
</Table>
      </div>
    )
  }
}

export default Employee
