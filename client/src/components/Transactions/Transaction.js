import React, { useState, useEffect, memo } from 'react';
import style from './Transaction.module.css';
import Spinner from '../UI/Spinner/Spinner';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Transaction = (props) => {

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.background.default,
            },
        },
    }))(TableRow);

    const useStyles = makeStyles({
        table: {
            minWidth: 700,
        },
    });

    const rows=props.transactions;
    const classes = useStyles();
    return (
        <div className={style.body}>
            <h1 className={style.Heading}>Transactions</h1>
            {props.loading ? <Spinner /> :
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell align="right">Customer</StyledTableCell>
                                <StyledTableCell align="right">Product</StyledTableCell>
                                <StyledTableCell align="right">Quantity</StyledTableCell>
                                <StyledTableCell align="right">Type</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row._id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.date}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.customer}</StyledTableCell>
                                    <StyledTableCell align="right">{row.product}</StyledTableCell>
                                    <StyledTableCell align="right">{row.qty}</StyledTableCell>
                                    <StyledTableCell align="right">{row.type}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>
    );
}

export default Transaction;
