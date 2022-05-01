import React, { Component } from 'react'
import {Modal,Button,Form} from 'react-bootstrap'
import axios from 'axios'

export class EditEmployee extends Component { 
  constructor(props) {
    super(props)
  
    this.state = {
        EmployeeId:'',
        EmployeeName:'',
        Department:'',
        DateofJoining:'',
        Photo:''
    }
  }
  
  handleSubmit=(event)=>{
    event.preventDefault();
    console.log(this.state.EmployeeName+':'+this.state.Department+':'+this.state.DateofJoining);
    const data ={
        EmployeeId:this.state.EmployeeId,
      EmployeeName:this.state.EmployeeName,
      Department:this.state.Department,
      DateofJoining:this.state.DateofJoining,
      PhotoName:this.state.Photo
    }
    axios
    .put("http://localhost:17924/api/Employee", data)
    .then(res => alert(res.data))
    .catch(err => console.log(err));
    this.props.onHide();
  }

  idHandler=(event)=>{
    event.preventDefault();

    this.setState({
        EmployeeId:event.target.value
    })
   console.log(this.state.EmployeeId);
  }
  photoHandler=(event)=>{
    event.preventDefault();

    this.setState({
        Photo:event.target.value
    })
   console.log(this.state.Photo);
  }
  dateHandler=(event)=>{
    event.preventDefault();

    this.setState({
        DateofJoining:event.target.value
    })
   console.log(this.state.DateofJoining);
  }
  departmentHandler=(event)=>{
    event.preventDefault();
    this.setState({
        Department:event.target.value
    })
    console.log(this.state.Department);
  }
  nameHandler=(event)=>{
    console.log(event)
event.preventDefault();
    this.setState({
        EmployeeName :event.target.value
    }) 
    console.log(this.state.EmployeeName);
  }
  
  render() {
    return (
      <div>
         <Modal show={this.props.onShow}>
          <Modal.Header closeButton onClick={this.props.onHide}>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body><Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="EmployeeId"  onChange={this.idHandler}>
    <Form.Label>Employee Id</Form.Label>
    <Form.Control type="text" placeholder="EmployeeName" defaultValue={this.props.Id} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="EmployeeName" value={this.state.EmployeeName} onChange={this.nameHandler}>
    <Form.Label>Employee Name</Form.Label>
    <Form.Control type="text" placeholder="EmployeeName" defaultValue={this.props.Name}/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="Department" value={this.state.Department} onChange={this.departmentHandler}>
    <Form.Label>Department</Form.Label>
    <Form.Control type="text" placeholder="Department" defaultValue={this.props.Department}/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="DateofJoining" value={this.state.DateofJoining} onChange={this.dateHandler}>
    <Form.Label>Date of Joining</Form.Label>
    <Form.Control type="text" placeholder="DateofJoining" defaultValue={this.props.DateofJoining}/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="Photo" value={this.state.Photo} onChange={this.photoHandler}>
    <Form.Label>Photo</Form.Label>
    <Form.Control type="text" placeholder="Photo" defaultValue={this.props.Photo}/>
  </Form.Group>
</Form></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onHide}>
              Close
            </Button>
            <Button variant="primary" typ="submit" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default EditEmployee


