import './style.css'
import Experience from './Experience/Experience.js'
var body = document.querySelector('body')
// document.querySelector('.gui').addEventListener('click', ()=>{console.log('gui'); removechield(body); addgui(body)})
// document.querySelector('.terminal').addEventListener('click', ()=>{console.log('terminal'); removechield(body); addterminal(body)})

function removechield(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}
function addgui(element){
    var gui = document.createElement('h1')
    gui.classList.add('gui')
    gui.innerText = 'gui'
    gui.style.color = '#fff'
    var exp = document.createElement('div')
    exp.classList.add('experience')
    element.appendChild(exp)
    element.appendChild(gui)
    // import Experience from './Experience/Experience.js'
    const experience = new Experience({
        targetElement: document.querySelector('.experience')
    })
}
// function addterminal(element){
//     var Terminal = document.createElement('div')
//     Terminal.id = 'terminal'
//     element.appendChild(Terminal)
//     terminalrun()
// }