import React from 'react';
import style from './InventoryReport.module.css';
import Table from '../../UI/Table/Table';
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas';

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
            <div className={style.table}>
                <Table cols={cols} rows={rows} />
            </div> :
            null;
    }

    const getProductView = () => {
        return products.map(p => {
            return (
                <div className={style.card}>
                    <p>Item Name: {p.product_title}</p>
                    <p>Available Quantity: {p.qty_total}</p>
                    {getTransactionsForProduct(p._id)}
                </div>
            )
        })
    }

    const exportHandler = () => {
        const input = document.getElementById('inventory');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("Inventory-Report.pdf");
            });
    }

    return (
        <div className={style.body} id='inventory'>
            <h1 className={style.Heading}>Inventory Report</h1>
            <div className={style.cardsView}>
                {getProductView()}
            </div>
            <button onClick={exportHandler}>Export to PDF</button>
        </div>
    );
}

export default Transaction;