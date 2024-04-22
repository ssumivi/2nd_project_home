window.addEventListener("load", function () {
  fetch("data.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
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

  //notice area
  let NOTICE_ARR;
  let noticeTag = this.document.getElementById("data-notice");
  function showNotice() {
    let html = "";
    let maxVisibleItems = 4;
    if (window.innerWidth < 380) {
      maxVisibleItems = 3;
    }
    NOTICE_ARR.slice(0, maxVisibleItems).forEach(function (item, index) {
      let newLabel = ""; // 초기값은 빈 문자열로 설정
      if (index === 0 || index === 1) {
        newLabel = '<span class="notice-new">신규</span>';
      }
      let tag = `
      <li class="noti-list-li">
        <a href="#" class="noti-list-pr">${item.title}</a>
        ${newLabel} <!-- 새로운 공지 레이블 출력 -->
        <span class="noti-date">${item.date}</span>
      </li>
      `;
      html += tag;
    });
    noticeTag.innerHTML = html;
  }
});

//리뷰영역 제이쿼리 스와이퍼

$(document).ready(function () {
  $.ajax({
    url: "data.json",
    dataType: "json",
    success: function (data) {
      // REVIEW_ARR 변수에 데이터 할당
      var REVIEW_ARR = data["review"];

      // 리뷰를 표시하는 함수 호출
      showReview(REVIEW_ARR);

      // Swiper 초기화
      let swReview = new Swiper(".sw-review", {
        slidesPerView: "auto",
        spaceBetween: 15,
        loopAdditionalSlides: 1,
        slidesPerGroupAuto: true,
        loop: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        speed: 5800,
        // centeredSlides: true,
        allowMouseEvents: true, // 사용자가 마우스로 스와이프 가능
        noSwiping: true, // 사용자 스와이프에 대해 속도 속성을 무시
        noSwipingClass: "swiper-no-swiping", // 사용자 스와이프에 대해 속도 속성을 무시할 클래스 지정
      });

      // autoplay click event
      $("#stop_btn").on("click", function () {
        if (swReview.autoplay.running) {
          swReview.handleTogglePlay();
          $(this).removeClass("fa-circle-pause").addClass("fa-circle-play");
        } else {
          swReview.handleTogglePlay();
          $(this).removeClass("fa-circle-play").addClass("fa-circle-pause");
        }
      });

      // autoplay stop on mouse enter
      let isClickEventOccurred = false; // 클릭 이벤트가 발생했는지 여부를 추적하는 변수

      $(".swiper-wrapper").on("mouseenter", function () {
        if (!isClickEventOccurred) {
          swReview.stopAutoplay();
          $("#stop_btn").removeClass("fa-circle-pause").addClass("fa-circle-play");
        }
      });

      $(".swiper-wrapper").on("mouseleave", function () {
        if (!isClickEventOccurred) {
          swReview.startAutoplay();
          $("#stop_btn").removeClass("fa-circle-play").addClass("fa-circle-pause");
        }
      });

      // 클릭 이벤트가 발생한 후에는 마우스 진입/이탈 이벤트가 작동하도록 설정
      $("#stop_btn").on("click", function () {
        if (!isClickEventOccurred) {
          isClickEventOccurred = true;
          // autoplay 멈추기
          swReview.stopAutoplay();
        } else {
          isClickEventOccurred = false;
          // autoplay 다시 시작
          swReview.startAutoplay();
        }
      });

      $(".swiper-wrapper").on("mouseenter mouseleave", function () {
        if (!isClickEventOccurred) {
          // 클릭 이벤트가 발생하지 않은 경우에만 마우스 진입/이탈 이벤트 작동
          // 만약 클릭 이벤트가 발생했다면 마우스 이벤트를 무시
          // 원하는 동작을 추가하세요
        }
      });

      let duration = 0;
      let distanceRatio = 0;
      let clickable = true;

      const stopAutoplay = () => {
        swReview.setTranslate(swReview.getTranslate());

        distanceRatio = Math.abs((swReview.width * swReview.activeIndex + swReview.getTranslate()) / swReview.width);

        duration = swReview.params.speed * distanceRatio;
        swReview.autoplay.stop();
      };

      let startTimer;

      const startAutoplay = () => {
        if (startTimer) clearTimeout(startTimer);
        startTimer = swReview.autoplay.start();
      };

      const isPlaying = true;

      const handleTogglePlay = () => {
        if (!clickable) return;
        clickable = false;

        if (isPlaying) stopAutoplay();
        else {
          const distance = swReview.width * swReview.activeIndex + swReview.getTranslate();
          duration = distance !== 0 ? duration : 0;
          swReview.slideTo(swReview.activeIndex, duration);
          startAutoplay();
        }
        // isPlaying = !isPlaying;
        setTimeout(() => {
          clickable = true;
        }, 200);
      };

      swReview.stopAutoplay = stopAutoplay;
      swReview.startAutoplay = startAutoplay;
      swReview.handleTogglePlay = handleTogglePlay;
    },

    error: function (status, error) {
      console.log("오류 :", status, error);
    },
  });

  // 리뷰를 표시하는 함수
  function showReview(REVIEW_ARR) {
    var html = "";

    // 첫 번째 슬라이드 처리
    let firstSlideTag = `
        <div class="swiper-slide first">
          <a href="${REVIEW_ARR[0].href}" class="swreview-wrap">
            <div class="sw-review-left">
              <img src="${REVIEW_ARR[0].emojiSrc}" alt="이모티콘" />
              <h2 class="review-title">${REVIEW_ARR[0].title}</h2>
              <p class="review-info-title">
                ${REVIEW_ARR[0].info_title}
              </p>
              <p class="review-info-sub">${REVIEW_ARR[0].review_info_sub}</p>
              <p class="review-year">${REVIEW_ARR[0].year}</p>
            </div>
            <div class="swreview-right">
              <img src="${REVIEW_ARR[0].imgSrc}" alt="리뷰1" />
            </div>
          </a>
        </div>
        `;
    html += firstSlideTag;

    // 나머지 슬라이드 처리
    // REVIEW_ARR 배열을 순회하면서 데이터를 처리
    $.each(REVIEW_ARR.slice(1), function (index, item) {
      // imgSrc 속성이 있는지 확인
      if (item.imgSrc) {
        // imgSrc 속성이 있을 경우에만 append
        var slideTag = `
          <div class="swiper-slide mini">
            <a href="${item.href}" class="swreview-wrap swreview-mini-wrap">
              <div class="sw-review-left srl-mini">
                <img src="${item.emojiSrc}" alt="이모티콘" />
                <h2 class="review-title">${item.title}</h2>
                <p class="review-info-title">${item.info_title}</p>
                <p class="review-year">${item.year}</p>
              </div>
              <div class="swreview-right srr-mini">
                ${item.imgSrc ? `<img src="${item.imgSrc}" alt="리뷰1" />` : ""}
              </div>
            </a>
          </div>
        `;
        html += slideTag;
      } else {
        const backgroundColor = index % 3 === 0 ? "#aad9bb" : "#F9F7C9";
        // imgSrc 속성이 없는 경우에는 빈 이미지 태그로 출력
        var slideTag = `
          <div class="swiper-slide mini">
            <a href="${item.href}" class="swreview-wrap swreview-mini-wrap">
              <div class="sw-review-left srl-mini">
                <img src="${item.emojiSrc}" alt="이모티콘" />
                <h2 class="review-title">${item.title}</h2>
                <p class="review-info-title">${item.info_title}</p>
                <p class="review-year">${item.year}</p>
              </div>
              <div class="swreview-right srr-mini" style="background-color: ${backgroundColor};">
                
              </div>
            </a>
          </div>
        `;
        html += slideTag;
      }
    });

    // 데이터를 HTML에 삽입
    $("#data-review").html(html);
  }
});
