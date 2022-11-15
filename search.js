import { createCards } from './createCard.js'
import { firstLetterInCapital, resetFilterInputValue } from './utils.js'
export default class Search {

    constructor(recipesList) {
        this.originalList = [...recipesList]
        this.updatedList = []
        this.ingredientFilters = []
        this.applianceFilters = []
        this.ustensilFilters = []
        this.actualListIngredients = []
        this.actualListAppliances = []
        this.actualListUstensil = []
    }
    /**
     * Apply all filters on each event :
     * when first opening, inputs event, or filters event
     * @param {string} valueSearchBar 
     */
    applyFilters(valueSearchBar) {
        if (valueSearchBar === undefined || valueSearchBar === null) {
            valueSearchBar = document.querySelector("#searchBar input").value.trim().toLowerCase()
        }
        this.updatedList = []
        for (let recipe of this.originalList) {
            if (this.checkIngredient(recipe) || this.ingredientFilters.length === 0) {
                if (this.checkUstensils(recipe) || this.ustensilFilters.length === 0) {
                    if (this.checkAppliance(recipe) || this.applianceFilters.length != 1) {
                        this.updatedList.push(recipe)
                    }
                }
            }
        }

        if (valueSearchBar != "") {
            this.updatedList = this.applySearchBar(valueSearchBar)
        }

        /*
        after create the new list of recipe, update arrays and dom
        */

        this.updateArrayOfItems(this.updatedList)
        this.createLiDom(this.actualListIngredients, "#ingredients")
        this.createLiDom(this.actualListAppliances, "#appliances")
        this.createLiDom(this.actualListUstensil, "#ustensils")
        createCards(this.updatedList)
    }
    /**
     * Check for each recipe if value on search bar is includes in name, description or ingredients
     * @param {string} value 
     * @param {recipeObject} recipe 
     * @returns 
     */
    applySearchBar(value) {
        // let list = this.updatedList.filter(item =>
        //      item.name.toLowerCase().includes(value) 
        // ||   item.description.toLowerCase().includes(value)
        // ||    Object.values(item.ingredients).toLowerCase().includes(value))
        //  return list
        let list = this.updatedList.filter(item => {
            let explodeIngredients = Object.values(item.ingredients)
            let ingredients = []
            for (let item of explodeIngredients) {
                ingredients.push(item.ingredient.toLowerCase())
            }
            if (item.name.toLowerCase().includes(value) || item.description.toLowerCase().includes(value) || ingredients.toString().toLowerCase().includes(value)) {
                return 1
            }
        })

        return list
    }
    /**
     * This 3 functions will check if each item on filters Array are present on each recipe
     * @param {objectRecipe} recipe 
     * @returns 
     */
    checkIngredient(recipe) {
        let ingredientRecipe = []
        for (let filter of this.ingredientFilters) {
            for (let ingredient of recipe.ingredients) {
                ingredientRecipe.push(ingredient.ingredient.toLowerCase())
            }
            if (ingredientRecipe.indexOf(filter) === -1) {
                return false
            }
        }
        return true
    }
    checkAppliance(recipe) {
        for (let filter of this.applianceFilters) {
            if (recipe.appliance.toLowerCase() === filter.toLowerCase()) {
                return true
            }
        }
        return false

    }
    checkUstensils(recipe) {
        let ustensilRecipe = []
        for (let ustensil of recipe.ustensils) {
            ustensilRecipe.push(ustensil.toLowerCase())
        }
        for (let filter of this.ustensilFilters) {
            if (ustensilRecipe.indexOf(filter.toLowerCase()) === -1) {
                return false
            }
        }
        return true
    }
    /**
     * Update all array of items presents on filtered list
     * @param {[recipeObject]} recipeList 
     */
    updateArrayOfItems(recipeList) {
        this.actualListIngredients = []
        this.actualListAppliances = []
        this.actualListUstensil = []
        for (let recipe of recipeList) {
            for (let ingredient of recipe.ingredients) {
                if (this.actualListIngredients.indexOf(ingredient.ingredient.toLowerCase()) === -1) {
                    this.actualListIngredients.push(ingredient.ingredient.toLowerCase())
                }
            }
            for (let ustensil of recipe.ustensils) {
                if (this.actualListUstensil.indexOf(ustensil.toLowerCase()) === -1) {
                    this.actualListUstensil.push(ustensil.toLowerCase())
                }
            }
            if (this.actualListAppliances.indexOf(recipe.appliance.toLowerCase()) === -1) {
                this.actualListAppliances.push(recipe.appliance.toLowerCase())
            }
        }
    }
    /**
     * Create DOM Elements with event listener
     * contain is the id's target block
     * @param {[String]} list 
     * @param {String} contain 
     */
    createLiDom(list, contain) {
        let targetblock = document.querySelector(contain)
        targetblock.innerHTML = ""
        for (let item of list) {
            if (!this.alreadySelected(item, contain)) {
                let li = document.createElement("li")
                li.setAttribute("data-name", item)
                li.innerText = firstLetterInCapital(item)
                targetblock.append(li)
                li.addEventListener("click", e => {
                    resetFilterInputValue()
                    this.addItemFilter(item, contain)
                    this.createThumbnails(item, contain)
                })
            }
        }
    }
    /**
     * Check if an item is already present in filters list to don't duplicate them
     * contain is the id's target block
     * @param {string} item 
     * @param {string} contain 
     * @returns 
     */
    alreadySelected(item, contain) {
        let alreadySelected = false
        switch (contain) {
            case ("#ingredients"):
                for (let ingredient of this.ingredientFilters) {
                    item === ingredient ? alreadySelected = true : null
                }
                return alreadySelected
            case ("#ustensils"):
                for (let ustensils of this.ustensilFilters) {
                    item === ustensils ? alreadySelected = true : null
                }
                return alreadySelected
            case ("#appliances"):
                for (let appliance of this.applianceFilters) {
                    item === appliance ? alreadySelected = true : null
                }
                return alreadySelected
        }
    }

