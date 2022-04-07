import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Todo from './todo'

TodoList.propTypes = {
  todos: PropTypes.array,
  onDelClick: PropTypes.func,
  onEditTodo: PropTypes.func,
  onEdited: PropTypes.func,
  markCompleted: PropTypes.func,
  isCheckedAll: PropTypes.bool,
  checkAllTodos: PropTypes.func,
};

TodoList.defaultProps = {
  todos:[],
  onDelClick: null,
  onEditTodo: null,
  onEditedTodo: null,
  markCompleted: null,
  isCheckedAll: null,
  checkAllTodos: null,
}


export default function TodoList(props) {
  const {todos, onDelClick, onEditTodo, onEditedTodo, markCompleted, isCheckedAll, checkAllTodos} = props;
  
  const [todoEditingId,setTodoEditingId] = useState(0);

  function handleDeleteClick(todo){
    onDelClick(todo);
  };

  function handleEditClick(todo){
    onEditTodo(todo)
    setTodoEditingId(todo.id)
  };
  function handleEdited(formEdited){
    onEditedTodo(formEdited)
  };

  function handleMarkCompleted(todo){
    markCompleted(todo)
  }

  function handleCheckedAll(){

  }

  return (
    
    <div >
      <main className = "main">
            {todos.map(todo => (
              <Todo 
              key ={todo.id} {...{todo}} 
              onDeleteClick={()=> handleDeleteClick(todo)}
              onEditClick = {()=> handleEditClick(todo)}
              onEdited = {handleEdited}
              markCompleted = {handleMarkCompleted}
              {...props}
              />
            ))
            }
      </main>      
    
    </div>
  )
}
