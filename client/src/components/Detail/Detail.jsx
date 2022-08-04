import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import getDetail from '../../actions';
import { clear } from '../../actions';
import d from '../Detail/detail.module.css'


export default function DetailRecipe(props){
    console.log(props)
    const dispatch = useDispatch();
    

    useEffect(()=>{
        // accedo al id de ese detalle
        dispatch(getDetail(props.match.params.id))
        return()=>{
            dispatch(clear())
        }
    }, [dispatch])

    const myRecipe = useSelector((state) => state.detail)
    console.log(myRecipe)
    console.log()

    return(
        // <React.Fragment>
        <div className={d.container}>
            
            {
                myRecipe.length > 0 ?
                
                <div className={d.card}>
                    
                    <div className={d.carta}>
                    <Link to='/home'>
                        <button className={d.button}>Volver</button>
                    </Link>
                    <div className={d.info}>
                    <h1>{myRecipe[0].name}</h1>
                    <h3>Nivel de salud: {myRecipe[0].healthLevel}</h3>
                    <h3> Resumen: <span className={d.span}  dangerouslySetInnerHTML={{__html:  myRecipe[0].resume }} /></h3>
                    <h3>Pasos: {myRecipe[0].steps}</h3>
                    <h3>Dietas: {!myRecipe[0].createdInDb ? myRecipe[0].diets + ' ' : myRecipe[0].diets.map(e => e.name + (' '))} </h3>
                    <img src={myRecipe[0].img ? myRecipe[0].img : myRecipe[0].image}/>
                    </div>
                    </div>
                </div> : 
                // <p>loading</p>
                    // <img src={loader} className={d.img}/>
                    <div className={d.containerSpinner}>
                    <div className={d.spinner}>
                    <span className={d.span}>L</span>
                    <span className={d.span}>O</span>
                    <span className={d.span}>A</span>
                    <span className={d.span}>D</span>
                    <span className={d.span}>I</span>
                    <span className={d.span}>N</span>
                    <span className={d.span}>G</span>
                  </div>
                  </div>

            }

            
        </div>
        // </React.Fragment>
    )
}