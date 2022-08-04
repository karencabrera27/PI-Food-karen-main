
const initialState = {
//     // tiene el estado de las recetas
    recipes : [],
    copyAllRecipes: [],
    diets : [],
    detail: []
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
        case 'SEARCH_RECIPE':
            return{
                ...state,
                recipes: action.payload
            }
        case 'GET_DETAILS':
            return{
                ...state,
                detail: action.payload
            }
        case 'POST_RECIPES':
            return{
                ...state
            }
        
        case 'GET_DIETS':
            return{
                ...state,
                diets: action.payload
            }
        case 'FILTER_BY_DIETS':
            const allRecipes = state.copyAllRecipes;
            const dietFilter = action.payload === "all" ? allRecipes : allRecipes.filter(e => e.diets?.some(d => d === action.payload))
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
        case 'ORDER_BY_NAME':
            const sortArr = action.payload === 'asc' ? state.recipes.sort(function(a, b){
                // a.name = recipes.names
                if(a.name > b.name){
                    return 1
                }
                if(b.name > a.name){
                    return -1
                }
                // en el caso que sean iguales los deja como están 
                return 0
            }) :
            state.recipes.sort(function(a, b){
                // a.name = recipes.names
                if(a.name > b.name){
                    return -1
                }
                if(b.name > a.name){
                    return 1
                }
                // en el caso que sean iguales los deja como están 
                return 0
            })

            return{
                ...state,
                recipes: sortArr
            }
        case 'ORBER_BY_HEALTH_LEVEL':
            const sortAr = action.payload === 'asc' ? state.recipes.sort(function(a, b){
                // a.name = recipes.names
                if(a.healthLevel > b.healthLevel){
                    return 1
                }
                if(b.healthLevel > a.healthLevel){
                    return -1
                }
                // en el caso que sean iguales los deja como están 
                return 0
            }) :
            state.recipes.sort(function(a, b){
                // a.name = recipes.names
                if(a.healthLevel > b.healthLevel){
                    return -1
                }
                if(b.healthLevel > a.healthLevel){
                    return 1
                }
                // en el caso que sean iguales los deja como están 
                return 0
            })
            return{
                ...state,
                recipes: sortAr
            }
        case 'CLEAR':
            return{
                ...state,
                detail: action.payload
            }
            
        
        
        default:
            return {...state}
    }
}

