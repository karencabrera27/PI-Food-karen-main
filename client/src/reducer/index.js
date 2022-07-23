
const initialState = {
//     // tiene el estado de las recetas
    recipes : [],
//     recipesCopy: []
}
// 

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_RECIPES':
            return {
//                 // guardamos el estado
                ...state,
//                 // en el estado recipes, que en principio es un arrgelo vacío, manda todo lo que mande la acción de recetas
                recipes: action.payload,
//                 recipesCopy: action.payload
            }
        default:
            return {...state}
    }
}

