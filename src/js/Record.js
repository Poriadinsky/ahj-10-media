import Draw from './Draw';
import Timer from './Timer';

export default class Record {
  constructor() {
    this.draw = new Draw();
    this.timer = new Timer();
  }

  async toRecordAudio(coordinates) {
    this.draw.showRecord();
    this.timer.init();

    const submit = document.querySelector('.submit');
    const cancel = document.querySelector('.cancel');

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const recorder = new MediaRecorder(stream);

    const chunks = [];

    recorder.addEventListener('start', () => {});

    recorder.addEventListener('dataavailable', (event) => {
      chunks.push(event.data);
    });

    recorder.addEventListener('stop', () => {
      console.log('stop');
      const blob = new Blob(chunks);
      const data = new Date().toLocaleString();
      this.draw.drawMedia(data, '', coordinates, 'audio');
      const audioPlayerArr = document.querySelectorAll('.audio');
      const audioPlayer = audioPlayerArr[audioPlayerArr.length - 1];
      audioPlayer.src = URL.createObjectURL(blob);
    });

    recorder.start();

    submit.addEventListener('click', () => {
      recorder.stop();
      stream.getTracks().forEach((track) => track.stop());
      this.draw.closeRecord();
      this.timer.stop();
    });

    cancel.addEventListener('click', () => {
      console.log('cancel');
      recorder.stop();
      stream.getTracks().forEach((track) => track.stop());
      this.draw.closeRecord();
      this.timer.stop();
    });
  }

  async toRecordVideo(coordinates) {
    this.draw.showRecord();
    this.timer.init();

    const submit = document.querySelector('.submit');
    const cancel = document.querySelector('.cancel');

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.addEventListener('start', () => {});

    recorder.addEventListener('dataavailable', (event) => {
      console.log('dataavailable');
      chunks.push(event.data);
    });

    recorder.addEventListener('stop', () => {
      const blob = new Blob(chunks);
      const data = new Date().toLocaleString();
      this.draw.drawMedia(data, '', coordinates, 'video');
      const videoPlayerArr = document.querySelectorAll('.video');
      const videoPlayer = videoPlayerArr[videoPlayerArr.length - 1];
      videoPlayer.src = URL.createObjectURL(blob);
    });

    recorder.start();

    submit.addEventListener('click', () => {
      recorder.stop();
      stream.getTracks().forEach((track) => track.stop());
      this.draw.closeRecord();
      this.timer.stop();
    });

    cancel.addEventListener('click', () => {
      this.draw.closeRecord();
      this.timer.stop();
    });
  }
}
