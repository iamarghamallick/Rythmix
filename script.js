// AUDUO FILES SOURCE https://simpleguics2pygame.readthedocs.io/en/latest/_static/links/snd_links.html
// localStorage.setItem("tracks", JSON.stringify([
//     {
//         "songId": "1",
//         "title": "Song Title 1",
//         "artist": "Song Artist",
//         "songUrl": "song.mp3",
//         "coverImg": "",
//         "likeCount": "0"
//     },
//     {
//         "songId": "2",
//         "title": "Song Title 1",
//         "artist": "Song Artist",
//         "songUrl": "song1.mp3",
//         "coverImg": "",
//         "likeCount": "0"
//     },
//     {
//         "songId": "3",
//         "title": "Song Title 1",
//         "artist": "Song Artist",
//         "songUrl": "song2.mp3",
//         "coverImg": "",
//         "likeCount": "0"
//     },
//     {
//         "songId": "4",
//         "title": "Song Title 1",
//         "artist": "Song Artist",
//         "songUrl": "song.mp3",
//         "coverImg": "",
//         "likeCount": "0"
//     },
//     {
//         "songId": "5",
//         "title": "Song Title 1",
//         "artist": "Song Artist",
//         "songUrl": "song.mp3",
//         "coverImg": "",
//         "likeCount": "0"
//     },
//     {
//         "songId": "6",
//         "title": "Song Title 1",
//         "artist": "Song Artist",
//         "songUrl": "song.mp3",
//         "coverImg": "",
//         "likeCount": "0"
//     },
// ]));

const getLocalStoragedata = () => {
    if (localStorage.getItem("tracks") == null) {
        return []
    } else {
        return JSON.parse(localStorage.getItem("tracks"))
    }
}

let tracks = getLocalStoragedata();
let cardContainer = document.getElementById("card-container");
let addSongBtn = document.getElementById("addSongBtn");
// let title = document.getElementById("title");
// let artist = document.getElementById("artist");
// let url = document.getElementById("url");
let likeCount = document.getElementById("likeCount");

function updateTracks() {
    let html = ``;
    console.log(tracks)
    tracks.map((track, index) => {
        html += `
        <div class="card" style="width: 19rem;" id="${track.songId}">
                <img src="https://picsum.photos/500/200?random=${track.songId}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${track.title}</h5>
                    <p class="card-text">${track.artist}</p>
                    <audio controls>
                        <source src="${track.songUrl}">
                    </audio>
                    <div class="button-group" role="group" aria-label="Basic example">
                        <button type="button" class="" onclick="handleLike(${track.songId})"><i class="fa-regular fa-heart"></i><span id="likeCount"></span>
                            ${track.likeCount}</span></button>
                        <button type="button" class=""><i class="fa-solid fa-music"></i></button>
                    </div>
                </div>
            </div>
    `
    })
    html === "" ? cardContainer.innerHTML = "No songs to display!" : cardContainer.innerHTML = html
}

updateTracks();

addSongBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    // let newSong = {
    //     songId: Date.now(),
    //     title: title.value,
    //     artist: artist.value,
    //     songUrl: url.value,
    //     likeCount: 0
    // }
    // tracks.push(newSong)
    // localStorage.setItem("tracks", JSON.stringify(tracks))
    // updateTracks();
    // console.log(newSong);
    // title.value = "";
    // artist.value = "";
    // url.value = "";

    const title = document.getElementById('title').value;
    const artist = document.getElementById('artist').value;
    const audioUrl = document.getElementById('url').value;

    const data = { title, artist, audioUrl };

    try {
        const response = await fetch('http://localhost:8080/api/addsong', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error inserting data:', error);
    }
});

async function getSongs() {
    try {
        const response = await fetch('http://localhost:8080/api/getsong');
        const data = await response.json();
        console.log(data);
        let html = ``;
        data.map((data, index) => {
            html += `
        <div class="card" style="width: 19rem;" id="${data._id}">
                <img src="https://picsum.photos/500/200?random=${123}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.artist}</p>
                    <audio controls>
                        <source src="${data.audioUrl}">
                    </audio>
                    <div class="button-group" role="group" aria-label="Basic example">
                        <button type="button" class="" onclick="handleLike(${data._id})"><i class="fa-regular fa-heart"></i><span id="likeCount"></span>
                            ${data.likeCount}</span></button>
                        <button type="button" class=""><i class="fa-solid fa-music"></i></button>
                    </div>
                </div>
            </div>
    `
        })
        html === "" ? cardContainer.innerHTML = "No songs to display!" : cardContainer.innerHTML = html
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
getSongs();

function handleLike(songId) {
    console.log(songId)
    for (let i = 0; i < tracks.length; i++) {
        if (tracks[i].songId == songId) {
            tracks[i].likeCount = parseInt(tracks[i].likeCount) + 1;
            localStorage.setItem("tracks", JSON.stringify(tracks))
            updateTracks();
            break;
        }
    }
}