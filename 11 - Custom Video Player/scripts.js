/* Get the Elements */
//selects the main player
const player = document.querySelector('.player');

const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Functions to Update Video */

//toggles the play and pause functionality
function togglePlay(){
  /* Does the same thing as if statements below
  const method = video.paused ? 'play' : 'pause';
  video[method]();
  */
  if(video.paused){
    video.play();
  }else{
    video.pause();
  }
};

//changes the play and puase button based on video
function updateButton(){
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
};

//skips forward or backward based on the dataset number(can add more easily)
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

//changes the volume and playback speed based on slider values
function handleRangeUpdate(){
  video[this.name] = this.value;
}

//updates the progress bar at bottom of video
function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

//lets scrub through the video
function scrub(e){
  //sets the time based on where you click on the progressBar(this is responsive)
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  //updates the videos time to the scrub time
  video.currentTime = scrubTime;
}

/* Adding Event Listeners to the Elements */

//toggles the play and pause
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);

//triggers the skip forward or backward
skipButtons.forEach(button => button.addEventListener('click', skip));

//listens for the sliders ie volume and playback speed
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

//updates the time of the video
video.addEventListener('timeupdate', handleProgress);

//triggers the scrub function
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', () => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
