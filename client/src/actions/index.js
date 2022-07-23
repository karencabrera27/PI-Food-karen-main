import axios from 'axios';

export const GET_RECIPES = "GET_RECIPES";

export function getRecipes(){
//     // devuelve una función asíncrona que recibe como parámetro el dislpatch

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