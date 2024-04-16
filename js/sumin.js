window.addEventListener("load", function () {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (e) {
    const req = e.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      const str = req.response;
      let obj = JSON.parse(str);
      if (obj && obj.length > 0 && obj[0].review && obj[0].review.length > 0) {
        REVIEW_ARR = obj[0].review;
        console.log(obj.review);

        // review 영역 화면에 배치
        showReview();
      } else {
        console.error("No review data found.");
      }
    }
  };
  xhttp.open("GET", "data.json", true);
  xhttp.send();

  //리뷰 영역
  let REVIEW_ARR;
  let reviewTag = this.document.querySelector("#data-review");
  function showReview() {
    let html = "";

    // 첫 번째 슬라이드 처리

    const firstSlideTag = `
    <div class="swiper-slide">
    <a href = "#" class="swreview-wrap">
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
    for (let i = 0; i < Math.min(REVIEW_ARR.length, 2); i++) {
      const item = REVIEW_ARR[i];
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
    }
    for (let j = 3; j < REVIEW_ARR.length; j++) {
      const item = REVIEW_ARR[j];
      const backgroundColor = j % 2 === 0 ? "#aad9bb" : "#F9F7C9";
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
    }

    reviewTag.innerHTML = html;
  }
  const swReview = new Swiper(".sw-review", {
    slidesPerView: "auto",
    loopAdditionalSlides: 1,
    loopedSlides: 1,
    loop: true,
    autoplay: {
      delay: 60,
      disableOnInteraction: false,
    },
    speed: 18000,
    // observer: true,
    // observeParents: true,
  });
  const reviewArea = document.querySelector(".review");
  const stopBtn = document.querySelector("#stop_btn");

  reviewArea.addEventListener("mouseenter", function () {
    stopBtn.classList.remove("fa-circle-pause");
    stopBtn.classList.add("fa-circle-play");
    swReview.autoplay.start();
  });

  reviewArea.addEventListener("mouseleave", function () {
    stopBtn.classList.remove("fa-circle-play");
    stopBtn.classList.add("fa-circle-pause");

    swReview.autoplay.stop();
  });

  swReview.el.addEventListener("mouseenter", function () {
    stopBtn.classList.remove("fa-circle-pause");
    stopBtn.classList.add("fa-circle-play");
    swReview.autoplay.start();
  });

  swReview.el.addEventListener("mouseleave", function () {
    stopBtn.classList.remove("fa-circle-play");
    stopBtn.classList.add("fa-circle-pause");

    swReview.autoplay.stop();
  });
});
