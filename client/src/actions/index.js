import axios from 'axios';

export const GET_RECIPES = "GET_RECIPES";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const FILTER_CREATED = "FILTER_CREATED";

// Obtener todas las dietas
export function getRecipes(){
// devuelve una función asíncrona que recibe como parámetro el dislpatch

    return function(dispatch){
        axios.get(`http://localhost:3001/recipes`)
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
            const busqueda = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({
                type: 'SEARCH_RECIPE',
                payload: busqueda.data
            })
        } catch (error) {
            alert("Receta inexistente")
        }
    }
    // return async function(dispatch){
    //     try {
    //         var json = axios.get('localhost:3001/recipes?name=' + name)
    //         // despacho la acción
    //         return dispatch({
    //             type: 'GET_NAME_RECIPE',
    //             payload: json.data
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}

// acción que despacha la ruta de dietas

export function getDiets(){
    return async function(dispatch){
        try {
            const dieta = axios.get(`http://localhost:3001/diets`)
            return dispatch({
                type: 'GET_DIET',
                payload: dieta.data
            })
        } catch (error) {
            
        }
    }
}

export default function getDetail(id){
    return async function(dispatch){
        try {
            const detalle = await axios.get(`http://localhost:3001/recipes/${id}`)
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
        const post = await axios.post('http://localhost:3001/recipes', payload)
        console.log(post)
        return post
    }
}


//     return async function(dispatch){
// //     //     // creo una variable la cual tiene la ruta del get para obtener todas las recetas
// //     //     // aca sucede toda la conexión entre el front y el back
//         var json = await axios.get('https://localhost:3001/recipes', {

//         });

//         return dispatch({
//             type: GET_RECIPES,
//             payload: json.data
//         })
//     }
//     return function(dispatch){
//         axios.get(`http://localhost:3001/recipes`)
//        .then(recetas =>
//            dispatch({
//                type: "GET_RECIPES",
//                payload: recetas.data
//            })
//        )
//        .catch(error => console.log(error))
//    }

// detalles

// export default function getDetail(id){
//     return async function(dispatch){
//         try {
//             var json = await axios.get('http://localhost:3001/recipes/' + id)
//             return dispatch({
//                 type: 'GET_DETAILS',
//                 payload: json.data
//             })
            
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }