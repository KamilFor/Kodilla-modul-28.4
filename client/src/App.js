import React from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

class App extends React.Component {
  constructor() {
    super();
    this.socket = io('http://localhost:8000');
    // state
    this.state = {
      tasks: [{ id: 1, name: 'Shopping' }],
      taskName: '',
    };

    // Global Methods
  }
  // Render function
  render() {
    // Methods

    // Remove Task (Initiate in Button inside Tasks.Map function)
    const removeTask = (id) => {
      this.setState((state, props) => {
        return (state.tasks = state.tasks.filter((task) => task.id !== id));
      });
      this.socket.emit('removeTask', id);
    };

    // Submit Form ( Initiate in Add Form onSubmit event)
    const submitForm = (e) => {
      e.preventDefault();
      addTask(this.state.taskName);
      this.socket.emit('addTask', this.state.taskName);
    };

    // Add task function which only create task !
    const addTask = (task) => {
      this.setState((state, props) => {
        return state.tasks.push({ id: uuidv4(), name: task });
      });
    };

    // App Component
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

          <form id='add-task-form' onSubmit={(e) => submitForm(e)}>
            <input
              className='text-input'
              autoComplete='off'
              type='text'
              placeholder='Type your description'
              id='task-name'
              value={this.state.taskName}
              onChange={(e) =>
                this.setState((state, props) => {
                  return (state.taskName = e.target.value);
                })}
            />
            <button className='btn' type='submit'>
              Add
            </button>
          </form>
        </section>
      </div>
    );
  }
  // Socket IO listeners
  componentDidMount() {
    // Add task function which only create task ! Nie wiem jak użyć metody z render w Component Did mount

    // Methods from render
    const addTask = (task) => {
      this.setState((state, props) => {
        return state.tasks.push({ id: uuidv4(), name: task });
      });
    };
    this.socket.on('addTask', (name) => addTask(name));

    const removeTask = (id) => {
      this.setState((state, props) => {
        return (state.tasks = state.tasks.filter((task) => task.id !== id));
      });
    };

    this.socket.on('removeTask', (id) => removeTask(id));
  }
  /*
    this.socket.emit('updateData', this.state.tasks);
    this.socket.on('updateData', (tasks) => {
      this.setState((state, props) => {
        tasks.map((task) => {
          state.tasks.push(task);
        });
      });
    });
    */
}

export default App;
