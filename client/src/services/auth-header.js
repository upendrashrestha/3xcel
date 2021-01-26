export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('jwtToken'));
    if (user && user.token) {
      return { 'authorization': user.token };
    } else {
      return {};
    }
  }