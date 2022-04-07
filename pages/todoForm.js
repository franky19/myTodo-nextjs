import React, {useState} from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';
 TodoForm.propTypes = {
    onSubmit: PropTypes.func,
    isCheckedAll: PropTypes.bool,
}; 

TodoForm.defaultProps ={
    onSubmit: null,
    isCheckedAll: false,
}

function TodoForm(props) {
    const {onSubmit, isCheckedAll} = props;
    const [value, setValue] = useState('')

    function handleValueChange(e) {
        setValue(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        if (!onSubmit) return;
        
        const formValues = {
            text: value,
            isCompleted: false,
        };
        onSubmit(formValues);
 
        //Reset form
        setValue('');
    }
    return (
        <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard" >
          <InputLabel htmlFor="inputTodo">Add todo</InputLabel>
          <Input
            id="inputTodo"
            value={value}
            onChange={handleValueChange}
          />
        </FormControl>
        </form>
    );
}

export default TodoForm;