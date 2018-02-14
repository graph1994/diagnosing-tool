import React, { Component } from 'react';
import { PageHeader, Grid, Col, Row, Well, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { InputSymptom } from './Input';
import { Result } from './Result';
import { ListOfDiagnoses } from './ListOfDiagnoses';

export class Main extends Component {
  state = {
    symptoms: [],
    diagnoses: [],
    selectedSymptomId: null,
    updatedDiagnosis: null,
    wrongDiagnosis: false,
  }
  componentDidMount() {
    this.loadSymptomsToState();
  }

  loadSymptomsToState() {
      axios.get('symptoms/')
      .then(res => {
          this.setState({symptoms: res.data});
      }).then(response => {
          console.log(JSON.stringify(response));
      })
  }

  loadDiagnosisToState = (symptom_id) => {
    let diagnosisEndpoint = 'diagnosis/'
    if (symptom_id) {
      diagnosisEndpoint += '?symptom_id=' + symptom_id
    }
    axios.get(diagnosisEndpoint)
    .then(res => {
        this.setState({diagnoses: res.data});
        this.setState({ selectedSymptomId: symptom_id})
    })
  }

  updateDiagnosisFequency = (diagnosis_id) => {
    const diagnosisEndpoint = 'diagnosis/' + diagnosis_id + '/update_fequency/'
    axios.patch(diagnosisEndpoint)
    .then(res => {
        console.log('Updated frequency:', res.data)
        this.setState({updatedDiagnosis: res.data})
    }).then(response => {
        this.loadDiagnosisToState(this.state.selectedSymptomId);
    })
  }

  toggleWrongDiagnosis = () => {
    this.setState({ wrongDiagnosis: !this.state.wrongDiagnosis})
  }

  resetState = () => {
    // TODO: Find a cleaner way to reset state
    window.location.reload();
  }

  render() {
    return (
      <div>
        <PageHeader>
          {!this.state.selectedSymptomId ? 'What is your symptom?' : 'Is this Diagnosis correct?'}
        </PageHeader>
        <div>
          <Grid>
            <Row>
              <Col md={6} xsOffset={3}>
                {!this.state.selectedSymptomId && <InputSymptom symptoms={this.state.symptoms} fetchDiagnosis={this.loadDiagnosisToState}/>}
                {!this.state.wrongDiagnosis &&
                  this.state.diagnoses.length > 0 &&
                  <Result
                  diagnoses={this.state.diagnoses}
                  updateDiagnosisFequency={this.updateDiagnosisFequency}
                  toggleWrongDiagnosis={this.toggleWrongDiagnosis}
                />}
                {this.state.wrongDiagnosis &&
                 !this.state.updatedDiagnosis &&
                  <ListOfDiagnoses
                    diagnoses={this.state.diagnoses}
                    updateDiagnosisFequency={this.updateDiagnosisFequency}
                  />
                }
                {this.state.updatedDiagnosis &&
                  <Well>
                    <h4> Diagnosis: {this.state.updatedDiagnosis.name}</h4>
                    <h4> Frequency: {this.state.updatedDiagnosis.frequency}</h4>

                    <p>Thanks for reporting! Would you like to restart? </p>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Freqeuncy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.diagnoses.map(diagnosis =>  (
                            <tr>
                              <td>{diagnosis.name}</td>
                              <td>{diagnosis.frequency}</td>
                            </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Well>
                 }
                 <Button bsStyle='warning' onClick={this.resetState}>Restart</Button>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}
