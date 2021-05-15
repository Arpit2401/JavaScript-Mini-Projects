let count = document.querySelector('h2');
let setTime = document.getElementById('setTime');
let icon = document.getElementById('icon');
let time = 0;
setTime.addEventListener('input',function(e){
    time = parseInt(setTime.value)
});
icon.addEventListener('click',function(e){
    if(time==0)
    return
    countdownPlay(time)
});
setTime.addEventListener('keypress',function(e){
    if(e.key=='Enter'){
        e.preventDefault()
        time = setTime.value
        countdownPlay(time)
    }
});



function countdownPlay(time)
{
    let icon = document.querySelector('i')
    icon.className = 'fas fa-pause-circle'
    let presentCount = 0
    let myTimer = setInterval(function(){
        presentCount = presentCount + 1
        document.querySelector('h2').innerHTML = presentCount
        if(time==presentCount)
        {
            icon.className = 'fas fa-play-circle'
            clearInterval(myTimer)
        }
    },1000)
}
