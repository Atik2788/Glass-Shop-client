import React, { useEffect, useState } from 'react';
import './Banner.css'
import imgSlider from './Data';


const Banner = () => {
    const [currentState, setCurrentState] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentState === 2) {
                setCurrentState(0)
            }
            else {
                setCurrentState(currentState + 1)
            }
        }, 3000)
        return () => clearTimeout(timer)

    }, [currentState])

    const bgImgStyle = {
        backgroundImage: `url(${imgSlider[currentState].url})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '100%',
    }

    const goToNext = (currentState) => {
        setCurrentState(currentState)
    }

    return (
        <div className="bgslide">
            <div className="container-style">
                <div style={bgImgStyle}>
                    <div className='trans-bg'></div>
                    <div className='description text-center'>
                    <div className='text-white'>
                        <h1 className='text-5xl font-bold mb-2'>{imgSlider[currentState].title}</h1>
                        <p className='text-xl mb-10'>{imgSlider[currentState].body}</p>
                    </div>

                    <div className='carousel-ind mt-60'>
                        {
                            imgSlider.map((imgSlider, currentState) => (
                                <span key={currentState} onClick={() => goToNext(currentState)}></span>
                            ))
                        }
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;