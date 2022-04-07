import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Input from '@mui/material/Input';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import PropTypes from 'prop-types';

Todo.propTypes = {
    onDeleteClick: PropTypes.func,
    onEditClick: PropTypes.func,
    onEdited: PropTypes.func,
    markCompleted: PropTypes.func,
}; 

Todo.defaultProps ={
    onDeleteClick: null,
    onEditClick:null,
    onEdited:null,
    markCompleted: null,
}

function Todo(props) {
    const {
        todo,
        onDeleteClick,
        onEditClick,
        onEdited,
        markCompleted
      } = props;
      const [text, setText] = useState(todo?.text);
      const [isEditing,setIsEditing] = useState(false)


      const handleDelete = (todo)=>{ 
          onDeleteClick(todo);
      }

      const handleEdit = (todo) =>{
            setIsEditing(true);
          onEditClick(todo);
      }

      function handleEdited(e){
        if (!onEdited) return;
        
        const formEdited = {
            id: todo.id,
            text: text,
            isCompleted: false,
        };
        onEdited(formEdited);

        setIsEditing(false)
        setText('')

    }


    return (
       <>
        <List className= {`${isEditing ? "editing" : ""} ${todo?.isCompleted ? "completed" : ""} `} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}> 
         {!isEditing ?
            <div className = "view">
                <Box component="div" display="inline">
                    <FormControlLabel id='todoList' control={
                    <Checkbox
                    checked={todo?.isCompleted}
                    onChange = {()=>markCompleted(todo)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    id="todoList"
                    />} 
                    label={todo?.text}  />
                    <IconButton color="warning" id="todoList" aria-label="destroy" component="span" onClick={(e)=> {e.preventDefault(); handleEdit(todo);}}>
                     <EditIcon/>
                 </IconButton>
                 <IconButton color="primary" id="todoList" aria-label="destroy" component="span" onClick={(e)=> {e.preventDefault(); handleDelete(todo);}}>
                     <DeleteIcon />
                 </IconButton>
                </Box>
            </div> :
            
            <Input
                id="inputTodo"
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyPress ={(e)=>{
                    if(e.key === 'Enter') {
                        handleEdited(todo)
                    }
                }}
            />
             }
    </List>
       
       </>
    );
}

export default Todo;
