import createRequest from './api/createRequest';
import { doc } from "prettier";

/**
 *  Класс для создания формы создания нового тикета
 * */
export default class Modal {
  constructor() {
    this.wrap = null;
    this.btn = null;
    this.input = null;
  }

  open() {
    const wrap = document.createElement('div');
    wrap.classList.add('modal-wrap');
    this.wrap = wrap;

    const modal = document.createElement('div');
    modal.classList.add('modal');

    document.body.append(wrap);
    wrap.append(modal);

    const header = document.createElement('div');
    header.classList.add('header');
    header.textContent = 'Выберите псевдоним';        
    modal.append(header);

    const input = document.createElement('input');
    input.classList.add('modal-input');
    input.setAttribute('name', 'nickname');
    input.setAttribute('type', 'text');
    modal.append(input);
    this.input = input;

    const buttonBox = document.createElement('div');
    buttonBox.classList.add('modal-button-box');
    modal.append(buttonBox);

    const btn = document.createElement('button');
    btn.classList = 'btn';
    btn.textContent = 'Ok';
    buttonBox.append(btn);
    this.btn = btn;

    wrap.addEventListener('click', (e) => {
        const targetClass = e.target.classList;
        if(targetClass.contains('modal-wrap')
        && !targetClass.contains('modal')) {
            this.close();
        }
    })      
  }

  close() {
    this.wrap && this.wrap.remove();
    this.wrap = null;
  }

  addOnBtnHandler(handler) {
    this.btn.addEventListener('click', (e) => {
      e.preventDefault();
      const nickname = this.input.value;        
      if(!nickname) return;
      handler(nickname);
    })
  }

  showErrore() {
    const errBox = document.createElement('div');
    errBox.classList.add('errore');
    errBox.textContent = 'Псевдоним уже занят!';
    this.input.after(errBox);
  }
}
  