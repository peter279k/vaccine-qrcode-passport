import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter, MemoryRouter } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';


import AddPatientTemplate from './templates/AddPatientTemplate.js';
import ModifyPatientTemplate from './templates/ModifyPatientTemplate.js';
import QueryPatientTemplate from './templates/QueryPatientTemplate.js';
import DeletePatientTemplate from './templates/DeletePatientTemplate.js';
import QueryOrgTemplate from './templates/QueryOrgTemplate.js';
import AddOrgTemplate from './templates/AddOrgTemplate.js';
import AddImmunizationTemplate from './templates/AddImmunizationTemplate.js';
import QueryImmunizationTemplate from './templates/QueryImmunizationTemplate.js';
import AddObservationTemplate from './templates/AddObservationTemplate.js';
import QueryObservationTemplate from './templates/QueryObservationTemplate.js';
import FHIRServerSettingTemplate from './templates/FHIRServerSettingTemplate.js';
import QRCodeGeneratorTemplate from './templates/QRCodeGeneratorTemplate.js';
import VaccineQRCodeUrlValidationTemplate from './templates/VaccineQRCodeUrlValidationTemplate.js';
import VaccineRegisterTemplate from './templates/VaccineRegisterTemplate.js';

import HttpRequest from './HttpRequest.js';

import DropDownPatientTemplate from './templates/DropDown/DropDownPatientTemplate.js';
import DropDownOrgTemplate from './templates/DropDown/DropDownOrgTemplate.js';
import DropDownImmunizationObservationTemplate from './templates/DropDown/DropDownImmunizationObservationTemplate.js';
import DropDownQueryImmunizationObservationTemplate from './templates/DropDown/DropDownQueryImmunizationObservationTemplate.js';
import FHIRServerButtonTemplate from './templates/FHIRServerButtonTemplate.js';
import VaccineRegisterButtonTemplate from './templates/VaccineRegisterButtonTemplate.js';

import './App.css';
import './modifiedStyling.scss';


const App = () => {

  useEffect(() => {
    async function sendFHIRServerDataForQRCodeDemo() {
      let apiEndpoint = process.env.REACT_APP_FHIR_SERVER;
      let apiToken = process.env.REACT_APP_FHIR_SERVER_TOKEN;

      await HttpRequest.sendFHIRServerDataForQRCodeDemo(apiEndpoint, apiToken);
    };
    sendFHIRServerDataForQRCodeDemo();
  }, []);

  return (
  <MemoryRouter>
    <BrowserRouter>
      <Container className="p-3">
        <VaccineQRCodeUrlValidationTemplate />
      </Container>
    </BrowserRouter>
    <Container className={ (new URL(window.location.href))['pathname'] === '/validate' ? 'p-3 invisible' : 'p-3' }>
      <Jumbotron>
        <h1 className="header">{ process.env.REACT_APP_ENV === 'development' ? 'FHIR Resource JSON產生器' : 'Vaccine QRCode Passport' }</h1>
          <ButtonToolbar className="custom-btn-toolbar">
            { process.env.REACT_APP_ENV === 'development' && (
                <DropDownPatientTemplate />
              )
            }
            { process.env.REACT_APP_ENV === 'development' && (
                <DropDownOrgTemplate />
              )
            }
            { process.env.REACT_APP_ENV === 'development' && (
                <DropDownImmunizationObservationTemplate />
              )
            }
            <DropDownQueryImmunizationObservationTemplate />
            { process.env.REACT_APP_ENV === 'development' && (
                <FHIRServerButtonTemplate />
              )
            }
            { process.env.REACT_APP_ENV === 'development' && (
                <VaccineRegisterButtonTemplate />
              )
            }
            { process.env.REACT_APP_ENV === 'vaccine_register' && (
                <VaccineRegisterButtonTemplate />
              )
            }
          </ButtonToolbar>
      </Jumbotron>
    </Container>
    <Container className="p-3">
      <Switch>
        <Route path="/">
        {
          ''
        }
        </Route>
      </Switch>
        <AddPatientTemplate />
        <QueryPatientTemplate />
        <ModifyPatientTemplate />
        <DeletePatientTemplate />
        <QueryOrgTemplate />
        <AddOrgTemplate />
        <AddImmunizationTemplate />
        <QueryImmunizationTemplate />
        <AddObservationTemplate />
        <QueryObservationTemplate />
        <QRCodeGeneratorTemplate />
        <FHIRServerSettingTemplate />
        <VaccineQRCodeUrlValidationTemplate />
        <VaccineRegisterTemplate />
    </Container>
  </MemoryRouter>
  );
};

export default App;
