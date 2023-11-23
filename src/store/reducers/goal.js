import { 
  REQUEST_GOAL_BY_ID, 
  RECEIVE_GOAL_BY_ID, 
  ERROR_REQUESTING_GOAL_BY_ID 
} from '../actions';


const initialState = {
    goal: {},
    goalFetchStatus: null,
    isFetching: false,
    error: null,
}


const reducer = (state=initialState, action) =>  {
    switch (action.type) {
        case REQUEST_GOAL_BY_ID: {
          return {
              ...state,
              goal: {},
              isFetching: true
          }
        }
        case RECEIVE_GOAL_BY_ID: {
          return {
            ...state,
            isFetching: false,
            goalFetchStatus: action.fetchStatus,
            goal: {...action.goal},
          };
        }
        case ERROR_REQUESTING_GOAL_BY_ID: {
            return {
                ...state,
                isFetching: false,
                error: action.error,
                goalFetchStatus: action.fetchStatus
            }
        }
        default: {
          return state;
        }
      }

}

export default reducer;