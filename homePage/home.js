function getIdFromUrl(url) {
    // url could be youtube.com or youtu.be
    // https://www.youtube.com/watch?v=9bZkp7q19f0
    // https://youtu.be/9bZkp7q19f0

    const urlParts = url.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    if (lastPart.includes('watch?v=')) {
        const id = lastPart.split('watch?v=')[1];
        return id;
    }

    return lastPart;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('video-link-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const videoLink = document.getElementById('videoURL').value;
        const videoId = getIdFromUrl(videoLink);
        console.log("Form submitted: " + videoId)
    
        fetch('http://localhost:3000/api/summary/' + videoId)
            .then((response) => {
                console.log(response);
                const summary = document.getElementById('summaryText');

                response.json().then((data) => {
                    let summaryText = '';
                    for (let i = 0; i < data.length; i++) {
                        summaryText += data[i].text + ' ';
                    }
                    summary.innerText = summaryText;
                })
            })
            .catch((error) => {
                console.error(error);
            })
    });
});