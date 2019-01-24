module.exports = {
    intToBoolean,
    booleanToint,
    userToBody,
    actionToBody,
  };
  
  function intToBoolean(int) {
    return int === 1 ? true : false;
  }
  
  function booleanToint(bool) {
    return bool === true ? 1 : 0;
  }
  
  function userToBody(project) {
    const result = {
      ...users,
      completed: intToBoolean(users.completed),
    };
  
    if (users.actions) {
      result.actions = users.actions.map(action => ({
        ...action,
        completed: intToBoolean(action.completed),
      }));
    }
  
    return result;
  }
  
  function actionToBody(action) {
    return {
      ...action,
      completed: intToBoolean(action.completed),
    };
  }
  