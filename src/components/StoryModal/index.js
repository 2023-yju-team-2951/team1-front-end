import './storymodal.css';
import { getAccount } from '../../api/accounts.js';
class StoryModal extends HTMLDivElement {

  constructor(mode) {
    super();
    this.className = 'modal-dialog';

    let id;

    if (mode === 'main') {
      id = 'storyModal';
    } else if (mode === 'edit') {
      id = `editStoryModal`;
    }
    this.id = id;
    this.mode = mode;
    this.check = false;

    this.num = 0;
    this.render();
  }

  render() {
    this.num = 0;
    this.check = false;
    this.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div id="num-0" class="num">
          <div class="color-picker">
            <div class="colors selected" style="background-color: #ffffff;"></div>
            <div class="colors" style="background-color: #ffadad;"></div>
            <div class="colors" style="background-color: #ffd6a5;"></div>
            <div class="colors" style="background-color: #fdffb6;"></div>
            <div class="colors" style="background-color: #caffbf;"></div>
            <div class="colors" style="background-color: #9bf6ff;"></div>
            <div class="colors" style="background-color: #a0c4ff;"></div>
            <div class="colors" style="background-color: #bdb2ff;"></div>
            <div class="colors" style="background-color: #000000;"></div>
          </div>
        </div>
        <div id="num-1" class="num" style="display: none;">

          <div class="writing" style="background: rgb(255, 255, 255);">
            <textarea class="text-write"></textarea>
          </div>

          <div class="font-color">
            <div class="fontColors" style="background-color: #ffffff;"></div>
            <div class="fontColors selected" style="background-color: #000000;"></div>
            <div class="fontColors" style="background-color: #2f4f4f;"></div>
          </div> 

        </div>
      </div>
      <div class="modal-footer">
        <button id="prev-button" type="button" class="btn btn-secondary" style="display: none;">Prev</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button id="next-button" type="button" class="btn btn-primary">Next</button>
        <button id="finish-button" type="button" class="btn btn-primary" style="display: none;" data-bs-dismiss="modal">Finish</button>
        <button id="edit-button" type="button" class="btn btn-primary" style="display: none;" data-bs-dismiss="modal">Edit</button>
      </div>
    </div>`

    // 다음 버튼 클릭시
    this.querySelector('#next-button').addEventListener('click', () => {
      if (this.num === 1) {
        return;
      }
      this.num++;

      const writingElement = this.querySelector('.writing')

      if (/^http.*/.test(this.pick)) {
        writingElement.style.background = `url(${this.pick})`;
      } else {
        writingElement.style.background = this.pick;
      }

      if (this.check === false) {
        writingElement.style.background = '#ffffff';
      }
      
      this.updateNum();
    });
    
    // 이전 버튼 클릭시
    this.querySelector('#prev-button').addEventListener('click', () => {
      this.num--;
      this.updateNum();
    });

    // 완료 버튼 클릭시 버블로 넘기기
    this.querySelector('#finish-button').addEventListener('click', (e) => { 
      const writingElement = this.querySelector('.writing')
      const background = writingElement.style.background;
      const textWrite = this.querySelector('.text-write');
      const text = textWrite.value;
      const textColor = textWrite.style.color;

      const event = new CustomEvent('finishButtonClicked', {
        bubbles: true,
        detail: { background, text, textColor }
      });

      e.target.dispatchEvent(event);
    });

    // 수정 버튼 클릭 버블로 넘기기
    this.querySelector('#edit-button').addEventListener('click', (e) => {
      const writingElement = this.querySelector('.writing');
      const background = writingElement.style.background;
      const textWrite = this.querySelector('.text-write');
      const text = textWrite.value;
      const textColor = textWrite.style.color;
      
      // 새로운 커스텀 이벤트 생성
      const event = new CustomEvent('editButtonClicked', {
        bubbles: true, 
        detail: { background, text, textColor }
      });
  
      // 이벤트 발생
      e.target.dispatchEvent(event);
    });
    
    // 색깔 고를때 효과 + 고른 색 selected 클래스 추가 + 고른색으로 배경 변경
    this.colors = this.querySelectorAll('.colors')
    this.colors.forEach((color) => {
      color.addEventListener('click', (e) => {
        this.pick = e.target.style.backgroundColor;

        this.check = true;

        this.colors.forEach((color) => {
          color.classList.remove('selected');
        });

        e.target.classList.add('selected');
      });
    });

    // 글자색 변경
    this.fontColors = this.querySelectorAll('.fontColors')
    this.fontColors.forEach((fColor) => {
      fColor.addEventListener('click', (e) => {
        this.pick = e.target.style.backgroundColor;

        const textWrite = this.querySelector('.text-write');
        textWrite.style.color = this.pick;

        this.fontColors.forEach((fColor) => {
          fColor.classList.remove('selected');
        });

        e.target.classList.add('selected');
      });
    });

    // 배경 클릭해도 입력창 클릭되게
    const writingElement = this.querySelector('.writing')
    writingElement.addEventListener('click', () => {
      this.querySelector('.text-write').focus();
    });

    // 인풋창 높이 계속 변경해주기기
    const textInput = this.querySelector('.text-write');
    textInput.addEventListener('input', function () {
      this.style.display = 'block';
      this.style.height = (this.scrollHeight) + 'px';
    });
  }
  

  // 다음, 이전 버튼 클릭시 화면 업데이트
  updateNum() {
    this.querySelectorAll('.num').forEach((num) => { num.style.display = 'none'; });

    this.querySelector(`#num-${this.num}`).style.display = 'flex';

    this.querySelector('#prev-button').style.display = this.num > 0 ? 'block' : 'none';
    this.querySelector('#next-button').style.display = this.num < 1 ? 'block' : 'none';

    if (this.num === 1) {
      if (this.mode === 'main') {
        this.querySelector('#finish-button').style.display = 'block';
        this.querySelector('#edit-button').style.display = 'none';
      } else if (this.mode === 'edit') {
        this.querySelector('#finish-button').style.display = 'none';
        this.querySelector('#edit-button').style.display = 'block';
      }
    } else {
      this.querySelector('#finish-button').style.display = 'none';
      this.querySelector('#edit-button').style.display = 'none';
    }
  }


}

window.customElements.define('story-modal', StoryModal, { extends: 'div' });

export default StoryModal;