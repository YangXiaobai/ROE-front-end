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
      delete this.userInfo.name;
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
      this.$router.push({ path: '/' })
    }
  },
  sockets: {
    connect: function() {
      let that = this;
      let id = this.$socket.id;
      this.$axios.post('/voter', that.$qs.stringify({
          id: id,
        }))
        .then(function(res) {
          console.log(res);
          that.userInfo.id = id;
          localStorage.setItem('userInfo', JSON.stringify(that.userInfo));
        })
        .catch(function(error) {
          console.log(error);
        });
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

.score {
  color: #ffffff;
  height: 80px;
  line-height: 80px;
  width: 25%;
  float: left;
  margin: 10% 0 0 6%;
  text-align: center;
  font-size: 1.5rem;
}

</style>
