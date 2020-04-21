const API_KEY = '6SKAmiNDQCidJGg2MJxxCRFgPHARNAnf'

// https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
const randomChoice = arr => {
    const randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
};

function createVideo (src) {
  const video = document.createElement('video')
  video.src = src
  video.muted = true
  video.autoplay = true
  video.loop = true
  video.className = 'video'

  console.log(video)
  return video
}

const searchGiphy = searchTerm => {
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
      const videosEl = document.querySelector('.videos')
      videosEl.appendChild(video)

    })
    .catch(error => {

    })
}


const searchEl = document.querySelector('.search-input')
const hintEl = document.querySelector('.search-hint')

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

searchEl.addEventListener('keyup', doSearch)
