/**
 * Sets or removes the authentication token in localStorage
 * @param {string|null} token - The token to store, or null to remove
 * @throws {TypeError} If token is provided but not a string
 */
export const setToken = (token) => {
    try {
        if (token) {
            if (typeof token !== 'string') {
                throw new TypeError('Token must be a string');
            }
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    } catch (error) {
        console.error('Error handling token:', error.message);
        throw error;
    }
}