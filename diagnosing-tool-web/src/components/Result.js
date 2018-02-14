import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel } from 'react-bootstrap';
import { DiagnosisDismissable } from './DiagnosisDismissable';
export class Result extends Component {
  static propTypes = {
    diagnoses: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateDiagnosisFequency: PropTypes.func.isRequired,
    toggleWrongDiagnosis: PropTypes.func.isRequired,
  }

  render() {
    return (
      <FormGroup controlId="formControlsSelect">
      <ControlLabel>Possible diagnosis</ControlLabel>
      <DiagnosisDismissable
        diagnosis={this.props.diagnoses[0]}
        updateDiagnosisFequency={this.props.updateDiagnosisFequency}
        toggleWrongDiagnosis={this.props.toggleWrongDiagnosis}/>
    </FormGroup>
    )
  }
}
