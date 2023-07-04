let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; aligin-item:center; position:absolute; top:38vh; left:45vw; background-color:white;";
    document.body.appendChild(div);
  };

  //게임종료
  const gameover = () => {
    window.removeEventListener("keydown", handleEnterKey);
    displayGameOver();
    clearInterval(timer);
  };

  //다음 라인으로 이동
  const nextLine = () => {
    if (attempts === 6) return gameover(); //6번시도 실패
    attempts += 1;
    index = 0;
  };

  //백스페이스 체크
  const handleBackspace = () => {
    if (index > 0) {
      const prevBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );

      prevBlock.innerText = "";
    }

    if (index !== 0) index = -1;
  };

  //엔터키 체크
  const handleEnterKey = async () => {
    let 맞은_갯수 = 0;

    //서버에서 정답을 받아오는 코드
    const 응답 = await fetch("/answer"); //await:서버에서 오는 응답을 기다려야 함
    const 정답 = await 응답.json();

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );

      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];

      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }

    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey(); //정답을 확인하라
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const startTime = new Date(); // 게임 시작 시간

    function setTime() {
      const currentTime = new Date(); // 현재 시간
      const pastTime = new Date(currentTime - startTime); // 현재 시간 - 시작 시간

      const pastMinute = pastTime.getMinutes().toString().padStart(2, "0"); //문자열 자리수 채워줄때 padStart 사용
      const pastSecond = pastTime.getSeconds().toString().padStart(2, "0");

      const timerDiv = document.querySelector("#timer");
      timerDiv.innerHTML = `${pastMinute}:${pastSecond}`;
    }

    timer = setInterval(setTime, 1000); //주기적으로 호출함
  };

  startTimer();

  window.addEventListener("keydown", handleKeydown); //키를 눌렀을때

  //5글자 단어 입력-존재하지 않는 단어여도 됨
  //6번의 시도 가능
  //존재하면 노란색, 위치가 맞으면 초록색으로 표시
  //게임 종료 판단
  //상단에 게임 시간 표시하기
  //키보드에도 동일하게 표시
  //키보드 클릭으로도 입력
}

appStart();
