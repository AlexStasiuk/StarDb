import React from 'react';

import './error-button.css';

export default class ErrorButton extends React.Component{

    state = {
        errorValue: false
    };
    render(){
        if (this.state.errorValue){
            this.foo.bar = 0;
 
        }
        const classNames = "error-button btn btn-danger btn-lg";
        return (
            <button
            className={classNames}
            onClick={() => this.setState({errorValue: true})}>
                Error Button
            </button>
        );
    }

}