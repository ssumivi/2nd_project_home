document.addEventListener('DOMContentLoaded', () => {
  // 'allmenu' 클래스를 가진 <ul> 요소 선택
  const allMenuList = document.querySelector('.allmenu');

  // 첫 번째 <span> 요소에 'active' 클래스 추가
  allMenuList.querySelector('span').classList.add('active');
});

// 첫 번째 <span> 요소에 'active' 클래스 추가
allSpans[0].classList.add("active");

allMenuList.querySelectorAll('span').forEach((span, index) => {
  span.addEventListener('click', () => {
    // 이전에 'active' 클래스가 있던 요소에서 제거
    allMenuList.querySelectorAll('span').forEach(s => s.classList.remove('active'));
    // 현재 클릭한 요소에 'active' 클래스 추가
    span.classList.add('active');
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const cats = [
    {
      id: 1,
      title: "온라인",
      url: "../images/gesipan/ai.png",
      hoverUrl: "../images/gesipan/ai1.png",
      description: "인공지능(AI) 사용법",
    },
    {
      id: 2,
      title: "온라인",
      url: "../images/gesipan/smart.png",
      hoverUrl: "../images/gesipan/smart1.png",
      description: "스마트폰 활용 교육",
    },
    {
      id: 3,
      title: "온라인",
      url: "../images/gesipan/computer.png",
      hoverUrl: "../images/gesipan/computer1.png",
      description: "컴퓨터(기초) 교육",
    },
    {
      id: 4,
      title: "온라인",
      url: "../images/gesipan/dijiter.png",
      hoverUrl: "../images/gesipan/dijiter1.png",
      description: "디지털 교육",
    },
    {
      id: 5,
      title: "온라인",
      url: "../images/gesipan/videopj.png",
      hoverUrl: "../images/gesipan/videopj1.png",
      description: "동영상 편집 교육",
    },
    {
      id: 6,
      title: "온라인",
      url: "../images/gesipan/chimae.png",
      hoverUrl: "../images/gesipan/chimae1.png",
      description: "치매 예방교육",
    },
    {
      id: 7,
      title: "온라인",
      url: "../images/gesipan/youtube.png",
      hoverUrl: "여기에 마우스를 올렸을 때 바뀔 이미지 URL을 삽입하세요",
      description: "유튜브 채널 개설",
    },
    {
      id: 8,
      title: "온라인",
      url: "../images/gesipan/aijepum.png",
      hoverUrl: "../images/gesipan/aijepum1.png",
      description: "인공지능(AI) 제품 사용법",
    },
    // 이하 생략...
  ];
});
