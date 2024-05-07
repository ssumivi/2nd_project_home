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

  //지역 선택 토글 메뉴
  this.fetch("data.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      if (data && data.city_selec && data.city_selec.length > 0) {
        AREA_SELEC = data.city_selec;
        showAreaSelec();
      } else {
        console.error("No area data found.");
      }
    })
    .catch(function (error) {
      console.error("Fetch error:", error);
    });

  let AREA_SELEC;
  let areaUlTag = this.document.getElementById("data-area-selec");
  let areaDetailTag = this.document.getElementById("data-area-detail");
  let areaUlClicked = false;

  function showAreaSelec() {
    let html = "";
    AREA_SELEC.forEach((item, idx) => {
      html += `
        <li data-area = "${item.location}" class = "volun_city">${item.location}</li>
        `;
    });
    areaUlTag.innerHTML = html;
  }

  // p 태그를 클릭하여 지역 선택 목록 표시/숨김
  const areaSelec = document.getElementById("area-selec");
  areaSelec.addEventListener("click", function () {
    areaUlClicked = true;
    // 현재 표시 여부를 확인하여 토글
    if (areaUlTag.classList.contains("show")) {
      areaUlTag.classList.remove("show");
    } else {
      areaUlTag.classList.add("show");
    }
  });

  // 클릭된 지역을 선택하여 해당 지역의 내용을 표시
  areaUlTag.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const selectedArea = event.target.dataset.area;
      const carrot = document.querySelector(".fa-caret-down");
      areaSelec.textContent = selectedArea;
      areaSelec.appendChild(carrot); // carrot을 areaSelec에 추가
      areaUlTag.classList.remove("show");
    }
  });

  // area detail
  this.document.addEventListener("click", function (event) {
    if (event.target.classList.contains("volun_city")) {
      let selectedArea = event.target.textContent;
      let selectedCity = AREA_SELEC.find((item) => item.location === selectedArea)?.city;
      if (selectedCity) {
        let html = "";
        selectedCity.forEach((city) => {
          html += `
          <li data-city = "${city.area}">${city.area}</li>
          `;
        });
        areaDetailTag.innerHTML = html;
      }
    }
  });
  // p 태그를 클릭하여 지역 선택 목록 표시/숨김
  const citySelec = document.getElementById("city-selec");
  citySelec.addEventListener("click", function () {
    // areaUlTag 클릭 여부 확인
    if (!areaUlClicked) {
      alert("지역을 먼저 선택해주세요.");
      return;
    }
    // 현재 표시 여부를 확인하여 토글
    if (areaDetailTag.classList.contains("show")) {
      areaDetailTag.classList.remove("show");
    } else {
      areaDetailTag.classList.add("show");
    }
  });
  // 클릭된 지역을 선택하여 해당 지역의 내용을 표시
  areaDetailTag.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const selectedCity = event.target.dataset.city;
      const cityCarrot = document.querySelector("#city-carrot");
      citySelec.textContent = selectedCity;
      citySelec.appendChild(cityCarrot); // carrot을 citySelec에 추가
      areaDetailTag.classList.remove("show");
    }
  });

  // 지역데이터 저장
  this.document.addEventListener("click", function (e) {
    const dataWrap = e.target.closest("#regist-tutor");
    if (dataWrap) {
      const volunAreaValue = e.target.getAttribute("data-area");
      const volunCityValue = e.target.getAttribute("data-city");

      let storedData = localStorage.getItem("locationValues");
      if (!storedData) {
        storedData = [];
      } else {
        storedData = JSON.parse(storedData);
      }

      const newAreaData = {};
      if (volunAreaValue) {
        newAreaData.volunAreaValue = volunAreaValue;
      }
      if (volunCityValue) {
        newAreaData.volunCityValue = volunCityValue;
      }

      const isDuplicate = storedData.some((item) => {
        return item.volunAreaValue === newAreaData.volunAreaValue && item.volunCityValue === newAreaData.volunCityValue;
      });

      if (!isDuplicate) {
        storedData.push(newAreaData);
        localStorage.setItem("locationValues", JSON.stringify(storedData));
      }
    }
  });

  // 사용자 정보를 저장하는 함수
  function saveVolunInfo() {
    // 성함과 연락처를 가져옵니다.
    const volunName = document.getElementById("volun-name").value.trim();
    const volunMobile = document.getElementById("volun-mobile").value.trim();

    // 이름과 전화번호가 모두 입력되었는지 확인합니다.
    if (volunName !== "" && volunMobile !== "") {
      // 유효성 검사 오류 메시지를 초기화합니다.
      document.getElementById("name-error").textContent = "";
      document.getElementById("mobile-error").textContent = "";

      // 이름 유효성 검사
      let userNameRegex = /^[가-힣]{2,15}$/;
      if (!userNameRegex.test(volunName)) {
        document.getElementById("name-error").textContent = "성함은 두 자리 이상의 한글로 작성해주세요.";
        return; // 오류가 발생한 경우 함수를 여기서 종료합니다.
      }

      // 전화번호 유효성 검사
      let userMobileRegex = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
      if (!userMobileRegex.test(volunMobile)) {
        document.getElementById("mobile-error").textContent = "전화번호는 11자리의 숫자로 입력해주세요.";
        return; // 오류가 발생한 경우 함수를 여기서 종료합니다.
      }

      // 사용자 정보를 객체로 만들어서 로컬 스토리지에 저장합니다.
      const volunInfo = { volunname: volunName, volunmobile: volunMobile };
      const volunInfoList = JSON.parse(localStorage.getItem("volunInfoList")) || [];
      volunInfoList.push(volunInfo);
      localStorage.setItem("volunInfoList", JSON.stringify(volunInfoList));

      // 폼을 다시 초기화합니다.
      document.getElementById("volun-name").value = "";
      document.getElementById("volun-mobile").value = "";

      // 페이지 이동
      window.location.href = "volunchk.html";
    } else {
      // 사용자 정보가 모두 기입되지 않은 경우 알림창을 표시합니다.
      alert("성함과 연락처를 모두 입력하세요.");
    }
  }

  // 입력란에 입력이 있을 때 사용자 정보를 저장하는 이벤트 리스너 추가
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
  document.getElementById("regist-tutor").addEventListener("submit", function (e) {
    // 지역 선택 여부 확인
    if (!areaUlClicked) {
      e.preventDefault(); // 제출 동작을 막습니다.
      alert("지역을 먼저 선택하세요."); // 경고 메시지 표시
    } else {
      e.preventDefault(); // 제출 동작을 막습니다.
      saveVolunInfo(); // 지역이 선택되었다면 사용자 정보 저장 함수를 호출합니다.
    }
  });
});
