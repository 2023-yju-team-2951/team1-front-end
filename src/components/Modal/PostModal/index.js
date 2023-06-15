import { getPost } from '../../../api/posts.js';
import "./PostModal.css";

export default class PostModal {
  constructor(data) {
    this.data = data;
    
    // this.loadDatas();
  }
  
  // /* 🚩 fetch - 서버에서 데이터 가져 오기  */
  // async loadDatas() {
  //     try {
  //       this.data = await getPost(); // 서버에서 객체화된 데이터 불러서 반환
  //       console.log(this.data); // 확인용
  //       this.render();
  //     } catch (error) {
  //       console.log(error);
  //     }
  // }

  /* 2. 렌더링 */
  render(){

    let modalHTML = document.createElement("div"); 
    
    // const carouselImg = new CarouselImg(this.data);
    // modalHTML.innerHTML += carouselImg.render();

    
    modalHTML.innerHTML += `
      
    <!--<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class=" modal-dialog modal-dialog-centered  ">  -->
          <div class="modal-content modal-control ">
            
          <div class="modal-body">
              
              <div class="modal-left">
               ${new CarouselImg().render()}
              </div>
              
              
              <div class="modal-right">
                <div class="right-top">
                  <div class="right-top-container">
                    <div class="right-top-userimage">
                      <img class="top-img" src=${this.data.post_top_img} alt="no_picture"> 
                    </div>
                    <div class="top-item-account">
                      <span class="name">${this.data.name}</span>
                    </div>
                  </div>
                </div>

             
                <div class="modal-middle">
               
                  <div class="visitor-post">
                      <div class="visitor-imgBox">
                        <img class="visitor-img" src="${this.data.post_top_img}" alt="no_picture"> 
                      </div>
                      <div class="comment">
                        <span class="visitor-id">${this.data.name}</span> 
                        <span class="visitor-comment">
                          ${this.data.post_content}
                        </span> 
                      </div>
                  </div>                
                  
                </div>
                
                <div class="heart">
                  <img class="hearimg" src=${this.data.post_top_img} alt="">
                </div>
               
                <div class="modal-comment">
                  <div class="modal_bottom">
                      <textarea  class="modal-comment-input" style="overflow:hidden; resize:none;" placeholder="댓글 달기..."></textarea>
                      <div class="posting-push">
                        <button class="button-custom ">게시</button>
                      </div>
                  </div>
                </div>
        
              </div>
          </div>
          </div>
          
  <!--  </div>
      </div>-->
    `;
    return modalHTML;
    return modalHTML.innerHTML;
  }
}








/* 🟢  7. CarouselImg */
class CarouselImg {
  constructor(data) {
    this.data = data;
  }
  render() {
    const carouselSlide = document.createElement("div");
    carouselSlide.className = "carousel slide";

    // id를 생성해야지 각각의 인스턴스에 고유한 값을 부여하여 조종할 수 있음
    carouselSlide.id = `carouselAuto${this.data.id}`;
    carouselSlide.setAttribute("data-bs-ride", "carousel"); // carouselSlide에 속성 설정

    /* prev 버튼 */
    const carouselControlPrev = document.createElement("button");
    carouselControlPrev.className = "carousel-control-prev";
    carouselControlPrev.type = "button";
    carouselControlPrev.setAttribute(
      "data-bs-target",
      `#carouselAuto${this.data.id}`
    );
    carouselControlPrev.setAttribute("data-bs-slide", "prev");

    const carouselControlPrevIcon = document.createElement("span");
    carouselControlPrevIcon.className = "carousel-control-prev-icon";
    carouselControlPrevIcon.setAttribute("aria-hidden", "true");

    const carouselControlPrevSpan = document.createElement("span");
    carouselControlPrevSpan.className = "visually-hidden";
    carouselControlPrevSpan.innerText = "Previous";

    /* right 버튼 */
    const carouselControlNext = document.createElement("button");
    carouselControlNext.className = "carousel-control-next";
    carouselControlNext.type = "button";
    carouselControlNext.setAttribute(
      "data-bs-target",
      `#carouselAuto${this.data.id}`
    );
    carouselControlNext.setAttribute("data-bs-slide", "next");

    const carouselControlNextIcon = document.createElement("span");
    carouselControlNextIcon.className = "carousel-control-next-icon";
    carouselControlNextIcon.setAttribute("aria-hidden", "true");

    const carouselControlNextSpan = document.createElement("span");
    carouselControlNextSpan.className = "visually-hidden";
    carouselControlNextSpan.innerText = "Next";

    const carouselIndicators = document.createElement("div");
    carouselIndicators.className = "carousel-indicators";

    const carouselInner = document.createElement("div");
    carouselInner.className = "carousel-inner";

    if (Array.isArray(this.data.post_main_img)) {
      for (let i = 0; i < this.data.post_main_img.length; i++) {
        const carouselItem = document.createElement("div");
        const carouselIndicator = document.createElement("button");

        carouselIndicator.type = "button";
        carouselIndicator.setAttribute("data-bs-target", "#carouselAuto");
        carouselIndicator.setAttribute("data-bs-slide-to", i);
        carouselIndicator.setAttribute("aria-label", `Slide ${i + 1}`);

        carouselItem.setAttribute("data-bs-interval", "10000");
        if (i === 0) {
          carouselItem.className = "carousel-item active";
          carouselIndicator.className = "active";
          carouselIndicator.setAttribute("aria-current", "true");
        } else {
          carouselItem.className = "carousel-item";
        }

        const img = document.createElement("div");
        img.className = "img";
        if (/^http.*/.test(this.data.post_main_img[i])) {
          img.style.background = `url(${this.data.post_main_img[i]})`;
        } else {
          img.style.background = this.data.post_main_img[i];
        }

        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
        carouselIndicators.appendChild(carouselIndicator);
      }
    }

    carouselSlide.appendChild(carouselIndicators);
    carouselSlide.appendChild(carouselInner);
    carouselControlPrev.appendChild(carouselControlPrevIcon);
    carouselControlPrev.appendChild(carouselControlPrevSpan);
    carouselControlNext.appendChild(carouselControlNextIcon);
    carouselControlNext.appendChild(carouselControlNextSpan);
    carouselSlide.appendChild(carouselControlPrev);
    carouselSlide.appendChild(carouselControlNext);

    return carouselSlide.outerHTML;
  }
}

window.customElements.define('post-modal', PostModal);