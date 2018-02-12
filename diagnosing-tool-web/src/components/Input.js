import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export class InputSymptom extends Component {
  static propTypes = {
    symptoms: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchDiagnosis: PropTypes.func.isRequired,
  }

  handleSelect = (event) => {
    this.props.fetchDiagnosis(event.target.value);
  }


  render() {
    const options = this.props.symptoms;
    return (
      <FormGroup controlId="formControlsSelect">
      <ControlLabel>Select a symptom...</ControlLabel>
      <FormControl componentClass="select" placeholder="Select a symptom" onChange={this.handleSelect}>
      <option value=''>Select...</option>
      {
        options.map((option, index) => {
           return (<option key={index} value={option.id}>{option.feature}</option>)
        })
      }
      </FormControl>
    </FormGroup>
    )
  }
}
