const formatTime = function (time) {
  let min
  let sec
  if (time / 60 < 10) {
    min = '0' + parseInt(time / 60)
  } else {
    min = parseInt(time / 60)
  }
  if (time % 60 < 10) {
    sec = '0' + parseInt(time % 60)
  } else {
    sec = parseInt(time % 60)
  }
  return `${min}:${sec}`
}

export const audioControl = function () {
  const audio = document.getElementsByClassName('audio')[0]
  const currentTimeAndDuration = document.getElementsByClassName('audio-duration')[0]
  const audioVolumeOff = document.getElementsByClassName('audio-volume-off-icon')[0]
  const audioVolumeOn = document.getElementsByClassName('audio-volume-on-icon')[0]
  const bar = document.getElementsByClassName('audio-volume-bar')[0]
  const volumeHandler = document.getElementsByClassName('audio-volume-handler')[0]
  let playLeft = (window.innerWidth - +window.getComputedStyle(document.getElementsByClassName('audio-player')[0]).width.slice(0, -2)) / 2
  const progress = document.getElementsByClassName('audio-progress')[0]
  let progressWidth = +window.getComputedStyle(progress).width.slice(0, -2)
  const progressHandler = document.getElementsByClassName('audio-progress-handler')[0]
  const lyric = document.getElementsByClassName('lyric')[0]
  const lrc = document.getElementsByClassName('lyric-lrc')
  const playerAnimation = document.getElementsByClassName('player-animation')[0]
  const playerContentWrapper = document.getElementsByClassName('player-content-wrapper')[0]
  let isMouseDown = false
  audio.volume = 0.5
  audio.muted = false
  audioVolumeOn.style.display = ''
  audioVolumeOff.style.display = 'none'
  window.addEventListener('resize', () => {
    playLeft = (window.innerWidth - +window.getComputedStyle(document.getElementsByClassName('audio-player')[0]).width.slice(0, -2)) / 2
    progressWidth = +window.getComputedStyle(progress).width.slice(0, -2)
  })
  const down = function (e) {
    isMouseDown = true
    e.stopPropagation()
  }
  const moveVolume = function (e) {
    let mouseX
    if (isMouseDown) {
      if (!e.touches) {
        mouseX = e.clientX
      } else {
        mouseX = e.touches[0].pageX
      }
      if (mouseX < playLeft + 30) {
        volumeHandler.style.left = '0px'
      } else if (mouseX >= playLeft + 30 && mouseX <= playLeft + 70) {
        volumeHandler.style.left = `${mouseX - playLeft - 30}px`
      } else {
        volumeHandler.style.left = '40px'
      }
      bar.style.background = `linear-gradient(90deg, #0099f7, #f11712 ${+volumeHandler.style.left.slice(0, -2) + 5}px, #eee ${+volumeHandler.style.left.slice(0, -2) + 5}px)`
      audio.volume = volumeHandler.style.left.slice(0, -2) / 40
      if (audio.volume === 0) {
        audio.muted = true
        audioVolumeOff.style.display = ''
        audioVolumeOn.style.display = 'none'
      } else {
        audio.muted = false
        audioVolumeOff.style.display = 'none'
        audioVolumeOn.style.display = ''
      }
    }
  }
  const up = function (e) {
    isMouseDown = false
    e.stopPropagation()
  }
  bar.addEventListener('touchstart', down)
  bar.addEventListener('mousedown', down)
  bar.addEventListener('touchmove', moveVolume)
  bar.addEventListener('mousemove', moveVolume)
  bar.addEventListener('touchend', up)
  bar.addEventListener('mouseup', up)
  audio.addEventListener('timeupdate', () => {
    let currentTime = formatTime(audio.currentTime)
    let duration = formatTime(audio.duration)
    if (isNaN(audio.duration)) {
      duration = '00:00'
    }
    currentTimeAndDuration.innerHTML = `${currentTime}/${duration}`
    progressHandler.style.left = `${(+window.getComputedStyle(progress).width.slice(0, -2) - 18) * (audio.currentTime / audio.duration)}px`
    progress.style.background = `linear-gradient(90deg, #0099f7, #f11712 ${+progressHandler.style.left.slice(0, -2) + 5}px, #eee ${+progressHandler.style.left.slice(0, -2) + 5}px)`
    playerAnimation.style.filter = `blur(${(1 - (audio.currentTime / audio.duration)) * 50}px) sepia(${(1 - (audio.currentTime / audio.duration)) * 100}%)`
    playerContentWrapper.style.opacity = `${((audio.currentTime / audio.duration) * 0.25) + 0.6}`
    Array.from(lrc).filter((v, k, a) => {
      if (v.getAttribute('data-time') - parseInt(audio.currentTime * 1000) < 300 && v.getAttribute('data-time') - parseInt(audio.currentTime * 1000) > 0) {
        lyric.style.transform = `translate(0, -${v.offsetTop - 120}px)`
        if (a[k - 1]) {
          a[k - 1].style.color = ''
          a[k - 1].style.textShadow = ''
        }
        v.style.color = '#f64f59'
        v.style.textShadow = `
          2px 0 0 #333,
          0 2px 0 #333,
          2px 2px 0 #333,
          -2px -2px 0 #333,
          0 15px 5px #c471ed,
          0 20px 5px #12c2e9
        `
      }
    })
  })
  const moveProgress = function (e) {
    let mouseX
    if (isMouseDown) {
      if (!e.touches) {
        mouseX = e.clientX
      } else {
        mouseX = e.touches[0].pageX
      }
      if (mouseX < playLeft + 50) {
        progressHandler.style.left = '0px'
      } else if (mouseX >= playLeft + 50 && mouseX <= playLeft + progressWidth + 32) {
        progressHandler.style.left = `${mouseX - playLeft - 50}px`
      } else {
        progressHandler.style.left = `${(progressWidth - 18)}px`
      }
      progress.style.background = `linear-gradient(90deg, #0099f7, #f11712 ${+progressHandler.style.left.slice(0, -2) + 5}px, #eee ${+progressHandler.style.left.slice(0, -2) + 5}px)`
      audio.currentTime = (progressHandler.style.left.slice(0, -2) / (progressWidth - 18)) * audio.duration
    }
  }
  progress.addEventListener('touchstart', down)
  progress.addEventListener('mousedown', down)
  progress.addEventListener('touchmove', moveProgress)
  progress.addEventListener('mousemove', moveProgress)
  progress.addEventListener('touchend', up)
  progress.addEventListener('mouseup', up)
}
