import { setSearchFocus } from "./searchBar.js";
import { getSearchTerm } from "./dataFunctions.js"

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {
    //set the focus
    setSearchFocus();

    // 3 listeners - clear text

    const form = document.getElementById("searchBar");
    form.addEventListener("submit", submitTheSearch);
}

//procedural 'workflow' function
const submitTheSearch = (event) => {
    event.preventDefault();
    // delete search resultz 

    // process the search
    processTheSearch();
    
    //set the focus
    setSearchFocus();
};

//procedural
const processTheSearch = async () => {
    //clear the stats line
    const searchTerm = getSearchTerm();
    if (searchTerm === "") return; //return if search term is empty
    const resultArray = await retrieveSearchResults(searchTerm);
};