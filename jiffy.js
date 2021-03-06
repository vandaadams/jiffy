const API_KEY = '6SKAmiNDQCidJGg2MJxxCRFgPHARNAnf'

const videosEl = document.querySelector('.videos')
const searchEl = document.querySelector('.search-input')
const hintEl = document.querySelector('.search-hint')
const clearEl = document.querySelector('.search-clear')

// https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
const randomChoice = arr => {
    const randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
};

const createVideo = src => {
  const video = document.createElement('video')
  video.src = src
  video.muted = true
  video.autoplay = true
  video.loop = true
  video.className = 'video'

  console.log(video)
  return video
}

// adds loading spinner
const toggleLoading = state => {
  console.log('loading', state)
  // toggles between on and off
  if (state) {
    // adds loading class
    document.body.classList.add('loading')
    searchEl.disabled = true
  } else {
    // removes loading class
    document.body.classList.remove('loading')
    searchEl.disabled = false
    searchEl.focus()
  }
}

// changes loading hint to 'see more
const searchGiphy = searchTerm => {
  toggleLoading(true);
  console.log('search for', searchTerm)

  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=50&offset=0&rating=PG-13&lang=en`
  )
    .then(response => {
      // converts response to json
      return response.json()
      response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
    })
    .then(json => {
      const gif = randomChoice(json.data)
      const src = gif.images.original.mp4
      console.log(src)

      const video = createVideo(src)

      // grabs video elements and adds newly created videos to it

      videosEl.appendChild(video)

      video.addEventListener('loadeddata', event => {
        video.classList.add('visible')
        toggleLoading(false)
        document.body.classList.add('has-results')
        hintEl.innerHTML = `Hit enter to search more ${searchTerm}`
      })
    })
    .catch(error => {
      toggleLoading(false)
      // display error message for user
      hintEl.innerHTML = `Nothing found for ${searchTerm}`
    })
}

const doSearch = event => {
  const searchTerm = searchEl.value

  if (searchTerm.length > 2) {
    // sets the text to embed the variable as hint suggestion
    hintEl.innerHTML = `Hit enter to search ${searchTerm}`
    document.body.classList.add('show-hint')
  } else {
    document.body.classList.remove('show-hint')
  }

  if (event.key === 'Enter' && searchTerm.length > 2) {
    searchGiphy(searchTerm);
  }
}

const clearSearch = event => {
  document.body.classList.remove('has-results')
  videosEl.innerHTML = ''
  hintEl.innerHTML = ''
  searchEl.value = ''
  searchEl.focus()
}

document.addEventListener('keyup', event => {
  if (event.key === 'Escape') {
    clearSearch()
  }
})

searchEl.addEventListener('keyup', doSearch)
clearEl.addEventListener('click', clearSearch)
