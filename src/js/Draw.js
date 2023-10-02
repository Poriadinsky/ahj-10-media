export default class Draw {
  constructor(container) {
    this.container = container;
  }

  drawUI() {
    const container = document.createElement('div');
    container.classList.add('container');
    this.container.appendChild(container);

    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message__container');
    container.appendChild(messageContainer);

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input__container');
    container.appendChild(inputContainer);

    const formGroup = document.createElement('div');
    formGroup.classList.add('form__group');
    inputContainer.appendChild(formGroup);

    const form = document.createElement('form');
    form.classList.add('form');
    formGroup.appendChild(form);

    const formInput = document.createElement('input');
    formInput.classList.add('form__input');
    formInput.placeholder = 'Введите сообщение';
    formInput.required = true;
    form.appendChild(formInput);

    const inputDevice = document.createElement('div');
    inputDevice.classList.add('input__device');
    form.appendChild(inputDevice);

    const audioDevice = document.createElement('div');
    audioDevice.classList.add('audio__device');
    inputDevice.appendChild(audioDevice);

    const videoDevice = document.createElement('div');
    videoDevice.classList.add('video__device');
    inputDevice.appendChild(videoDevice);
  }

  drawModals() {
    const modalBackground = document.createElement('div');
    modalBackground.classList.add('modal__background', 'hidden');
    this.container.appendChild(modalBackground);

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal__content');
    modalBackground.appendChild(modalContent);

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal__header');
    modalHeader.textContent = 'Что-то пошло не так';
    modalContent.appendChild(modalHeader);

    const modalBody = document.createElement('div');
    modalBody.classList.add('modal__body');
    modalBody.textContent = `
        К сожалению, нам не удалось определить ваше месторасположение.
        Пожалуйста, дайте разрешение на использование геолокации 
        либо введите координаты вручную.
        `;
    modalContent.appendChild(modalBody);

    const formGroup = document.createElement('form');
    formGroup.classList.add('modal-form__group');
    modalBody.appendChild(formGroup);

    const formText = document.createElement('div');
    formText.classList.add('modal-form__text');
    formText.textContent = `    
        Широта и долгота через запятую.
        `;
    formGroup.appendChild(formText);

    const formInput = document.createElement('input');
    formInput.classList.add('modal-form__input');
    formInput.placeholder = 'Например: 51.50851, -0.12572';
    formInput.required = true;
    formInput.name = 'name';
    formGroup.appendChild(formInput);

    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modal__footer');
    modalContent.appendChild(modalFooter);

    const modalClose = document.createElement('button');
    modalClose.classList.add('modal__close');
    modalClose.textContent = 'Отмена';
    modalFooter.appendChild(modalClose);

    const modalOk = document.createElement('button');
    modalOk.classList.add('modal__ok');
    modalOk.textContent = 'ОК';
    modalFooter.appendChild(modalOk);
  }

  drawMessage(data, messages, coordinates) {
    const messagesContainer = document.querySelector('.message__container');

    const message = document.createElement('div');
    message.classList.add('message');
    messagesContainer.appendChild(message);

    const messageHeader = document.createElement('div');
    messageHeader.classList.add('message__header');
    messageHeader.textContent = `${data}`;
    message.appendChild(messageHeader);

    const messageText = document.createElement('div');
    messageText.classList.add('message__text');
    messageText.textContent = messages;
    message.appendChild(messageText);
    document.querySelector('.form__input').value = '';

    if (coordinates) {
      const messageFooter = document.createElement('div');
      messageFooter.classList.add('message__footer');
      messageFooter.textContent = coordinates;
      message.appendChild(messageFooter);
    }
  }

  drawWarning() {
    const warningBackground = document.createElement('div');
    warningBackground.classList.add('warning__background', 'hidden');
    this.container.appendChild(warningBackground);

    const warningContent = document.createElement('div');
    warningContent.classList.add('warning__content');
    warningBackground.appendChild(warningContent);

    const warningBody = document.createElement('div');
    warningBody.classList.add('warning__body');
    warningBody.textContent = `
        Отметка о геоданных поможет Вам вспомнить, в каком месте Вы оставляли эту заметку.
        Вы можете вернуться и зафиксировать ваши координаты.
        Если отметка не нужна, нажмите "Отмена".
        В этом случае на Ваших записях не будет отметок о местоположении.
        `;
    warningContent.appendChild(warningBody);

    const warningFooter = document.createElement('div');
    warningFooter.classList.add('warning__footer');
    warningContent.appendChild(warningFooter);

    const warningClose = document.createElement('button');
    warningClose.classList.add('warning__close');
    warningClose.textContent = 'Отмена';
    warningFooter.appendChild(warningClose);

    const warningOk = document.createElement('button');
    warningOk.classList.add('warning__ok');
    warningOk.textContent = 'Вернуться';
    warningFooter.appendChild(warningOk);
  }

  drawMedia(data, info, coordinates, type) {
    const messagesContainer = document.querySelector('.message__container');

    const mediaMessage = document.createElement('div');
    mediaMessage.classList.add('media-message');
    messagesContainer.appendChild(mediaMessage);

    const messageHeader = document.createElement('div');
    messageHeader.classList.add('message__header');
    messageHeader.textContent = data;
    mediaMessage.appendChild(messageHeader);

    if (type === 'audio') {
      const audio = document.createElement('audio');
      audio.classList.add('audio');
      audio.src = info;
      audio.controls = true;
      mediaMessage.appendChild(audio);
    } else {
      const video = document.createElement('video');
      video.classList.add('video');
      video.src = info;
      video.controls = true;
      mediaMessage.appendChild(video);
    }

    if (coordinates) {
      const messageFooter = document.createElement('div');
      messageFooter.classList.add('message__footer');
      messageFooter.textContent = coordinates;
      mediaMessage.appendChild(messageFooter);
    }
  }

  drawRecord() {
    const inputDevice = document.querySelector('.input__device');

    const submit = document.createElement('div');
    submit.classList.add('submit', 'hidden');
    inputDevice.appendChild(submit);

    const timer = document.createElement('div');
    timer.classList.add('timer', 'hidden');
    inputDevice.appendChild(timer);

    const cancel = document.createElement('div');
    cancel.classList.add('cancel', 'hidden');
    inputDevice.appendChild(cancel);
  }

  showRecord() {
    document.querySelector('.audio__device').classList.add('hidden');
    document.querySelector('.video__device').classList.add('hidden');
    document.querySelector('.submit').classList.remove('hidden');
    document.querySelector('.timer').classList.remove('hidden');
    document.querySelector('.cancel').classList.remove('hidden');
  }

  closeRecord() {
    document.querySelector('.submit').classList.add('hidden');
    document.querySelector('.timer').classList.add('hidden');
    document.querySelector('.cancel').classList.add('hidden');
    document.querySelector('.audio__device').classList.remove('hidden');
    document.querySelector('.video__device').classList.remove('hidden');
  }
}
