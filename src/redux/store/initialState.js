export const initialState = {
    user: {
        currentUser: null,
        resetPasswordSuccess: false,
        userErr: []
    },
    products: {
        products: [],
        product: {},
    },
    cart: {
        cartItems: [],
    },
    orders: {
        orderHistory: [],
        orderDetails: {},
    }
};