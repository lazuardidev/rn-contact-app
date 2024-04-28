import axios from 'axios';

const http = axios.create({
  baseURL: 'https://contact.herokuapp.com',
  headers: {
    'Content-type': 'application/json',
  },
});

export {http};
