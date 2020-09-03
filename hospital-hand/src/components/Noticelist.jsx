// import NewStudentModal from "./NewStudentModal";
import 'semantic-ui-css/semantic.min.css'
import {
  Container,
  Header,
  able,
  Button
} from 'semantic-ui-react'
import Modal from 'react-awesome-modal';
import React from 'react'
import axios from "axios";
import { Redirect } from 'react-router-dom';

import Noticepopup from './DetailNotice'
import {UpdateNoticeForm} from './UpdateNoticeForm'
import { API_URL2, API_URL3 } from "../constants";
import {Link, RichText, Date} from 'prismic-reactjs';

class List extends React.Component {
  state = {
    notice: [],
    isDetailOpen: false,
    isUpdateOpen:false
  };

  componentDidMount() {
    axios.get(API_URL2)
    .then(res => {
      this.setState({ notice: res.data })
    
    console.log(this.state.notice)
    })
    
  }
  detail_data(){
    this.setState({isDetailOpen:true})
  }
  update_data(){
    this.setState({isUpdateOpen:true})
  }
  
  del_data(id) {
    console.log(id);
    axios.delete(`http://localhost:8000/notice/update_delete/${id}/`,this.state).then(window.location.reload())
    
  };
  onDetailClose(){
    this.setState({
      isDetailOpen:false
    })
  }
  onUpdateClose(){
    this.setState({
      isUpdateOpen:false
    })
  }
    

    render(){
      const {notice}=this.props
      const {data}=this.props
      const {isDetailOpen}=this.state
      const {isUpdateOpen}=this.state
     

      
        return(
          <div>

            {/* <Noticepopup isDetailOpen={isDetailOpen} onDetailClose={this.onDetailClose}> </Noticepopup> */}
            {/* <UpdateNoticeForm isUpdateOpen={isUpdateOpen} onUpdateClose={onUpdateClose}></UpdateNoticeForm> */}
          <table className="ui celled table">
        <thead>
    <tr>
      <th>Title</th>
      <th>Action</th>
    </tr>
        </thead>
  <tbody>
    {this.state.notice.map(notice => (
            
        <tr selectable textAlign="center" key={notice.id}>
             <td data-label="Title" >{notice.title}</td> 
             <td data-label="Action">
               
              <button type="submit" onClick={this.detail_data.bind(this)} > Detail</button>
              
              <button type="submit" onClick={this.update_data}>Update</button>
              <button type="submit" onClick={this.del_data.bind(this,notice.id)}>Delete</button></td>
        </tr>
            ))}
      </tbody>
      </table>
      </div>
        )
    };
  }


export default List;