    addItemFilter(itemName, type) {
        switch (type) {
            case ("#ingredients"):
                this.ingredientFilters.push(itemName)
                break;
            case ("#ustensils"):
                this.ustensilFilters.push(itemName)
                break;
            case ("#appliances"):
                this.applianceFilters.push(itemName)
        }
        this.applyFilters()
    }
    removeFromList(itemName, type) {
        switch (type) {
            case ("#ingredients"):
                for (let i = 0; i < this.ingredientFilters.length; i++) {
                    if (this.ingredientFilters[i].toLowerCase() === itemName.toLowerCase()) {
                        this.ingredientFilters.splice(i, 1)
                    }
                }
                break;
            case ("#ustensils"):
                for (let i = 0; i < this.ustensilFilters.length; i++) {
                    if (this.ustensilFilters[i].toLowerCase() === itemName.toLowerCase()) {
                        this.ustensilFilters.splice(i, 1)
                    }
                }
                break;
            case ("#appliances"):
                for (let i = 0; i < this.applianceFilters.length; i++) {
                    if (this.applianceFilters[i].toLowerCase() === itemName.toLowerCase()) {
                        this.applianceFilters.splice(i, 1)
                    }
                }
        }
        this.applyFilters()
    }


    createThumbnails(item, contain) {
        let target = document.querySelector("#thumbnailsContain")
        let button = document.createElement("button")
        button.classList.add("thumbnails")
        switch (contain) {
            case ("#ingredients"):
                button.classList.add("blueBack")
                break;
            case ("#ustensils"):
                button.classList.add("orangeBack")
                break;
            case ("#appliances"):
                button.classList.add("greenBack")
        }
        let span = document.createElement("span")
        span.innerText = firstLetterInCapital(item)
        button.setAttribute("title", firstLetterInCapital(item))
        button.append(span)
        button.innerHTML += `<img src="./assets/images/closebtn.svg" alt="delete item filter">`
        target.append(button)
        button.addEventListener("click", (e) => {
            this.removeFromList(item, contain)
            resetFilterInputValue()
            e.path.length === 9 ? e.target.parentElement.remove() : e.target.remove()
        })
    }
}