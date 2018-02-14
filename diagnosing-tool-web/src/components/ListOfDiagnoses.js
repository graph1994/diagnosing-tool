import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { DiagnosisDismissable } from './DiagnosisDismissable';
export class ListOfDiagnoses extends Component {
  static propTypes = {
    diagnoses: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateDiagnosisFequency: PropTypes.func.isRequired,
  }

  state = {
    showDiagnosisDetail: false,
    diagnosis: {},
  }

  handleClick = (diagnosis) => {
    this.props.updateDiagnosisFequency(diagnosis.id)
  }

  render() {
    const { diagnoses, updateDiagnosisFequency } = this.props;
    return (
      <div>
        <ListGroup>
          {diagnoses.map((diagnosis) => (
            // TODO: Implment a better way to select a diagnosis and increase its frequency..
            <ListGroupItem key={diagnosis.id} onClick={() => {this.handleClick(diagnosis)}}>
              {diagnosis.name}
            </ListGroupItem>
          ))}
        </ListGroup>
        {this.state.showDiagnosisDetail && <DiagnosisDismissable diagnosis={this.state.diagnosis} updateDiagnosisFequency={updateDiagnosisFequency} />}
      </div>
    );
  }
}
