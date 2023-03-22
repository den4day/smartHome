(async function () {
    const video = document.getElementById('video');
    const wrapper = document.querySelector('.wrapper');
    const loader = document.querySelector('.loader');
    const error = '<div class="error">Для отображения контента разрешите доступ к камере</div>';

    await faceapi.nets.tinyFaceDetector.loadFromUri('/pages/cv/weights');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/pages/cv/weights');
    await faceapi.nets.faceExpressionNet.loadFromUri('/pages/cv/weights');
    await faceapi.nets.ageGenderNet.loadFromUri('/pages/cv/weights');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 720, height: 576 },
        });
        video.srcObject = stream;
    } catch (err) {
        wrapper.innerHTML = error;
    }

    video.addEventListener('play', () => {
        const canvas = faceapi.createCanvasFromMedia(video);
        const displaySize = { width: video.width, height: video.height };

        wrapper.append(canvas);
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                .withAgeAndGender()
                .withFaceExpressions();
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
            resizedDetections.forEach(detection => {
                const box = detection.detection.box
                const drawBox = new faceapi.draw.DrawBox(box, { label: `${Math.round(detection.age)} year old ${detection.gender}` })
                drawBox.draw(canvas)
            })

            if (loader.style.display !== 'none') {
                loader.style.display = 'none';
            }
        }, 100);
    })

})()
