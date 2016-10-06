import React from 'react';
import { Row, Col, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { updateAdherence, removeAdherence } from '../../../api/adherences/methods.js';

import { GlassCard } from '/imports/ui/components/GlassCard';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';


const handleUpdateAdherence = (adherenceId, event) => {
  const title = event.target.value.trim();
  if (title !== '' && event.keyCode === 13) {
    updateAdherence.call({
      _id: adherenceId,
      update: { title }
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Adherence updated!', 'success');
      }
    });
  }
};

const handleRemoveAdherence = (documentId, event) => {
  event.preventDefault();
  // this should be replaced with a styled solution so for now we will
  // disable the eslint `no-alert`
  // eslint-disable-next-line no-alert
  if (confirm('Are you sure? This is permanent.')) {
    removeAdherence.call({
      _id: documentId
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Adherence removed!', 'success');
      }
    });
  }
};

export const Adherence = ({ adherence }) => (
  <ListGroupItem key={ adherence._id }>
    <Row>
      <Col xs={ 2 } sm={ 1 }>
        <FormControl
          type="text"
          standalone
          defaultValue={ adherence.adherenceType }
          onKeyUp={ handleUpdateAdherence.bind(this, adherence._id) }
        />
      </Col>
      <Col xs={ 2 } sm={ 1 }>
        <FormControl
          type="text"
          standalone
          defaultValue={ adherence.adherenceValue }
          onKeyUp={ handleUpdateAdherence.bind(this, adherence._id) }
        />
      </Col>
      <Col xs={ 2 } sm={ 1 }>
        <FormControl
          type="text"
          standalone
          defaultValue={ adherence.createdAt }
          onKeyUp={ handleUpdateAdherence.bind(this, adherence._id) }
        />
      </Col>
      <Col xs={ 2 } sm={ 1 }>
        <FormControl
          type="text"
          standalone
          defaultValue={ adherence.patientId }
          onKeyUp={ handleUpdateAdherence.bind(this, adherence._id) }
        />
      </Col>
      <Col xs={ 3 } sm={ 2 }>
        <Button
          bsStyle="danger"
          className="btn-block"
          onClick={ handleRemoveAdherence.bind(this, adherence._id) }>
          Remove
        </Button>
      </Col>
    </Row>
  </ListGroupItem>
);
