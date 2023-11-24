export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT = 'LOGOUT';

export const REQUEST_GOALS = 'REQUEST_GOALS';
export const RECEIVE_GOALS = 'RECEIVE_GOALS';
export const ERROR_REQUESTING_GOALS = 'ERROR_REQUESTING_GOALS';

export const REQUEST_GOAL_BY_ID = 'REQUEST_GOAL_BY_ID';
export const RECEIVE_GOAL_BY_ID = 'FETCH_GOAL_BY_ID'
export const ERROR_REQUESTING_GOAL_BY_ID = 'ERROR_REQUESTING_GOAL_BY_ID';

export const BEGIN_CREATING_GOAL = 'BEGIN_CREATING_GOAL';
export const CREATE_GOAL = 'CREATE_GOAL';
export const ERROR_CREATING_GOAL = 'ERROR_CREATING_GOAL';

export const BEGIN_UPDATING_GOAL = 'BEGIN_UPDATING_GOAL';
export const UPDATE_GOAL = 'UPDATE_GOAL';
export const ERROR_UPDATING_GOAL = 'ERROR_UPDATING_GOAL';

export const REMOVING = "REMOVING";

const URL = 'http://localhost:3000'

// SIGNUP ACTIONS CREATORS AND API CALL

const signupSuccess = (response) => ({
  type: SIGNUP_SUCCESS,
  payload: response,
});

const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const signup = (formData) => {
  return async function(dispatch) {
    try {
      const response = await fetch(`${URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation
        }),
      });

      const responseData = await response.json();
      dispatch(signupSuccess(responseData));
    } catch (error) {
      dispatch(signupFailure(error));
    }
  }
}


// LOGIN ACTIONS CREATORS AND API CALL
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const login = (formData) => {
  return async function(dispatch) {
    try {
      const response = await fetch(`${URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email,
          password: formData.password,
        }),
      });

      const responseData = await response.json();
      dispatch(loginSuccess(responseData));
    } catch (error) {
      dispatch(loginFailure(error));
    }
  }
}


// LOGIN ACTIONS CREATORS AND API CALL
export const logout = () => ({
  type: LOGOUT,
});



// FETCH GOALS ACTIONS CREATORS

function requestGoals() {
  return {
      type: REQUEST_GOALS
  }
}

function receiveGoals(response, status) {
  return {
      type: RECEIVE_GOALS,
      goals: response,
      fetchStatus: status,
      receivedAt: Date.now()
  }
}

function errorRequestingGoals(error) {
  return {
      type: ERROR_REQUESTING_GOALS,
      error: error,
  }
}


export function fetchGoals(authToken) {
  return async function(dispatch) {
      dispatch(requestGoals())
      try {
          const response = await fetch(`${URL}/api/v1/goals`, {
            headers: {
              'Authorization': `Bearer ${authToken}`, // Include your authentication token
              'Content-Type': 'application/json', // Set any other headers you need
            },
          });
          const response_1 = await response.json();
          return dispatch(receiveGoals(response_1, response.status));
      }
      catch (error) {
          return dispatch(errorRequestingGoals(error));
      }
  }
}


// FETCH GOAL BY ID ACTIONS CREATORS

function requestGoalById() {
  return {
      type: REQUEST_GOAL_BY_ID
  }
}

function receiveGoalById(response, status) {
  return {
      type: RECEIVE_GOAL_BY_ID,
      goal: response,
      fetchStatus: status,
  }
}

function errorRequestingGoalById(error) {
  return {
      type: ERROR_REQUESTING_GOAL_BY_ID,
      error: error,
  }
}

export function fetchGoalById(goalId, authToken) {
  return async function(dispatch) {
      dispatch(requestGoalById())
      try {
          const response = await fetch(`${URL}/api/v1/goals/${goalId}`,{
            headers: {
              'Authorization': `Bearer ${authToken}`, // Include your authentication token
              'Content-Type': 'application/json', // Set any other headers you need
            },
          });
          const response_1 = await response.json();
          return dispatch(receiveGoalById(response_1, response.status));
      }
      catch (error) {
          return dispatch(errorRequestingGoalById(error));
      }
  }
}


// CREATE GOALS ACTIONS CREATORS

function beginCreatingGoal() {
  return {
      type: BEGIN_CREATING_GOAL
  }
}
function creatingGoal(response) {
  return {
      type: CREATE_GOAL,
      createGoal: response.data,
  }
}
function errorCreatingGoal(error) {
  return {
      type: ERROR_CREATING_GOAL,
      error: error,
  }
}

export function createGoal(formData, authToken) {
  return async function(dispatch) {
    dispatch(beginCreatingGoal());

    try {
      const response = await fetch(`${URL}/api/v1/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ 
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
          due_date: formData.due_date,
          // created_by: formData.created_by
        }),
      });
  
      const responseData = await response.json();
      dispatch(creatingGoal(responseData));
    } catch (error) {
      dispatch(errorCreatingGoal(error));
    }
  };
}

// UPDATE GOALS ACTIONS CREATORS

function beginUpdatingGoal() {
  return {
      type: BEGIN_UPDATING_GOAL
  }
}
function updatingGoal(response) {
  return {
      type: UPDATE_GOAL,
      updateGoal: response.data,
  }
}
function errorUpdatingGoal(error) {
  return {
      type: ERROR_UPDATING_GOAL,
      error: error,
  }
}

export function updateGoal(formData, authToken) {
  return async function(dispatch) {
    dispatch(beginUpdatingGoal());

    try {
      const response = await fetch(`${URL}/api/v1/goals/${formData.id}`, {
        method: 'PUT', // Use PUT instead of POST for updates
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,

        },
        body: JSON.stringify({ 
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
          due_date: formData.due_date,
          created_by: formData.created_by
        }),
      });
  
      const responseData = await response.json();
      dispatch(updatingGoal(responseData));
    } catch (error) {
      dispatch(errorUpdatingGoal(error));
    }
  };
}

export function markComplete(goalId, done, authToken) {
  return async function (dispatch) {
    try {
      const response = await fetch(`${URL}/api/v1/goals/${goalId}`, {
        method: 'PATCH', // Use PATCH for partial updates
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          done,
        }),
      });

      const responseData = await response.json();
      dispatch(updatingGoal(responseData));
    } catch (error) {
      dispatch(errorUpdatingGoal(error));
    }
  };
}

// FETCH GOALS ACTIONS CREATORS

function removing(id) {
  return {
      type: REMOVING,
      removing: id,
  }
}

export function remove(goalId, authToken) {
  return async function(dispatch) {
    try {
      const response = await fetch(`${URL}/api/v1/goals/${goalId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      dispatch(removing(id));
      return response.json(); // Adjust this based on your API response format
    } catch (error) {
      return error; // Handle the error as needed
    }
  };
}