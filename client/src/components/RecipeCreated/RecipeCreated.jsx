// import React, {useState, useEffect} from "react";
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'

// actions
import { getDiets, postRecipes, getRecipes } from "../../actions";

import { useDispatch, useSelector } from "react-redux";

import c from '../RecipeCreated/rCreated.module.css';

function validacion(input){
    let error = {};
    
    
    const regexName = /^[a-zA-Z ]+$/;
    // comprueba si es url valida
    const url = /(http[s]*:\/\/)([a-z\-0-9\/.]+).([a-z.]{2,3})\/([a-z0-9-\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;

    const checkUndefined = (input)=> {
        // if(!input.diets.length){
        //     return true;
        // } 
        //comprueba que todos los campos esten llenos
        for(let i in input ){
            if(input[i] === undefined){
                return true;
            } else{
                return false;
            }
        }
    }
    
    // no permite campos vacios
    if(checkUndefined(input)){
        error.allFields = "Todos los campos son obligatorios"
    }
    if(!input.name ){
        error.name = "El campo nombre es obligatorio"
    } else if(!regexName.test(input.name)){
        error.name = "No se aceptan numeros"
    }
    if(!input.resume){
        error.resume = "Es obligatorio colocar un resúmen";
    }
     if(input.healthLevel < 10){
        error.healthLevel = "El nivel de saludable debe ser mayor a 10";
    } 
    if(!input.steps){
        error.steps = "Este campo es obligatorio";
    }
    // el test sirve para comprobar que haya un escritura dentro del input
    // if(input.image && !url.test(input.image)){
    //     error.url = "Imagen no valida"
    // }

    return error;
}

export default function RecipeCreated(){
    const dispatch = useDispatch();
// traigo el estado
    const recipesCopy = useSelector((state) => state.copyAllRecipes)

// genero un estado para validación
    const [ error, setError] = useState({
        allFields: "Todos los campos son obligatorios"
    });

// traigo el use history
    const history = useHistory();

// creo un estado para ir guardando los datos del formulario
    const [ input, setInput ] = useState({
        name: "",
        resume: "",
        healthLevel: "",
        steps: "",
        image: "",
        diets: []
    })

    
    useEffect(() =>{
        dispatch(getDiets())
        dispatch(getRecipes())
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
                diets: [...input.diets, e.target.value]
            })
        } else{
            setInput({
                ...input,
                diets: input.diets.filter((r)=> r !== e.target.value)
            })
        }
    }

    function handleSubmit(e){
        const nameRepeat = recipesCopy.filter((d) => d.name === input.name)
        if(nameRepeat.length){
            e.preventDefault()
            alert("La receta ya existe")
        } else{
        e.preventDefault();
        console.log(input)
        
        // despacho la acción
        dispatch(postRecipes(input))
        alert('Receta creada')
        // vacio mi estado
        setInput({
            name: "",
            resume: "",
            healthLevel: "",
            stepBystep: "",
            image: "",
            diets: []
            })
        // redirecciona al home
        history.push('/home')
        }
    }

    // 
    

    return(
        <React.Fragment>
            <div className={c.container}>
                <Link to = '/home'><button className={c.boton}>Volver</button></Link>
                <h1 className={c.titulo}>Crear receta</h1>

                <form onSubmit={(e)=>handleSubmit(e)} className={c.formulario} >
                    <div className={c.labelInput}>
                        <label key="" className={c.label}>Nombre: </label>
                        <input 
                            type="text" 
                            value={input.name} 
                            name="name" 
                            
                            onChange={(e) => handleChange(e)}
                            className={c.input}
                        />
                        <span>{error.name && (<p className={c.error}>{error.name}</p>)}</span>
                    </div>
                    <div className={c.labelInput}>
                        <label key="" className={c.label}>Resumen: </label>
                        <textarea 
                            value={input.resume} 
                            name="resume" 
                            onChange={(e)=>handleChange(e)}
                            className={c.input}
                        />
                        <span>{error.resume && (<p className={c.error}>{error.resume}</p>)}</span>
                    </div>
                    <div className={c.labelInput}>
                        <label key="" className={c.label}>Nivel de salud: </label>
                        <input 
                            type="number" 
                            value={input.healthLevel} 
                            name="healthLevel" 
                            onChange={(e)=>handleChange(e)}
                            className={c.input}
                        />
                        <span>{error.resume && (<p className={c.error}>{error.healthLevel}</p>)}</span>
                    </div>
                    <div className={c.labelInput}>
                        <label key="" className={c.label}>Paso a paso: </label>
                        <textarea 
                            value={input.steps} 
                            name="steps" 
                            onChange={(e)=>handleChange(e)}
                            className={c.input}
                        />
                        <span>{error.steps && (<p className={c.error}>{error.steps}</p>)}</span>
                    </div>
                    <div className={c.labelInput}>
                        <label key="imgInput" className={c.label}>Imagen: </label>
                        <input 
                            type="text" 
                            value={input.image} 
                            name="image" 
                            id="imgInput"
                            onChange={(e)=>handleChange(e)}
                            className={c.input}
                        />
                        {/* <span>{error.url && (<p className={c.error}>{error.url}</p>)}</span> */}
                    </div>
                    <div className={c.contDietas}>
                        <label key="" className={c.label}>Dietas</label>
                        <br></br>
                        <div className={c.dietas}>
                        <label key="" className={c.labels}>Sin gluten</label>
                        <input 
                            type="checkbox" 
                            value="gluten free" 
                            name="gluten free" 
                            onChange={(e)=>handleCheck(e)}
                            
                        />
                        <label key="" className={c.labels}>Vegetariano</label>
                        <input 
                            type="checkbox" 
                            value="vegetarian" 
                            name="vegetarian" 
                            onChange={(e)=> handleCheck(e)}
                        />
                        <label key="" className={c.labels}>Lacto vegetariana</label>
                        <input 
                            type="checkbox" 
                            value="dairy free" 
                            name="dairy free" 
                            onChange={(e)=> handleCheck(e)}
                        />    
                        <label key="" className={c.labels}>Ovo vegetariano</label>
                        <input 
                            type="checkbox" 
                            value="lacto ovo vegetarian" 
                            name="lacto ovo vegetarian" 
                            onChange={(e)=> handleCheck(e)}
                        />
                        <label key="" className={c.labels}>
                            Vegana</label>
                            <input 
                                type="checkbox" 
                                value="vegan" 
                                name="vegan" 
                                onChange={(e)=> handleCheck(e)}
                            />
                        
                        <label key="" className={c.labels}>
                            Paleo
                            <input 
                                type="checkbox" 
                                value="paleolithic" 
                                name="paleolithic" 
                                onChange={(e)=> handleCheck(e)}
                            />
                        </label>
                        <label key="" className={c.labels}>
                            Primitiva
                            <input 
                                type="checkbox" 
                                value="primal" 
                                name="primal" 
                                onChange={(e)=> 
                                handleCheck(e)}
                            />
                        </label>
                        <label key="" className={c.labels}>
                            Entero 30
                            <input 
                                type="checkbox" 
                                value="whole 30" 
                                name="whole 30" 
                                onChange={(e)=> handleCheck(e)}
                            />
                        </label>
                        <label key="" className={c.labels}>
                            FODMAP bajo
                            <input 
                                type="checkbox" 
                                value="fodmap friendly" 
                                name="fodmap friendly" 
                                onChange={(e)=> handleCheck(e)}
                            />
                        </label>
                        <label key="" className={c.labels}>
                            Pescetariano
                            <input 
                                type="checkbox" 
                                value="pescatarian" 
                                name="pescatarian" 
                                onChange={(e)=> handleCheck(e)}
                            />
                        </label>
                        <label key="" className={c.labels}>
                            Cetogénico
                            <input 
                                type="checkbox" 
                                value="ketogenic" 
                                name="ketogenic" 
                                onChange={(e)=> handleCheck(e)}
                            />
                        </label>
                        </div>
                    </div>
                    {
                        Object.keys(error).length ? (
                            <button type='submit' disabled={true} className={c.botonSubmit}>Submit</button>
                        ) :
                        (
                            <button type='submit'  className={c.botonSubmit}>Submit</button>
                        )
                    }
                    
                </form>
            </div>
        </React.Fragment>
    )
}
    
