const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Songs title and urls
const songs = [
                {
                  name:'周深-聽我說',
                  songId:'0',
                  url:'https://res.cloudinary.com/kevinzou/video/upload/v1582686612/music/%E5%91%A8%E6%B7%B1-%E8%81%BD%E6%88%91%E8%AA%AA_sh7ujo.mp3',
                  image:'https://res.cloudinary.com/kevinzou/image/upload/v1582688957/image/%E5%91%A8%E6%B7%B1-%E8%81%BD%E6%88%91%E8%AA%AA_nai3bh.jpg'
                },
                {
                  name:'柏松-世間美好與你環環相扣',
                  songId:'1',
                  url:'https://res.cloudinary.com/kevinzou/video/upload/v1582686603/music/%E6%9F%8F%E6%9D%BE-%E4%B8%96%E9%96%93%E7%BE%8E%E5%A5%BD%E8%88%87%E4%BD%A0%E7%92%B0%E7%92%B0%E7%9B%B8%E6%89%A3_yrqdr6.mp3',
                  image:'https://res.cloudinary.com/kevinzou/image/upload/v1582688957/image/%E6%9F%8F%E6%9D%BE-%E4%B8%96%E9%96%93%E7%BE%8E%E5%A5%BD%E8%88%87%E4%BD%A0%E7%92%B0%E7%92%B0%E7%9B%B8%E6%89%A3_vzkxwy.jpg',
                },
                {
                  name:'王佳楊-遺憾',
                  songId:'2',
                  url:'https://res.cloudinary.com/kevinzou/video/upload/v1582686603/music/%E7%8E%8B%E4%BD%B3%E6%A5%8A-%E9%81%BA%E6%86%BE_gfv4my.mp3',
                  image:'https://res.cloudinary.com/kevinzou/image/upload/v1582688958/image/%E7%8E%8B%E4%BD%B3%E6%A5%8A-%E9%81%BA%E6%86%BE_isfw66.jpg'
                },
                {
                  name:'王貳浪-往後餘生',
                  songId:'3',
                  url:'https://res.cloudinary.com/kevinzou/video/upload/v1582686609/music/%E7%8E%8B%E8%B2%B3%E6%B5%AA-%E5%BE%80%E5%BE%8C%E9%A4%98%E7%94%9F_xsihtg.mp3',
                  image:'https://res.cloudinary.com/kevinzou/image/upload/v1582688958/image/%E7%8E%8B%E8%B2%B3%E6%B5%AA-%E5%BE%80%E5%BE%8C%E9%A4%98%E7%94%9F_eyx5cy.jpg'
                },
                {
                  name:'隔壁老樊-多想在平庸的生活擁抱你',
                  songId:'4',
                  url:'https://res.cloudinary.com/kevinzou/video/upload/v1582686610/music/%E9%9A%94%E5%A3%81%E8%80%81%E6%A8%8A-%E5%A4%9A%E6%83%B3%E5%9C%A8%E5%B9%B3%E5%BA%B8%E7%9A%84%E7%94%9F%E6%B4%BB%E6%93%81%E6%8A%B1%E4%BD%A0_q8mljr.mp3',
                  image:'https://res.cloudinary.com/kevinzou/image/upload/v1582688958/image/%E9%9A%94%E5%A3%81%E8%80%81%E6%A8%8A-%E5%A4%9A%E6%83%B3%E5%9C%A8%E5%B9%B3%E5%BA%B8%E7%9A%84%E7%94%9F%E6%B4%BB%E6%93%81%E6%8A%B1%E4%BD%A0_gokeqg.jpg'
                }
              ];

// Keep track of song
let songIndex = 1;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song.name;
  audio.src = song.url;
  console.log(audio.src);
  cover.src = song.image;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);
