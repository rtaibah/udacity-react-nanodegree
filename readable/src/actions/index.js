import axios from 'axios';

const url = 'http://localhost:5001';
const token = 'code';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';
export const FILTER_BY = 'FILTER_BY';
export const SUBMIT_VOTE = 'SUBMIT_VOTE';
export const GET_SINGLE_POST = 'GET_SINGLE_POST';
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COMMENT = 'GET_COMMENT';
export const SUBMIT_VOTE_COMMENT = 'SUBMIT_VOTE_COMMENT';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const SUBMIT_POST = 'SUBMIT_POST';
export const EDIT_POST = 'EDIT_POST';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const ADD_COMMENT = 'ADD_COMMENT';

const headers = {
  Authorization: token,
};

export function getCategories() {
  const request = axios({
    method: 'get',
    url: `${url}/categories`,
    headers,
  });
  return {type: GET_CATEGORIES, payload: request};
}

export function getPosts() {
  const request = axios({
    method: 'get',
    url: `${url}/posts`,
    headers,
  });
  return {type: GET_POSTS, payload: request};
}

export function filterBy(filter) {
  return {
    type: FILTER_BY,
    payload: filter.option,
  };
}

export function submitVote(vote) {
  axios({
    method: 'post',
    url: `${url}/posts/${vote.postId}`,
    headers,
    data: {
      option: vote.option,
    },
  });
  return {
    type: SUBMIT_VOTE,
    payload: {
      id: vote.postId,
      option: vote.option,
    },
  };
}

export function getSinglePost(id) {
  const request = axios({
    method: 'get',
    url: `${url}/posts/${id}`,
    headers,
  });

  return {type: GET_SINGLE_POST, payload: request};
}

export function getComments(id) {
  const request = axios({
    method: 'get',
    url: `${url}/posts/${id}/comments`,
    headers,
  });
  return {type: GET_COMMENTS, payload: request};
}

export function getComment(id) {
  const request = axios({
    method: 'get',
    url: `${url}/comments/${id}`,
    headers,
  });
  return {type: GET_COMMENT, payload: request};
}

export function submitVoteComment(vote) {
  axios({
    method: 'post',
    url: `${url}/comments/${vote.commentId}`,
    headers,
    data: {
      option: vote.option,
    },
  });
  return {
    type: SUBMIT_VOTE_COMMENT,
    payload: {
      id: vote.commentId,
      option: vote.option,
    },
  };
}

export function deletePost(id) {
  axios({
    method: 'delete',
    url: `${url}/posts/${id}`,
    headers,
  });
  return {type: DELETE_POST, payload: id};
}

export function deleteComment(id) {
  axios({
    method: 'delete',
    url: `${url}/comments/${id}`,
    headers,
  });

  return {type: DELETE_COMMENT, payload: id};
}

export function submitPost(values, callback) {
  const uuidv1 = require('uuid/v1');
  axios({
    method: 'post',
    url: `${url}/posts`,
    headers,
    data: {
      author: 'rami',
      id: uuidv1(),
      timestamp: Date.now(),
      title: values.title,
      body: values.content,
      category: values.categories,
    },
    //promise to navigate to home if successful
  }).then(() => callback());
  return {
    type: SUBMIT_POST,
    payload: {
      author: 'rami',
      id: Date.now(),
      timestamp: Date.now,
      values,
    },
  };
}

export function editPost(values, id, callback) {
  axios({
    method: 'put',
    url: `${url}/posts/${id}`,
    headers,
    data: {
      title: values.title,
      body: values.content,
    },
  }).then(() => callback());
  return {
    type: EDIT_POST,
    payload: {
      id,
      title: values.title,
      body: values.content,
    },
  };
}

export function editComment(values, id, callback) {
  axios({
    method: 'put',
    url: `${url}/comments/${id}`,
    headers,
    data: {
      timestamp: Date.now(),
      body: values.body,
    },
  }).then(() => callback());
  return {
    type: EDIT_COMMENT,
    payload: {
      id,
      timestamp: Date.now(),
      body: values.body,
    },
  };
}

export function addComment(values, id, callback) {
  const uuidv1 = require('uuid/v1');
  axios({
    method: 'post',
    url: `${url}/comments`,
    headers,
    data: {
      body: values.body,
      author: 'rami',
      id: uuidv1(),
      timestamp: Date.now(),
      parentId: id,
    },
  }).then(() => callback());

  return {
    type: ADD_COMMENT,
    payload: {
      body: values.body,
      author: 'rami',
      id: uuidv1(),
      timestamp: Date.now(),
      parentId: id,
    },
  };
}
