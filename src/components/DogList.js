import React, { Component } from 'react';
//import './Styles.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchDogs } from '../actions/dogActions';

class DogList extends Component {

  constructor(props) {
    super(props);
    this.state = { loaded: false, group: '' }
  }

  componentDidMount() {
    // manage the render with the 'loaded' flag
    const setLoaded = () =>{ this.setState({ loaded: true }) }
    this.props.fetchDogs(setLoaded)
  }

  setFilter = e => {
    // set the filter value in state as the user types
    this.setState( {group: e.target.value} )
  }
  render() {
    if (this.state.loaded) {
      var dogs = this.props.dogs.filter(dog=>dog.group.startsWith(this.state.group))
      // dynamically build the contents of our table
      var dogRows = dogs.map((dog, idx) => {
        return (
          <tr key={idx}>
            <td style={styles.breedgroup}>{dog.group}</td>
            <td style={styles.breedcount}>{dog.breeds.length}</td>
            <td>
              <Link key={idx} to={`/${dog.group}`} style={styles.breedlink}>
                View
              </Link>
            </td>
          </tr>
        )
      })
      return (
        <div style={styles.container}>
          <Form>
            <Form.Group>
              <Form.Control
                value={this.state.group}
                onChange={this.setFilter}
                type="text"
                style={styles.filterinput}
                placeholder="start typing in the breeds" />
            </Form.Group>
            <br />
            <Table responsive>
              <thead>
                <tr>
                  <th style={styles.columnheading}>Breed Group</th>
                  <th style={styles.columnheading}>Number of Breeds</th>
                  <th> </th>
                </tr>
                <tr>
                  <th colSpan="3"><hr /></th>
                </tr>
              </thead>
              <tbody>
                {dogRows}
              </tbody>
            </Table>
          </Form>
        </div>
      )
    }
    else {
      return (
        <div style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner animation='border' size='xl' style={styles.spinner} />
        </div>
      )
    }
  }
}

const styles = {
  container: {padding: 20, textAlign: 'left'},
  filterinput: {alignSelf: 'left', borderColor: "#773f0e", height: 40, width: 200},
  columnheading: {textAlign: 'left', color: "#773f0e", fontSize: 16, width: 180, fontWeight: 'normal'},
  breedgroup: {textAlign: 'left', fontSize: 16, color: "#000000"},
  breedcount: {textAlign: 'left', fontSize: 16, color: "#000000"},
  breedlink: {fontSize: 16, color: "#773f0e"},
  spinner: {color: "#773f0e"}
}

DogList.propTypes = {
  fetchDogs: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  dogs: state.app.dogs
});

const actions = {fetchDogs};
export default connect(mapStateToProps, actions)(DogList);
