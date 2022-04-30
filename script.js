document.getElementById('search-form').onsubmit = async function(event) {
    event.preventDefault();
    const artist = event.target.elements.artist.value;

    const response = await fetch(`https://api.lyrics.ovh/suggest/${artist}`);
    //console.log(response);
    if (!response.ok) {
        alert('Unsuccessful query');
        return;
    }

    const songsResponse = await response.json();
    //console.log(songsResponse.data);
    showSongs(songsResponse.data);
}

function showSongs(songs) {
    document.getElementById('initial_text').classList.add('invisible');
    document.getElementById('initial_text').classList.remove('m-5');
    html = `<h1>Artists</h1>
                <div class="row">
        `;

    songs.forEach(song => {
        //console.log(song);
        html += `
            <div class="col-md-12 col-lg-6 mb-2">
                <div class="card bg-light text-center">
                    <div class="card-body">
                        <h5 class="card-title">${song.title}</h5>
                        <a href="${song.link}"class="card-text link-secondary">Click here to listen to the full song</a>
                        <br>
                        <a href="#" data-artist="${song.artist.name}" data-song="${song.title}" class="btn btn-info details-button my-3 font-weight-bold text-light">Lyrics</a>
                    </div>
                </div>
            </div>
        `;
    });

    html += "</div>";

    document.getElementById('songs').innerHTML = html;

    document.querySelectorAll('.details-button').forEach(button => {
        button.onclick = async function(event) {
            //console.log(event.target.dataset);
            artist = event.target.dataset.artist
            song = event.target.dataset.song
            const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song})}`);
            //console.log(response);
            if (!response.ok) {
                alert('Unsuccessful query');
                return;
            }
            const lyricsResponse = await response.json();
            showLyrics(lyricsResponse.lyrics, song);
        }
    });
}

function showLyrics(lyrics, Song) {
    html = '';
    html += `
    <div class="card bg-light">
        <div class="card-header text-weight-bold text-info">
        <h5>${Song}</h5>
        </div>
        <div class="card-body">
            <p>${lyrics}</p>
        </div>
    </div>
    `
    html += ``;

    document.getElementById('song-lyrics').innerHTML = html;
    document.getElementById('song-lyrics').scrollIntoView();
}