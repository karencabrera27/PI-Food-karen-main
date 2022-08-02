// import React, {useState, useEffect} from "react";
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'

// actions
import { getDiets, postRecipes } from "../../actions";

import { useDispatch, useSelector } from "react-redux";

import crear from '../RecipeCreated/rCreated.module.css';

function validacion(input){
    let error = {};
    if(!input.name){
        error.name = "El campo nombre es obligatorio"
    } 
    if(!input.resume){
        error.resume = "El campo resumen es obligatorio"
    }
    if(!input.stepByStep){
        error.stepByStep = "El campo paso a paso es obligatorio"
    }

    return error;
}

export default function RecipeCreated(){
    const dispatch = useDispatch();
// traigo el estado
    const diets = useSelector((state) => state.diets)

// genero un estado para validación
    const [ error, setError] = useState({});

// traigo el use history
    const history = useHistory();

// creo un estado para ir guardando los datos del formulario
    const [ input, setInput ] = useState({
        name: "",
        resume: "",
        healthScore: "",
        stepByStep: "",
        image: "",
        diet: []
    })

    
    useEffect(() =>{
        dispatch(getDiets())
    }, [])

    function handleChange(e){
        // va guardando todo lo que el usuario escribe, en el estado input
        setInput({
            //trae todo lo que ya tenia
            ...input,
            // setea el e.target.name en e.target.value
            // este name hace referencia al tag input
            [e.target.name] : e.target.value

        })
        setError(validacion({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input)
    }

    function handleCheck(e){
        // si está marcado el input
        if(e.target.checked){
            // setea el estado
            setInput({
                ...input,
                // como son muchos, le paso lo que ya había primero y concatena el target value
                diet: [...input.diet, e.target.value]
            })
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        // despacho la acción
        dispatch(postRecipes(input))
        alert('Receta creada')
        // vacio mi estado
        setInput({
            name: "",
            resume: "",
            healthScore: "",
            stepBystep: "",
            image: "",
            diet: []
            })
        // redirecciona al home
        history.push('/home')
    }
    // 
    

    return(
        <React.Fragment>
            <div className="container">
                <Link to = '/home'><button className={crear.boton}>Volver</button></Link>
                <h1 className={crear.titulo}>Crear receta</h1>

                <form onSubmit={(e)=>handleSubmit(e)} className={crear.formulario} >
                    <div className={crear.contNombre}>
                        <label htmlFor="">Nombre</label>
                        <input 
                            type="text" 
                            value={input.name} 
                            name="name" 
                            onChange={(e) => handleChange(e)}
                        />
                        {error.name && (<p className={crear.error}>{error.name}</p>)}
                    </div>
                    <div className={crear.contResumen}>
                        <label htmlFor="">Resumen</label>
                        <textarea 
                            value={input.resume} 
                            name="resume" 
                            onChange={(e)=>handleChange(e)}
                        />
                        {error.name && (<p className={crear.error}>{error.name}</p>)}
                    </div>
                    <div className={crear.contSalud}>
                        <label htmlFor="">Nivel de salud</label>
                        <input 
                            type="text" 
                            value={input.healthScore} 
                            name="healthScore" 
                            onChange={(e)=>handleChange(e)}
                        />
                    </div>
                    <div className={crear.contPasos}>
                        <label htmlFor="">Paso a paso</label>
                        <textarea 
                            value={input.stepByStep} 
                            name="stepByStep" 
                            onChange={(e)=>handleChange(e)}
                        />
                        {error.name && (<p className={crear.error}>{error.name}</p>)}
                    </div>
                    <div className={crear.contImagen}>
                        <label htmlFor="">Imagen</label>
                        <input 
                            type="text" 
                            value={input.image} 
                            name="image" 
                            onChange={(e)=>handleChange(e)}
                        />
                    </div>
                    <div className={crear.contDietas}>
                        <label htmlFor="" >Dietas</label>
                        <br></br>
                        <label htmlFor="">Sin gluten</label>
                        <input 
                            type="checkbox" 
                            value="gluten free" 
                            name="gluten free" 
                            onChange={(e)=>handleCheck(e)}
                        />
                        <label htmlFor="">Vegetariano</label>
                        <input 
                            type="checkbox" 
                            value="vegetarian" 
                            name="vegetarian" 
                            onChange={(e)=> handleCheck(e)}
                        />
                        <label htmlFor="">Lacto vegetariana</label>
                        <input 
                            type="checkbox" 
                            value="dairy free" 
                            name="dairy free" 
                            onChange={(e)=> handleCheck(e)}
                        />    
                        <label htmlFor="">Ovo vegetariano</label>
                        <input 
                            type="checkbox" 
                            value="lacto ovo vegetarian" 
                            name="lacto ovo vegetarian" 
                            onChange={(e)=> handleCheck(e)}
                        />
                        <label htmlFor="">
                            Vegana</label>
                            <input 
                                type="checkbox" 
                                value="vegan" 
                                name="vegan" 
                                onChange={(e)=> handleCheck(e)}
                            />
                        
                        <label htmlFor="">
                            Paleo
                            <input 
                                type="checkbox" 
                                value="paleolithic" 
                                name="paleolithic" 
                                onChange={(e)=> handleCheck(e)}
                            />
                        </label>
                        <label htmlFor="">
                            Primitiva
                            <input 
                                type="checkbox" 
                                value="primal" 
                                name="primal" 
                                onChange={(e)=> 
                                handleCheck(e)}
                            />
                        </label>
                        <label htmlFor="">
                            Entero 30
                            <input 
                                type="checkbox" 
                                value="whole 30" 
                                name="whole 30" 
                                onChange={(e)=> handleCheck(e)}
                            />
                        </label>
                        <label htmlFor="">
                            FODMAP bajo
                            <input 
                                type="checkbox" 
                                value="fodmap friendly" 
                                name="fodmap friendly" 
                                onChange={(e)=> handleCheck(e)}
                            />
                        </label>
                        <label htmlFor="">
                            Pescetariano
                            <input 
                                type="checkbox" 
                                value="pescatarian" 
                                name="pescatarian" 
                                onChange={(e)=> handleCheck(e)}
                            />
                        </label>
                        <label htmlFor="">
                            Cetogénico
                            <input 
                                type="checkbox" 
                                value="ketogenic" 
                                name="ketogenic" 
                                onChange={(e)=> handleCheck(e)}
                            />
                        </label>
                    </div>

                    <button type='submit'>Submit</button>
                </form>
            </div>
        </React.Fragment>
    )
}
    
