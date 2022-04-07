import React , { useState } from 'react';
import {Box,Card,CardContent,Typography,Button,CardActions,AppBar,Toolbar,IconButton} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TodoForm from "./todoForm"

export  function Main() {
  const [todoList, setTodoList] = useState([
    {id: 1, text:'todoItem 1',isCompleted:true},
    {id: 2, text:'todoItem 2',isCompleted:false},
  ]);

  const [status,setStatus] = useState('ALL'); 
 
  const isNotCheckedAll = (todoList = []) => todoList.find(todo=> !todo.isCompleted);
  const filterByStatus = (todoList = [], status = "", id = "") => {
    switch (status) {
      case "ACTIVE":
        return todoList.filter((todo) => !todo.isCompleted);
      case "COMPLETED":
        return todoList.filter((todo) => todo.isCompleted);
      case "REMOVE":
        return todoList.filter((todo) => todo.id !== id);
      default:
        return todoList;
    }}



  const [isCheckedAll, setIsCheckedAll] = useState(false); 
function handleTodoFormSubmit(formValues){

  const newTodo ={
    id: new Date().valueOf(),
    ...formValues,
  };
  const newTodoList = [...todoList];
  newTodoList.push(newTodo);
  setTodoList(newTodoList);
};
function handleDeleteItem(todo){
  console.log(todo)
   const index = todoList.findIndex(x => x.id === todo.id);
   if (index <0) return;
   const newTodoList = [...todoList];
  newTodoList.splice(index,1);
  setTodoList(newTodoList)
}
function handleEditTodo(todo){
  console.log(todo)

}

function handleEdited(FormEdited){
  const newTodo ={
    ...FormEdited,
  }
  console.log(newTodo)
  const index = todoList.findIndex(x => x.id === FormEdited.id);
  const newTodoList = [...todoList];
  newTodoList.splice(index,1,newTodo);
  setTodoList(newTodoList);
};

function markCompleted(todo){
  const index = todo.id;
  const updatedList =   todoList.map(item =>  item.id === index   ? {...item, isCompleted : !todo.isCompleted}  : item );
  setTodoList(updatedList)
  setIsCheckedAll(!isNotCheckedAll(updatedList));
};

function checkAllTodos (){
  const updatedList =   todoList.map(item => ({...item, isCompleted : !isCheckedAll}));
  setTodoList(updatedList)
  setIsCheckedAll(!isCheckedAll );
}

function setStatusFilter(status){
  setStatus(status);
}

function clearCompleted(){
  const newTodoList = [...todoList];
  setTodoList(filterByStatus(newTodoList,'ACTIVE'))
}
  return (
    <Box sx={{display:"flex",justifyContent:"center",m:5,p:2}}>
       <Card sx={{ minWidth: 275 }}>
    <CardContent>
      <TodoForm 
              isCheckedAll = {isCheckedAll}
              onSubmit={handleTodoFormSubmit} 
      />
            
    </CardContent>
  </Card>
    </Box>
   
  );
}

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <img  src="/img/homework.png" alt="don't have todos" />
          <Typography variant="h6" component="div" sx={{ flexGrow:1 ,ml:2}}>
            My TodoList
          </Typography>
          {/* <Toolbar> */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AccountCircleIcon /> 
            <Typography variant="h6" component="div" sx={{ flexGrow:1 ,ml:2}}>
            Franky Johan Natama Lumbangaol
          </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main />
    </Box>
  );
}