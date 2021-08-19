import React from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './people-page.css';
export default class PeoplePage extends React.Component{

  swapiService = new SwapiService();
  state={
      hasError: false,
      selectedPerson: 1
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
        onItemSelected = {this.onPersonSelected }
        getData={this.swapiService.getAllPeople}/>
        </div>
        <div className="col-md-6">
        <PersonDetails personId={this.state.selectedPerson} />
        </div>
    </div>);
  }
}