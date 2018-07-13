<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App'
}

</script>
<style>
html {
  font-size: 16px;
  background: url('./assets/General_bg.png') center no-repeat;
  background-size: cover;
  height: 100vh;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: .8rem;
  user-select: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 40px;
}

input[type="text"] {
  border: 0;
  border-bottom: 1px solid #7b44de;
  background-color: transparent;
  display: block;
  width: 70%;
  height: 40px;
  line-height: 40px;
  margin: 10px auto;
  padding: 0 10px;
  color: #ebe8f8;
  font-size: 1.4rem;
  text-align: center;
  -webkit-user-select: text;
}

input[type="text"]:focus {
  outline: 0;
}

button {
  background: #8f75db;
  width: 60%;
  padding: 15px 0;
  margin: 10px 20%;
  border: 0;
  color: #ebe8f8;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 30px;
}

button:focus {
  outline: 0;
}

.lines {
  width: 90%;
  margin: 0 auto;
  height: 50px;
  background: url('./assets/lines.png') no-repeat center;
  background-size: auto 100%;
}

@keyframes beats {
  0%,
  50% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
  25% {
    -webkit-transform: scale(1.5);
    -moz-transform: scale(1.5);
    -ms-transform: scale(1.5);
    -o-transform: scale(1.5);
    transform: scale(1.5);
  }
  75% {
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -ms-transform: scale(1.2);
    -o-transform: scale(1.2);
    transform: scale(1.2);
  }
}

</style>
