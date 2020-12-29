import React from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, TableCell, withStyles } from '@material-ui/core';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

import { addProduct, removeCartItem, reduceCartItem } from '../../../redux/Cart/actions';

const StyledTableCell = withStyles((theme) => ({
    body: {
        fontSize: 18,
        width: "30px"
    },
}))(TableCell);

const CheckoutItem = (product) => {
    const dispatch = useDispatch();

    const {
        productName,
        productThumbnail,
        productPrice,
        quantity,
        documentID,
    } = product;

    const handleAddToCart = (product) => {
        dispatch(addProduct(product))
    };

    const handleReduceItem = (product) => {
        dispatch(reduceCartItem(product))
    };

    const handleRemoveCartItem = (documentID) => {
        dispatch(removeCartItem({ documentID }))
    };

    return (
        <>
            <StyledTableCell component="th" scope="row">
                <img className="productImage" src={productThumbnail} alt={productName}/>
            </StyledTableCell>
            <StyledTableCell align="center">{productName}</StyledTableCell>
            <StyledTableCell align="center">
                <IconButton
                    className="cartBtn"
                    onClick={() => handleReduceItem(product)}
                >
                    <ArrowBackIosRoundedIcon />
                </IconButton>
                <span>{quantity}</span>
                <IconButton
                    className="cartBtn"
                    onClick={() => handleAddToCart(product)}
                >
                    <ArrowForwardIosRoundedIcon />
                </IconButton>
            </StyledTableCell>
            <StyledTableCell align="center">
                {`¥${parseInt(productPrice, 10).toLocaleString()}`}
            </StyledTableCell>
            <StyledTableCell align="center">
                <IconButton
                    className="cartRemoveBtn"
                    onClick={() => handleRemoveCartItem(documentID)}
                >
                    <HighlightOffRoundedIcon style={{ fontSize: 25 }} />
                </IconButton>
            </StyledTableCell>
        </>
    )
}

export default CheckoutItem
