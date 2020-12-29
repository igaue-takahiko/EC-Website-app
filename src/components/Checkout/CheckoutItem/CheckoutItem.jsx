import React from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from '@material-ui/core';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

import { addProduct, removeCartItem, reduceCartItem } from '../../../redux/Cart/actions';

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
        <table className="cartItem" border="0" cellSpacing="0" cellPadding="10">
            <tbody>
                <tr>
                    <td>
                        <img src={productThumbnail} alt={productName}/>
                    </td>
                    <td>
                        {productName}
                    </td>
                    <td>
                        <IconButton
                            className="cartBtn"
                            onClick={() => handleReduceItem(product)}
                        >
                            <ArrowBackIosRoundedIcon />
                        </IconButton>
                        <span>
                            {quantity}
                        </span>
                        <IconButton
                            className="cartBtn"
                            onClick={() => handleAddToCart(product)}
                        >
                            <ArrowForwardIosRoundedIcon />
                        </IconButton>
                    </td>
                    <td>
                        ¥ {parseInt(productPrice, 10).toLocaleString()}
                    </td>
                    <td align="center">
                        <IconButton
                            onClick={() => handleRemoveCartItem(documentID)}
                        >
                            <HighlightOffRoundedIcon className="cartRemoveBtn" />
                        </IconButton>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default CheckoutItem
