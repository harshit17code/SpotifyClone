document.addEventListener('DOMContentLoaded', () => {
    const audioplayer = document.querySelector(".audioplayer");
    const playpausebtn = document.querySelector("#play");
    const prevbtn = document.querySelector("#prev");
    const nextbtn = document.querySelector("#next");
    const songtitle = document.querySelector(".songtitle");
    const playlistheading = document.querySelector(".playlistheading");
    const songdata = document.querySelector(".songdata");
    const cards=document.querySelectorAll(".card");
    const seekbar = document.querySelector("#seekbar");
    const currentTimeDisplay = document.querySelector("#current-time");
    const durationDisplay = document.querySelector("#duration");
    const mediaquery=window.matchMedia('(max-width:1000px)');

    


    const playlists = [
        {
            name: "Hindi",
            songs: [
                { title: "295", src: "songs/295.mp3" },
                { title: "Dabya ni karde", src: "songs/DabyaNiKarde.mp3" },
                { title: "Na Ja", src: "songs/NaJa.mp3" },
                { title: "Tujhe Sochta hu", src: "songs/Tujhesochtahu.mp3" },
                { title: "Oscar", src: "songs/Oscar.mp3" },
            ]
        },
        {
            name: "English",
            songs: [
                { title: "Fairytale", src: "songs/Fairytale.mp3" },
                { title: "BrokenAngel", src: "songs/BrokenAngel.mp3" },
                { title: "Closer", src: "songs/Closer.mp3" },
                { title: "Perfect", src: "songs/Perfect.mp3" },
                { title: "Starboy", src: "songs/Starboy.mp3" }
            
            ]
        },
        {
            name: "Dummy",
            songs: [
                { title: "Shake That", src: "songs/shakethat.mp3" }
            
            ]
        }
    ];


    function playsongs(index,cursongindex){
        const song=playlists[index].songs[cursongindex];
        audioplayer.src = "";
        songtitle.textContent="";
        audioplayer.src = song.src;
        audioplayer.play();
        songtitle.textContent = song.title;
        

    }

    function displaysongs(index) {
        songdata.innerHTML = '';

        playlistheading.textContent = playlists[index].name;
        playlists[index].songs.forEach(song => {
            const li = document.createElement('li');
            li.textContent = song.title;
            songdata.appendChild(li);
        });
    }

    cards.forEach(card =>{
        card.addEventListener("click",()=>{
            const index = card.getAttribute('data-index');
            displaysongs(index);
            let cursongindex=0;
            playpausebtn.src="";
            playpausebtn.src="pause.svg";
            playsongs(index,cursongindex);
            prevbtn.addEventListener("click",()=>{
                cursongindex--;
                if(cursongindex<0){
                    cursongindex = playlists[index].songs.length - 1;
                }
                playsongs(index,cursongindex);
            })
            nextbtn.addEventListener("click",()=>{
                cursongindex++;
                if(cursongindex>=playlists[index].songs.length){
                    cursongindex=0;
                }
                playsongs(index,cursongindex);
            })

            audioplayer.addEventListener('ended', () => {
                cursongindex++;
                if (cursongindex >= playlists[index].songs.length) {
                    cursongindex = 0;
                }
                playsongs(index, cursongindex);
            });
            
        })
        
        
    }) 
    
    playpausebtn.addEventListener("click",()=>{
        if (audioplayer.paused) {
            audioplayer.play();
            playpausebtn.src="";
            playpausebtn.src="pause.svg";
        } else {
            audioplayer.pause();
            playpausebtn.src="";
            playpausebtn.src="player.svg";

        }
    })

    audioplayer.addEventListener('timeupdate', () => {
        seekbar.value = (audioplayer.currentTime / audioplayer.duration) * 100;
        currentTimeDisplay.textContent = formatTime(audioplayer.currentTime);
    });


    audioplayer.addEventListener('durationchange', () => {
        durationDisplay.textContent = formatTime(audioplayer.duration);
    });

    seekbar.addEventListener('input', () => {
        const seekto = audioplayer.duration * (seekbar.value / 100);
        audioplayer.currentTime = seekto;
    });


    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        return formattedTime;
    }

    function changehamburger(e){
        const nav=document.querySelector(".nav");
        if(e.matches){
            nav.innerHTML='<img class="invert" src="hamburger.svg"/>';

        }else{
            nav.innerHTML='<img class="invert" src="left.svg"><img class="invert" src="right.svg" alt="">';
        }
        
    }

    function openhamburger(e){
        const nav=document.querySelector(".nav");
        const left=document.querySelector("#left");
        const logo=document.querySelector(".logo");
        if(e.matches){
            nav.addEventListener("click",()=>{
                left.classList.remove("left");
                left.classList.add("openhamburger");
                logo.innerHTML='<img class="invert" src="hamburger.svg" alt="spotify-Logo">';
            })
            logo.addEventListener("click",()=>{
                left.classList.remove("openhamburger");
                left.classList.add("left");
            })
        }else{
            nav.addEventListener("click",()=>{
                left.classList.remove("openhamburger");
                left.classList.add("left");
                logo.innerHTML='<img class="invert" src="logo.svg" alt="spotify-Logo">';
            })
            logo.addEventListener("click",()=>{
                left.classList.remove("openhamburger");
                left.classList.add("left");
                logo.innerHTML='<img class="invert" src="logo.svg" alt="spotify-Logo">';
            })
        }
        
    }
    openhamburger(mediaquery);
    mediaquery.addEventListener("change",openhamburger);
    changehamburger(mediaquery);
    mediaquery.addEventListener("change",changehamburger);

    
});