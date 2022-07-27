
const initialState = {
//     // tiene el estado de las recetas
    recipes : [],
    copyAllRecipes: []
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
                copyAllRecipes: action.payload
            }
        case 'FILTER_BY_DIETS':
            const allRecipes = state.copyAllRecipes;
            const dietFilter = action.payload === "all" ? allRecipes : allRecipes.filter(e => e.diet?.some(d => d === action.payload))
            return {
                ...state,
                recipes: dietFilter
            }
        case 'FILTER_CREATED':
            const allrecipes = state.copyAllRecipes
            const createdFilter = action.payload === 'created' ? allrecipes.filter( e => e.createdInDb) : allrecipes.filter(e => !e.createdInDb)

            return{
                ...state,
                recipes: action.payload === 'all' ? state.copyAllRecipes : createdFilter
            }
        default:
            return {...state}
    }
}

