document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.quran.com/api/v4/chapters')
        .then(response => response.json())
        .then(data => {
            const surahList = document.getElementById('surahs');
            data.chapters.forEach(surah => {
                const listItem = document.createElement('li');
                listItem.textContent = `سورة ${surah.name_arabic}`;
                listItem.dataset.surahId = surah.id;
                listItem.addEventListener('click', function() {
                    playAudio(surah.id);
                });
                surahList.appendChild(listItem);
            });
        })
        .catch(error => console.error('خطأ في جلب السور:', error));
});

function playAudio(surahId) {
    fetch(`https://api.quran.com/api/v4/chapter_recitations/7/${surahId}`)
        .then(response => response.json())
        .then(data => {
            const audioPlayer = document.getElementById('audio-player');
            const audioSource = document.getElementById('audio-source');
            audioSource.src = data.audio_file.audio_url;
            audioPlayer.load();
            audioPlayer.play();
        })
        .catch(error => console.error('خطأ في جلب الصوت:', error));
}
