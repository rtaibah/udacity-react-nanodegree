const ROOT = 'http://localhost:5001';
const API_KEY = 'code';

const type = 'application/json';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';

export function getCategories() {}

export function getPosts() {}
    c,
  ) {
    var r = ((d + Math.random() * 16) % 16) | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

// GET METHODS

export const getCategories = () =>
  fetch(`${api}/categories`, {headers})
    .then(response => response.json())
    .then(data => data.categories)
    .catch(e => console.log('error, e'));

export const getCategoryPosts = category =>
  fetch(`${api}/${category}/posts`, {headers})
    .then(response => response.json())
    .then(data => data)
    .catch(e => console.log('error, e'));

export const getPosts = () =>
  fetch(`${api}/posts`, {headers})
    .then(response => response.json())
    .then(data => data)
    .catch(e => console.log('error, e'));

export const getSinglePost = id =>
  fetch(`${api}/posts/${id}`, {headers})
    .then(response => response.json())
    .then(data => data)
    .catch(e => console.log('error, e'));

export const getComments = id =>
  fetch(`${api}/posts/${id}/comments`, {headers})
    .then(response => response.json())
    .then(data => data)
    .catch(e => console.log('error, e'));

export const commentDetails = id =>
  fetch(`${api}/comments/${id}`, {headers})
    .then(response => response.json())
    .then(data => data)
    .catch(e => console.log('error, e'));

// POST METHODS

export const addPost = obj =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': type,
      Authorization: token,
    },
    body: JSON.stringify(obj),
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(e => console.log('error, e'));

export const votePost = (vote, id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': type,
      Authorization: token,
    },
    body: JSON.stringify(vote),
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(e => console.log('error, e'));

export const voteComment = (vote, id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': type,
      Authorization: token,
    },
    body: JSON.stringify(vote),
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(e => console.log('error, e'));

export const newComment = obj =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': type,
      Authorization: token,
    },
    body: JSON.stringify(obj),
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(e => console.log('error, e'));

// PUT METHODS
export const editPost = (obj, id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': type,
      Authorization: token,
    },
    body: JSON.stringify(obj),
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(e => console.log('error, e'));

export const editComment = (obj, id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': type,
      Authorization: token,
    },
    body: JSON.stringify(obj),
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(e => console.log('error, e'));

// DELETE METHODS

export const deletePost = id =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': type,
      Authorization: token,
    },
  })
    .then(data => {
      return data;
    })
    .catch(e => console.log('error, e'));

export const deleteComment = id =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': type,
      Authorization: token,
    },
  })
    .then(data => {
      return data;
    })
    .catch(e => console.log('error, e'));
