import { combineReducers } from '@reduxjs/toolkit';

import auth from './auth';
import goals from './goals';
import goal from './goal';
import createGoal from './createGoal'

const rootReducer = combineReducers({
    auth: auth,
    goals: goals,
    singleGoal: goal,
    createGoal: createGoal
})

export default rootReducer;