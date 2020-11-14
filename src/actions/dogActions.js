import { FETCH_DOGS } from './types';
import { FETCH_IMAGES } from './types';

export const fetchDogs = ( flag ) => dispatch => {

  fetch( `https://dog.ceo/api/breeds/list/all`, {
    method: 'get'
  })
  .then(res => res.json())
  .then((doglist) => {
    var dogs = []
    var doggies = doglist.message
    Object.keys(doggies).forEach((key,value) => {
      var dog = {}
      dog.breeds = JSON.parse(JSON.stringify(doggies[key]))
      // save the JSON node name as a value
      dog.group = key
      dogs.push(JSON.parse(JSON.stringify(dog)))
    })
    dispatch({
      type: FETCH_DOGS,
      payload: dogs
    })
    if (flag) flag()  // flag that payload is now in redux
  })    
}

export const fetchImages = ( breedGroup, flag ) => dispatch => {
  fetch( `https://dog.ceo/api/breed/${breedGroup}/images/random/3`, {
    method: 'get'
  })
  .then(res => res.json())
  .then((imageList) => {
    var list = imageList.message
    var images = {}
    images.group = breedGroup
    images.list = list
    dispatch({
      type: FETCH_IMAGES,
      payload: images
    })
    if (flag) flag()  // flag that payload is now in redux
  })
}
