
export function createCards(recipesList) {
    let main = document.querySelector("main")
    main.innerHTML = ""
    if(recipesList.length != 0){
        for (let recipe of recipesList) {
            let figure = document.createElement("figure")
            let svg =
                `<svg width="20" class="timer_logo" height="20" viewBox="0 0 20 20" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z"
            fill="black" /></svg>`
            let img = document.createElement('img')
            img.setAttribute("src", "./assets/images/defaultImg.png")
            img.setAttribute("img", `Image d'un ${recipe.name}`)
    
            let figcaption = document.createElement('figcaption')
            let h3 = document.createElement('h3')
            h3.innerHTML =
                `<span title="${recipe.name}">${recipe.name}</span><div>${svg}${recipe.time} min</div>`
    
            let divRecipe = document.createElement("div")
            divRecipe.classList.add("recipe")
            let ul = document.createElement("ul")
            ul.classList.add("ingredient_list")
    
            for (let ingredient of recipe.ingredients) {
                let unit = ingredient.unit ? ingredient.unit : ""
                let quantity = ingredient.quantity ? ingredient.quantity : ""
                let li = document.createElement("li")
                let troncatedUnit = ""
                switch (unit) {
                    case ("grammes"):
                        troncatedUnit = "gr"
                        break;
                    case ("cuillères à soupe"):
                        troncatedUnit = "cuil. à soupe"
                        break;
                    case ("barquettes"):
                        troncatedUnit = "barq"
                        break;
                    default:
                        troncatedUnit = unit
                        break;
                }
                li.innerHTML = `<span class="bold">${ingredient.ingredient} : </span> <span title=${unit}>${quantity} ${troncatedUnit}</span>`
                ul.append(li)
            }
            let span = document.createElement("span")
            let p = document.createElement("p")
            p.innerText = recipe.description
            p.setAttribute("title",recipe.description)
            span.append(p)
            divRecipe.append(ul, span)
            figcaption.append(h3, divRecipe)
            figure.append(img, figcaption)
            main.append(figure)
        }    for (let recipe of recipesList) {
            let figure = document.createElement("figure")
            let svg =
                `<svg width="20" class="timer_logo" height="20" viewBox="0 0 20 20" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z"
            fill="black" /></svg>`
            let img = document.createElement('img')
            img.setAttribute("src", "./assets/images/defaultImg.png")
            img.setAttribute("img", `Image d'un ${recipe.name}`)
    
            let figcaption = document.createElement('figcaption')
            let h3 = document.createElement('h3')
            h3.innerHTML =
                `<span title="${recipe.name}">${recipe.name}</span><div>${svg}${recipe.time} min</div>`
    
            let divRecipe = document.createElement("div")
            divRecipe.classList.add("recipe")
            let ul = document.createElement("ul")
            ul.classList.add("ingredient_list")
    
            for (let ingredient of recipe.ingredients) {
                let unit = ingredient.unit ? ingredient.unit : ""
                let quantity = ingredient.quantity ? ingredient.quantity : ""
                let li = document.createElement("li")
                let troncatedUnit = ""
                switch (unit) {
                    case ("grammes"):
                        troncatedUnit = "gr"
                        break;
                    case ("cuillères à soupe"):
                        troncatedUnit = "cuil. à soupe"
                        break;
                    case ("barquettes"):
                        troncatedUnit = "barq"
                        break;
                    default:
                        troncatedUnit = unit
                        break;
                }
                li.innerHTML = `<span class="bold">${ingredient.ingredient} : </span> <span title=${unit}>${quantity} ${troncatedUnit}</span>`
                ul.append(li)
            }
            let span = document.createElement("span")
            let p = document.createElement("p")
            p.innerText = recipe.description
            p.setAttribute("title",recipe.description)
            span.append(p)
            divRecipe.append(ul, span)
            figcaption.append(h3, divRecipe)
            figure.append(img, figcaption)
            main.append(figure)
        }
    }
    else{
        let h2 = document.createElement("h2")
        h2.innerText = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
        main.append(h2)
    }

}
