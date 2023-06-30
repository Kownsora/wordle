const startTime = new Date(); // 게임 시작 시간

//5글자 단어 입력-존재하지 않는 단어여도 됨

//6번의 시도 가능

//존재하면 노란색, 위치가 맞으면 초록색으로 표시

//게임 종료 판단

//상단에 게임 시간 표시하기
/* new Date 함수 
    - new Date()
    - 시 : new Date().getHours
    - 분 : new Date().minute
    - 초 : new Date().getSeconds
    - 요일 : new Date().getDay
*/

function setTime() {
  const currentTime = new Date(); // 현재 시간
  const pastTime = new Date(currentTime - startTime); // 현재 시간 - 시작 시간

  const pastMinute = pastTime.getMinutes().toString().padStart(2, "0"); //문자열 자리수 채워줄때 padStart 사용
  const pastSecond = pastTime.getSeconds().toString().padStart(2, "0");

  const spanTime = document.querySelector("#timer");
  spanTime.innerHTML = `${pastMinute}:${pastSecond}`;
}

setInterval(setTime, 1000); //주기적으로 호출함

//키보드에도 동일하게 표시

//키보드 클릭으로도 입력
