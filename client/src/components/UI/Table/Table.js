import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const TableUI = (props) => {

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

    const createRow=(row)=>{
        let keys=Object.keys(row);
        let arr=keys.map((ele, i)=>{
            return i === 0 ?
                <StyledTableCell key={i} component="th" scope="row">
                    {row[ele]}
                </StyledTableCell>
                :
                <StyledTableCell key={i} align="right">{row[ele]}</StyledTableCell>
        })
        return arr;
    }

    const rows = props.rows;
    const cols = props.cols;
    const classes = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {cols.map((col, i) => (
                            i === 0 ?
                                <StyledTableCell key={i}>{col}</StyledTableCell> :
                                <StyledTableCell key={i} align="right">{col}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row._id}>
                            {createRow(row)}
                        </StyledTableRow>

                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableUI;
