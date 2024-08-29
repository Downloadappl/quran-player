document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.alquran.cloud/v1/surah')
        .then(response => response.json())
        .then(data => {
            const surahList = document.getElementById('surahs');
            data.data.forEach(surah => {
                const listItem = document.createElement('li');
                listItem.textContent = `سورة ${surah.name}`;
                listItem.dataset.surahId = surah.number;
                listItem.addEventListener('click', function() {
                    fetchAyahs(surah.number);
                    playAudio(surah.number);
                });
                surahList.appendChild(listItem);
            });
        })
        .catch(error => console.error('خطأ في جلب السور:', error));
});

function fetchAyahs(surahNumber) {
    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`)
        .then(response => response.json())
        .then(data => {
            const ayahsContainer = document.getElementById('ayahs');
            ayahsContainer.innerHTML = ''; 
            data.data.ayahs.forEach(ayah => {
                const ayahElement = document.createElement('p');
                ayahElement.textContent = ayah.text;
                ayahsContainer.appendChild(ayahElement);
            });
        })
        .catch(error => console.error('خطأ في جلب الآيات:', error));
}

function playAudio(surahNumber) {
    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`)
        .then(response => response.json())
        .then(data => {
            const audioPlayer = document.getElementById('audio-player');
            const audioSource = document.getElementById('audio-source');
            audioSource.src = data.data.ayahs[0].audio;
            audioPlayer.load();
            audioPlayer.play();
        })
        .catch(error => console.error('خطأ في جلب الصوت:', error));
}
