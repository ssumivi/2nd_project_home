window.addEventListener("load", function() {
  window.addEventListener('scroll', function() {
    var headerWrap = document.querySelector('.header-wrap');
    if (window.scrollY > 0) {
      headerWrap.classList.add('scrolled'); // 스크롤된 경우 scrolled 클래스 추가
    } else {
      headerWrap.classList.remove('scrolled'); // 스크롤이 상단에 위치한 경우 scrolled 클래스 제거
    }
  });

  // 반응형 (1024px) 햄버거바가 생겼을때
  // 햄버거버튼을 클릭했을때
  const navMb = document.querySelector(".nav-mb");
  const htmlRoot = document.querySelector("html");
  const mbt = document.querySelector(".mbt");

  mbt.addEventListener("click", function() {
    const state = this.classList.contains("ani");
    if (state) {
      // 햄버거 버튼을  눌렀을때 x가 바뀌는 코드
      this.classList.remove("ani");
      // 모바일에 메뉴가 나타나는 코드
      navMb.classList.remove("active");
      // 스크롤이 안생기게 하는 코드
      htmlRoot.classList.remove("active");
    } else {
      // 햄버거 버튼을  눌렀을때 x가 바뀌는 코드
      this.classList.add("ani");
      // 모바일에 메뉴가 나타나는 코드
      navMb.classList.add("active");
      // 스크롤이 안생기게 하는 코드
      htmlRoot.classList.add("active");
    }
  });
  var menu1 = document.querySelector('.hd-menu1 > a');
var menu2 = document.querySelector('.hd-menu2');
menu1.addEventListener("click" ,function(e){
  e.preventDefault()
  menu2.classList.toggle("active")
  
})
  var menu3 = document.querySelector('#volunteer-apply > a');
var menu4 = document.querySelector('.hd-menu3');
menu3.addEventListener("click" ,function(e){
  e.preventDefault()
  menu4.classList.toggle("active")
  
})
  
});