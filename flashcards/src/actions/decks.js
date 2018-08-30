import {ADD_DECK, ADD_CARD} from './types';

export function addDeck(title,uuid) {
  return {
    type: ADD_DECK,
    title,
    uuid,
  };
}

export function addCard(question, answer,id) {
  return {
    type: ADD_CARD,
    question,
    answer,
    id
  };
}
