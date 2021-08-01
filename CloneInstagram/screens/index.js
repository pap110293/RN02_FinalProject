import Login from './auth/login';
import Register from './auth/register';

const screens = {
  login: {
    name: 'login',
    screen: Login,
  },
  register: {
    name: 'register',
    screen: Register,
  },
};

export default screens;
