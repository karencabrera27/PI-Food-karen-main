import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// // importamos actions
import { getRecipes } from "../actions";

// // importacion para renderizar
import { Link } from "react-router-dom";

// // importo cards
import Card from "./Cards";

export default function Home(){
    // declaro la constante dispatch y le pasamos el useDispatch
    // esto va a permitir usar la const y depacharlo en acciones
    const dispatch = useDispatch();

    // esta const trae todo lo que esta en el estado de recipes
    const allRecipes = useSelector((state) => state.recipes);

    // traemos las recetas del estado cuando los componentes se montan

    useEffect(
        () => {
        // despacho las acciones siempre invocando la funcion
        // esto es lo mismo que hacer el mao dispatch to props
        // esto reemplaza todo el map state to props
            dispatch(getRecipes())
        }, [dispatch]
    ) // el arreglo qe se le pasa como sdo param es pra q no se genere un loop infinito

    
    // funcion para el boton
    function handleClick(e){
        // pasamos un evento
        // para que no se rompa todo
        e.preventDefault();
        // esto resetea
        dispatch(getRecipes());
    }

    return (
        <div>
            <div>
                <h1>Henry Food</h1>
                <Link to='/recipes'>Crear receta</Link>
                <br />
                <button onClick={e => handleClick(e)}>Volver a cargar recetas</button>
            </div>
            <div>
                <select name="Asc/Desc" id="">
                    <option value="all">Asc/Desc</option>
                    <option value="asc">Asecendente</option>
                    <option value="desc">Descendente</option>
                </select>

                <select name="" id="">
                    {/* el value es lo mismo que el e.target.value */}
                    <option value="all">Dietas</option>
                    <option value="gluten free">Gluten free</option>
                    <option value="vegan">Vegan</option>
                    <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                    <option value="dairy free">Dairy free</option>
                    <option value="whole 30">Whole 30</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="fodmap friendly">Fodmap friendly</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="ketogenic">Ketogenic</option>
                </select>

                <select name="" id="">
                    <option value="all">Todas las recetas de la DB</option>
                    <option value="current">Existentes</option>
                    <option value="created">Creadas</option>
                </select>
            
                {
                    allRecipes?.map((e) => {
                        return(
                            <fragment>
                                <Link to={"/home/" + e.id}>
                                    <Card name={e.name} diet={e.diet} image={e.image} key={e.id}/>
                                </Link>
                            </fragment>
                        );
                    })
                }

            </div>
        </div>
    )
}