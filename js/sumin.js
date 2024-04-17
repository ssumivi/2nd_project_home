window.addEventListener("load", function () {
  fetch("data.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      if (data && data.review && data.review.length > 0) {
        REVIEW_ARR = data.review;
        showReview(); // 데이터를 받은 후에 리뷰를 표시합니다.
      } else {
        console.error("No review data found.");
      }
      return data;
    })
    .then(function (data) {
      if (data && data.notice && data.notice.length > 0) {
        NOTICE_ARR = data.notice;
        showNotice();
      } else {
        console.error("No review data found.");
      }
    })
    .catch(function (error) {
      console.error("Fetch error:", error);
    });

  //리뷰 영역
  let REVIEW_ARR;
  let reviewTag = this.document.querySelector("#data-review");
  function showReview() {
    let html = "";

    // 첫 번째 슬라이드 처리
    const firstSlideTag = `
      <div class="swiper-slide">
        <a href="#" class="swreview-wrap">
          <div class="sw-review-left">
            <img src="images/emoji_memo_.png" alt="이모티콘" />
            <h2 class="review-title">수강 후기</h2>
            <p class="review-info-title">
              이제는 손녀에게 전화말고<br />
              카톡 보내요
            </p>
            <p class="review-info-sub">수강생 최복희 님의 수강 후기</p>
            <p class="review-year">스마트 길잡이 1기</p>
          </div>
          <div class="swreview-right">
            <img src="images/review1.jpg" alt="리뷰1" />
          </div>
        </a>
      </div>
    `;
    html += firstSlideTag;

    // 나머지 슬라이드 처리
    REVIEW_ARR.slice(0, 4).forEach((item, index) => {
      const slideTag = `
        <div class="swiper-slide mini">
          <div class="swreview-wrap swreview-mini-wrap">
            <div class="sw-review-left srl-mini">
              <img src="${item.emojiSrc}" alt="이모티콘" />
              <h2 class="review-title">${item.title}</h2>
              <p class="review-info-title">${item.info_title}</p>
              <p class="review-year">${item.year}</p>
            </div>
            <div class="swreview-right srr-mini">
              <img src="${item.imgSrc}" alt="리뷰1" />  
            </div>
          </div>
        </div>
      `;
      html += slideTag;
    });

    REVIEW_ARR.slice(5).forEach((item, index) => {
      const backgroundColor = index % 2 === 0 ? "#aad9bb" : "#F9F7C9";
      const slideTag = `
        <div class="swiper-slide mini">
          <div class="swreview-wrap swreview-mini-wrap">
            <div class="sw-review-left srl-mini">
              <img src="${item.emojiSrc}" alt="이모티콘" />
              <h2 class="review-title">${item.title}</h2>
              <p class="review-info-title">${item.info_title}</p>
              <p class="review-year">${item.year}</p>
            </div>
            <div class="swreview-right srr-mini" style="background-color: ${backgroundColor};">
              
            </div>
          </div>
        </div>
      `;
      html += slideTag;
    });

    reviewTag.innerHTML = html;
  }
  const swReview = new Swiper(".sw-review", {
    slidesPerView: "auto",
    loopAdditionalSlides: 1,
    loopedSlides: 9,
    // autoplay: {
    //   delay: 0,
    //   disableOnInteraction: true,
    // },
    loop: true,
    speed: 2500,
    freemode: true,
    observer: true,
    observeParents: true,
    on: {
      slideChangeTransitionEnd: function () {
        if (this.activeIndex % 2 === 1) {
          document.getElementById("swtext1").style.display = "none";
          document.getElementById("swtext2").style.display = "block";
        } else {
          document.getElementById("swtext1").style.display = "block";
          document.getElementById("swtext2").style.display = "none";
        }
      },
    },
  });

  const stopBtn = document.querySelector("#stop_btn");
  let isPlaying = false; // 플레이 상태 추적

  // 클릭 이벤트 핸들러
  function clickHandler() {
    if (isPlaying) {
      swReview.autoplay.stop();
      isPlaying = false;
      stopBtn.classList.remove("fa-circle-pause");
      stopBtn.classList.add("fa-circle-play");
    } else {
      swReview.autoplay.start();
      isPlaying = true;
      stopBtn.classList.add("fa-circle-pause");
      stopBtn.classList.remove("fa-circle-play");
    }
  }

  stopBtn.addEventListener("click", clickHandler);

  // 마우스 진입 이벤트 핸들러
  function mouseEnterHandler() {
    stopBtn.classList.remove("fa-circle-pause");
    stopBtn.classList.add("fa-circle-play");
    swReview.autoplay.stop();
    swReview.speed = 2500;
  }

  // 마우스 이탈 이벤트 핸들러
  function mouseLeaveHandler() {
    stopBtn.classList.remove("fa-circle-play");
    stopBtn.classList.add("fa-circle-pause");
    swReview.autoplay.start();
  }

  // 클릭 이벤트가 우선되도록 설정
  stopBtn.addEventListener("mouseenter", function () {
    stopBtn.removeEventListener("mouseenter", mouseEnterHandler);
    stopBtn.removeEventListener("mouseleave", mouseLeaveHandler);
  });
  stopBtn.addEventListener("mouseleave", function () {
    stopBtn.addEventListener("mouseenter", mouseEnterHandler);
    stopBtn.addEventListener("mouseleave", mouseLeaveHandler);
  });
  //============ 수강생 이야기 end ====================
  //notice area
  let NOTICE_ARR;
  let noticeTag = this.document.getElementById("data-notice");
  function showNotice() {
    let html = "";
    NOTICE_ARR.slice(0, 4).forEach(function (item) {
      let tag = `
      <li class="noti-list-li">
        <a href="#" class="noti-list-pr">${item.title}</a>
        <span class="noti-date">${item.date}</span>
      </li>
      `;
      html += tag;
    });
    noticeTag.innerHTML = html;
  }
});
