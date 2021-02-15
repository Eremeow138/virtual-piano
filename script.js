const auduo = document.querySelector('audio');

const piano = document.querySelector('.piano');

const pianoKeys = document.querySelectorAll('.piano-key');

let isPressed = false;

function playAudio(src) {
  auduo.src = src;
  auduo.currentTime = 0;
  auduo.play();
}

piano.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('piano-key')) {
    const note = event.target.dataset.note;
    const src = `assets/audio-mp3/${note}.mp3`;
    playAudio(src);

    pianoKeys.forEach((el) => {
      if (el.classList.contains('piano-key-active')) {
        el.classList.remove('piano-key-active');
      }
    });
    event.target.classList.add('piano-key-active');
  }
});

piano.addEventListener('mouseup', (event) => {
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
      const src = `assets/audio-mp3/${note}.mp3`;
      playAudio(src);
      el.classList.add('piano-key-active');
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
