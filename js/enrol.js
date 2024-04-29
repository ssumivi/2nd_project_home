window.addEventListener("load", function () {
  // 헤더 스크롤 이벤트
  window.addEventListener("scroll", function () {
    var headerWrap = document.querySelector(".header-wrap");
    if (window.scrollY > 0) {
      headerWrap.classList.add("scrolled");
    } else {
      headerWrap.classList.remove("scrolled");
    }
  });

  // 페이지 내비게이션 렌더링
  const pgNaviContainer = document.querySelector(".pg-navi .inner");
  const nowPg = document.title;

  function renderPgNavi() {
    let html = `
          <div class="home">
            <i class="fa-solid fa-house"></i>
          </div>
          <span class="chevron"></span>
          <span class="cate">수강신청</span>
          <span class="chevron"></span>
          <span class="now-pg">${nowPg}</span>
        `;
    pgNaviContainer.innerHTML = html;
  }

  renderPgNavi();

  const storedData = JSON.parse(localStorage.getItem("clickedValues"));
  if (storedData) {
    const dataInit = document.getElementById("data-info");
    let html = "";

    // 센터와 강의를 저장할 변수 초기화
    let latestCenter = "";
    let latestEnrol = "";

    // 최신 데이터가 존재하는 경우에만 처리
    if (storedData.length > 0) {
      // 모든 데이터를 반복하면서 센터와 강의에 대한 최신 값을 찾음
      storedData.forEach((item) => {
        if (item.centerValue) {
          latestCenter = item.centerValue;
        }
        if (item.dataValue) {
          latestEnrol = item.dataValue;
        }
      });

      // 센터와 강의에 대한 최신 값을 출력
      if (latestCenter) {
        html += `
          <li class="enrol-info-li">신청하신 지역은 <b>${latestCenter}</b> 입니다.</li>
        `;
      }
      if (latestEnrol) {
        html += `
          <li class="enrol-info-li">희망하신 강의는 <b>${latestEnrol}</b> 입니다.</li>
        `;
      }

      // "강의 지역 및 장소 / 강의 재선택하기" 링크 추가
      html += `
        <li class="sub-link">
          <a href="edu_list.html">강의 지역 및 장소 / 강의 재선택하기</a>
        </li>
      `;
    }

    dataInit.innerHTML = html;
  } else {
    console.log("저장된 데이터가 없습니다.");
  }
});
