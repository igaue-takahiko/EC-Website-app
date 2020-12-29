import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import './Checkout.scss'
import { selectCartItems, selectCartTotal } from '../../redux/Cart/selectors';
import { Button } from '../Forms';
import CheckoutItem from './CheckoutItem/CheckoutItem';

const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
})

const Checkout = () => {
    const history = useHistory();

    const { cartItems, total } = useSelector(mapState);

    const errorMessage = "You have no items in your cart";

    return (
        <div className="checkout">
            <h1>Checkout</h1>
            <div className="cart">
                {cartItems.length > 0 ? (
                    <table border="0" cellPadding="0" cellSpacing="0">
                        <tbody>
                            <tr>
                                <td>
                                    <table className="checkoutHeader" border="0" cellPadding="10" cellSpacing="0">
                                        <tbody>
                                            <tr>
                                                <th>Product</th>
                                                <th>Description</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Remove</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table>
                                        <tbody>
                                            {cartItems.map((item, pos) => (
                                                <tr key={pos}>
                                                    <td>
                                                        <CheckoutItem {...item} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table border="0" cellPadding="0" cellSpacing="0">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table>
                                                        <tr>
                                                            <td>
                                                                <h3 className="total">total: ¥{parseInt(total, 10).toLocaleString()}</h3>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <table border="0" cellPadding="10" cellSpacing="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Button onClick={() => history.goBack()}>
                                                    Continue Shopping
                                                </Button>
                                            </td>
                                            <td>
                                                <Button onClick={() => history.push("/payment")}>
                                                    Checkout
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <div className="checkout">
                        <div className="errorMessage">
                            <p>{errorMessage}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Checkout
