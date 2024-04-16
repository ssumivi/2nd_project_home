window.addEventListener("load",function(){
    window.addEventListener('scroll', function() {
        var headerWrap = document.querySelector('.header-wrap');
        if (window.scrollY > 0) {
          headerWrap.classList.add('scrolled'); // 스크롤된 경우 scrolled 클래스 추가
        } else {
          headerWrap.classList.remove('scrolled'); // 스크롤이 상단에 위치한 경우 scrolled 클래스 제거
        }
      });
})