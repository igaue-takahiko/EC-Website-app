import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    makeStyles,
} from '@material-ui/core';

import { setOrderDetails } from '../../redux/Orders/actions';

const useStyles = makeStyles(() => ({
    tableCell: {
        fontSize: "16px",
        width: "10%",
    },
    productImage: {
        objectFit: "cover",
        width: 200,
        height: 200,
    }
}));

const columns = [
    {
        id: "productThumbnail",
        label: "",
    },
    {
        id: "productPrice",
        label: "Price",
    },
    {
        id: "quantity",
        label: "Quantity"
    }
];

const OrderDetails = ({ order }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const orderItems = order && order.orderItems;

    const formText = (columnName, columnValue) => {
        switch (columnName) {
            case "productPrice":
                return `¥ ${columnValue}`;
            case "productThumbnail":
                return <img className={classes.productImage} src={columnValue} alt={columnName} />
            default:
                return columnValue;
        }
    };

    useEffect(() => {
        return () => {
            dispatch(setOrderDetails({}))
        }
    },[dispatch])

    return (
        <TableContainer>
            <Table>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, pos) => (
                                <TableCell
                                    key={pos}
                                    className={classes.tableCell}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(Array.isArray(orderItems) && orderItems.length > 0) && orderItems.map((row, pos) => (
                            <TableRow key={pos}>
                                {columns.map((column, pos) => {
                                    const columnName = column.id;
                                    const columnValue = row[columnName];

                                    return (
                                        <TableCell
                                            key={pos}
                                            className={classes.tableCell}
                                        >
                                            {formText(columnName, columnValue)}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Table>
        </TableContainer>
    )
}

export default OrderDetails
