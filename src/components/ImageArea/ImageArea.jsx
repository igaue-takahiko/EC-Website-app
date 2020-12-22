import React, { useCallback } from 'react';
import { IconButton } from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

import './ImageArea.scss'
import { storage } from '../../firebase';
import ImagePreview from '../ImagePreview/ImagePreview';


const ImageArea = (props) => {
    const images = props.images

    const deleteImage = useCallback(async (id) => {
        const ret = window.confirm("この画像を削除しましか？")
        if (!ret) {
            return false;
        } else {
            const newImages = props.images.filter(image => image.id !== id)
            props.setImages(newImages)
            return storage.ref('images').child(id).delete()
        }
    },[props]);

    const uploadImage = useCallback((event) => {
        const file = event.target.files
        let blob = new Blob(file, { type: "image/jpeg" })

        const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        const N = 16
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n%S.length]).join('')

        const uploadRef = storage.ref('images').child(fileName)
        const uploadTask = uploadRef.put(blob)

        uploadTask.then(() => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newImage = { id: fileName, path: downloadURL }
                props.setImages((prevState) => [...prevState, newImage])
            })
        }).catch((error) => {
            alert(error.message)
        })
    },[props]);

    return (
        <div>
            <div className="grid__list-images">
                {images.length > 0 && (
                    images.map(image => <ImagePreview id ={image.id} key={image.id} path={image.path} delete={deleteImage} />)
                )}
            </div>
            <div>
                <span>登録</span>
                <IconButton className="addPhotoIcon">
                    <label>
                        <AddPhotoAlternateIcon />
                        <input
                            className="u-display-none" type="file" id="images"
                            onClick={e => uploadImage(e)}
                        />
                    </label>
                </IconButton>
            </div>
        </div>
    )
}

export default ImageArea
