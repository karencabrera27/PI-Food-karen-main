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
        const infoApi = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=d4a4ee5326a9432291457a6f2131e9ea&addRecipeInformation=true&number=100`)
        const apiData = infoApi.data?.results.map((e)=>{
            return {
                id: e.id,
                name: e.title,
                resume: e.summary,
                healthLevel: e.healthScore,
                image: e.image,
                steps: (e.analyzedInstructions[0] && e.analyzedInstructions[0].steps? e.analyzedInstructions[0].steps.map(s => s.step).join(" \n"):''),
                diet: e.diets
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
                as: "diets",
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

// router.get('/recipes', async (req, res) => {
    // busca un name por query
    // const name = req.query.name;

    // llama a la funcion de arriba
    // let recipesTotal = await getAllRecipe();


    // if(name){
    //     // hace un filtrado 
    //     let recipeName = await recipesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
    //     recipeName.length ?
    //     res.status(200).send(recipeName) :
    //     res.status(404).send('No se encontró la receta');
    // } else{
    //     res.status(200).send(recipesTotal)
    // }
    
    // res.send('Hola')

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
// })

// router.get('/diets', async (req, res)=>{
//     const dietsApi = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=d4a4ee5326a9432291457a6f2131e9ea&addRecipeInformation=true&number=100`)
//     const diets = dietsApi.data.map(e => e.diet) // devuelve muchos arreglos
//     // con la variable dietEach ingresa a cada uno de los arreglos anteriores
//     const dietEach = diets.map(e => {
//         // recorre cada elemento del arrglo y devuelve el valor de cada posición
//         for (let i = 0; i < e.length; i++) {
//             return e[i];
//         }
//         console.log(dietEach)
//     })
//     dietEach.forEach(element => {
//         // entra al modelo Diet y hace un findOrCreate
//         // se fija si está y si no está lo crea
//         Diet.findOrCreate({
//             // crea en dietas, las dietas que se paso, con el nombre del elemento
//             where: { name: e }
//         })
//     });
//     const allDiets = await Diet.findAll();
//     res.send(allDiets);
// })

// ruta de recetas por id

// para traer una recet de la base de datos se usa el UUID

router.get('/recipes/:id', async(req, res, next) =>{
    try {
        const { id } = req.params
        const recetaId = await getAllInfo()

        if (id) {
            const recipeId = recetaId.filter(el => el.id.toString() === id.toString());
            if (recipeId.length > 0) res.status(200).send(recipeId)
            else res.status(404).json("No recipes with that ID" )
        }
    } catch (error) {
        next(error)
    }
})

//  post

router.post('/recipes', async (req, res, next)=> {
    // hago un destructuring y recibe esas variables por body
    // estos datos los saco del modelo

    try{
        const { name, resume, healthLevel, stepByStep, image, diet } = req.body
        // let id = Math.floor(Math.random()*12345)
        const recetaCreada = await Recipe.create({ 
            // no le paso diet porque hay que hacer la relacion aparte
            //  id,
             name,
             resume,
             healthLevel,
             stepByStep,
             image
        })
        const dietDb = await Diet.findAll({
            // se debe encontrar en el modelo diet 
            // donde el name sea igual a diet que llega por body
            where:{
                name: diet
            }
        })
        // a la receta creada se le agrega la dieta
        await recetaCreada.addDiet(dietDb);
        
        res.status(200).send('¡Receta creada exitosamente!')
    }
     catch(error){
        next(error)
    }
    

    // {
    //     "name": "Chipa",
    //     "resume": "Designa genéricamente a un conjunto de tortas de diverso tipo que tienen al maíz o al almidón de mandioca como base de preparación y que forman parte del denominado «tyra», término guaraní que sirve para designar todo alimento que se consume para acompañar el mate cocido, la leche o el café",
    //     "healthLevel": 62,
    //     "stepByStep": "Cortar el queso en cubos pequeños. Los pueden rallar si prefieren o procesar. Como más les gusta. Reservar. Derretir la manteca y agregar los huevos y la sal. Mezclar bien. Calentar la leche y reservar. En un bol colocar el almidón de mandioca y hacer un huevo en el centro. Verter la mezcla de manteca/huevo/sal y usando una cuchara de madera o una espátula mezclar lentamente desde el centro e ir incorporando el almidón de a poco. Agregar mitad del queso y la mitad de la leche y continúen mezclando. Va a ser cada vez más difícil de mezclar, pero persistan. Una vez incorporados el queso y la leche a la masa agregar lo que queda y continuar mezclando con la cuchara/ espátula hasta que los líquidos estén bien incorporados. Ahora pueden terminar de trabajar la masa con las manos (en el bol o la mesada como prefieran). Después de unos minutos se va a formar una masa lisa y uniforme. Sean pacientes, No agreguen liquido extra, incluso cuando piensen que la masa lo necesita. No se tienten.",
    //     "image": "https://cdn.cookwithbelula.com/receta/chipas/chipas-0.webp",
    //     "diet": ["gluten fre"]
    // }
    // let {
    //     name,
    //     resume,
    //     healthLevel,
    //     image,
    //     stepByStep,
    //     createdInDb,
    //     diet
    // } = req.body;

    // let recetaCreada = await Recipe.create({
    //     
    //     name,
    //     resume,
    //     healthLevel,
    //     image,
    //     stepByStep,
    //     createdInDb
    // })
    // // relacion
    // let dietDb = await Diet.findAll({
    //     // se debe encontrar en el modelo diet 
    //     // donde el name sea igual a diet que llega por body
    //     where: {
    //         name: diet
    //     }
    // })
    // // a la receta creada se le agrega la dieta
    // await recetaCreada.addDiet(dietDb);

    // res.send("Receta creada con éxito")
})


// ruta de dietas

// trae la info de la api y lo guarda en la base de datos
router.get('/diets', async (req, res, next) =>{
    // crea un arreglo con todos los tipos de dietas
    const tipoDeDietas = ["gluten free", "dairy free", "lacto ovo vegetarian", "vegan", "paleolithic", "primal", "whole 30",
    "fodmap friendly", "vegetarian", "pescatarian", "ketogenic"];

    try {
        // recorre todo el arreglo con el forEach
        tipoDeDietas.forEach(diet =>{
            // busca o crea en el modelo Diet
            Diet.findOrCreate({
                where: {
                    // con este nombre
                    name: diet
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
