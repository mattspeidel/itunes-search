let results
let searchTerm
let cleanSearch

const songPlayer = document.querySelector('#songPlayer')

const searchButton = document.querySelector('#searchButton')
const searchBox = document.querySelector('#searchBox')

function displayResults (key) {
    const resultsDiv = document.createElement('div')
    resultsDiv.innerHTML = `
        <img src="${key.artworkUrl100}">
        <a id="eachResult" href="${key.previewUrl}">${key.trackName}</a>
        <h3>${key.artistName}</h3>
        <button id='resultButton' data-url="${key.previewUrl}">Play Sample</button>
    `
    return resultsDiv
}

searchButton.addEventListener('click', function () {
    searchBox.querySelector('input').focus()
    searchTerm = searchBox.querySelector('input').value
    cleanSearch = encodeURIComponent(searchTerm)
    results = document.querySelector('#searchResults')
    fetch(`https://itunes-api-proxy.glitch.me/search?term=${cleanSearch}&limit=25&media=music`)
        .then(function (response) {
            return response.json()
    })
        .then(function (data) {
            results.innerHTML = ''
            for (let key of data.results) {
                results.appendChild(displayResults(key))
            }
        })
})

document.querySelector('#searchResults').addEventListener('click', function (event) {
    if (event.target && event.target.matches('#resultButton')) {
        songPlayer.src = event.target.dataset['url']
        songPlayer.autoplay = true
    }
})