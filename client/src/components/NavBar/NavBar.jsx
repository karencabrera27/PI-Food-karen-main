import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterRecipesByDiets, filterCreated, orderByName, orderByHealthLevel } from "../../actions/index";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import n from '../NavBar/NavBar.module.css'


export default function NavBar(){
    const dispatch = useDispatch();

    // esta const trae todo lo que esta en el estado de recipes
    const allRecipes = useSelector((state) => state.recipes);

    useEffect(
        () => {
        // despacho las acciones siempre invocando la funcion
        // esto es lo mismo que hacer el mao dispatch to props
        // esto reemplaza todo el map state to props
            dispatch(getRecipes())
        }, [dispatch]
    ) 


    function handleClick(e){
    // pasamos un evento
    // para que no se rompa todo
    e.preventDefault();
    // esto resetea
    dispatch(getRecipes());
    }
    return(
        <div className={n.container}>
            <h1>Soy Navbar</h1>
            <div className={n.containerBotones}>
                <Link to='/recipes'><button className={n.crearReceta}>Crear receta</button></Link>
                <br />
                <button className={n.btnCargarReceta} onClick={e => handleClick(e)}>Volver a cargar recetas</button>
            </div>
        </div>
    )
}

{/* <SearchBar/>
                <div className={home.containerCards}>
                    {
                        currentRecipes?.map((e) => {
                            return(
                                <div key={e.id}>
                                    <div>
                                        <Link to={`/recipes/${e.id}`} className={home.card}>
                                            <Card onClick={()=>dispatch(getDetail(e.id))} name={e.name} diet={e.diet + ' '} image={e.image ? e.image : e.img} key={e.id}/>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div> */}