import axios from "axios";

const TOKEN = "token";
//---------ACTION CONSTANT
const GET_USERS = "GET_USERS";

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
      //taking token from local storage
      const token = window.localStorage.getItem(TOKEN);
      const { data: users } = await axios.get("/api/users", {
        headers: {
          // send it back in req, as header with key
          authorization: token, // of authorization
        }, //to use in routes
      });
      dispatch(_getUsers(users));
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
