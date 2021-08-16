import React, { Component } from 'react';

import './person-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
export default class PersonDetails extends Component {

  swapiService = new SwapiService();
  state = {
    person: {},
    loading: false,
    noOneWasChosenYet: true
  }
  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.preUpdatePerson();
      this.updatePerson();
    }
  }

  onPersonLoaded = (person) => {
    this.setState({person, loading: false, noOneWasChosenYet: false});
  }
  preUpdatePerson(){
    this.setState({loading: true});
  }
  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then(this.onPersonLoaded);
    
    
  }
  render() {
    const {noOneWasChosenYet, loading} = this.state;
    if(loading){
      return (<Spinner />)
    }
    if(noOneWasChosenYet){
      return(<span>No one was chosen yet</span>)
    }
    const {id, name, birthYear, gender, eyeColor} = this.state.person;
    return (
      <div className="person-details card">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt="person"
          />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}