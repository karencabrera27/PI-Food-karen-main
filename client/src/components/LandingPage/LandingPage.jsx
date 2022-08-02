import { React } from 'react';
import { Link } from 'react-router-dom';
import landing from '../LandingPage/landing.module.css'


export default function LandingPage(){
    return (
        // <React.Fragment>
            <div className={landing.container}>
                <h1 className={landing.title}> BIENVENIDOS </h1>
                <Link to = '/home'>
                    <button className={landing.button}> 
                        <span>Ingresar</span>
                        <svg viewBox="0 0 13 10" height="10px" width="15px">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>    
                    </button>
                </Link>
            </div>
            // </React.Fragment>
    )
}