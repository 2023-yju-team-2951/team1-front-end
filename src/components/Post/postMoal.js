import { getPost } from '../../api/posts.js';

export default class Modal {
  constructor(data) {
    this.data = data;
    
    this.loadDatas();
  }
  
  /* 🚩 fetch - 서버에서 데이터 가져 오기  */
  async loadDatas() {
      try {
        this.data = await getPost(); // 서버에서 객체화된 데이터 불러서 반환
        console.log(this.data); // 확인용
        this.render();
      } catch (error) {
        console.log(error);
      }
  }

  /* 2. 렌더링 */
  render(){

    let modalHTML = document.createElement("div"); //

    modalHTML.innerHTML += `
    <button type="button" class="btn btn-primary button-custom" data-bs-toggle="modal" data-bs-target="#exampleModal">
      댓글 모두 보기
    </button>
        
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class=" modal-dialog modal-dialog-centered  ">
          <div class="modal-content modal-control ">
            
          <div class="modal-body">
              
              <div class="modal-left">
               ${"캐러셀 이미지 들어가야 함"}
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
                          ${this.datapost_content}
                        </span> 
                      </div>
                  </div>
                  
                </div>
                <!-- 하트 -->
                <div class="heart">
                  <img class="hearimg" src=${this.data.post_top_img} alt="">
                </div>
                <!-- 3. BOTTOM -->
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
        </div>
      </div>
        
    `;

    return modalHTML.innerHTML;
  }



}