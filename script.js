
const piano = document.querySelector('.piano');

const pianoKeys = document.querySelectorAll('.piano-key');

const btnContainer = document.querySelector('.btn-container');

const btnFullScreen = document.querySelector('.fullscreen');

let isPressed = false;

function playAudio(note) {
  const a = document.querySelector(`audio[data-note="${note}"]`);
  a.currentTime = 0;
  a.play();
}

pianoKeys.forEach((elem) => {
  const note = elem.dataset.note;
  if (note) {
    const aud = document.createElement('audio');
    aud.dataset.note = note;
    const src = `assets/audio-mp3/${note}.mp3`;
    aud.src = src;
    document.body.append(aud);
  }
});

pianoKeys.forEach((item) => {
  item.ondragstart = function () {
    return false;
  };
});

let isMousePress = false;

document.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('piano-key')) {
    const note = event.target.dataset.note;
    if (note) {
      playAudio(note);
      event.target.classList.add('piano-key-active');
      isMousePress = true;
    }
  }
});

document.addEventListener('mouseup', (event) => {
  if (event.target.classList.contains('piano-key')) {
    event.target.classList.remove('piano-key-active');
  }
  isMousePress = false;
});

piano.addEventListener('mouseover', (event) => {
  if (isMousePress) {
    const note = event.target.dataset.note;
    if (note) {
      playAudio(note);
      event.target.classList.add('piano-key-active');
    }
  }
});
piano.addEventListener('mouseout', (event) => {
  if (event.target.classList.contains('piano-key')) {
    event.target.classList.remove('piano-key-active');
  }
});

window.addEventListener('keydown', (event) => {
  if (isPressed) {
    return false;
  }
  isPressed = true;
  pianoKeys.forEach((el) => {
    if (el.classList.contains('piano-key-active')) {
      el.classList.remove('piano-key-active');
    }
    if (event.code.slice(-1) === el.dataset.letter) {
      const note = el.dataset.note;
      if (note) {
        playAudio(note);
        el.classList.add('piano-key-active');
      }
    }
  });
});

window.addEventListener('keyup', (event) => {
  pianoKeys.forEach((el) => {
    if (event.code.slice(-1) === el.dataset.letter) {
      el.classList.remove('piano-key-active');
      isPressed = false;
    }
  });
});

btnContainer.addEventListener('click', (event) => {
  if (
    event.target.classList.contains('btn') &&
    !event.target.classList.contains('btn-active')
  ) {
    Array.from(btnContainer.children).forEach((item) => {
      item.classList.remove('btn-active');
    });
    event.target.classList.add('btn-active');
    pianoKeys.forEach((el) => {
      el.classList.toggle('letter');
    });
  }
});

btnFullScreen.addEventListener('click', (event) => {
  if (document.fullscreenElement !== null) {
    deactivateFullscreen(document.documentElement);
  } else {
    activateFullscreen(document.documentElement);
  }
});

function activateFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

// Whack fullscreen
function deactivateFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

document.addEventListener('fullscreenchange', (event) => {
  if (document.fullscreenElement) {
    btnFullScreen.classList.remove('openfullscreen');
    btnFullScreen.classList.add('exitfullscreen');
  } else {
    btnFullScreen.classList.remove('exitfullscreen');
    btnFullScreen.classList.add('openfullscreen');
  }
});
