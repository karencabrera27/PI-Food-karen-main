import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../actions";

export default function SearchBar(){
    // guardo el dispatch en una variable
    const dispatch = useDispatch();
    // creo estados locales y los seteo en un string vacío
    const [ name, setName ] = useState("");

    // lógica
    function handleInputChange(e){
        e.preventDefault()
        // el value del input toma el valor del useSatet
        setName(e.target.value)
        console.log(name)
        // setName("") posiblemente para que despues de una busqueda se borre lo que escribi
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameRecipes(name))
    }

    // renderizado
    return(
        <div>
            <input type="text" placeholder="Buscar..." onChange={(e) => handleInputChange(e)}/>
            <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
            
        </div>
    )
}