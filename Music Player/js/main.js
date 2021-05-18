//JavaScript File

const play = document.getElementById('play');
const audio = document.querySelector('audio');
const img = document.querySelector('.main_img');
const prev = document.getElementById('backward');
const next = document.getElementById('forward');
const songName = document.getElementById('songName');
const artistName= document.getElementById('artistName');

const seek_slider = document.querySelector(".seek_slider"); 
const volume_slider = document.querySelector(".volume_slider"); 
const curr_time = document.querySelector(".current-time"); 
const total_duration = document.querySelector(".total-duration"); 

let updateTimer;

let playing = false;  //To check whether the song is playing or not


    //function to play the music
    const playTrack = ()=>{
            updateTimer = setInterval(seekUpdate, 1000); 
            playing=true;
            audio.play();
            play.classList.replace('fa-play','fa-pause');
            img.classList.add('animate');
        };

    //function to pause the music
    const pauseTrack = ()=>{
            playing=false;
            audio.pause();
            play.classList.replace('fa-pause','fa-play');
            img.classList.remove('animate');
        };

    
    function seekTo() { 
        // Calculate the seek position by the percentage of the seek slider and get the relative duration to the track 
        seekto = audio.duration * (seek_slider.value / 100.0); 
        
        // Set the current track position to the calculated seek position 
        audio.currentTime = seekto; 
        };
        
        function setVolume() { 
        // Set the volume according to the percentage of the volume slider set 
        audio.volume = volume_slider.value / 100; 
        }; 
        
        function seekUpdate() { 
        let seekPosition = 0; 
        
        // Check if the current track duration is a legible number 
        if (!isNaN(audio.duration)) { 
            seekPosition = audio.currentTime * (100 / audio.duration); 
            seek_slider.value = seekPosition; 
        
            // Calculate the time left and the total duration 
            let currentMinutes = Math.floor(audio.currentTime / 60); 
            let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60); 
            let durationMinutes = Math.floor(audio.duration / 60); 
            let durationSeconds = Math.floor(audio.duration - durationMinutes * 60); 
        
            // Add a zero to the single digit time values 
            if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; } 
            if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; } 
            if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; } 
            if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; } 
        
            // Display the updated duration 
            curr_time.textContent = currentMinutes + ":" + currentSeconds; 
            total_duration.textContent = durationMinutes + ":" + durationSeconds; 
            
        }; 
        }; 


    // Playing or Pausing song on clicking Play/Pause Button
    play.addEventListener('click', ()=>{
        if(playing==false)
        {
            playTrack();
        }
        else
        {
            pauseTrack();
        }
    });


    // Creating Array of List of Songs
    const song = [
    {
        songName: 'Namo Namo',
        artistName: 'Amit Trivedi',
    },
    {
        songName: 'Faded',
        artistName: 'Alan Walker, Iselin Løken Solheim',
    },
    {
        songName: 'Makhna',
        artistName: 'Tanishk Bagchi, Asees Kaur, Yasser Desai',
    },
    {
        songName: 'Saari Ki Saari 2.0',
        artistName: 'Darshan Raval, Asees Kaur',
    },
    {
        songName: 'Amplifier',
        artistName: 'Imran Khan',
    },
    {
        songName: 'Believer',
        artistName: 'Imagine Dragons',
    },
    {
        songName: 'Malang',
        artistName: 'Ved Sharma',
    },
    {
        songName: 'Thunder',
        artistName: 'Imagine Dragons',
    },
    {
        songName: 'Main Tumhara',
        artistName: 'A. R. Rahman, Jonita Gandhi, Hriday Gattani',
    },
    {
        songName: 'Dance Monkey',
        artistName: 'Tones and I',
    },
    {
        songName: 'Khairiyat',
        artistName: 'Arijit Singh',
    },
    {
        songName: 'ily',
        artistName: 'Surf Mesa',
    }];

    // Changing Music Player Details 
    const playSong = (song) => {
        songName.textContent = song.songName;
        artistName.textContent = song.artistName;
        audio.src = "audio/" + song.songName + ".mp3";
        img.src = "images/" + song.songName + ".jpg";
    };


    let flag = 0;

    // Going to Next Song
    const nextSong = () =>  {
        flag = (flag+1)%song.length;
        playSong(song[flag]);
        playTrack();
    };

    // Going to Previous Song
    const prevSong = () =>  {
        flag = (flag-1+song.length)%song.length;
        playSong(song[flag]);
        playTrack();
    };

    next.addEventListener('click', nextSong);
    prev.addEventListener('click', prevSong);

    // Looping the Songs
    audio.onended = nextSong;