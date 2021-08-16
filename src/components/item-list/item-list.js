import React, { Component } from 'react';

import './item-list.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

export default class ItemList extends Component {

  swapiService = new SwapiService();

  state = {
    peopleList: null
  }
  componentDidMount(){
    this.swapiService
      .getAllPeople()
      .then((peopleList) => {
        this.setState({
          peopleList
        });
      });
  };

  render() {

    const {peopleList} = this.state;

    if(!peopleList){
      return(
      <Spinner />);
    }
    const peopleListItems = peopleList.map(({id, name}) =>{
      return(
      <li 
        key = {id}
        className = "list-group-item"
        onClick={() => this.props.onItemSelected(id)}>
        {name}
      </li>);
    });

    return (
      <ul className="item-list list-group">
        {peopleListItems}
      </ul>
    );
  }
}