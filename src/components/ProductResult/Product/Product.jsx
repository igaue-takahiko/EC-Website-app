import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Aos from 'aos';

import { addProduct } from '../../../redux/Cart/actions';
import NoImage from '../../../assets/img/no_image.png';
import { Button } from '../../Forms';

const Product = (product) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        documentID,
        productThumbnail,
        productName,
        productPrice,
    } = product;

    useEffect(() => {
        Aos.init({
            duration: 1400,
            offset: 10,
            anchorPlacement: "center-center",
        })
    },[]);

    const productThumbnails = (productThumbnail.length > 0) ? productThumbnail : [NoImage]

    if (!documentID || !productThumbnail || !productName || typeof productPrice === "undefined") {
        return null
    }

    const configAddToCartBtn = {
        type: "button"
    };

    const handleAddToCart = (product) => {
        if (!product) {
            return;
        }
        dispatch(addProduct(product));
        history.push("/cart");
    }

    return (
        <div className="product" data-aos="fade-up">
            <div className="thumb">
                <Link to={`/product/${documentID}`}>
                    <img src={productThumbnails} alt={productName}/>
                </Link>
            </div>
            <div className="details">
                <ul>
                    <li>
                        <span className="name">
                            <Link to={`/product/${documentID}`}>
                                {productName}
                            </Link>
                        </span>
                    </li>
                    <li>
                        <span className="price">
                            ¥ {parseInt(productPrice, 10).toLocaleString()}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
                                Add to cart <ShoppingCartOutlinedIcon className="btn-icon" />
                            </Button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Product
