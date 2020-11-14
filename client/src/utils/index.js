import jwt_decode from "jwt-decode";
const TOKEN_KEY = 'jwtToken';

export const isAuthenticated = () => {
    const tokenValue = localStorage.getItem(TOKEN_KEY);
    if (tokenValue) {
        const decodedToken = jwt_decode(tokenValue);
        if (decodedToken.exp < new Date().getTime() / 1000) {
            return false;
        }
        return true;
    }
    return false;
}