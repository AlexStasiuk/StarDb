import React, { Component } from 'react';

import './random-planet.css';
import '../../services/swapi-service';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

export default class RandomPlanet extends Component {


  componentDidMount(){
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 10000);
    // clearInterval(this.interval);
  };
  state = {
    planet: {},
    loading: true,
    error: false
  };
  errorCatch = (error) =>{
    this.setState({error: true});
  }
  onPlanetLoaded = (planet) =>{
    this.setState({ planet, loading: false});
  };
  swapiService = new SwapiService();
  updatePlanet = () => {
    const id = Math.ceil(Math.random() * 30);
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.errorCatch);
  };
  render() {
    const { planet, loading, error } = this.state;

    const spinner = loading && !error ? <Spinner /> : null;
    const content = !loading && !error ? <PlanetView planet={planet}/> : null;
    const errorContent = error ? <ErrorIndicator />: null;

    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {content}
        {errorContent}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {

  const { id, name, population,
    rotationPeriod, diameter } = planet;

  return (
    <React.Fragment>
      <img className="planet-image"
           src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
           alt = "planet" />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};