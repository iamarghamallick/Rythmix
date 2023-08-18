// AUDUO FILES SOURCE https://simpleguics2pygame.readthedocs.io/en/latest/_static/links/snd_links.html

const HOST_URL = "http://localhost:8080";

let loader = document.getElementById('loader');
let cardContainer = document.getElementById("card-container");
let addSongBtn = document.getElementById("addSongBtn");
let likeCount = document.getElementById("likeCount");

let SONG_DATA = {}

addSongBtn.addEventListener('click', async (e) => {
    loader.style.visibility = "visible";
    e.preventDefault();

    const title = document.getElementById('title').value;
    const artist = document.getElementById('artist').value;
    const audioUrl = document.getElementById('url').value;

    const data = { title, artist, audioUrl };

    try {
        const response = await fetch(`${HOST_URL}/api/addsong`, {
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
    getSongs();
    loader.style.visibility = "hidden";
});

async function getSongs() {
    loader.style.visibility = "visible";
    try {
        const response = await fetch(`${HOST_URL}/api/getsong`);
        const data = await response.json();
        console.log(data);
        SONG_DATA = data;
        console.log(SONG_DATA);
        let html = ``;
        data.map((data, index) => {
            html += `
            <div class="card" style="width: 19rem;" id="${data._id}">
                <img src="https://picsum.photos/500/200?random=${random(data._id)}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.artist}</p>
                    <audio controls>
                        <source src="${data.audioUrl}">
                    </audio>
                    <div class="button-group" role="group" aria-label="Basic example">
                        <button type="button" onclick="handleLike(${index})"><i class="fa-regular fa-heart"></i><span id="likeCount"></span>
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
    loader.style.visibility = "hidden";
}
getSongs();

async function handleLike(index) {
    console.log(SONG_DATA[index])

    const id = SONG_DATA[index]._id;
    const title = SONG_DATA[index].title;
    const artist = SONG_DATA[index].artist;
    const audioUrl = SONG_DATA[index].audioUrl;
    const likeCount = SONG_DATA[index].likeCount + 1;

    const data = { title, artist, audioUrl, likeCount };

    try {
        const response = await fetch(`${HOST_URL}/api/updatesong/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error updating data:', error);
    }

    getSongs()
}

function random(id) {
    return Math.floor((Math.random() * 100) + 1);
}