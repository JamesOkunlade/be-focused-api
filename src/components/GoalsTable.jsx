import React from 'react';
import { Link } from 'react-router-dom';

const GoalsTable = ({ allGoals }) => {
  const { completed, incomplete } = allGoals.reduce(
    (result, goal) => {
      goal.done ? result.completed.push(goal) : result.incomplete.push(goal);
      return result;
    },
    { completed: [], incomplete: [] }
  );

  return (
    <>
      <div className="container px-4 border bg-white rounded-3">
        <div className="navbar p-0">
          <ul className="nav nav-underline" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link py-3 active" id="all-goals-tab" data-bs-toggle="tab" data-bs-target="#all-goals" type="button" role="tab" aria-controls="all-goals" aria-selected="true">All {allGoals.length}</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link py-3" id="imcomplete-goals-tab" data-bs-toggle="tab" data-bs-target="#imcomplete-goals" type="button" role="tab" aria-controls="imcomplete-goals" aria-selected="false">Imcomplete {incomplete.length}</button>

            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link py-3" id="completed-goals-tab" data-bs-toggle="tab" data-bs-target="#completed-goals" type="button" role="tab" aria-controls="completed-goals" aria-selected="false">Completed {completed.length} </button>
            </li>
          </ul>
          <div>
            <Link to="/new" className="btn btn-primary">Create a Goal</Link>
          </div>
        </div>
      </div>


      <div className="container mt-4 p-0 py-2 border bg-white rounded-3">

        <div className="list-group-item d-flex align-items-start border-bottom px-4 py-2">
          <div className="col-7 py-2 flex-fill">Goal Name</div>
          <div className="col-2 py-2 flex-fill">Due Date</div>
          <div className="col-1 py-2 flex-fill">Priority</div>
        </div>

        <div className="tab-content px-" id="myTabContent">
          <ul className="tab-pane p-0 fade show active" id="all-goals" role="tabpanel" aria-labelledby="home-tab">
            {
              
              // goals.map((goal) =>  (<MovieCard key={movie.id} movie={movie} />))
              allGoals.map((goal) =>  (<Link to={`/goals/${goal.id}`} key={goal.id} className="list-group-item d-flex align-items-start border-bottom p-0 px-4 py-2">
               {/* <button className={`border p-2 bg-${done ? 'success text-white' : 'white'}`} onClick={handleMarkComplete}> */}

                <div className="col-7 py-2 flex-fill"><span className={`border p-1 me-1 bg-${goal.done ? 'success' : 'secondary'} text-white rounded-circle`}>&#10003;</span>{goal.title}</div>
                <div className="col-2 py-2 flex-fill">{goal.due_date}</div>
                <div className="col-1 py-2 flex-fill">{goal.priority}</div>
              </Link>))
            }
          </ul>



          <ul className="tab-pane p-0 fade" id="imcomplete-goals" role="tabpanel" aria-labelledby="imcomplete-goals-tab">
            
            {
                
              // goals.map((goal) =>  (<MovieCard key={movie.id} movie={movie} />))
              incomplete.map((goal) =>  (<Link to={`/goals/${goal.id}`} key={goal.id} className="list-group-item d-flex align-items-start border-bottom p-0 px-4 py-2">
                <div className="col-7 py-2 flex-fill"><span className="border p-1 me-1 bg-secondary text-white rounded-circle">&#10003;</span>{goal.title}</div>
                <div className="col-2 py-2 flex-fill">{goal.due_date}</div>
                <div className="col-1 py-2 flex-fill">{goal.priority}</div>
              </Link>))
            }

          </ul>



          <ul className="tab-pane p-0 fade" id="completed-goals" role="tabpanel" aria-labelledby="completed-goals-tab">
          {
                
            // goals.map((goal) =>  (<MovieCard key={movie.id} movie={movie} />))
            completed.map((goal) =>  (<Link to={`/goals/${goal.id}`} key={goal.id} className="list-group-item d-flex align-items-start border-bottom p-0 px-4 py-2">
              <div className="col-7 py-2 flex-fill"><span className="border p-1 me-1 bg-success text-white rounded-circle">&#10003;</span>{goal.title}</div>
              <div className="col-2 py-2 flex-fill">{goal.due_date}</div>
              <div className="col-1 py-2 flex-fill">{goal.priority}</div>
            </Link>))
          }
           
             
          </ul>
        </div>
      </div>

    </>
   
  )
}

export default GoalsTable;