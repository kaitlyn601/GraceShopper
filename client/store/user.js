import axios from "axios";
// ACTION TYPE
const GET_USER = "GET_USER";

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
      const { data: user } = await axios.get(`/api/user/${id}`);
      dispatch(_getUser(user));
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
