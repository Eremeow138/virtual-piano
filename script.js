const auduo = document.querySelector('audio');

const piano = document.querySelector('.piano');

const pianoKeys = document.querySelectorAll('.piano-key');

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
  }
});


