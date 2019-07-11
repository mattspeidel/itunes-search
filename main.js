let results

const searchButton = document.querySelector('#searchButton')
const searchBox = document.querySelector('#searchBox')

searchButton.addEventListener('click', function () {
    searchBox.querySelector('input').focus()
})