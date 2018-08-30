import {
  GET_COMMENTS,
  GET_COMMENT,
  SUBMIT_VOTE_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  ADD_COMMENT,
} from '../actions';
import _ from 'lodash';

function commentsReducer(state = {}, action) {
  switch (action.type) {
    case GET_COMMENTS:
      let comments = _.mapKeys(
        _.orderBy(action.payload.data, 'voteScore', 'desc'),
        'id',
      );

      return {
        ...state,
        ...comments,
      };

    case GET_COMMENT:
      return action.payload.data;

    case SUBMIT_VOTE_COMMENT:
      let {id, option} = action.payload;
      let newScore =
        option === 'upVote' ? state[id].voteScore + 1 : state[id].voteScore - 1;
      return {
        ...state,
        [id]: {...state[id], voteScore: newScore},
      };

    case DELETE_COMMENT:
      return _.omit(state, [action.payload]);

    case EDIT_COMMENT:
      return state;

    case ADD_COMMENT:
      return state;

    default:
      return state;
  }
}

export default commentsReducer;
