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

fetch(
  'https://api.giphy.com/v1/gifs/search?api_key=6SKAmiNDQCidJGg2MJxxCRFgPHARNAnf&q=doggo&limit=50&offset=0&rating=PG-13&lang=en'
)
  .then(response => {
    // converts response to json
    return response.json()
    response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
  })
  .then(json => {
    const gif = json.data[1]
    const src = gif.images.original.mp4
    console.log(src)

    const video = createVideo(src)

    // grabs video elements and adds newly created videos to it
    const videosEl = document.querySelector('.videos')
    // videosEl.appendChild(video)

  })
  .catch(error => {

  })


  const searchEl = document.querySelector('.search-input')

  searchEl.addEventListener('keyup', () => {
    console.log(searchEl.value)
  })
