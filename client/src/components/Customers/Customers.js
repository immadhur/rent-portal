import React, { useState, useEffect, memo } from 'react';
import style from './Customers.module.css';
import Spinner from '../UI/Spinner/Spinner';

const Customers = (props) => {
    let custList = [...props.customers];
    custList.sort((a, b) => a.customer_name > b.customer_name ? 1 : -1);
    return (
        <div className={style.body}>
            <h1 className={style.Heading}>Customers</h1>
            {props.loading ? <Spinner /> :
                <div className={style.custContainer}>
                    {custList.map(cust =>
                        <div key={cust._id} className={style.Customer}> {cust.customer_name}</div>
                    )}
                </div>
            }
        </div>
    );
}

export default Customers;