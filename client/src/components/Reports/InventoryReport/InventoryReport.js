import React, { useState, useEffect, memo } from 'react';
import style from './InventoryReport.module.css';
import Table from '../../UI/Table/Table';

const Transaction = (props) => {

    const products = [...props.products];
    const transactions = [...props.transactions];
    // const { products, transactions } = props

    const getTransactionsForProduct = (id) => {
        const rows = [];
        const cols = ['Transaction ID', 'Date/time', 'Type', 'Quantity'];
        console.log(props);
        console.log(transactions);
        props.transactions.map(t => {
            if (t.product_id === id) {
                rows.push({
                    id: t._id,
                    date: t.transation_date_time_,
                    type: t.transation_type,
                    qty: t.quantity
                });
            }
        });
        // console.log(rows);
        return rows.length > 0 ?
            <Table cols={cols} rows={rows} /> :
            null;
    }

    const getProductView = () => {
        return products.map(p => {
            return (
                <div>
                    <p>Item Name: {p.product_title}</p>
                    <p>Available Quantity: {p.qty_total}</p>
                    {getTransactionsForProduct(p._id)}
                    <p>---</p>
                </div>
            )
        })
    }

    return (
        <div className={style.body}>
            <h1 className={style.Heading}>Inventory Report</h1>
            {getProductView()}
        </div>
    );
}

export default Transaction;