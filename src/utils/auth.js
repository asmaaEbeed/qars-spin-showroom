// // Token storage keys
// const TOKEN_KEY = 'auth_token';
// const REFRESH_TOKEN_KEY = 'refresh_token';

// // Store the authentication token
// export const storeToken = (token) => {
//   try {
//     localStorage.setItem(TOKEN_KEY, token);
//   } catch (error) {
//     console.error('Error storing token:', error);
//   }
// };

// // Retrieve the authentication token
// export const getToken = () => {
//   try {
//     return localStorage.getItem(TOKEN_KEY);
//   } catch (error) {
//     console.error('Error getting token:', error);
//     return null;
//   }
// };

// // Clear the authentication token
// export const clearToken = () => {
//   try {
//     localStorage.removeItem(TOKEN_KEY);
//     localStorage.removeItem(REFRESH_TOKEN_KEY);
//   } catch (error) {
//     console.error('Error clearing token:', error);
//   }
// };

// // Store refresh token
// export const storeRefreshToken = (refreshToken) => {
//   try {
//     localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
//   } catch (error) {
//     console.error('Error storing refresh token:', error);
//   }
// };

// // Get refresh token
// export const getRefreshToken = () => {
//   try {
//     return localStorage.getItem(REFRESH_TOKEN_KEY);
//   } catch (error) {
//     console.error('Error getting refresh token:', error);
//     return null;
//   }
// };

// // Check if user is authenticated
// export const isAuthenticated = () => {
//   return !!getToken();
// };
