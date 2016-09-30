import React from 'react';
// import { Grid } from 'react-bootstrap';
// import AppNavigation from '/imports/ui/containers/app-navigation';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {teal400,teal600} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { GlassApp } from '/imports/ui/components/GlassApp';
import { GlassLayout } from '/imports/ui/layouts/GlassLayout';
import { Header } from '/imports/ui/components/Header';
import { Footer } from '/imports/ui/components/Footer';
import injectTapEventPlugin from 'react-tap-event-plugin';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal400,
    primary2Color: teal600,
    pickerHeaderColor: teal400
  }
});


export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    injectTapEventPlugin();
  }


  getChildContext() {
    return {muiTheme: muiTheme};
  }

  render(){
    return (
     <MuiThemeProvider muiTheme={muiTheme}>
      <GlassApp>
        <GlassLayout>
          <Header />
          { this.props.children }
          <Footer />
        </GlassLayout>
      </GlassApp>
     </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
};
App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};
App.defaultProps = {};
