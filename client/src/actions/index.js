import axios from 'axios';


// Obtener todas las dietas
export function getRecipes(){

    return function(dispatch){
        axios.get(`/recipes`)
        .then(recetas =>
            dispatch({
                type: "GET_RECIPES",
                payload: recetas.data
            })
        )
        .catch(error => console.log(error))
        }
}

// Filtro por dietas

export function filterRecipesByDiets(payload){
    console.log(payload)
    return{
        type: 'FILTER_BY_DIETS',
        payload
    }
}

// Filtro por recetas creadas

export function filterCreated(payload){
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

// filtro por odernamiento alfabético

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

// filtro por nivel de salud

export function orderByHealthLevel(payload){
    return{
        type: 'ORBER_BY_HEALTH_LEVEL',
        payload
    }
}

// Barra de búsqueda

export function getNameRecipes(name){
    return async function(dispatch){
        try {
            const busqueda = await axios.get(`/recipes?name=${name}`)
            return dispatch({
                type: 'SEARCH_RECIPE',
                payload: busqueda.data
            })
        } catch (error) {
            alert("Receta inexistente")
        }
    }
}

//  despacha la ruta de dietas

export function getDiets(){
    return async function(dispatch){
        try {
            const dieta = axios.get(`/diets`)
            return dispatch({
                type: 'GET_DIET',
                payload: dieta.data
            })
        } catch (error) {
            
        }
    }
}
// obtener detalles
export default function getDetail(id){
    // 
    return async function(dispatch){
        console.log(getDetail, "action")
        try {
            const detalle = await axios.get(`/recipes/${id}`)
            console.log(detalle.data, "data")
            return dispatch({
                type: "GET_DETAILS",
                payload: detalle.data
            })
        } catch (error) {
            console.log(error)
        } 
    }
    
}

// post recetas

export function postRecipes(payload){
    return async function(dispatch){
        const post = await axios.post(`/recipes`, payload)
        console.log(post)
        return post
    }
}

// limpiar
export function clear(){
    return {
        type: 'CLEAR',
        payload: []
    }
}
