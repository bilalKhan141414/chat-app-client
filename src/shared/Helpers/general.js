

export default {
    isUserLoggedIn : () => {
        return JSON.parse(localStorage.getItem("userChatApp")) && JSON.parse(localStorage.getItem("userChatApp")).accessToken;
    },
    getAuthToken : () => {
        return JSON.parse(localStorage.getItem("userChatApp")).accessToken;
    },
    getLoginUser : () => {
        return JSON.parse(localStorage.getItem("userChatApp")).user;
    }
} 
  