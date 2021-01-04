import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CountryDropdown } from 'react-country-region-selector';
import { useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import './PaymentDetails.scss';
import { apiInstance } from '../../Utils';
import { selectCartTotal, selectCartItemCount, selectCartItems } from '../../redux/Cart/selectors';
import { saveOrderHistory } from '../../redux/Orders/actions';
import { FormInput, Button } from '../Forms';

const initialAddressState = {
    shipping: {
        line: "",
        line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
    },
    billing: {
        line: "",
        line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
    },
};

const mapState = createStructuredSelector({
    subtotal: selectCartTotal,
    itemCount: selectCartItemCount,
    cartItems: selectCartItems,
})

const PaymentDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const { subtotal, itemCount, cartItems } = useSelector(mapState);

    const [ billingAddress, setBillingAddress ] = useState({ ...initialAddressState.billing });
    const [ shippingAddress, setShippingAddress ] = useState({ ...initialAddressState.shipping });
    const [ recipientName, setRecipientName ] = useState("");
    const [ nameOnCard, setNameOnCart ] = useState("");

    const handleShipping = useCallback((e) => {
        const { name, value } = e.target;
        setShippingAddress({
            ...shippingAddress,
            [name]: value,
        });
    },[shippingAddress]);

    const handleBilling = useCallback((e) => {
        const { name, value } = e.target;
        setBillingAddress({
            ...billingAddress,
            [name]: value,
        });
    },[billingAddress]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const cardElement = elements.getElement("card");
        if (
            !shippingAddress.line1 || !shippingAddress.city ||
            !shippingAddress.state || !shippingAddress.postal_code ||
            !shippingAddress.country || !billingAddress.line1 ||
            !billingAddress.city || !billingAddress.state ||
            !billingAddress.postal_code || !billingAddress.country ||
            !recipientName || !nameOnCard || !cardElement
        ) {
            return;
        }

        apiInstance.post('/payments/create', {
            amount: subtotal * 100,
            shipping: {
                name: recipientName,
                address: {
                    ...shippingAddress
                }
            }
        }).then(({ data: clientSelect }) => {
            stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: {
                    name: nameOnCard,
                    address: {
                        ...billingAddress
                    }
                }
            }).then(({ paymentMethod }) => {
                stripe.confirmCardPayment(clientSelect, {
                    payment_method: paymentMethod.id
                }).then(({ paymentIntent }) => {
                    console.log(paymentIntent);
                    const configOrder = {
                        orderTotal: subtotal * 1.1,
                        orderItem: cartItems.map((item) => {
                            const {
                                documentID,
                                productThumbnail,
                                productName,
                                productPrice,
                                quantity,
                            } = item;

                            return {
                                documentID,
                                productThumbnail,
                                productName,
                                productPrice,
                                quantity,
                            };
                        })
                    }
                    dispatch(saveOrderHistory(configOrder))
                })
            })
        })
    };

    const configCardElement = {
        iconStyle: "solid",
        style: {
            base: {
                fontSize: "16px"
            }
        },
        hidePostalCode: true
    };

    useEffect(() => {
        if (itemCount < 1) {
            history.push("/dashboard")
        }
    },[history, itemCount])

    return (
        <div className="paymentDetails">
            <form onSubmit={handleFormSubmit}>
                <div className="group">
                    <h2>Shipping Address</h2>
                    <FormInput
                        required placeholder="Recipient Name" type="text"
                        name="recipientName" value={recipientName}
                        handleChange={e => setRecipientName(e.target.value)}
                    />
                    <FormInput
                        required placeholder="Line 1" type="text"
                        name="line1" value={shippingAddress.line1}
                        handleChange={e => handleShipping(e)}
                    />
                    <FormInput
                        required placeholder="Line 2" type="text"
                        name="line2" value={shippingAddress.line2}
                        handleChange={e => handleShipping(e)}
                    />
                    <FormInput
                        required placeholder="City" type="text"
                        name="city" value={shippingAddress.city}
                        handleChange={e => handleShipping(e)}
                    />
                    <FormInput
                        required placeholder="State" type="text"
                        name="state" value={shippingAddress.state}
                        handleChange={e => handleShipping(e)}
                    />
                    <FormInput
                        required placeholder="Postal Code" type="text"
                        name="postal_code" value={shippingAddress.postal_code}
                        handleChange={e => handleShipping(e)}
                    />
                    <div className="formRowSelect">
                        <CountryDropdown
                            required valueType="short"
                            value={shippingAddress.country}
                            onChange={(value) => handleShipping({
                                target: {
                                    name: "country",
                                    value: value,
                                }
                            })}
                        />
                    </div>
                </div>
                <div className="group">
                    <h2>Billing Address</h2>
                    <FormInput
                        required placeholder="Name on Card" type="text"
                        name="nameOnCard" value={nameOnCard}
                        handleChange={e => setNameOnCart(e.target.value)}
                    />
                    <FormInput
                        required placeholder="Line 1" type="text"
                        name="line1" value={billingAddress.line1}
                        handleChange={e => handleBilling(e)}
                    />
                    <FormInput
                        required placeholder="Line 2" type="text"
                        name="line2" value={billingAddress.line2}
                        handleChange={e => handleBilling(e)}
                    />
                    <FormInput
                        required placeholder="City" type="text"
                        name="city" value={billingAddress.city}
                        handleChange={e => handleBilling(e)}
                    />
                    <FormInput
                        required placeholder="State" type="text"
                        name="state" value={billingAddress.state}
                        handleChange={e => handleBilling(e)}
                    />
                    <FormInput
                        required placeholder="Postal Code" type="text"
                        name="postal_code" value={billingAddress.postal_code}
                        handleChange={e => handleBilling(e)}
                    />
                    <div className="formRowSelect">
                        <CountryDropdown
                            required valueType="short"
                            value={billingAddress.country}
                            onChange={(value) => handleBilling({
                                target: {
                                    name: "country",
                                    value: value,
                                }
                            })}
                        />
                    </div>
                </div>
                <div className="group">
                    <h2>Card Details</h2>
                    <CardElement
                        options={configCardElement}
                    />
                </div>
                <Button
                type="submit"
                >
                    Pay Now
                </Button>
            </form>
        </div>
    )
}

export default PaymentDetails
