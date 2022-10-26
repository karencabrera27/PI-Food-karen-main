import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { getRecipes, filterRecipesByDiets, filterCreated, orderByName, orderByHealthLevel } from "../../actions/index";

import getDetail from "../../actions/index";


import { Link } from "react-router-dom";


import Card from "../Cards/Cards";

import Paginado from "../Pagination/Pagination";


import SearchBar from "../SearchBar/SearchBar";

import home from '../Home/home.module.css';



export default function Home(){
   
    const dispatch = useDispatch();

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
            dispatch(getRecipes())
            
        }, [dispatch]
    ) 

    
    // funcion para el boton
    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }
    // función filtro por dietas
    function handleFilterDiets(e){
        
        e.preventDefault()
        dispatch(filterRecipesByDiets(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    // función filtro recetas creadas
    function handleFilterCreated(e){
        e.preventDefault()
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
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
        
            
        <div className={home.container}>
            
            <h1 className="titulo">Henry Food</h1>
            <div className={home.container2}>
            <div className={home.containerBotones}>
                <Link to='/recipes' className={home.crearReceta}>Crear receta</Link>
                <br />

                <Link to= '/home'className={home.crearReceta} onClick={e => handleClick(e)}>Volver a cargar recetas</Link>
            </div>
            <div className={home.filtros}><label className={home.filtros}>Order alfabético</label>
                <select className={home.select} name="Asc/Desc" id="" onChange={e => handleSort(e)}>
                    <option value="all">All</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <label className={home.filtros}>Nivel de salud</label>
                <select className={home.select} name="Asc/Desc" id="" onChange={e => handleSortHealthLevel(e)}>
                    <option value="all">All</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <label className={home.filtros}>Dietas</label>
                <select className={home.select} name="" id="" onChange={e => handleFilterDiets(e)}>
                    {/* el value es lo mismo que el e.target.value */}
                    <option value="all">All</option>
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
                <label className={home.filtros}>Creacion</label>
                <select className={home.select} name="" id="" onChange={e => handleFilterCreated(e)}>
                    <option value="all">Todas las recetas de la DB</option>
                    <option value="current">Existentes</option>
                    <option value="created">Creadas</option>
                </select>
            </div>
            </div>
            <div className={home.containerFiltros}>
                

                <Paginado 
                    recipesPerPage = { recipesPerPage }
                    allRecipes = {allRecipes.length}
                    paginado = {paginado}
                />

                <SearchBar
                    setCurrentPage={setCurrentPage}
                />
                <div className={home.containerCards}>
                    {
                        currentRecipes.length? (currentRecipes.map((e) => {
                            return(
                                <div key={e.id}>
                                   
                                        <Link to={`/recipes/${e.id}`} className={home.card}>
                                            <Card onClick={()=>dispatch(getDetail(e.id))} name={e.name} diets={e.diets} image={e.image ? e.image : e.img} key={e.id}/>
                                        </Link>
                                    
                                </div>
                            );
                        })
                    )  : (
                        <div className={home.contLoader}>
                            <div className={home.spinner}>
                    <span className={home.span}>L</span>
                    <span className={home.span}>O</span>
                    <span className={home.span}>A</span>
                    <span className={home.span}>D</span>
                    <span className={home.span}>I</span>
                    <span className={home.span}>N</span>
                    <span className={home.span}>G</span>
                  </div>
                        </div>
                    )
                }
                </div>
            </div>
        </div>
        </React.Fragment>
    )
}