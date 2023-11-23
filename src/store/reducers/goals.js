import {
  REQUEST_GOALS,
  RECEIVE_GOALS,
  ERROR_REQUESTING_GOALS,
} from "../actions";

const initialState = {
  goals: [],
  goalsFetchStatus: null,
  isFetching: false,
  error: null,
  lastUpdated: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_GOALS: {
      return {
        ...state,
        isFetching: true
      }
    }
    case RECEIVE_GOALS: {
      return {
        ...state,
        isFetching: false,
        lastUpdated: action.receivedAt,
        goalsFetchStatus: action.fetchStatus,
        goals: [...state.goals.slice(state.goals.length), ...action.goals],
      };
    }
    case ERROR_REQUESTING_GOALS: {
      return {
        ...state,
        isFetching: false,
        goalsFetchStatus: action.fetchStatus,
        error:action.error
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;