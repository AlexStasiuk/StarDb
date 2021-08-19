import React, { Component } from 'react';

import './item-list.css';

import Spinner from '../spinner';

export default class ItemList extends Component {

  state = {
    itemList: null
  }
  componentDidMount(){

    const {getData} = this.props;
    getData()
      .then((itemList) => {
        this.setState({
          itemList
        });
      });
  };

  render() {

    const {itemList} = this.state;

    if(!itemList){
      return(
      <Spinner />);
    }
    const items = itemList.map(({id, name}) =>{
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
        {items}
      </ul>
    );
  }
}