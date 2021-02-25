import React from 'react';
import ReactDOM from 'react-dom';
//import { Router, Route  } from 'react-router-dom';
import { Router, Route, Switch } from 'react-router';
import { render } from 'react-dom';
import './index.css';
import { App } from './App';
import { AppSearch } from './AppSearch';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory, History } from 'history' 
/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/

class AppRoute extends React.Component {
  render() {
    return (
      <Router history={createBrowserHistory()}>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/title/:ty/:t" component={AppSearch} />
            <Route path="/genre/:ty/:g" component={AppSearch} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>  
      </Router>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
  <AppRoute />
  </React.StrictMode>, document.getElementById('root'));



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
