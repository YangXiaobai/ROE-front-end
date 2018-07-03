<template>
  <div class="options">
    <div @click="exit" id="exit"></div>
    <div class="lines"></div>
    <div v-for="score in scoreList" @click="chooseScore(score)" v-text="score" class="score"></div>
  </div>
</template>
<script>
export default {
  name: 'Options',
  data() {
    return {
      scoreList: [1, 3, 5, 8, 13, 21],
      userInfo: {}
    }
  },
  mounted() {
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
      console.log(this.userInfo);
    } else {
      this.$router.push({ path: '/' })
    }
  },
  methods: {
    chooseScore(score) {
      this.$router.push({ path: '/check?' + score });
    },
    exit() {
      this.$router.push({ path: '/' })
    }
  },
  sockets: {
    connect: function() {
      this.userInfo.id = this.$socket.id;
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
    }
  }
}

</script>
<style scoped>
#exit {
  height: 26px;
  width: 26px;
  background: url('../assets/back.png') no-repeat center;
  background-size: cover;
  margin: 0 0 60px 84vw;
}

.score{
  color: #ffffff;
  height: 80px;
  line-height: 80px;
  width: 20%;
  background-color: #7f55e9;
  float: left;
  margin: 10% 5% 0 5%;
  text-align: center;
  font-size: 1.5rem;
}

</style>
