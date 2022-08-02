import React from "react";

export default function Paginado({ recipesPerPage, allRecipes, paginado}){
    const pageNumbers = [];

    // el math.ceil va a redondear para arriba el resultado de dividir la cantidad de todas las recetas por la cantidad de recetas por pagina
    for (let i = 0; i < Math.ceil(allRecipes/recipesPerPage); i++) {
        // pusheo el resultado del math.ceil
        pageNumbers.push(i + 1) // el +1 es para que renderice a partir de la pagina 1 y no desde 0
    }

    return(
        <nav>
            <ul className="paginado">
                {/* primero comprobar si el arreglo pageNumber tiene algo
                en caso de que si, se le hace un map
                 */}
                {
                    pageNumbers &&
                    pageNumbers.map(number => {
                        return(
                            <button onClick={() => paginado(number)}>{number}</button>
                        )
                    })
                }
            </ul>
        </nav>
    )
}