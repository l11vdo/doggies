import { FETCH_DOGS} from '../actions/types';
import { FETCH_IMAGES} from '../actions/types';

const initialState = {
  dogs: [],
  images: []
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOGS:
      return {
        ...state,
        dogs: action.payload
      }
    case FETCH_IMAGES:
      // clear existing images for this group (if any)
      const imgs = state.images.filter(img => img.group !== action.payload.group)
      // append new payload
      imgs.push(action.payload)
      // dispatch updated array to store
      return {
        ...state,
        images: imgs
      };
    default:
      return state;
  }
}