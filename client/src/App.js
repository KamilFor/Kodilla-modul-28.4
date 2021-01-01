import React from 'react';
import io from 'socket.io-client';

class App extends React.Component {
  constructor() {
    super();
    this.socket = io();
    // state
    this.state = {
      tasks: [{ id: 1, name: 'Shopping' }, { id: 2, name: 'Go out with dog' }],
    };
  }
  // Render function
  render() {
    //Methods
    const removeTask = (id) => {
      this.setState((state, props) => {
        return (state.tasks = state.tasks.filter((task) => task.id !== id));
      });
    };

    return (
      <div className='App'>
        <header>
          <h1>ToDoList.app</h1>
        </header>

        <section className='tasks-section' id='tasks-section'>
          <h2>Tasks</h2>

          <ul className='tasks-section__list' id='tasks-list'>
            {this.state.tasks.map((task) => {
              const { id, name } = task;
              return (
                <li className='task' key={id}>
                  {name}
                  <button className='btn btn--red' onClick={() => removeTask(id)}>
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>

          <form id='add-task-form'>
            <input
              className='text-input'
              autoComplete='off'
              type='text'
              placeholder='Type your description'
              id='task-name'
            />
            <button className='btn' type='submit'>
              Add
            </button>
          </form>
        </section>
      </div>
    );
  }
  componentDidMount() {}
}

export default App;
