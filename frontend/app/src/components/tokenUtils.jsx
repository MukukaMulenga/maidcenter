export const isTokenExpired = (token) => {
    if (!token) return true;
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; 
  
    return Date.now() > expirationTime;
  };
  