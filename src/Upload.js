import React, { Component } from 'react'
import {Button} from 'react-bootstrap'

export class Upload extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         fileSelected:null,
         src:''
      }
    }
    
    onFileChange=event=>{
        this.setState({
            fileSelected:event.target.files[0]
        })
    }

    handleSubmit=()=>{
        console.log(this.state.fileSelected)
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
  render() {
    return (
      <>
        <input type="file" onChange={this.onFileChange}/>
        <Button variant="primary" onClick={this.handleSubmit}>
              Upload
            </Button>
            <img src={this.state.src} width={350} height={350}/>
      </>
    )
  }
}

export default Upload
