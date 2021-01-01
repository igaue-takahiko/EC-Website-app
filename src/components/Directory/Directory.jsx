import React from 'react';
import { useHistory } from 'react-router-dom';

import './Directory.scss'
import WomansImage from './../../assets/img/woman.jpg';
import MensImage from './../../assets/img/mens.jpg';

const Directory = () => {
    const history = useHistory();

    return (
        <div className="directory">
            <div className="wrap">
                <div
                    className="itemWomen"
                    style={{ backgroundImage: `url(${WomansImage})` }}
                >
                    <button
                        onClick={() => history.push("/search/womens")}
                    >
                        Womens
                    </button>
                </div>
                <div
                    className="itemMens"
                    style={{ backgroundImage: `url(${MensImage})` }}
                >
                    <button
                        onClick={() => history.push("/search/mens")}
                    >
                        Mens
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Directory
