import $ from 'jquery';
import 'jquery-validation';
import { browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { getInputValue } from './getInputValue';
import { Meteor } from 'meteor/meteor';

let component;

const getUserData = () => ({
  email: getInputValue(component.refs.emailAddress),
  password: getInputValue(component.refs.password),
  profile: {
    name: {
      given: getInputValue(component.refs.firstName),
      family: getInputValue(component.refs.lastName),
      text: getInputValue(component.refs.firstName) + ' ' + getInputValue(component.refs.lastName)
    },
    accessCode: getInputValue(component.refs.accessCode)
  }
});

const signUp = () => {
  const user = getUserData();

  Accounts.createUser(user, function(error){
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      browserHistory.push('/');
      Bert.alert('Welcome!', 'success');
    }
  });

};

const validate = () => {
  $(component.refs.signup).validate({
    rules: {
      firstName: {
        required: true
      },
      lastName: {
        required: true
      },
      accessCode: {
        required: false
      },
      emailAddress: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
      }
    },
    messages: {
      firstName: {
        required: 'First name?'
      },
      lastName: {
        required: 'Last name?'
      },
      emailAddress: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?'
      },
      password: {
        required: 'Need a password here.',
        minlength: 'Use at least six characters, please.'
      }
    },
    submitHandler() { signUp(); }
  });
};

export const handleSignup = (options) => {
  component = options.component;
  validate();
};
