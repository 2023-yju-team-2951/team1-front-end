import './rightSide.css';
import '../Story';
import { getProfiles } from '../../api/profiles';

class RightNav extends HTMLElement {
  constructor() { 
    super();

    this.render();
  }

  render() {
    this.innerHTML = 
    `
    <div class="right-nav-container">
    <div id ="mememe">
        <div class ="image1">
            <img src="./11111.JPG" href="#" onclick="location.href='naver.com'" width="80" height="75"> 
        </div>
        
        <div class ="mesideBanner_1G">
            <h3 href="#" onclick="location.href='naver.com'">first_group</h3>
        </div>

        <div class ="mesideBanner_2G">
            <h5>1조</h5>
        </div>

        <div class ="meblue">
            <h3 href="#" onclick="location.href='naver.com'" style="color:rgb(3, 150, 255)">ME</h3>
        </div>
    </div>
    
    <div id ="foryou">
        <div class ="yjlogo">
                <div class="yjsideBanner_1G">   
                    <h3>go_school_yju</h3>
                </div>
        
        <div class ="yjsideBanner_2G">
            <h5>영진 후쿠오카 현지학기제 정보</h5>
        </div>
        <div class ="yjblue">
            <h3 style="color:rgb(3, 150, 255)">click</h3>
        </div>
    </div>
    <div id ="fukuokalogo">
        <div class ="fukusideBanner_trip_1G">
            <div class="fukusideBanner_trip_1G">   
                <h3>FUKUOKA_TRIP</h3>
            </div>
        <div class ="fukusideBanner_trip_2G">
            <h5>후쿠오카 여행 소개!</h5>
        </div>
        <div class ="fukuoka_trip_blue">
            <h3 style="color:rgb(3, 150, 255)">click</h3>
        </div>
    </div>
    <div id ="fukuokamatlogo">
        <div class="fukusideBanner_mat_1G">   
            <h3>FUKUOKA_Oishī</h3>
        </div>
        <div class ="fukusideBanner_mat_2G">
            <h5>후쿠오카 맛집 총출동!!</h5>
        </div>

        <div class ="fukusideBanner_mat_3G">
            <h5>@@아! 우리 여기 꼭 가자!!</h5>
        </div>

        <div class ="fukuok_mat_blue">
            <h3 style="color:rgb(3, 150, 255); cursor: pointer;">click</h3>
        </div>
        </div>
    </div>
    </div>
    `

  }
}


 window.customElements.define('rightnav-component', RightNav);