import {
  GET_POSTS,
  FILTER_BY,
  SUBMIT_VOTE,
  GET_SINGLE_POST,
  DELETE_POST,
  SUBMIT_POST,
  EDIT_POST,
} from '../actions';
import _ from 'lodash';

function postsReducer(state = {}, action) {
  switch (action.type) {
    case GET_POSTS:
      let unsorted = action.payload.data;
      let sorted = unsorted.sort(function(a, b) {
        return parseFloat(b.voteScore) - parseFloat(a.voteScore);
      });

      return _.mapKeys(sorted, 'id');

    case FILTER_BY:
      return _.mapKeys(_.orderBy(state, action.payload, 'desc'), 'id');

    case SUBMIT_VOTE:
      let {id, option} = action.payload;
      let newScore =
        option === 'upVote' ? state[id].voteScore + 1 : state[id].voteScore - 1;
      return {
        ...state,
        [id]: {...state[id], voteScore: newScore},
      };

    case GET_SINGLE_POST:
      return {
        ...state,
        [action.payload.data.id]: action.payload.data,
      };

    case DELETE_POST:
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          deleted: true,
        },
      };

    case SUBMIT_POST:
      return state;

    case EDIT_POST:
      return state;

    default:
      return state;
  }
}

export default postsReducer;
