import './style.css'
import Experience from './Experience/Experience.js'
import '../node_modules/xterm/css/xterm.css'
import './terminal.js'

const experience = new Experience({
    targetElement: document.querySelector('.experience')
})