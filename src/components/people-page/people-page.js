import React from 'react';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './people-page.css';
export default class PeoplePage extends React.Component{

  state={
      hasError: false,
      selectedPerson: null
  }
  componentDidCatch(){
    this.setState({hasError: true});
  }
  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    });
  };
  render(){
    if(this.state.hasError){
        return(<ErrorIndicator />);
    }
    return(
    <div className="row mb2 self">
        <div className="col-md-6">
        <ItemList 
        onItemSelected = {this.onPersonSelected }/>
        </div>
        <div className="col-md-6">
        <PersonDetails personId={this.state.selectedPerson} />
        </div>
    </div>);
  }
}