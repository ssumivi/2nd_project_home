window.addEventListener("load", function () {
  // 페이지 내비게이션 렌더링
  const pgNaviContainer = document.querySelector(".pg-navi .inner");
  const nowPg = document.title;

  function renderPgNavi() {
    let html = `
          <div class="home">
            <i class="fa-solid fa-house"></i>
          </div>
          <span class="chevron"></span>
          <span class="cate">교육봉사신청</span>
          <span class="chevron"></span>
          <span class="now-pg">${nowPg}</span>
        `;
    pgNaviContainer.innerHTML = html;
  }

  renderPgNavi();
});

// 스와이퍼 제이쿼리
$(document).ready(function () {
  // json data
  $.getJSON("data.json")
    .done(function (data) {
      if (data && data.lecture_list && data.lecture_list.length > 0) {
        LECTURE_ARRAY = data.lecture_list;
        showLecture();
      } else {
        console.error("No review data found.");
      }
    })
    .fail(function (jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.error("Fetch error:", err);
    });

  let LECTURE_ARRAY;
  let lectureSlide = $("#data-swEnrol");
  function showLecture() {
    let html = "";
    $.each(LECTURE_ARRAY, function (idx, item) {
      var tag = `
      <div class="swiper-slide">
      <div class = "enroll-list-li">
          <div class="enroll-info-left">
            <img src="${item.imgSrc}" alt="${item.kiosk}" />
          </div>
          <div class="enroll-info-right">
            <h2 class="erinfo-title">${item.lecture_title}</h2>
            <div class="study-info">
              <p class="erinfo-subtitle">교육내용</p>
              <p class="erinfo">${item.erinfo}</p>
            </div>
          </div>
        </div>
      </div>
      `;
      html += tag;
    });
    lectureSlide.html(html);
  }

  let spaceBetweenValue = 35; // 기본 값
  if (window.innerWidth <= 440) {
    spaceBetweenValue = 15; // 해상도가 340px 이하일 때
  }

  let swLecture = new Swiper(".sw-enrol", {
    slidesPerView: 1.2,
    spaceBetween: spaceBetweenValue,
    centeredSlides: true,
    allowTouchMove: false,
  });

  // 슬라이드 변경 이벤트 리스너
  swLecture.on("slideChange", function () {
    updateButtonStatus();
  });

  // 초기 버튼 상태 설정
  updateButtonStatus();

  // 버튼 상태 업데이트 함수
  function updateButtonStatus() {
    // 현재 슬라이드의 인덱스 가져오기
    let currentIndex = swLecture.realIndex;

    // 이전 버튼 상태 업데이트
    if (currentIndex === 0) {
      $(".sw-enrol-prev").addClass("disabled"); // 이전 버튼 비활성화
    } else {
      $(".sw-enrol-prev").removeClass("disabled"); // 이전 버튼 활성화
    }

    // 다음 버튼 상태 업데이트
    if (currentIndex === swLecture.slides.length - 1) {
      $(".sw-enrol-next").addClass("disabled"); // 다음 버튼 비활성화
    } else {
      $(".sw-enrol-next").removeClass("disabled"); // 다음 버튼 활성화
    }
  }

  // 이전 버튼 클릭 이벤트 핸들러
  $(".sw-enrol-prev").on("click", function () {
    swLecture.slidePrev(); // 이전 슬라이드로 이동
  });

  // 다음 버튼 클릭 이벤트 핸들러
  $(".sw-enrol-next").on("click", function () {
    swLecture.slideNext(); // 다음 슬라이드로 이동
  });

  $(".regist-btn").on("click", function (e) {
    // e.preventDefault();
    if (
      confirm("교육봉사 기록관리를 위한 회원가입이 필요합니다. 회원가입 페이지로 이동하시겠습니까?")
    ) {
      window.location.href = "join.html"; // 여기에 회원가입 페이지 URL을 넣어주세요
    } else {
      alert("비회원으로 교육봉사신청을 진행합니다.");
      window.location.href = "volunteer_regist.html";
    }
  });
});
