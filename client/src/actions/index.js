import axios from 'axios';

export const GET_RECIPES = "GET_RECIPES";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";

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
