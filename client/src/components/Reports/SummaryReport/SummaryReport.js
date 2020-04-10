import React from 'react';
import style from './SummaryReport.module.css';
import Table from '../../UI/Table/Table';
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas';

const Transaction = (props) => {

    const rows = [...props.productsList];
    const cols = ['Item Name', 'Available Quantity'];

    const exportHandler = () => {
        const input = document.getElementById('summary');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("Summary-Report.pdf");
            });
    }

    return (
        <div id='summary' className={style.body}>
            <h1 className={style.Heading}>Summary Report</h1>
            <div className={style.table}>
                <Table rows={rows} cols={cols} />
            </div>
            <button onClick={exportHandler}>Export to PDF</button>
        </div>
    );
}

export default Transaction;