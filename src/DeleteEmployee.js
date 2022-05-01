import React, { Component } from 'react'
import { Modal,Button } from 'react-bootstrap'

export class DeleteEmployee extends Component {
      handleDelete=()=>{
        fetch("http://localhost:17924/api/Employee/"+this.props.Id,{
            method:'DELETE',
            header:{'Accept':'application/json',
        'Content-Type':'application/json'}
        })
        
    }
   
  render() {
      
    return (
      <>
        <Modal show={this.props.onShow}>
  <Modal.Header closeButton onClick={this.props.onHide}>
    <Modal.Title>Delete Modal</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <p>Are you sure want to Delete!</p>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
    <Button variant="primary" onClick={this.handleDelete}>Save changes</Button>
  </Modal.Footer>
</Modal>
      </>
    )
  }
}

export default DeleteEmployee
