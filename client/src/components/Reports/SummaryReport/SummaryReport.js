import React, { useState, useEffect, memo } from 'react';
import style from './SummaryReport.module.css';
import Table from '../../UI/Table/Table';

const Transaction = (props) => {

    const rows=[...props.productsList];
    const cols=['Item Name', 'Available Quantity'];
    return (
        <div className={style.body}>
            <h1 className={style.Heading}>Summary Report</h1>
            <Table rows={rows} cols={cols}/>
        </div>
    );
}

export default Transaction;