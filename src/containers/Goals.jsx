import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import EmptyGoals from '../components/EmptyGoals';
import GoalsTable from '../components/GoalsTable';
import { fetchGoals } from '../store/actions'
import Header from '../components/Header';

const Goals = ({ goals, isFetching, fetchGoals, auth }) => {
  const authToken = auth.user.auth_token;

  useEffect(() => {
    fetchGoals(authToken);
  }, [fetchGoals]);

  let allGoals = goals.goals

  return (
    <>
      <Header />
      <div className="vh-100 lj-bgcolor-1">
        <div className="container p-0 pt-5">
          <h3 className="">My Goals</h3>
        </div>
        <div className="container mt-3 p-0">
          {
            allGoals.length > 0 ? <GoalsTable allGoals={allGoals} /> : <EmptyGoals />
          } 
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    goals: state.goals,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGoals: (authToken) => dispatch(fetchGoals(authToken)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goals);