import axios from "axios";

//---------ACTION CONSTANT
const GET_USERS = "GET_USERS";
const TOKEN = "token";

//---------ACTION CREATORS
const _getUsers = (users) => {
  return {
    type: GET_USERS,
    users,
  };
};

//---------THUNK
export const getUsers = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: users } = await axios.get("/api/users", {
          headers: { authorization: token },
        });
        dispatch(_getUsers(users));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//---------REDUCER
const initialState = [];
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    default:
      return state;
  }
};

export default usersReducer;
