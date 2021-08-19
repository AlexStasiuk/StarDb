import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import './app.css';
import ErrorIndicator from '../error-indicator';
import ErrorButton from '../error-button';
import SwapiService from '../../services/swapi-service';

export default class App extends React.Component {

  swapiService = new SwapiService();
  state = {
    showRandomPlanet: true,
    selectedPerson: null,
    hasError: false
  };
  componentDidCatch(){
    console.log("componentDidCatch()");
    this.setState({hasError: true});
  }
  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  render(){

    if(this.state.hasError){
      return(
      <ErrorIndicator />);
    }

    const planet = this.state.showRandomPlanet ?
    <RandomPlanet/> :
    null;
    return(
      <div>
        <Header />
        { planet }

        <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>
        <ErrorButton />
        <PeoplePage/>
        <div className="row mb2 self">
          <div className="col-md-6">
            <ItemList 
            onItemSelected = {this.onPersonSelected }
            getData={this.swapiService.getAllPlanets}/>
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
        </div>
        
        </div>

        <div className="row mb2 self">
          <div className="col-md-6">
            <ItemList 
            onItemSelected = {this.onPersonSelected }
            getData={this.swapiService.getAllPlanets}/>
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
        </div>
        
        </div>
      </div>
    );
  };
}