import { firestore } from '../../firebase';

export const handleAddProduct = (product) => {
    return new Promise((resolve, reject) => {
        firestore.collection('products').doc().set(product, { merge: true }).then(() => {
            resolve();
        }).catch((error) => {
            reject(error)
        })
    })
};

export const handleFetchProducts = ({ filterType, startAfterDoc, persisProducts = [] }) => {
    return new Promise((resolve, reject) => {
        const pageSize = 8;

        let ref = firestore.collection('products').orderBy('createdDate').limit(pageSize);
        if (filterType) ref = ref.where('productGender', '==', filterType);
        // if (filterType) ref = ref.where('productCategory', '==', filterType);
        if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

        ref.get().then((snapshot) => {
            const totalCount = snapshot.size;
            const data = [
                ...persisProducts,
                ...snapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        documentID: doc.id
                    }
                })
            ];
            resolve({
                data,
                queryDoc: snapshot.docs[totalCount - 1],
                isLastPage: totalCount < 1
            });
        }).catch((error) => {
            reject(error);
        })
    })
}

export const handleDeleteProduct = (documentID) => {
    return new Promise((resolve, reject) => {
        firestore.collection('products').doc(documentID).delete().then(() => {
            console.log(documentID, 2);
            resolve();
        }).catch((error) => {
            reject(error)
        })
    })
}

export const handleFetchProduct = (productID) => {
    return new Promise((resolve, reject) => {
        firestore.collection('products').doc(productID).get().then((snapshot) => {
            if (snapshot.exists) {
                resolve({
                    ...snapshot.data(),
                    documentID: productID
                })
            }
        }).catch((error) => {
            reject(error)
        })
    })
}