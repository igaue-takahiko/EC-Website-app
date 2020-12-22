import React from 'react';
import './ImagePreview.scss'

const ImagePreview = (props) => {
    return (
        <div className="media__thumb" onClick={() => props.delete(props.id)}>
            <img src={props.id} alt="preview img" />
        </div>
    )
}

export default ImagePreview
