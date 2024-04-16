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
    autoplay: {
      delay: 0,
      disableOnInteraction: true,
      speed: 8e3,
    },
    loop: true,
    speed: 8e3,
    freemode: true,
    observer: true,
    observeParents: true,
  });

  const reviewArea = document.querySelector(".sw-review");
  const stopBtn = document.querySelector("#stop_btn");
  stopBtn.addEventListener("click", function () {
    swReview.autoplay.stop();
  });
  reviewArea.addEventListener("mouseenter", function () {
    stopBtn.classList.remove("fa-circle-pause");
    stopBtn.classList.add("fa-circle-play");
    swReview.autoplay.stop();
    swReview.params.autoplay.speed = 8e3;
    swReview.params.speed = 8e3;
  });

  reviewArea.addEventListener("mouseleave", function () {
    stopBtn.classList.remove("fa-circle-play");
    stopBtn.classList.add("fa-circle-pause");

    swReview.autoplay.start();

    swReview.params.autoplay.speed = 800;
    swReview.params.speed = 800;
  });

  swReview.el.addEventListener("mouseenter", function () {
    stopBtn.classList.remove("fa-circle-pause");
    stopBtn.classList.add("fa-circle-play");
    swReview.autoplay.stop();
    swReview.params.autoplay.speed = 8e3;
    swReview.params.speed = 8e3;
  });

  swReview.el.addEventListener("mouseleave", function () {
    stopBtn.classList.remove("fa-circle-play");
    stopBtn.classList.add("fa-circle-pause");

    swReview.autoplay.start();

    swReview.params.autoplay.speed = 800;
    swReview.params.speed = 800;
  });
});
