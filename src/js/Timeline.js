import Draw from './Draw';
import Record from './Record';

export default class Timeline {
  constructor(container) {
    this.container = container;
    this.coordinates;
    this.draw = new Draw(container);
    this.record = new Record(this.coordinates);
  }

  init() {
    this.draw.drawUI(this.container);
    this.draw.drawModals(this.container);
    this.draw.drawWarning(this.container);
    this.draw.drawRecord(this.container);
    this.getSave();
    this.getCoordinates();
    this.bindToDOM();
  }

  bindToDOM() {
    document.addEventListener('click', this.click.bind(this));
    document.addEventListener('submit', this.submit.bind(this));
  }

  click(e) {
    e.preventDefault();
    const { target } = e;
    document.querySelector('.modal-form__input').style.background = 'white';

    if (target.classList.contains('modal__ok')) {
      const coordinates = document.querySelector('.modal-form__input').value;
      const valid = this.toValidate(coordinates);
      if (!valid) {
        document.querySelector('.modal-form__input').style.background = 'red';
        return;
      }
      this.coordinates = valid;
      document.querySelector('.modal__background').classList.add('hidden');
    } else if (target.classList.contains('modal__close')) {
      document.querySelector('.modal__background').classList.add('hidden');
      document.querySelector('.warning__background').classList.remove('hidden');
    } else if (target.classList.contains('warning__close')) {
      document.querySelector('.warning__background').classList.add('hidden');
    } else if (target.classList.contains('warning__ok')) {
      document.querySelector('.warning__background').classList.add('hidden');
      document.querySelector('.modal__background').classList.remove('hidden');
    } else if (target.classList.contains('audio__device')) {
      this.record.toRecordAudio(this.coordinates);
      this.save();
    } else if (target.classList.contains('video__device')) {
      this.record.toRecordVideo(this.coordinates);
      this.save();
    }
  }

  submit(e) {
    e.preventDefault();
    const { target } = e;
    const message = document.querySelector('.form__input').value;
    const data = new Date().toLocaleString();

    if (target.classList.contains('form')) {
      this.draw.drawMessage(data, message, this.coordinates);
      this.save();
    }
  }

  getCoordinates() {
    this.coordinates = null;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        const { latitude, longitude } = data.coords;
        this.coordinates = `[${latitude.toFixed(4)}, ${longitude.toFixed(4)}]`;
      }, (err) => {
        console.log(err);
        document.querySelector('.modal__background').classList.remove('hidden');
      });
    }
  }

  toValidate(items) {
    const arr = items.trim().split(',');
    // eslint-disable-next-line
    if (arr.length !== 2 || Number(arr[0]) < -90 || Number(arr[0]) > 90 || Number(arr[1]) < -180 || Number(arr[1]) > 180) {
      return false;
    }

    return `[${arr[0]}°, ${arr[1]}°]`;
  }

  save() {
    localStorage.setItem('messages', document.querySelector('.message__container').innerHTML);
    console.log('save');
  }

  getSave() {
    const fromStorage = localStorage.getItem('messages');
    console.log('fromStorage');
    console.log(fromStorage);

    if (fromStorage) {
      document.querySelector('.message__container').innerHTML = fromStorage;
    }
  }
}
