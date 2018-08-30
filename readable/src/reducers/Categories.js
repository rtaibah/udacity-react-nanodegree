import {GET_CATEGORIES} from '../actions';
import _ from 'lodash';

function categoriesReducer(state = {}, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return _.mapKeys(action.payload.data.categories, 'name');
    default:
      return state;
  }
}

export default categoriesReducer;
