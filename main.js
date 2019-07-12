let results
let searchTerm
let cleanSearch

const searchButton = document.querySelector('#searchButton')
const searchBox = document.querySelector('#searchBox')

function displayResults (key) {
    const resultsDiv = document.createElement('div')
    resultsDiv.innerHTML = `
        <img src="${key.artworkUrl100}">
        <a id="#eachresult" href="${key.previewUrl}">${key.trackName}</a>
        <h3>${key.artistName}</h3>
    `
    return resultsDiv
}

searchButton.addEventListener('click', function () {
    searchBox.querySelector('input').focus()
    searchTerm = searchBox.querySelector('input').value
    cleanSearch = encodeURIComponent(searchTerm)
    results = document.querySelector('#searchResults')
    fetch(`https://itunes.apple.com/search?term=${cleanSearch}&limit=25&media=music`)
        .then(function (response) {
            return response.json()
    })
        .then(function (data) {
            console.log(data)
            results.innerHTML = ''
            for (let key of data.results) {
                results.appendChild(displayResults(key))
            }
        })
})




// this is the click to play music thing
document.querySelector('#searchResults').addEventListener('click', function (event) {
    if (event.target && event.target.matches('#eachResult')) {
        playSample(event.target.dataset['url'])
    }
})

