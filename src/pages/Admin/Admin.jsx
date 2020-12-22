import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CKEditor from 'ckeditor4-react';

import './Admin.scss';
import { firestore } from '../../firebase';
import { addProductStart, fetchProductsStart, deleteProductStart } from '../../redux/Products/actions';
import { FormInput, FormSelect, Button } from '../../components/Forms';
import { Modal, LoadMore } from '../../components';

const mapState = ({ productsData }) => ({
    products: productsData.products
})

const Admin = () => {
    const dispatch = useDispatch();

    const { products } = useSelector(mapState);
    const [ hideModal, setHideModal ] = useState(true);
    const [ productCategory, setProductCategory ] = useState("");
    const [ productCategories, setProductCategories ] = useState([])
    const [ productName, setProductName ] = useState("");
    const [ productThumbnail, setProductThumbnail ] = useState("");
    const [ productGender, setProductGender ] = useState("");
    const [ productPrice, setProductPrice ] = useState(0);
    const [ productDesc, setProductDesc ] = useState("");

    const { data, queryDoc, isLoadPage } = products;

    const toggleModal = () => {
        setHideModal(!hideModal)
    };

    const configModal = {
        hideModal,
        toggleModal,
    };

    const resetForm = () => {
        setHideModal(true);
        setProductCategory([]);
        setProductGender("");
        setProductName("");
        setProductThumbnail("");
        setProductPrice(0);
        setProductDesc("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProductStart({
            productCategory,
            productName,
            productThumbnail,
            productGender,
            productPrice,
            productDesc,
        }))
        resetForm()
    };

    const handleLoadMore = () => {
        dispatch(fetchProductsStart({
            startAfterDoc: queryDoc,
            persistProducts: data,
        }))
    };

    const genders = [
        { value: "all", name: "All" },
        { value: "mens", name: "Mens" },
        { value: "womens", name: "Womens" }
    ];

    const configLoadMore = { onLoadMoreEvent: handleLoadMore };

    useEffect(() => {
        dispatch(fetchProductsStart())
    }, [dispatch])

    useEffect(() => {
        firestore.collection('categories').orderBy('order', 'asc').get().then(snapshots => {
            const list = [];
            snapshots.forEach(snapshot => {
                list.push(snapshot.data())
            })
            setProductCategories(list)
        })
    },[])

    return (
        <div className="admin">
            <div className="callToActions">
                <ul>
                    <li>
                        <Button onClick={() => toggleModal()}>
                            Add new product
                        </Button>
                    </li>
                </ul>
            </div>
            <Modal {...configModal}>
                <div className="addNewProductForm">
                    <form onSubmit={handleSubmit}>
                        <h2>Add new product</h2>
                        <div style={{display: "flex"}}>
                            <FormSelect
                                label="Category"
                                options={productCategories} value={productCategory}
                                handleChange={e => setProductCategory(e.target.value)}
                            />
                            <FormSelect
                                label="Genders" options={genders} value={productGender}
                                handleChange={e => setProductGender(e.target.value)}
                            />
                        </div>
                        <FormInput
                            label="Name" type="text" value={productName}
                            handleChange={useCallback(e => {
                                setProductName(e.target.value)
                            },[setProductName])}
                        />
                        <FormInput
                            label="Main image " type="url" value={productThumbnail}
                            handleChange={useCallback(e => {
                                setProductThumbnail(e.target.value)
                            },[setProductThumbnail])}
                        />
                        <FormInput
                            label="Price" type="number" value={productPrice}
                            min="0" max="1000000" step="1"
                            handleChange={useCallback(e => {
                                setProductPrice(e.target.value)
                            },[setProductPrice])}
                        />
                        <CKEditor
                            onChange={event => {setProductDesc(event.editor.getData())}}
                        />
                        <br/>
                        <Button type="submit">
                            Add product
                        </Button>
                    </form>
                </div>
            </Modal>
            <div className="manageProducts">
                <table border="0" cellPadding="0" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>
                                <h1>Manege Products</h1>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <table className="results" border="0" cellPadding="10" cellSpacing="0">
                                    <tbody>
                                        {(Array.isArray(data) && data.length > 0) && data.map((product, index) => {
                                            const {
                                                productName,
                                                productThumbnail,
                                                productPrice,
                                                documentID,
                                            } = product;
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <img className="thumb" src={productThumbnail} alt="Product thumbnail"/>
                                                    </td>
                                                    <td>
                                                        {productName}
                                                    </td>
                                                    <td>
                                                        ¥ {productPrice.toLocaleString()}
                                                    </td>
                                                    <td>
                                                        <Button onClick={() => dispatch(deleteProductStart(documentID))}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {!isLoadPage && (
                                                    <LoadMore {...configLoadMore} />
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Admin
