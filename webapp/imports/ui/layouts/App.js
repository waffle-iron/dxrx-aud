import React from 'react';
// import { Grid } from 'react-bootstrap';
// import AppNavigation from '/imports/ui/containers/app-navigation';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { GlassApp } from '/imports/ui/components/GlassApp';
import { GlassLayout } from '/imports/ui/layouts/GlassLayout';
import { Header } from '/imports/ui/components/Header';
import { Footer } from '/imports/ui/components/Footer';

export class App extends React.Component {
  constructor(props) {
    super(props);
  }

    getChildContext() {
	return {muiTheme: getMuiTheme(baseTheme)};
    }

    //    const App = () => (
    //<MuiThemeProvider>
    //<MyAwesomeReactComponent />
    //</MuiThemeProvider>
    //		       );

    //ReactDOM.render(
    //		    <App />,
    //		    document.getElementById('app')
    //		    );

  render(){
    return (
     <MuiThemeProvider>
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
    muiTheme: React.PropTypes.object.isRequired,
};
App.defaultProps = {};
