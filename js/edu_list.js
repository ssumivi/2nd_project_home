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

  // 지역 선택 데이터 로드
  fetch("data.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      if (data && data.enrollment_area && data.enrollment_area.length > 0) {
        AREA_ARR = data.enrollment_area;
        showArea();
        addActiveClass();
        showCenter(data.enrollment_area); // enrollment_area 전달
      } else {
        console.error("No review data found.");
      }
      return data; // data 반환
    })
    .then(function (data) {
      if (data && data.lecture_list && data.lecture_list.length > 0) {
        LECTURE_ARR = data.lecture_list;
        renderLecture(currentPage);
        updatePagination();
      } else {
        console.error("No review data found.");
      }
    })
    .catch(function (error) {
      console.error("Fetch error:", error);
    });

  let AREA_ARR;
  let areaTag = document.getElementById("data-area");

  function showArea() {
    let html = "";
    AREA_ARR.forEach((item, idx) => {
      html += `<li class="area-list-li" data-location = "${item.location}">${item.location}</li>`;
    });
    areaTag.innerHTML = html;
  }

  function addActiveClass() {
    let firstListItem = document.querySelector(".area-list-li");
    if (firstListItem) {
      firstListItem.classList.add("active");
    }
  }

  // 클릭된 요소에 active 클래스 추가/제거
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("area-list-li")) {
      let allListItems = document.querySelectorAll(".area-list-li");
      allListItems.forEach(function (item) {
        item.classList.remove("active");
      });
      event.target.classList.add("active");
    }
    if (event.target.classList.contains("center-list-li")) {
      let allCenterItems = document.querySelectorAll(".center-list-li");
      allCenterItems.forEach(function (item) {
        item.classList.remove("active");
      });
      event.target.classList.add("active");
    }
  });

  //showcenterlist
  let centerTag = document.getElementById("data-center");

  function showCenter(enrollment_area) {
    // 첫 번째 위치(location)에 해당하는 센터들 필터링
    let firstLocationCenters = AREA_ARR[0].centers; // 첫 번째 위치에 해당하는 센터들

    // 첫 번째 위치에 해당하는 센터들 출력
    let html = "";
    firstLocationCenters.forEach((center) => {
      html += `<li class="center-list-li" data-center = "${center.value}">${center.name}</li>`;
    });
    centerTag.innerHTML = html;
  }

  // 클릭된 요소에 active 클래스 추가/제거 및 해당 위치에 속하는 센터들 출력
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("area-list-li")) {
      let selectedLocation = event.target.textContent; // 클릭된 위치
      let selectedCenters = AREA_ARR.find((item) => item.location === selectedLocation)?.centers; // 선택된 위치에 해당하는 센터들

      // 선택된 위치에 해당하는 센터들 출력
      if (selectedCenters) {
        let html = "";
        selectedCenters.forEach((center) => {
          html += `<li class="center-list-li" data-center = "${center.value}">${center.name}</li>`;
        });
        centerTag.innerHTML = html;
      }
    }
  });

  // 전체 강의 목록
  let LECTURE_ARR;
  // 각 페이지 당 보여줄 항목 수
  const ITEMS_PER_PAGE = 2;
  // 현재 페이지
  let currentPage = 1;
  const lectureTag = document.getElementById("data-enroll");

  // 강의 목록을 특정 페이지에 맞게 렌더링하는 함수
  function renderLecture(page) {
    // 페이지에 해당하는 강의 항목의 시작 인덱스 계산
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    // 페이지에 해당하는 강의 항목의 끝 인덱스 계산
    const endIndex = startIndex + ITEMS_PER_PAGE;
    // 페이지에 해당하는 강의 목록 가져오기
    const pageLectures = LECTURE_ARR.slice(startIndex, endIndex);

    // 강의 목록을 HTML로 렌더링
    let html = "";
    pageLectures.forEach((item, idx) => {
      const tag = `
      <li class="enroll-list-li" id = "${item.number}">
        <div class="enroll-info-left">
          <img src="${item.imgSrc}" alt="${item.lecture_title}" />
        </div>
        <div class="enroll-info-right">
          <h2 class="erinfo-title">${item.lecture_title}</h2>
          <div class="study-info">
            <h2 class="erinfo-subtitle">교육내용</h2>
            <p class="erinfo">${item.erinfo}</p>
          </div>
          <div class="study-contac">
            <h2 class="erinfo-subtitle">교육문의</h2>
            <p class="erinfo">전화문의) 1577-XXXX</p>
          </div>
          <div class="sr-wrap">
            <a href="#" class="submit-bt" data-assign = "${item.lecture_title}">수강신청</a>
            <a href="#" class="review-bt">수강생 후기</a>
          </div>
        </div>
      </li>
    `;
      html += tag;
    });
    lectureTag.innerHTML = html;
  }

  // 데이터 로컬스토리지에 저장
  document.addEventListener("click", function (event) {
    const dataWrap = event.target.closest("#data-wrap");

    if (dataWrap) {
      const dataValue = event.target.getAttribute("data-assign");
      const areaValue = event.target.getAttribute("data-location");
      const centerValue = event.target.getAttribute("data-center");

      let storedData = localStorage.getItem("clickedValues");
      if (!storedData) {
        storedData = [];
      } else {
        storedData = JSON.parse(storedData);
      }

      const newData = {};
      if (areaValue) {
        newData.areaValue = areaValue;
      }
      if (centerValue) {
        newData.centerValue = centerValue;
      }
      if (dataValue) {
        newData.dataValue = dataValue;
      }

      // 중복된 값을 방지하기 위해 이미 저장된 데이터와 비교합니다.
      const isDuplicate = storedData.some((item) => {
        return item.dataValue === newData.dataValue && item.areaValue === newData.areaValue && item.centerValue === newData.centerValue;
      });


      // 중복된 값이 아닌 경우에만 데이터를 저장합니다.
      if (!isDuplicate) {
        storedData.push(newData);
        localStorage.setItem("clickedValues", JSON.stringify(storedData));
      }
    }
  });


  // 페이지 로드 시 초기 강의 목록 렌더링
  window.addEventListener("load", function () {
    renderLecture(currentPage);
    updatePagination();
  });

  // 페이지네이션을 업데이트하는 함수
  function updatePagination() {
    const total_pages = Math.ceil(LECTURE_ARR.length / ITEMS_PER_PAGE);
    // 현재 페이지 번호 표시 업데이트
    document.getElementById("current-page").textContent = currentPage;
    // 전체 페이지 번호 표시 업데이트
    document.getElementById("total-pages").textContent = total_pages;
    // 이전 페이지 버튼 업데이트
    document.getElementById("prev-btn").disabled = currentPage === 1;
    // 다음 페이지 버튼 업데이트
    document.getElementById("next-btn").disabled = currentPage === total_pages;
  }

  // 이전 페이지로 이동하는 함수
  function goToPrevPage() {
    if (currentPage > 1) {
      currentPage--;
      renderLecture(currentPage);
      updatePagination();
    }
  }

  // 다음 페이지로 이동하는 함수
  function goToNextPage() {
    const total_pages = Math.ceil(LECTURE_ARR.length / ITEMS_PER_PAGE);
    if (currentPage < total_pages) {
      currentPage++;
      renderLecture(currentPage);
      updatePagination();
      // 페이지 상단으로 스크롤
      scrollToSection();
    }
  }
  // 특정 섹션으로 스크롤하는 함수
  function scrollToSection() {
    const section = document.getElementById("enroll-position");
    if (section) {
      // 섹션의 위치를 계산
      const sectionTop = section.offsetTop;
      const offsetTop = 70;
      // 섹션의 위치로 스크롤
      window.scrollTo({
        top: sectionTop - offsetTop,
        behavior: "smooth", // 부드러운 스크롤 적용
      });
    }
  }

  // 이전 페이지 버튼 클릭 이벤트 리스너 등록
  document.getElementById("prev-btn").addEventListener("click", goToPrevPage);
  // 다음 페이지 버튼 클릭 이벤트 리스너 등록
  document.getElementById("next-btn").addEventListener("click", goToNextPage);

  // 함수: 센터 목록을 클릭하여 수강신청 페이지로 이동하거나 경고창을 띄우는 함수
  function handleCenterClick(event) {
    if (event.target.classList.contains("center-list-li")) {
      // 센터 목록을 클릭한 경우
      event.preventDefault(); // 기본 동작(링크 이동) 막기
    } else if (event.target.classList.contains("submit-bt")) {
      // 수강신청 버튼을 클릭한 경우
      if (!document.querySelector(".center-list-li.active")) {
        // 센터 목록이 비어있는 경우
        alert("수강 장소를 선택해주세요.");
        event.preventDefault(); // 기본 동작(링크 이동) 막기
      } else {
        window.location.href = "enrolment_pg.html";
      }
    }
  }

  // 클릭 이벤트 리스너 등록
  document.addEventListener("click", handleCenterClick);
});
