# Meteor on FHIR Forum
We decided to write a Wordpress/Discourse clone using Meteor and FHIR resources.  

[![CircleCI](https://circleci.com/gh/DxRx/dxrx-aud.svg?style=svg)](https://circleci.com/gh/DxRx/dxrx-aud)  


#### Installation

```sh
# get the application
git clone http://github.com/clinical-meteor/meteor-on-fhir

# get the application and other utilities
git clone --recursive http://github.com/clinical-meteor/meteor-on-fhir

# make sure you're in the right directory
cd meteor-on-fhir/webapp

# install dependencies
meteor npm install --save jquery bootstrap react react-dom react-router react-bootstrap react-komposer react-router-bootstrap faker jquery-validation react-addons-css-transition-group react-addons-pure-render-mixin react-toolbox react-mixin faker react-highcharts eslint-plugin-react eslint-plugin-meteor eslint-config-eslint react-scroll-box material-ui normalize.css react-tap-event-plugin immutability-helper classnames eslint sprintf-js

# install the app
meteor npm install

# launch the app
meteor run --settings settings.json

## Initialize with FHIR test data
INITIALIZE=true Patients=true Practitioners=true meteor
```


#### Testing    
You may need to install [Java SDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) to run the latest version of Selenium.

```sh
## install test tools
# note:  we don't want to use the --save option here.  
# nightwatch, starrynight, etc are VERY large (as in ~1GB and 50k files large)
# install these pkgs independently in the environments where it's needed
meteor npm install nightwatch starrynight chromedriver phantomjs selenium-standalone-jar

## run validation tests (using nightwatch)
meteor npm run-script nightwatch

## for greater control, you can also run nightwatch manually, like so:
nightwatch -c .meteor/nightwatch.json --tag accounts


## running verfication test coverage (using mocha)
COVERAGE_APP_FOLDER=/Users/abigailwatson/Code/GlassUI/fire-demo/ meteor npm run-script coverage
# http://localhost:3000/coverage
```

#### Mobile Build  

```sh
meteor run ios --mobile-server meteor-on-fhir.meteorapp.com
```    







#### Licensing

Abigail Watson
Artistic License 2.0

The code is free, but be careful about media assets, some of which are not publicly licensed.  
