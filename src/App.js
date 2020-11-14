import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import DogList from './components/DogList';
import DogDetail from './components/DogDetail';

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <nav className="navbar">
            <h1 style={styles.title}>Doggy McDogface</h1>
          </nav>
          <main className="App">
            <div>
              <Switch>
                <Route exact path="/" component={DogList} />
                <Route path="/:id" component={DogDetail} />
              </Switch>
            </div>
          </main>
        </Router>
      </Provider>
    );
  }
}

const styles = {
  title: {padding: 10, margin: 0, color: "#773f0e", fontSize: 30},
}

export default App;
