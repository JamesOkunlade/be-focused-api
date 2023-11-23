import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { fetchGoalById, markComplete, remove } from '../store/actions';

const Goal = (props) => {
  const { goalId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goal = useSelector((state) => state.singleGoal.goal);
  const authToken = props.auth.user.auth_token;


  useEffect(() => {
    dispatch(fetchGoalById(goalId, authToken));
    // Cleanup effect if needed
    return () => {
      // Cleanup logic (if any)
    };
  }, [dispatch, goalId]);





  const handleMarkComplete = async () => {
    props.markComplete(goalId, !goal.done, authToken); // Toggle the 'done' attribute
  };

  const handleDelete = async () => {
    await props.removeGoal(goalId, authToken);
    navigate('/goals'); // Redirect to the /goals page
  };

  const { id, title, description, priority, due_date, done } = goal;

  return (
    <>
    <div className="shadow-sm bg- py-3">
      <div className="container col-6 p-0">
        <Link to="/goals" className="pt-5 link">&lt; My Goals</Link>
      </div>
    </div>
    <div className="vh-100 pt-5 lj-bgcolor-1 x-5">
      <div className="container col-6 mt-3 p-0 bg-white rounded">

        <div className="navbar p-0 py-3 px-4 border-bottom">
          <div className="container-fluid">
            {/* <button className="border p-2 bg-white">&#10003; Mark Complete</button> */}
            <button className={`border p-2 bg-${done ? 'success text-white' : 'white'}`} onClick={handleMarkComplete}>
              &#10003; Mark Complete
            </button>

            <div className="d-flx">
              <Link to="/edit" className="btn pe-4">Edit</Link>
              <button to="/goals" className="btn" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>

        <div className="p-0 px-4">
          <h4 className="px-2 mt-5 mb-2">{title}</h4>
          <div className="d-flex">
            <div className="p-2 pe-5">
              <span className="pe-3">Due Date:</span>
              <span>{due_date}</span>
            </div>
            <div className="p-2">
              <span className="pe-3">Priority:</span>
              <span>{priority}</span>
            </div>
          </div>

          <div className="p-2 mt-3">
            <p>Description</p>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}


const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    singleGoal: state.singleGoal,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGoalById: (goalId, authToken) => dispatch(fetchGoalById(goalId, authToken)),
    removeGoal: (goalId, authToken) => dispatch(remove(goalId, authToken)),
    markComplete: (goalId, done, authToken ) => dispatch(markComplete(goalId, done, authToken)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Goal);