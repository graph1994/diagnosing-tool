import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Alert } from 'react-bootstrap';

export class DiagnosisDismissable extends Component {
  static propTypes = {
    diagnosis: PropTypes.object.isRequired,
    updateDiagnosisFequency: PropTypes.func.isRequired,
    toggleWrongDiagnosis: PropTypes.func.isRequired,
  }

  static defaultProps = {
    diagnosis: {},
  }
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);

    this.state = {
      show: true
    };
  }

  handleWrongDiagnosis = () => {
    this.setState({ show: false });
    this.props.toggleWrongDiagnosis();
  }

  handleUpdate = () => {
    this.props.updateDiagnosisFequency(this.props.diagnosis.id)
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const { diagnosis }  = this.props;
    if (this.state.show && diagnosis) {
      return (
        <Alert bsStyle="info" onDismiss={this.handleDismiss}>
          <h4>{diagnosis.name}</h4>
          <p>
            <Button bsStyle="success" onClick={this.handleUpdate}>Yes, this is correct</Button>
            <span> or </span>
            <Button bsStyle="warning" onClick={this.handleWrongDiagnosis}>No, this is not what I have.</Button>
          </p>
        </Alert>
      );
    }

    return <div></div>;
  }
}
