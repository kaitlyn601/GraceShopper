import axios from "axios";
// ACTION TYPE
const GET_USER = "GET_USER";
const TOKEN = "token";
// ACTION CREATORS
export const _getUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};
// THUNK CREATORS
export const getUser = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: user } = await axios.get(`/api/users/${id}`, {
          headers: { authorization: token },
        });
        dispatch(_getUser(user));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

// REDUCER
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
};

export default userReducer;
