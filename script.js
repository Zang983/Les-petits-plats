import Search from './search.js'
import { recipes } from './data/recipes.js'

let search = new Search(recipes)

search.applyFilters()


let searchBar = document.querySelector("#searchBar input")


searchBar.addEventListener("input", (e) => {
    let value = e.target.value.trim().toLowerCase()
    if (value.length > 2) {
        search.applyFilters(value)
    }
    else if (value.length === 0) {
        search.applyFilters()
    }
})

let inputsFilters = document.querySelectorAll(".filter_search input")

for (let input of inputsFilters) {
    input.addEventListener("input", e => {
        let value = e.target.value.trim().toLowerCase()
        let lis = e.target.parentNode.parentNode.querySelectorAll("li")
        for (let li of lis) {
            li.getAttribute("data-name").toLowerCase().includes(value) ? li.classList.remove("hidden") : li.classList.add("hidden")
        }
    })
}

let inputs = document.querySelectorAll(".searchItem input")
let arrows = document.querySelectorAll(".arrow")
for (let arrow of arrows) {
    arrow.addEventListener("click", e => {
        for (let input of inputs) {
            input.value = ""
            let lis = input.parentNode.parentNode.querySelectorAll("li")
            let ul = input.parentNode.parentNode.querySelector("ul")
            ul.style.display=""
            for (let li of lis) {
                li.classList.remove("hidden")
            }
        }
        let target = e.target.parentNode.parentNode
        for (let arrow of arrows) {
            if (arrow.parentNode.parentNode != target)
                arrow.parentNode.parentNode.classList.remove("expanded")
        }
        target.classList.toggle("expanded")
    })
}



for (let input of inputs) {
    input.addEventListener("input", e => {
        let value = e.target.value.toLowerCase().trim();
        let filterWrapper = e.target.parentNode.parentNode
        let ul = filterWrapper.querySelector("ul")
        let itemsLi = ul.querySelectorAll("ul li")
        if (value.length >= 3) {
            /*
            if wrapper is close, we force ul display to grid and display only result of research
            */
            if (!filterWrapper.classList.contains("expanded")) {
                ul.style.display = "grid"
                for (let li of itemsLi) {
                    li.classList.add("hidden")
                    if (li.getAttribute("data-name").includes(value)) {
                        li.classList.remove("hidden")
                        li.addEventListener("click", () => {
                            ul.style.display = ""
                            for (let li of itemsLi) {
                                for (let input of inputs) {
                                    input.value = ""
                                }
                                li.classList.remove("hidden")
                            }
                        }, { once: true })
                    }
                }
            }
            /*
            Else we update all item list with research result
            */
            else {
                for (let li of itemsLi) {
                    li.classList.remove("hidden")
                    if (!li.getAttribute("data-name").includes(value)) {
                        li.classList.add("hidden")
                    }
                    else {
                        li.addEventListener("click", () => {
                            for (let input of inputs) {
                                input.value = ""
                            }
                        }, { once: true })
                    }
                }
            }
        }
        else {
            for (let li of itemsLi) {
                li.classList.remove("hidden")
            }
        }

    })
}
