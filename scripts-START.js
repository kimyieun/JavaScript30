const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('.timer__button');
const form = document.querySelector('form[id=custom]');
const input = document.querySelector('input');

let interval;
const onClickButton = (e) => {
    let time = e.target.dataset.time;
    setTimer(time);
}

const setTimer = (time) => {
    window.clearInterval(interval);
    const curDate = new Date();
    const newDate = new Date(curDate.getTime() + Math.floor(time / 60) * 60000);
    endTime.innerHTML = `Be Back At ${newDate.getHours()}:${newDate.getMinutes()}`
    interval = setInterval(() => {  
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        timeLeft.innerHTML = `${min}:${sec < 10 ? `0${sec}` : sec}`;
        if (time === 0) clearInterval(interval); 
        time--;
    }, 1000);
}
const onEnterInput = (e) => {
    e.preventDefault(); //refresh 막기
    let time = +input.value * 60;
    setTimer(time);
    form.reset(); //form reset
}
form.addEventListener('submit', onEnterInput); //subimit
// input.addEventListener('submit', onEnterInput); input 아니고 form
buttons.forEach(button => button.addEventListener('click', onClickButton));

