import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// // importamos actions
import { getRecipes, filterRecipesByDiets, filterCreated, orderByName, orderByHealthLevel } from "../actions";

// // importacion para renderizar
import { Link } from "react-router-dom";

// // importo cards
import Card from "./Cards";

// importo componente paginado
import Paginado from "./Pagination";

// importacion css
import home from './cssComponents/home.css';

export default function Home(){
    // declaro la constante dispatch y le pasamos el useDispatch
    // esto va a permitir usar la const y depacharlo en acciones
    const dispatch = useDispatch();

    // esta const trae todo lo que esta en el estado de recipes
    const allRecipes = useSelector((state) => state.recipes);

    // definición de estado para ordenamiento
    const [orden, setOrden] = useState('');

    // definicion de estados locales
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ recipesPerPage , setRecipesPerPage] =  useState(9)

    // indices

    const indexLastRecipe = currentPage * recipesPerPage //9
    const indexFirstRecipe = indexLastRecipe - recipesPerPage // 0

    const currentRecipes = allRecipes.slice(indexFirstRecipe, indexLastRecipe);

    // paginado
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

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
    // función filtro por dietas
    function handleFilterDiets(e){
        // el e.target.value es lo mismo que el payload, es decir cada una de las opciones
        dispatch(filterRecipesByDiets(e.target.value))
    }

    // función filtro recetas creadas
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }
    // función ordenamiento alfabético asc/desc 
    function handleSort(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1) // para que ordene la primera página 
        setOrden(`Ordenado ${e.target.value}`)
    }

    // funciíon ordenamiento asc/desc por healthLevel
    function handleSortHealthLevel(e){
        e.preventDefault()
        dispatch(orderByHealthLevel(e.target.value))
        setCurrentPage(1) // para que ordene la primera página 
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <React.Fragment>
        <div>
            <div>
                <h1>Henry Food</h1>
                <Link to='/recipes'>Crear receta</Link>
                <br />
                <button onClick={e => handleClick(e)}>Volver a cargar recetas</button>
            </div>
            <div>
                <select name="Asc/Desc" id="" onChange={e => handleSort(e)}>
                    <option value="all">Orden alfabético</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>

                <select name="Asc/Desc" id="" onChange={e => handleSortHealthLevel(e)}>
                    <option value="all">Nivel de salud</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>

                <select name="" id="" onChange={e => handleFilterDiets(e)} className={home.cardRecipe}>
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

                <select name="" id="" onChange={e => handleFilterCreated(e)}>
                    <option value="all">Todas las recetas de la DB</option>
                    <option value="current">Existentes</option>
                    <option value="created">Creadas</option>
                </select>

                <Paginado
                    recipesPerPage = { recipesPerPage }
                    allRecipes = {allRecipes.length}
                    paginado = {paginado}
                />
            
                {
                    currentRecipes?.map((e) => {
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
        </React.Fragment>
    )
}