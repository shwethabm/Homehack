import React, { Component } from 'react';
import { database } from '../firebase';
import User from './User';

export default class Group extends Component {
  constructor() {
    super();

    this.state = {
      groups: [],
      groupname: ''
    };
  }

  componentWillMount() {
    const groupRef = database.ref('groups')
      .orderByKey()
      .limitToLast(100);

    groupRef.once('value', snapshot => {
      const groups = [snapshot.val()];
      this.setState({groups: groups});
    });
  }

  onNameChange(e) {
    this.setState({groupname: e.target.value})
  }

  onAddClick(e) {
    e.preventDefault();
    database.ref('groups').push({groupname: this.state.groupname});
    localStorage.setItem('group_groupname', this.state.groupname);
    
    //this.props.history.push('/group');
  }

  render() {
    return(
    <div className="form-group col-md-4">
        <label >Group name: </label>
        <input className="form-control input-sm" type="text"  onChange={this.onNameChange.bind(this)}/>
        <button className="btn btn-info" onClick={this.onAddClick.bind(this)}>Add</button>
        <User groupname ={this.state.groupname}/>
    </div>
    
    );
  }
}