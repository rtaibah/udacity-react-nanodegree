import { ADD_DECK, ADD_CARD } from '../actions/types';
import { REHYDRATE } from 'redux-persist/constants';
import { combineReducers } from 'redux';
import _ from 'lodash';

export default combineReducers({
  decks: (state = {}, action) => {
    switch (action.type) {
      case REHYDRATE:
        return action.payload.decks || [];

      case ADD_DECK:
        return {
          ...state,
          [action.uuid]: {
            id: action.uuid,
            title: action.title,
            questions: [],
          },
        };

      case ADD_CARD:
        const newQuestion = {
          question: action.question,
          answer: action.answer,
        };

        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            questions: [...state[action.id].questions, newQuestion],
          },
        };

      default:
        return state;
    }
  },

  quiz: () => {
    return {};
  },
});
