// Define the array of song objects
let arr = [
  {
    songName: "Over the Rainbow",
    url: "./Assets/song/Somewhere Over the Rainbow - The Wizard of Oz (1_8) Movie CLIP (1939) HD.mp3",
    img: "./Assets/Img/OIP.jpg",
  },
  {
    songName: "As Time Goes By",
    url: "./Assets/song/Casablanca - As Time Goes By - Original Song by Sam (Dooley Wilson).mp3",
    img: "./Assets/Img/R.jpg",
  },
  {
    songName: "Singin' in the Rain",
    url: "./Assets/song/Singin in the Rain (Full Song_Dance - 52) - Gene Kelly - Musical Romantic Comedies - 1950s Movies.mp3",
    img: "./Assets/Img/R (1).jpg",
  },
  {
    songName: "The Sound of Music",
    url: "./Assets/song/The Sound of Music  - THE SOUND OF MUSIC (1965).mp3",
    img: "./Assets/Img/OIP (1).jpg",
  },
];

// Initialize an empty string for HTML content
let clutter = "";

// Iterate over the array and construct HTML for each song
arr.forEach((song) => {
  clutter += `
    <div class="card" data-url="${song.url}">
        <div class="firstp">
            <img src="${song.img}" alt="Album cover of ${song.songName}">
            <h2>${song.songName}</h2>
        </div>
        <h6>2:43</h6> 
    </div>`;
});

// Insert the HTML content into the DOM
document.querySelector("#reco").innerHTML = clutter;

// Initialize audio element and controls
let audio = document.getElementById("audio");
let volumeControl = document.getElementById("volumeControl");
let progressControl = document.getElementById("progressControl");
let playButton = document.getElementById("play");
let pauseButton = document.getElementById("pause");
let forwardButton = document.getElementById("forward");
let backwardButton = document.getElementById("backward");

// Event listeners for volume and progress controls
volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});

progressControl.addEventListener("input", () => {
  audio.currentTime = (progressControl.value / 100) * audio.duration;
});

audio.addEventListener("timeupdate", () => {
  progressControl.value = (audio.currentTime / audio.duration) * 100;
});

// Event listeners for play, pause, forward, and backward controls
playButton.addEventListener("click", () => {
  audio.play();
});

pauseButton.addEventListener("click", () => {
  audio.pause();
});

forwardButton.addEventListener("click", () => {
  audio.currentTime += 10; // Skip forward by 10 seconds
});

backwardButton.addEventListener("click", () => {
  audio.currentTime -= 10; // Skip backward by 10 seconds
});

// Event listener for song selection
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    let songUrl = card.getAttribute('data-url');
    audio.src = songUrl;
    audio.play();
  });
});
// Function to fetch and display songs
function fetchSongs() {
  fetch('read.php')
      .then(response => response.json())
      .then(songs => {
          let clutter = '';
          songs.forEach(song => {
              clutter += `
                  <div class="card" data-id="${song.id}" data-url="${song.url}">
                      <div class="firstp">
                          <img src="${song.img}" alt="Album cover of ${song.songName}">
                          <h2>${song.songName}</h2>
                      </div>
                      <h6>2:43</h6> 
                      <button class="edit" onclick="editSong(${song.id})">Edit</button>
                      <button class="delete" onclick="deleteSong(${song.id})">Delete</button>
                  </div>`;
          });
          document.querySelector("#reco").innerHTML = clutter;
      });
}

// Function to add a new song
function addSong(songName, url, img) {
  fetch('create.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ songName, url, img })
  })
  .then(response => response.text())
  .then(text => {
      alert(text);
      fetchSongs(); // Refresh the song list
  });
}

// Function to update a song
function updateSong(id, songName, url, img) {
  fetch('update.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ id, songName, url, img })
  })
  .then(response => response.text())
  .then(text => {
      alert(text);
      fetchSongs(); // Refresh the song list
  });
}

// Function to delete a song
function deleteSong(id) {
  fetch('delete.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ id })
  })
  .then(response => response.text())
  .then(text => {
      alert(text);
      fetchSongs(); // Refresh the song list
  });
}

// Example usage: Fetch songs on page load
window.onload = fetchSongs;
