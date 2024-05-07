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
          <li class="enrol-info-li">희망하신 강의는 <br class = "no-br"> <b>${latestEnrol}</b> 입니다.</li>
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

  // 사용자 정보를 저장하는 함수
  function saveUserInfo() {
    // 성함과 연락처를 가져옵니다.
    const userName = document.getElementById("user-name").value.trim();
    const userMobile = document.getElementById("user-mobile").value.trim();

    // 이름과 전화번호가 모두 입력되었는지 확인합니다.
    if (userName !== "" && userMobile !== "") {
      // 유효성 검사 오류 메시지를 초기화합니다.
      document.getElementById("name-error").textContent = "";
      document.getElementById("mobile-error").textContent = "";

      // 이름 유효성 검사
      let userNameRegex = /^[가-힣]{2,15}$/;
      if (!userNameRegex.test(userName)) {
        document.getElementById("name-error").textContent = "성함은 두 자리 이상의 한글로 작성해주세요.";
        return; // 오류가 발생한 경우 함수를 여기서 종료합니다.
      }

      // 전화번호 유효성 검사
      let userMobileRegex = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
      if (!userMobileRegex.test(userMobile)) {
        document.getElementById("mobile-error").textContent = "전화번호는 11자리의 숫자로 입력해주세요.";
        return; // 오류가 발생한 경우 함수를 여기서 종료합니다.
      }

      // 사용자 정보를 객체로 만들어서 로컬 스토리지에 저장합니다.
      const userInfo = { name: userName, mobile: userMobile };
      const userInfoList = JSON.parse(localStorage.getItem("userInfoList")) || [];
      userInfoList.push(userInfo);
      localStorage.setItem("userInfoList", JSON.stringify(userInfoList));

      // 폼을 다시 초기화합니다.
      document.getElementById("user-name").value = "";
      document.getElementById("user-mobile").value = "";

      // 페이지 이동
      window.location.href = "enrolchk.html";
    } else {
      // 사용자 정보가 모두 기입되지 않은 경우 알림창을 표시합니다.
      alert("성함과 연락처를 모두 입력하세요.");
    }
  }

  // 각 입력란의 입력 이벤트 리스너 등록
  document.querySelectorAll(".user-info-box input").forEach(function (input) {
    input.addEventListener("input", function () {
      // 모든 입력란의 값을 가져옵니다.
      const inputs = document.querySelectorAll(".user-info-box input");
      let allFilled = true;

      // 각 입력란이 비어 있는지 확인합니다.
      inputs.forEach(function (input) {
        if (input.value.trim() === "") {
          allFilled = false;
        }
      });

      // 모든 입력란이 채워져 있으면 active 클래스를 추가하고, 그렇지 않으면 제거합니다.
      const submitBtn = document.querySelector(".submit-btn");
      if (allFilled) {
        submitBtn.classList.add("active");
      } else {
        submitBtn.classList.remove("active");
      }
    });
  });

  // 제출 폼 이벤트 리스너
  document.getElementById("submit-wrap").addEventListener("submit", function (e) {
    e.preventDefault(); // 기본 제출 동작을 막습니다.
    saveUserInfo();
  });
});
