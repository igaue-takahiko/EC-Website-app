import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    tableCell: {
        fontSize: "16px",
        cursor: "pointer",
        width: "10%"
    }
}));

const columns = [
    {
        id: "orderCreatedDate",
        label: "Order Date"
    },
    {
        id: "documentID",
        label: "Order ID"
    },
    {
        id: "orderTotal",
        label: "Amount"
    }
];

const formText = (columnName, columnValue) => {
    switch (columnName) {
        case "orderTotal":
            return `¥ ${columnValue}`;
        case "orderCreatedDate":
            return moment(columnValue.nano).format("DD/MM/YYYY");
        default:
            return columnValue;
    }
};

const OrderHistory = ({ orders }) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column, pos) => {
                            const { label } = column;
                            return (
                                <TableCell
                                    key={pos}
                                    className={classes.tableCell}
                                >
                                    {label}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(Array.isArray(orders) && orders.length > 0) && orders.map((row, pos) => {
                        const { documentID } = row;
                        return (
                            <TableRow
                                key={pos}
                                onClick={() => history.push(`/order/${documentID}`)}
                            >
                                {columns.map((column, pos) => {
                                    const columnName = column.id;
                                    const columnValue = row[columnName];
                                    const formattedText = formText(columnName, columnValue);
                                    return (
                                        <TableCell
                                            key={pos}
                                            className={classes.tableCell}
                                        >
                                            {formattedText}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default OrderHistory
