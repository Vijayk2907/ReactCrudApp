import React, { Component } from 'react'
import {Modal,Button,Row,Col,Container} from 'react-bootstrap'
import axios from 'axios'

export class AddEmployee extends Component { 
  constructor(props) {
    super(props)
  
    this.state = {
        EmployeeName:'',
        Department:'',
        DateofJoining:'',
        Photo:'',
        fileSelected:null,
        src:''
    }
  }
  uploadPhoto=()=>{
    const formData= new FormData();
    formData.append("myFile",this.state.fileSelected,this.state.fileSelected.name);
    fetch("http://localhost:17924/api/Employee/SaveFile",{
        method:"POST",
        body:formData,
    }).then(res =>res.json())
    .then((result)=>{
        this.setState({
            src:"http://localhost:17924/Photos/"+result
        })
    })
  }
  onFileChange=event=>{
    this.setState({
        fileSelected:event.target.files[0],
        Photo:event.target.files[0].name
    })
}
  handleSubmit=(event)=>{
    event.preventDefault();
    console.log(this.state.EmployeeName+':'+this.state.Department+':'+this.state.DateofJoining);
    const data ={
      EmployeeName:this.state.EmployeeName,
      Department:this.state.Department,
      DateofJoining:this.state.DateofJoining,
      PhotoName:this.state.Photo
    }
    axios
    .post("http://localhost:17924/api/Employee", data)
    .then(res => alert(res.data))
    .catch(err => console.log(err));
    this.setState({
      src:''
    })
    this.props.onHide();
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
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Container className='form-group'>
            <Row>
              <Col xs={8}>
  <Row>
    <Col xs={4}><label>Name:</label></Col>
    <Col xs={4}><input type="text" onChange={this.nameHandler}/></Col>
  </Row>
  <Row>
    <Col xs={4}><label>Department:</label></Col>
    <Col xs={4}><input type="text" onChange={this.departmentHandler}/></Col>
  </Row>
  <Row>
    <Col xs={4}><label>DateofJoining:</label></Col>
    <Col xs={4}><input type="text" onChange={this.dateHandler}/></Col>
  </Row>
  <Row>
  <Col xs={4}><label>Photo:</label></Col>
    <Col xs={4}><input type="file" onChange={this.onFileChange}/></Col>
  </Row>
  </Col>
  <Col xs={1}></Col>
  <Col xs={2}>
    <Button onClick={this.uploadPhoto}>Upload</Button>  
    <img src={this.state.src} width={75} height={75}/> 
  </Col>
</Row>
</Container>
          </Modal.Body>
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

export default AddEmployee


