import React, { useEffect, useState } from 'react';
import useAttars from '../../../../Hooks/UseAttars';
import Attar from './Attar';
import './Attars.css';

const Attars = () => {
    const [products, setProducts] = useAttars([]);

    return (
        <div className='attars'>
            <div className='attars-dev'>
                {
                    products.map(attar => <Attar key={attar._id} attar={attar} />)
                }
            </div>
        </div>
    );
};

export default Attars;