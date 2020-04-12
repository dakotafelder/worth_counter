<script>
  import Wage from "./Wage.svelte";

  let userInput = 0;
  const secondsInYear = 31557600;
  let increment = 0;
  let currentValue = 0;

  function getUserInput() {
    userInput = +document.getElementById("User_Input").value;
    increment = userInput / secondsInYear;
    setInterval(yearCalc, 1000);
  }

  function yearCalc() {
    currentValue = currentValue + increment;
    document.getElementById("Result_Display").innerHTML = currentValue.toFixed(
      2
    );
  }
</script>

<style>
  #app {
    display: flex;
  }
  .guillotine {
    height: 100vh;
  }
  h1 {
    font-size: 72px;
    margin-bottom: 80px;
  }
  .info {
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10%;
    width: 56%;
  }
</style>

<main>
  <div id="app">
    <img alt="" src="./assets/guillotine.png" class="guillotine" />
    <div class="info">
      <h1>What's your time<br>really worth?</h1>
      <Wage />
    </div>
  </div>
</main>
