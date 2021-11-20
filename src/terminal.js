import {Terminal} from 'xterm'
import 'xterm/css/xterm.css'
import './terminal.css'

// vscode-snazzy https://github.com/Tyriar/vscode-snazzy
var BaseTheme = {
  foreground: '#eff0eb',
  background: '#282a36',
  selection: '#97979b33',
  black: '#282a36',
  brightBlack: '#686868',
  red: '#ff5c57',
  brightRed: '#ff5c57',
  green: '#5af78e',
  brightGreen: '#5af78e',
  yellow: '#f3f99d',
  brightYellow: '#f3f99d',
  blue: '#57c7ff',
  brightBlue: '#57c7ff',
  magenta: '#ff6ac1',
  brightMagenta: '#ff6ac1',
  cyan: '#9aedfe',
  brightCyan: '#9aedfe',
  white: '#f1f1f0',
  brightWhite: '#eff0eb'
};

var term = new Terminal({
  fontFamily: '"Cascadia Code", Menlo, monospace',
  theme: BaseTheme,
  cursorBlink: true,
});
term.open(document.querySelector('#terminal'));
var sizes = {
  width: Math.floor(window.innerWidth*0.06*2),
  height: Math.floor(window.innerHeight*0.0271*2),
}

if(window.innerWidth <= 768)
{
  sizes.width = Math.floor(window.innerWidth*0.086*2/window.devicePixelRatio);
  sizes.height = Math.floor((window.innerHeight*0.04*2)/window.devicePixelRatio);
  term.resize(sizes.width,sizes.height)
}else
{
  sizes.width = Math.floor(window.innerWidth*0.06*2)
  sizes.height = Math.floor(window.innerHeight*0.0271*2)
  window.addEventListener('resize', ()=>{
    sizes.width = Math.floor(window.innerWidth*0.06*2)
    sizes.height = Math.floor(window.innerHeight*0.0271*2)
    term.resize(sizes.width, sizes.height)
  })
  term.resize(sizes.width,sizes.height)
}
document.getElementsByClassName('xterm').onload = term.focus()

function runTerminal() {
  if (term._initialized) {
    return;
  }

  term._initialized = true;

  term.prompt = () => {
    term.write('\r\n$ ');
  };
  term.writeln('try running `help`.');
  prompt(term);

  term.onData(e => {
    switch (e) {
      case '\u0003': // Ctrl+C
        term.write('^C');
        prompt(term);
        break;
      case '\r': // Enter
        runCommand(term, command);
        command = '';
        break;
      case '\u007F': // Backspace (DEL)
        // Do not delete the prompt
        if (term._core.buffer.x > 2) {
          term.write('\b \b');
          if (command.length > 0) {
            command = command.substr(0, command.length - 1);
          }
        }
        break;
      case '\u000A':
        runCommand(term,command);
        command = ''
        break;
      default: // Print all other characters for demo
        if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7B) || e >= '\u00a0') {
          command += e;
          term.write(e);
        }
    }
  });
}

function prompt(term) {
  command = '';
  term.write('\r\n$ ');
}

var command = '';
var url = {};
url.git = 'https://github.com/rohitkumarankam'
url.linkedin = 'https://www.linkedin.com/in/rohitkumarankam/'
var commands = {
  help: {
    f: () => {
      term.writeln([
        'Welcome to commandline! Try some of the commands below.',
        '',
        ...Object.keys(commands).map(e => `  ${e.padEnd(10)} ${commands[e].description}`)
      ].join('\n\r'));
      prompt(term);
    },
    description: 'Prints this help message',
  },
  clear: {
    f: ()=>{
      term.clear();
      term.writeln("try running `help`.");
      prompt(term);
    },
    description: "clear's the terminal.",
  },
  whoami: {
    f: () => {
      term.writeln('Rohit Kumar Ankam'),
      prompt(term);
    },
    description: "Prints user's Name",
  },
  git:{
    f: () => {
      term.writeln('Opening Github');
      window.open(url.git, '_blank').focus();
      prompt(term);
    },
    description: 'Opens Git Repo',
  },
  linkedin:{
    f: () => {
      term.writeln('Opening Linkedin');
      window.open(url.linkedin, '_blank').focus();
      prompt(term);
    },
    description: 'Opens Linkedin',
  },
};

function runCommand(term, text) {
  const command = text.trim().split(' ')[0];
  if (command.length > 0) {
    term.writeln('');
    if (command in commands) {
      commands[command].f();
      return;
    }
    term.writeln(`${command}: command not found`);
  }
  prompt(term);
}

runTerminal();