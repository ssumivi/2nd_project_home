// =============================================================
document.addEventListener("DOMContentLoaded", function () {
  const originalImageSrc = "images/recommend/무인결제대.png"; // 원본 이미지 경로
  const hoverImageSrc = "images/recommend/kiosk.png"; // 호버 시 이미지 경로

  const imageElement = document.getElementById("changeableImage");

  imageElement.addEventListener("mouseover", function () {
    this.src = hoverImageSrc; // 마우스 호버 시 이미지 변경
  });

  imageElement.addEventListener("mouseout", function () {
    this.src = originalImageSrc; // 마우스가 벗어났을 때 원래 이미지로 변경
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const originalImageSrc = "images/recommend/앱사용.png"; // 원본 이미지 경로
  const hoverImageSrc = "images/recommend/app.png"; // 호버 시 이미지 경로

  const imageElement = document.getElementById("changeableImage2");

  imageElement.addEventListener("mouseover", function () {
    this.src = hoverImageSrc; // 마우스 호버 시 이미지 변경
  });

  imageElement.addEventListener("mouseout", function () {
    this.src = originalImageSrc; // 마우스가 벗어났을 때 원래 이미지로 변경
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const originalImageSrc = "images/recommend/인공지능.png"; // 원본 이미지 경로
  const hoverImageSrc = "images/recommend/grandma.png"; // 호버 시 이미지 경로

  const imageElement = document.getElementById("changeableImage3");

  imageElement.addEventListener("mouseover", function () {
    this.src = hoverImageSrc; // 마우스 호버 시 이미지 변경
  });

  imageElement.addEventListener("mouseout", function () {
    this.src = originalImageSrc; // 마우스가 벗어났을 때 원래 이미지로 변경
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const originalImageSrc = "images/recommend/스마트폰.png"; // 원본 이미지 경로
  const hoverImageSrc = "images/recommend/smartphone.png"; // 호버 시 이미지 경로

  const imageElement = document.getElementById("changeableImage4");

  imageElement.addEventListener("mouseover", function () {
    this.src = hoverImageSrc; // 마우스 호버 시 이미지 변경
  });

  imageElement.addEventListener("mouseout", function () {
    this.src = originalImageSrc; // 마우스가 벗어났을 때 원래 이미지로 변경
  });
});
//   ================================================================
document.addEventListener("DOMContentLoaded", function () {
  // .gangbox 요소에 대한 클릭 이벤트 리스너를 추가합니다.
  const gangbox = document.querySelector(".gangbox");
  gangbox.addEventListener("click", function () {
    // 원하는 URL로 리디렉션합니다.
    window.location.href = "https://example.com";
  });
});
// ===================================================================
$(document).ready(function () {
  $(".topbtn img").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0, // 페이지 최상단으로 스크롤
      },
      "slow"
    ); // "slow"는 애니메이션 속도를 의미하며, 숫자(밀리초)로도 지정할 수 있습니다.
  });
});
