import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import { createGoal, updateGoal } from '../store/actions';

const GoalForm = (props) => {
  const authToken = props.auth.user.auth_token;

  const location = useLocation();
  const history = useNavigate();
  const navigate = useNavigate();
  const isCreateMode = location.pathname.endsWith('/new');
  
  const initialState = {
    title: '',
    description: '',
    priority: 1, // Assuming default priority is Medium
    due_date: '',
    created_by: 1 // This will be removed once the current user is implemented
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    // Update formData when existingGoal changes
    setFormData(isCreateMode ? initialState : props.existingGoal.goal);
  }, [props.existingGoal.goal, isCreateMode]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedValue = id === 'priority' ? priorityMapping[value] || 1 : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: updatedValue,
    }));
  };

  
  const formatDate = (dateString) => {
    if (!dateString) return '';

    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSave = async () => {
    const updatedFormData = {
      ...formData,
      due_date: formatDate(formData.due_date),
    };
  
    if (isCreateMode) {
      await props.createGoal(updatedFormData, authToken);
    } else {
      await props.updateGoal(updatedFormData, authToken);
    }
  
    // Reset the form after submission
    resetForm();
  
    // Redirect to the /goals page after either creating or updating a goal
    navigate('/goals');
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  return (
    <>
      <div className="lj-bgcolor-1 x-5">
        <div className="container col-6 p-0 pt-5">
          <h3 className="">Create a Goal</h3>
        </div>
        <div className="container col-6 mt-3 p-0 bg-white rounded">
          <div className="container p-5">
            <form>
              <div className="mb-3">
                <label for="title" className="form-label">Goal Title</label>
                <input type="text" className="form-control" id="title" aria-describedby="titleHelp" value={formData.title} onChange={handleChange}/>
              </div>
              <div className="mb-3">
                <label for="description" className="form-label">Description</label>
                <textarea id="description" className="form-control" style={{ height: 100 }} aria-label="With textarea" value={formData.description} onChange={handleChange}/>
              </div>
              
              <div className="mb-3 col-4">
                <label for="prioritySeclect" className="form-label">Priority</label>
                <select className="form-select" id="priority" value={formData.priority} onChange={handleChange}>
                  <option value={2}>High</option>
                  <option value={1} selected>Medium</option>
                  <option value={0}>Low</option>
                </select>
              </div>
              
              <div className="mb-3 col-4">
                <label for="due_date" className="form-label">Due Date</label>
                <input type="date" className="form-control" id="due_date" value={formData.due_date} onChange={handleChange} />
              </div>
            </form>    
          </div>
        </div>
      </div>

      <div className="container col-6 mt-5 p-0 bg-white ">
        <div className=" d-flex justify-content-end mb-2">
          <Link to="/goals" className="me-5 btn text-blue lj-bgcolor-1 ms-4 px-4">Cancel</Link>
          <button type="button" className="px-3 btn btn-primary" onClick={handleSave}>{isCreateMode ? `Create` : `Save`}</button>
        </div>
      </div>

    </>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    existingGoal: state.singleGoal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createGoal: (formData, authToken) => dispatch(createGoal(formData, authToken)),
    updateGoal: (formData, authToken) => dispatch(updateGoal(formData, authToken)),
  }
};

// Priority mapping
const priorityMapping = {
  high: 2,
  medium: 1,
  low: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(GoalForm);