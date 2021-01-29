const playbutton = document.querySelector('.player__button[title="Toggle Play"]');
const video = document.querySelector('.player__video');
const skipbuttons = document.querySelectorAll('.player__button[data-skip]');
const playbackRateInput = document.querySelector('input[name="playbackRate"]');
const volumnInput = document.querySelector('input[name="volume"]');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
progressFilled.style.pointerEvents = "none";
let dragging = false;

function playbuttonClickHandle(e) {
    playbutton.classList.toggle('play');
    if (playbutton.classList.contains('play')) {
        playbutton.innerHTML = '❚ ❚';
        video.play();

    }
    else {
        playbutton.innerHTML = '►';
        video.pause();
    }
};

function skipbuttonClickHandle(e) {
    video.currentTime += +e.target.dataset.skip;
};

function playbackRateInputHandle(e) {
    video.playbackRate = e.target.value;
};

function volumnInputHandle(e) {
    video.volume = e.target.value;
};
function progressClickHandle(e) {
    video.currentTime = e.offsetX / e.target.offsetWidth * video.duration;
    progressFilled.style.flexBasis = `${video.currentTime / video.duration * 100}%`;
}
function progressMoveHandle(e) {
    if (dragging) {
        video.currentTime = e.offsetX / e.target.offsetWidth * video.duration;
        progressFilled.style.flexBasis = `${video.currentTime / video.duration * 100}%`;
    }
};

function progressFilledHandle(e) {
    progressFilled.style.flexBasis = `${video.currentTime / video.duration * 100}%`;
};

progress.addEventListener('click', progressClickHandle);
progress.addEventListener('mousedown', () => dragging = true);
progress.addEventListener('mousemove', progressMoveHandle);
//progress.addEventListener('mousemove', dragging && progressMoveHandle);


progress.addEventListener('mouseup', () => dragging = false);

volumnInput.addEventListener('input', volumnInputHandle);
playbackRateInput.addEventListener('input', playbackRateInputHandle);
skipbuttons.forEach(button => button.addEventListener('click', skipbuttonClickHandle));

playbutton.addEventListener('click', playbuttonClickHandle);
video.addEventListener('click', playbuttonClickHandle);
video.addEventListener('timeupdate', progressFilledHandle);