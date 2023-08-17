const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip");
const ranges = player.querySelectorAll(".player__slider");
const fullScreen = player.querySelector(".fa-expand");

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}
function updateButton() {
  const icon = this.paused ? "▶️" : "⏸️";
  toggle.textContent = icon;
  console.log("Update the button");
}
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
}
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => {
  button.addEventListener("click", skip);
});
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => {
  mousedown && scrub(e);
});
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

fullScreen.addEventListener("click", () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  }
});
