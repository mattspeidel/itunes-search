let results
let searchTerm
let cleanSearch

let searchAttr = document.querySelector('#searchTerm')
const songPlayer = document.querySelector('#songPlayer')
let el = document.querySelector('.songNowPlaying')

const searchButton = document.querySelector('#searchButton')
const searchBox = document.querySelector('#searchBox')

function displayResults (key) {
    const resultsDiv = document.createElement('div')
    resultsDiv.classList.add('individualResult')
    resultsDiv.innerHTML = `
        <img class='coverArt' src="${key.artworkUrl100}">
        <br>
        <em>${key.trackName}</em>
        <h3>${key.artistName}</h3>
        <button id='resultButton' class='buttons' type='button' data-url="${key.previewUrl}" data-track="${key.trackName}" data-artist="${key.artistName}">Play Sample</button>
    `
    return resultsDiv
}

searchButton.addEventListener('click', function () {
    searchBox.querySelector('input').focus()
    searchTerm = searchBox.querySelector('input').value
    cleanSearch = encodeURIComponent(searchTerm)
    results = document.querySelector('#searchResults')
    fetch(`https://itunes-api-proxy.glitch.me/search?term=${cleanSearch}&limit=25&media=music${searchAttr.value}`)
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

document.querySelector("#searchInput").addEventListener("keyup", event => {
    if(event.key !== "Enter") return;
    document.querySelector("#searchButton").click()
    event.preventDefault()
});

document.querySelector('#searchResults').addEventListener('click', function (event) {
    if (event.target && event.target.matches('#resultButton')) {
        songPlayer.src = event.target.dataset['url']
        songPlayer.autoplay = true      
        var newEl = document.createElement('p')
        newEl.classList.add('songNowPlaying')
        var trackName = event.target.dataset['track']
        var artistName = event.target.dataset['artist']
        newEl.innerHTML = `<strong>Now playing: </strong>${trackName} by ${artistName}`
        el.parentNode.replaceChild(newEl, el)
        el = document.querySelector('.songNowPlaying')
    }
})