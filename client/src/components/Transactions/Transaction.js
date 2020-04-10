import React from 'react';
import style from './Transaction.module.css';
import Spinner from '../UI/Spinner/Spinner';
import Table from '../UI/Table/Table';

const Transaction = (props) => {

    const rows=[...props.transactions];
    rows.reverse();
    const cols=['Date', 'Customer', 'Product', 'Quality', 'Type'];
    return (
        <div className={style.body}>
            <h1 className={style.Heading}>Transactions</h1>
            {props.loading ? <Spinner /> :
            <Table rows={rows} cols={cols}/>
            }
        </div>
    );
}

export default Transaction;
