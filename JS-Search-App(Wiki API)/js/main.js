import { setSearchFocus } from "./searchBar.js";
import { buildSearchResults } from "./searchResults.js";
import { getSearchTerm } from "./dataFunctions.js"

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {
    //set the focus
    setSearchFocus();

    // TODO: 3 listeners - clear text

    const form = document.getElementById("searchBar");
    form.addEventListener("submit", submitTheSearch);
}

//procedural 'workflow' function
const submitTheSearch = (event) => {
    event.preventDefault();
    // TODO:delete search resultz 

    // process the search
    processTheSearch();
    
    //set the focus
    setSearchFocus();
};

//procedural
const processTheSearch = async () => {
    //TODO:clear the stats line
    const searchTerm = getSearchTerm();
    if (searchTerm === "") return; //return if search term is empty
    const resultArray = await retrieveSearchResults(searchTerm);
    if (resultArray.length) { buildSearchResults(resultArray);
        // TODO:set stats line
    }
};