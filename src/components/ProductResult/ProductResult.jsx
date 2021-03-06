import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { fetchProductsStart } from '../../redux/Products/actions';
import Product from './Product/Product';
import LoadMore from '../LoadMore/LoadMore';
import { FormSelect } from '../Forms';
import './ProductResult.scss';

const mapState = ({ productsData }) => ({
    products: productsData.products
});

const ProductResult = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { filterType } = useParams();
    const { products } = useSelector(mapState);

    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {
        dispatch(fetchProductsStart({ filterType }))
    },[dispatch, filterType]);

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`);
    };

    if (!Array.isArray(data)) return null;
    if (data.length < 1) {
        return (
            <div className="products">
                <p>No search result</p>
            </div>
        )
    }

    const handleLoadMore = () => {
        dispatch(fetchProductsStart({
            filterType,
            startAfterDoc: queryDoc,
            persistProduct: data,
        }))
    };

    const configFilters = {
        defaultValue: filterType,
        options: [
            { name: 'Show all', value: '' },
            { name: 'Mens', value: 'mens' },
            { name: 'Womens', value: 'womens' }
        ],
        handleChange: handleFilter
    };

    const configLoadMore = { onLoadMoreEvent: handleLoadMore }

    return (
        <div className="products">
            <h1>Browse Products</h1>
            <FormSelect className="checkoutInput" {...configFilters} />
            <div className="productResults">
                {data.map((product, pos) => {
                    const { productThumbnail, productName, productPrice } = product;
                    if (!productThumbnail || !productName || typeof productPrice === "undefined") {
                        return null;
                    };
                    const configProduct = { ...product };

                    return (
                        <Product key={pos} {...configProduct} />
                    );
                })}
            </div>
            {!isLastPage && (
                <LoadMore {...configLoadMore} />
            )}
        </div>
    )
}

export default ProductResult
