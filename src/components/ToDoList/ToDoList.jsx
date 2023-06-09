import React, { Component } from 'react'
import ToDo from '../ToDo/ToDo'
import todo from '../../todo.json'
import { FormToDo } from 'components/FormToDo/FormToDo'
import { nanoid } from 'nanoid'
class ToDoList extends Component {
    state = {
        todoList: todo,
        isDelete: false,
        isCreate:false,
    }
    componentDidUpdate(_, prevState) {
      
        if (prevState.todoList.length > this.state.todoList.length)
        {
            this.setState({ isDelete: true })
            setTimeout(() => {
            this.setState({isDelete:false})
        },1500)}
         if (prevState.todoList.length < this.state.todoList.length)
{
            this.setState({ isCreate: true })
            setTimeout(() => {
            this.setState({isCreate:false})
        },1500)}
        }
    handleCheckCompleted = (id) => {
        this.setState((prevState) => ({
            todoList: prevState.todoList.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
        }))
    }

    handleDelete = (id) => {
        this.setState((prev) => ({
            todoList: prev.todoList.filter((todo) => todo.id !== id),
        }))
    }
addToDo=(value) =>{
    this.setState((prev) => {
        console.log('value', value)
        console.log(prev)
            return {
                todoList: [...prev.todoList,
                    {
                        id: nanoid(),
        title:value,
        completed: false}],
        }
    }
        )
}
    render() {
        return (
            <>
                <h1>My To-Do list</h1>
                {this.state.isDelete && <div className="alert alert-danger" role="alert">
  To-do delete successfully
                </div>}
                    {this.state.isCreate && <div className="alert alert-info" role="alert">
  Create to-do successfully
</div>}

                <FormToDo addToDo={this.addToDo} />
                <ul className='list-group list-group-flush'>
                    {this.state.todoList.map((todo) => (
                        <ToDo
                            key={todo.id}
                            todo={todo}
                            handleCheckCompleted={this.handleCheckCompleted}
                            handleDelete={this.handleDelete}
                        />
                    ))}
                </ul>
            </>
        )
    }
}

export default ToDoList