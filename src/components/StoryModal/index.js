import './storymodal.css';

class StoryModal extends HTMLDivElement {
  constructor() {
    super();
    this.className = 'modal fade';
    this.id = 'storyModal';
    this.setAttribute('aria-labelledby', 'storyModalLabel');
    this.setAttribute('aria-hidden', 'true');
    this.setAttribute('tabindex', '-1');

    this.pickColor = '#ffffff';

    this.num = 0;

    this.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div id="num-0" class="num">
            <div class="color-picker">
              <div class="colors" style="background-color: #ffffff;">White</div>
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
            <div class="writing">

            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button id="prev-button" type="button" class="btn btn-secondary" style="display: none;">Prev</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button id="next-button" type="button" class="btn btn-primary">Next</button>
          <button id="finish-button" type="button" class="btn btn-primary" style="display: none;">Finish</button>
        </div>
      </div>
    </div>`;

    this.querySelector('#next-button').addEventListener('click', () => {
      if (this.num === 1) {
        return;
      }
      this.num++;
      this.querySelector('.writing').style.backgroundColor = this.pickColor;
      this.updateNum();
    });

    this.querySelector('#prev-button').addEventListener('click', () => {
      this.num--;
      this.updateNum();
    });
    this.colors = this.querySelectorAll('.colors')
    this.colors.forEach((color) => {
      color.addEventListener('click', (e) => {
        this.pickColor = e.target.style.backgroundColor;

        const colorSelected = e.target.classList.contains('selected');

        this.colors.forEach((color) => {
          color.classList.remove('selected');
        });

        if (!colorSelected) {
          e.target.classList.add('selected');
        }

      });
    });
    
  }

  updateNum() {
    this.querySelectorAll('.num').forEach((num) => { num.style.display = 'none'; });

    this.querySelector(`#num-${this.num}`).style.display = 'flex';

    this.querySelector('#prev-button').style.display = this.num > 0 ? 'block' : 'none';
    this.querySelector('#next-button').style.display = this.num < 1 ? 'block' : 'none';
    this.querySelector('#finish-button').style.display = this.num === 1 ? 'block' : 'none';
  }
}

window.customElements.define('story-modal', StoryModal, { extends: 'div' });

export default StoryModal;
