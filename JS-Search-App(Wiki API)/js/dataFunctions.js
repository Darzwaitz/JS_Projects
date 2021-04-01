//grab search term from input and trim whitespace
//replace extra spaces with one space, when more than one, with the regex
export const getSearchTerm = () => {
    const rawSearchTerm = document.getElementById("search").value.trim();
    const regex = /[ ]{2,}/gi;
    const searchTerm = rawSearchTerm.replaceAll(regex, " ");
    return searchTerm;
}

//retrieve search results
export const retrieveSearchResults = async (searchTerm) => {
    const wikiSearchString = getWikiSearchString(searchTerm);
    const wikiSearchResults = await requestData(wikiSearchString);
    let resultArray = [];
    if (wikiSearchResults.hasOwnProperty("query")) {
        resultArray = processWikiResults(wikiSearchResults.query.pages);
    }
    return resultArray;
};

const getWikiSearchString = (searchTerm) => {
    const maxChars = getMaxChars();
    const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;

    //ie. takes care of the spaces in words eg this%example
    const searchString = encodeURI(rawSearchString);

    return searchString;

};

const getMaxChars = () => {
    const width = window.innerWidth || document.body.clientWidth;
    let maxChars;
    if (width < 414) maxChars = 65;
    if (width >= 414 && width < 1400) maxChars = 100;
    if (width >= 1400) maxChars = 130;
    return maxChars;
};

const requestData = async (searchString) => {
    try {
        const response = await fetch(searchString);
        const data = await response.json();
        return data;
    }catch (err) {
        console.error(err);
    }
};

const processWikiResults = (results) => {
    const resultArray = [];
    // The Object.keys() method returns an array of a given object's own enumerable property *names*, iterated in the same order that a normal loop would
    Object.keys(results).forEach(key => {
        const id = key;
        const title = results[key].title;
        const text = results[key].extract;
        const img = results[key].hasOwnProperty("thumbnail")
            ? results[key].thumbnail.source
            : null;
        const item = {
            id,    // id:id,
            title,
            img,
            text
        };
        resultArray.push(item);
    }); // /forEach
    return resultArray;
};