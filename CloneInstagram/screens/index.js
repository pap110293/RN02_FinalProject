import Login from './auth/Login';
import Register from './auth/Register';
import Landing from './Landing';

const screens = {
  login: {
    name: 'login',
    screen: Login,
  },
  register: {
    name: 'register',
    screen: Register,
  },
  landding: {
    name: 'landing',
    screen: Landing,
  },
};

export default screens;
