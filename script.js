console.log("Welcome to Spotify");
// initialize the variables

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let timeSpanId = "time1";

let songs = [
    {songName: "Warriyo - Mortals  [NCS Release] ", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release] ", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Diffrent Heaven and Ehide - My Heart [NCS Release] ", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Bella Ciao - [Money Hiest]", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "g3ox_em - GigaChad Theme", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Spice, Sean Paul,Shaggy - Go Down Deh", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Rema,Selena Gomez - Calm Down", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Teya Dora - DZANUM", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

var songItemsContainer = document.getElementById("SongItemContainer");
songs.forEach((element , i) => {
    songItemsContainer.innerHTML += "<div class=\"songItem\">"
    +"<img alt=\""+i+"\" src=\""+element.coverPath+"\">"
    +"<span class = \"songName\">"+element.songName+"</span>"
    +"<span class=\"SongListPlay\">"
    +"<span class = \"timestamp\"> <span id=\"time"+i+"\"></span> <i class=\"far songItemPlay fa-play-circle\" onclick=\"playAudio('"+element.filePath+"', this, '"+element.coverPath+"', '"+element.songName+"', 'time"+i+"')\" aria-hidden=\"true\"> </i></span></div>";
});


// handle play / pause and click
function playAudio(songPath, ele, imgSrc, songName, timeSpan){
    audioElement.setAttribute("src", songPath);
    // document.getElementById("spanSongName").innerHTML = songName;
    timeSpanId=timeSpan;
    if(audioElement.paused || audioElement.currentTime<=0 ){
        ele.classList.remove('fa-play-circle');
        ele.classList.add('fa-pause-circle')
        document.getElementById("masterPlay").click();
    }
    else{
        ele.classList.remove('fa-pause-circle');
        ele.classList.add('fa-play-circle');
    }
}

masterPlay.addEventListener('click' , ()=> {
    try{
        if(audioElement.paused || audioElement.currentTime<=0 ){
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
         }
        else{
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0; 
    
        } 
    }
    catch(error){
        //console.log(error);
    }
    
});

// listen to events
audioElement.addEventListener('timeupdate', ()=>{
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    var minutes = Math.floor(audioElement.duration / 60);
    var secd = audioElement.duration % 60;
    var seconds = Math.ceil(secd);
    document.getElementById(timeSpanId).innerHTML = minutes+":"+seconds;
    myProgressBar.value = progress;

});

myProgressBar.addEventListener('change' , ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');


})
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click' , (e)=>{
        makeAllPlays();
        console.log(e.target);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
    //     audioElement.src = 'songs/${songIndex+1}.mp3';
    //     audioElement.currentTime = 0;
    //     audioElement.play();
    //     masterPlay.classList.remove('fa-play-circle');
    //     masterPlay.classList.add('fa-pause-circle');
     })
})


document.getElementById('next').addEventListener('click' , ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
        audioElement.src = ` songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

})


document.getElementById('previous').addEventListener('click' , ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
        audioElement.src = ` songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

})



