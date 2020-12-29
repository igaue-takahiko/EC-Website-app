import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {
    withStyles,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from '@material-ui/core';

import './Checkout.scss'
import { selectCartItems, selectCartTotal } from '../../redux/Cart/selectors';
import { Button } from '../Forms';
import CheckoutItem from './CheckoutItem/CheckoutItem';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 18,
    }
}))(TableCell);

const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    subtotal: selectCartTotal,
})

const Checkout = () => {
    const history = useHistory();

    const { cartItems, subtotal } = useSelector(mapState);

    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const errorMessage = "You have no items in your cart";

    return (
        <div className="checkout">
            <h1>Checkout</h1>
            <div className="cart">
                {cartItems.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Product</StyledTableCell>
                                    <StyledTableCell align="center">Description</StyledTableCell>
                                    <StyledTableCell align="center">Quantity</StyledTableCell>
                                    <StyledTableCell align="center">Price</StyledTableCell>
                                    <StyledTableCell align="center">Remove</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems.map((item, pos) => (
                                    <TableRow key={pos}>
                                        <CheckoutItem {...item} />
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <div className="checkout">
                        <div className="errorMessage">
                            <p>{errorMessage}</p>
                        </div>
                    </div>
                )}
                <p className="total">Total (tax included): ¥{parseInt(total, 10).toLocaleString()}</p>
                <div className="cartButtons">
                    <Button onClick={() => history.push("/search")}>
                        Continue Shopping
                    </Button>
                    <Button
                        onClick={() => history.push("/payment")}
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Checkout
