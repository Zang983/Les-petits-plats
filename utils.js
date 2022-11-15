export function firstLetterInCapital(string)
{
    return string.charAt(0).toUpperCase()+string.substr(1)
}

export function resetFilterInputValue(){
    let filters = document.querySelectorAll(".filter_search input")
    for(let filter of filters){
        filter.value = ""
    }
}