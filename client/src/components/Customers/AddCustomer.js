import React, { useState, useEffect, memo } from 'react';
// import style from './Initialize.module.css';

const AddDialog = (props) => {

    const [name, setName]= useState();

    const textChangeHandler=(e)=>{
        setName(e.target.value);
    }

    return (
        <form>
            <h2>Add Customer</h2>
            Customer Name: <input  type='text' value= {name} onChange={textChangeHandler}/>
            <br/>
            <button onClick={()=>props.addClick(name)}>Add</button>
        </form>
    );
}

export default AddDialog;