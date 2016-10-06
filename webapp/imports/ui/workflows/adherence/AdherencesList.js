import React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import { Adherences } from './Adherences.js';

export const AdherencesList = ({ adherences }) => (
  adherences.length > 0 ?
    <ListGroup className="adherences-list">
      {adherences.map((doc) => (
        <Adherence key={ doc._id } adherence={ doc } />
      ))}
    </ListGroup>
  :
    <Alert bsStyle="warning">No adherences yet.</Alert>
);

AdherencesList.propTypes = {
  adherences: React.PropTypes.array,
};
