document.addEventListener("DOMContentLoaded", () => {
    fetchSurahs();

    document.getElementById("surahs").addEventListener("click", function(e) {
        if (e.target.tagName === 'LI') {
            fetchAyahs(e.target.dataset.surah);
            fetchAudio(e.target.dataset.surah);
        }
    });
});

function fetchSurahs() {
    fetch("https://api.quran.com/api/v4/chapters")
        .then(response => response.json())
        .then(data => {
            const surahs = document.getElementById("surahs");
            data.chapters.forEach(surah => {
                const li = document.createElement("li");
                li.textContent = surah.name_arabic;
                li.dataset.surah = surah.id;
                surahs.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching Surahs:", error));
}

function fetchAyahs(surahId) {
    fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}`)
        .then(response => response.json())
        .then(data => {
            const ayahs = document.getElementById("ayahs");
            ayahs.innerHTML = '';
            data.verses.forEach(ayah => {
                const p = document.createElement("p");
                p.textContent = ayah.text_uthmani;
                ayahs.appendChild(p);
            });
        })
        .catch(error => console.error("Error fetching Ayahs:", error));
}

function fetchAudio(surahId) {
    fetch(`https://api.quran.com/api/v4/chapter_recitations/7/${surahId}`)
        .then(response => response.json())
        .then(data => {
            const audio = document.getElementById("audio");
            audio.src = data.audio_file.audio_url;
        })
        .catch(error => console.error("Error fetching audio:", error));
}

function toggleTheme() {
    document.body.classList.toggle("light-theme");
}
