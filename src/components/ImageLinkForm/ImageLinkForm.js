import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f3'> {'This magic Brain will detect your face. Get it now!'} </p>
            <div className='center'>
                <div className=' form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center ma3' placeholder='Paste url here' type='text' onChange={onInputChange} />
                    <button className='w-30 grow f4 link ph3 pv1 dib white bg-light-purple ma3' onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;