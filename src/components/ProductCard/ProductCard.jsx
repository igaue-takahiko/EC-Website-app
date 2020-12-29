import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import { fetchProductStart, setProduct } from '../../redux/Products/actions';
import { addProduct } from '../../redux/Cart/actions';
import { Button } from '../Forms';
import './ProductCard.scss';

const mapState = (state) => ({
    product: state.productsData.product
});

const ProductCard = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { productID } = useParams();
    const { product } = useSelector(mapState);

    const {
        productThumbnail,
        productName,
        productPrice,
        productDesc,
    } = product;

    const handleAddToCart = (product) => {
        if (!product) {
            return;
        };
        dispatch(addProduct(product));
        history.push("/cart");
    };

    const configAddToCartBtn = { type: "button" };

    useEffect(() => {
        dispatch(fetchProductStart(productID))
        return () => {
            dispatch(setProduct({}))
        }
    },[dispatch, productID])

    return (
        <div className="productCard">
            <div className="hero">
                <img src={productThumbnail} alt={productName} />
            </div>
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>{productName}</h1>
                    </li>
                    <li>
                        <span className="price">
                            ¥ {parseInt(productPrice, 10).toLocaleString()}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart" onClick={() => handleAddToCart(product)}>
                            <Button { ...configAddToCartBtn }>
                                Add to cart <ShoppingCartOutlinedIcon className="btn-icon" />
                            </Button>
                        </div>
                    </li>
                    <li>
                        <span
                            className="desc"
                            dangerouslySetInnerHTML={{ __html: productDesc }}
                        />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProductCard
