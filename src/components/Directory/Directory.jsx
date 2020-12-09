import React from 'react';
import './Directory.scss'

import WomansImage from './../../assets/img/woman.jpg';
import MensImage from './../../assets/img/mens.jpg';

const Directory = () => {
    return (
        <div className="directory">
            <div className="wrap">
                <div
                    className="item"
                    style={{ backgroundImage: `url(${WomansImage})` }}
                >
                    <button>Womens</button>
                </div>
                <div
                    className="item"
                    style={{ backgroundImage: `url(${MensImage})` }}
                >
                    <button>Mens</button>
                </div>
            </div>
        </div>
    )
}

export default Directory
