// default import
import Controls from './controls.js'
import Timer from './timer.js'
import {
  buttonPlay,
  buttonPause,
  buttonStop,
  buttonSet,
  buttonAddTime,
  buttonReduceTime
} from './elements.js'

// Dark Mode
import { buttonDarkMode, darkMode, body } from './darkMode.js'

//Controls
const controls = Controls({
  buttonStop,
  buttonSet,
  buttonPause,
  buttonPlay
})

// Timer
const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')
let minutes = Number(minutesDisplay.textContent)

const timer = Timer({
  minutesDisplay,
  secondsDisplay,
  resetControls: controls.reset,
  minutes
})

//Events
buttonPlay.addEventListener('click', function () {
  controls.play()
  timer.countdown()
})

buttonPause.addEventListener('click', function () {
  controls.pause()
  timer.hold()
})

buttonStop.addEventListener('click', function () {
  controls.reset()
  timer.reset()
})

buttonAddTime.addEventListener('click', function () {
  controls.reset()
  timer.plus()
})

buttonReduceTime.addEventListener('click', function () {
  controls.reset()
  timer.minus()
})

buttonSet.addEventListener('click', function () {
  let newMinutes = controls.getMinutes()

  if (!newMinutes) {
    timer.reset()
    return
  }
  timer.updateDisplay(newMinutes, 0)
  timer.updateMinutes(newMinutes)
})

const allIcons = document.querySelectorAll('.audio svg')
allIcons.forEach(function (icon) {
  icon.addEventListener('click', function () {
    const button = icon.parentElement
    const song = button.querySelector('.song')
    const volume = button.querySelector('.volume')
    button.classList.toggle('active')
    song.paused ? song.play() : song.pause()
    volume.addEventListener('input', function (e) {
      song.volume = e.currentTarget.value / 100
    })
  })
})

// Dark Mode
buttonDarkMode.addEventListener('click', function () {
  darkMode.src = darkMode.src.match('./assets/img/sun.svg')
    ? './assets/img/moon.svg'
    : './assets/img/sun.svg'

  body.classList.toggle('dark')
  return
})
