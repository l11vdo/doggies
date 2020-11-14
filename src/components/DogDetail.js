import React, { Component, StyleSheet } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { fetchImages } from '../actions/dogActions';

class DogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentDidMount() {
    if (this.props.images.filter(list=>list.group===this.props.match.params.id).length!==1) {
      // only load images if there aren't any for this dog in the redux store
      this.props.fetchImages(this.props.match.params.id, this.setLoaded)
    }
    else {
      this.setLoaded()
    }
    // load the breed group into state
    this.setState({breedGroup: this.props.dogs.filter(dog=>dog.group===this.props.match.params.id)[0]})
  }

  setLoaded = () => {
    this.setState({ loaded: true })
  }
  
  listSubBreeds = () => {
    var list = ''
    for (var i=0; i<this.state.breedGroup.breeds.length; i++) {
      list+=` ${this.state.breedGroup.breeds[i]}`
    }
    return list
  }
  loadImages = () => {
    this.setState({ loaded: false }, () => {
      // hold the render until the images are loaded
      this.props.fetchImages(this.state.breedGroup.group, this.setLoaded)
    })
  }
  render() {
    if (this.state.loaded) {
      var photos = this.props.images.filter(imgs=>imgs.group===this.state.breedGroup.group)[0]
      var imageList = photos.list.map((image, idx) => {
        return (
          <td>
            <img style={styles.dogimage} src={image} key={idx} alt={image} />
          </td>
        )
      })
      return (
        <div style={styles.container}>
          <h1 style={styles.title}>{this.state.breedGroup.group}</h1>
          {this.state.loaded &&
          <Table responsive>
            <thead>
              <tr>
                <th colSpan="3">
                  <div style={styles.subtitle}>
                    <div>
                      {this.state.breedGroup.breeds.length>0 &&
                      <div style={styles.subbreed}>
                        <div style={styles.subbreedcaption}>Sub breeds</div>
                        <div style={styles.subbreedlist}>{this.listSubBreeds()}</div>
                      </div>}
                    </div>
                    <div>
                      <Button style={styles.picturesbutton} onClick={this.loadImages}>Change Pictures</Button>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {imageList}
              </tr>
            </tbody>
          </Table>}
          <br />
          <Link to={`/`}>
            <Button style={styles.backbutton}><span style={styles.backtext}>{' < Back '}</span></Button>
          </Link>
        </div>      
      )
    }
    else {
      return <div />
    }
  }
}

const styles = {
  container: {padding: 20, textAlign: 'left'},
  title: {textAlign: 'left', color: "#000000", fontSize: 20},
  subtitle: { display: 'flex', justifyContent: 'space-between', fontSize: 16, fontStyle: 'normal'},
  subbreed: { display: 'flex', flexDirection: 'row'},
  subbreedcaption: {color: "#000000", paddingRight: 16},
  subbreedlist: {color: "#773f0e"},
  picturesbutton: {backgroundColor: "#773f0e", color: "#ffffff", borderRadius: 0, height: 40 },
  dogimage: {height: 280, width: 280, borderWidth: 1, borderColor: "#999999", paddingRight: 10},
  backbutton: {backgroundColor: "#ffffff", color: "#773f0e", borderRadius: 0, borderWidth: 2, borderColor: "#773f0e", height: 40},
  backtext: {color: "#773f0e", paddingLeft: 10, paddingRight: 10}
}

DogDetail.propTypes = {
  fetchImages: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  dogs: state.app.dogs,
  images: state.app.images
});

const actions = {fetchImages};
export default connect(mapStateToProps, actions)(DogDetail);