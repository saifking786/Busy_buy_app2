export const authMiddleware = (store) => (next) => (action) => {
    try {
        const token = window.localStorage.getItem("token");
        const user = window.localStorage.getItem("user");
         console.log("middleware");
        if (token && user) {
          return {
            authReducer: {
              isLoggedIn: true,
              userLoggedIn: JSON.parse(user),
              userList: [],
            },
          };
        }
      } catch (error) {
        console.error("Error loading auth state from localStorage:", error);
      }
    
      return {
        authReducer: {
          isLoggedIn: false,
          userLoggedIn: null,
          userList: [],
        },
      };
     next(action); 
};