export function userReducer(state = null, action) {
  switch (action.Type) {
    case "LOGGED_IN_USER":
      return action.payload;

    case "LOGOUT":
      return action.payload;
  }
}
