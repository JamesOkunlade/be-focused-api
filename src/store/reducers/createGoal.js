import {
  BEGIN_CREATING_GOAL,
  CREATE_GOAL,
  ERROR_CREATING_GOAL,
} from "../actions";

const initialState = {
  createGoal: null,
  isCreating: false,
  error: null,
};

const reducer = (state=initialState, action) =>  {
  switch (action.type) {
    case BEGIN_CREATING_GOAL: {
      return {
        ...state,
        isCreating: true
      }
    }
    case CREATE_GOAL: {
      return {
        ...state,
        isCreating: false,
        createGoal: action.createGoal,
      };
    }
    case ERROR_CREATING_GOAL: {
      return {
        ...state,
        isCreating: false,
        error: action.error
      }
    }
    default: {
      return state;
    }
  }
}
  
export default reducer;
  
