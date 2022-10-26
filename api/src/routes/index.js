const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');

const { API_KEY } = process.env;

const { Recipe, Diet } = require('../db');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// trae info de la API
const getApiInfo = async () => {
    try {
        const infoApi = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=812cb489ed154b7a947966330eec4b8d&addRecipeInformation=true&number=100`)
        const apiData = infoApi.data?.results.map((e)=>{
            return {
                id: e.id,
                name: e.title,
                resume: e.summary,
                healthLevel: e.healthScore,
                image: e.image || "https://saboryestilo.com.mx/wp-content/uploads/2020/01/tips-para-hacer-la-mejor-carne-asada-1200x900.jpg",
                steps: (e.analyzedInstructions[0] && e.analyzedInstructions[0].steps? e.analyzedInstructions[0].steps.map(s => s.step).join(" \n"):''),
                diets: e.diets
            }
        })
        return apiData
    } catch(err){
        console.log(err)
    }
}

// trae info de la DB
    const getDbInfo = async () =>{
        return await Recipe.findAll({
            include:{
                model: Diet,
                attributes: ["name"],
                through: {
                    attributes: []
                },
            },
        }) 
    }

// concatena ambas info -> API-DB

const getAllInfo = async () =>{
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const infoTotal = await apiInfo.concat(dbInfo)
    
    return infoTotal //arreglo
}


// OBTENER DIETAS POR QUERY
//  localhost:3001/recipes?name=homemade
    router.get("/recipes", async(req, res, next)=>{
        try {
            const { name } = req.query
            const recetas = await getAllInfo();
            if(name){
                const nombreQuery = recetas.filter(rec => rec.name.toLowerCase().includes(name.toLowerCase()))
                if(nombreQuery.length > 0){
                    res.status(200).json(nombreQuery)
              }else{
                  res.status(404).send("No se encontró la receta con ese nombre")
              }
            }else{
                res.send(recetas)
            }
            
        } catch (error) {
            next(error)
        }
     });

// RUTA DE RECETAS POR ID -> GET /recipes/{idReceta}:
// para traer una recet de la base de datos se usa el UUID

router.get('/recipes/:id', async(req, res, next) =>{
    try {
        const { id } = req.params
        const recipesTotal = await getAllInfo()

        if (id) {
            const recipeId = recipesTotal.filter(el => el.id.toString() === id.toString());
            recipeId.length ?
                res.status(200).json(recipeId) :
                res.status(400).send("Recipe not found")
        }
    } catch (error) {
        next(error)
    }
})

//  RUTA PARA CREAR UNA RECETA  POST /recipe:

router.post('/recipes', async (req, res, next)=> {
    
    try{
        const { name, resume, healthLevel, steps, image, diets } = req.body
        
        const recetaCreada = await Recipe.create({ 
            // no le paso diet porque hay que hacer la relacion aparte
             
             name,
             resume,
             healthLevel,
             steps,
             image: image 
            //  || "https://saboryestilo.com.mx/wp-content/uploads/2020/01/tips-para-hacer-la-mejor-carne-asada-1200x900.jpg"
        })
        const dietDb = await Diet.findAll({
            // se debe encontrar en el modelo diet 
            // donde el name sea igual a diet que llega por body
            where:{
                name: diets
            }
        })
        console.log(dietDb);
        // a la receta creada se le agrega la dieta
        await recetaCreada.addDiet(dietDb);
        
        res.status(200).send('¡Receta creada exitosamente!')
    }
     catch(error){
        next(error)
    }
})


// RUTA DE DIETAS GET /types:

// trae la info de la api y lo guarda en la base de datos
router.get('/diets', async (req, res, next) =>{
    
    const tipoDeDietas = ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan", "paleolithic", "primal", "whole 30",
    "fodmap friendly", "vegetarian", "pescatarian", "ketogenic"];

    try {
        
        tipoDeDietas.forEach(diets =>{
            // busca o crea en el modelo Diet
            Diet.findOrCreate({
                where: {
                    // con este nombre
                    name: diets
                }
            })
        })
        const dietas = await Diet.findAll()
        res.status(200).send(dietas)
    } catch (error) {
        next(error)
}
})

module.exports = router;
