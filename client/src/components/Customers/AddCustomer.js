import React, { useState, useEffect, memo } from 'react';

const AddDialog = (props) => {

    const [name, setName] = useState();

    const textChangeHandler = (e) => {
        setName(e.target.value);
    }

    const addbuttonHandler = (e) => {
        e.preventDefault();
        if (name)
            props.addClick(name);
    }

    return (
        <form className='form'>
            <h2>Add Customer</h2>
            <div className='formItem'>
                <label>Customer Name: </label>
                <input className='formInput' type='text' required={true} value={name || ''} onChange={textChangeHandler} />
            </div>
            <button type='submit' onClick={addbuttonHandler}>Add</button>
        </form>
    );
}

export default AddDialog;