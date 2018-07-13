<template>
  <div class="result">
    <div v-if="isObserver" @click="exit" id="exit"></div>
    <p id="sentence">System calculation</p>
    <p id="sysScore" v-text="sysScore"></p>
    <div id="notesBox">
      <div class="lines"></div>
      <div class="lines"></div>
      <div v-if="isAll" class="note" v-for="(v,k,i) in resultList" :class="{secondLine: i>3}" :style="{left:v.left}">
        <img :class="{beats:i==currentPlaying}" src="../assets/note_half.png" :style="{bottom:v.bottom}">
        <span>{{v.score}}</span>
      </div>
      <div v-else class="placeholder" v-for="(v,k,i) in resultList" :class="{secondLine: i>3}" :style="{left:v.left}"><img src="../assets/note_half.png"></div>
    </div>
    <audio preload="auto" id="audio1">
      <source src="../assets/notes/C.mp3" type="audio/mp3" />
    </audio>
    <audio preload="auto" id="audio2">
      <source src="../assets/notes/D.mp3" type="audio/mp3" />
    </audio>
    <audio preload="auto" id="audio3">
      <source src="../assets/notes/E.mp3" type="audio/mp3" />
    </audio>
    <audio preload="auto" id="audio4">
      <source src="../assets/notes/F.mp3" type="audio/mp3" />
    </audio>
    <audio preload="auto" id="audio5">
      <source src="../assets/notes/G.mp3" type="audio/mp3" />
    </audio>
    <audio preload="auto" id="audio6">
      <source src="../assets/notes/A.mp3" type="audio/mp3" />
    </audio>
    <button v-if="!isObserver&&isAll" @click="reset" id="reset">reset</button>
    <div v-if="isAll" id="play" @click="play"></div>
  </div>
</template>
<script>
export default {
  name: 'Result',
  data() {
    return {
      resultList: {},
      userInfo: {},
      matches: {
        1: 1,
        3: 2,
        5: 3,
        8: 4,
        13: 5,
        21: 6
      },
      currentPlaying: 999,
      sysScore: '-',
      isAll: 0,
      isObserver: false
    }
  },
  mounted() {
    let that = this;
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
      this.isObserver = this.userInfo.name ? false : true;
    } else {
      this.$router.push({ path: '/' })
    }
    let results = localStorage.getItem('results');
    if (results && !this.isObserver) {
      results = JSON.parse(results);
      this.calcResult(results.userList);
      if (results.isAll) {
        this.isAll = 1;
        this.sysScore = results.sysScore;
      }
    }
  },
  methods: {
    reset() {
      this.$axios.get('/reset')
        .then(function(res) {
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    play() {
      let that = this;
      let results = this.resultList;
      let scoreList = [];
      for (let i in results) {
        scoreList.push(that.matches[results[i].score]);
      }
      let count = 0,
        length = scoreList.length,
        num = 1;
      let audio = document.querySelector("#audio1");
      let int = setInterval(() => {
        audio.pause();
        audio.currentTime = 0;
        num = scoreList[count];
        that.currentPlaying = count;
        eval('audio = document.querySelector("#audio' + num + '")');
        audio.play();
        count++;
        if (count == length) {
          clearInterval(int);
          // var to = setTimeout(() => {
          //   this.currentPlaying = 999;
          // }, 500);
        }
      }, 500);
    },
    calcResult(results) {
      let that = this;
      let percentage = 0;
      console.log(results);
      for (let i in results) {
        let res = results[i];
        if (res != -1) {
          res.bottom = ((that.matches[res.score] * 12) + 10) + 'px';
          res.left = percentage + '%';
          percentage += 25;
          if (percentage >= 100) percentage -= 100;
        }
      }
      this.resultList = results;
    },
    exit() {
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
      this.$router.push({ path: '/' })
    }
  },
  sockets: {
    connect: function() {
      let that = this;
      let id = this.$socket.id;
      if (this.isObserver) {
        that.userInfo.id = id;
        localStorage.setItem('userInfo', JSON.stringify(that.userInfo));
      } else {
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
    },
    list: function(list) {
      let results = JSON.parse(list);
      this.calcResult(results.userList);
      if (results.isAll) {
        this.isAll = 1;
        this.sysScore = results.sysScore;
      }
    },
    reset: function(res) {
      localStorage.removeItem('results');
      this.resultList = {};
      this.sysScore = '-';
      if (!this.isObserver) {
        this.$router.push({ path: '/options' });
      }
    }
  }
}

</script>
<style scoped>
#sentence {
  color: #bec4dd;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 100px;
}

#sysScore {
  color: #FFF;
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  margin: 20px 0;
}

.lines {
  margin-bottom: 60px;
}

#reset {
  border: 1px solid #FFF;
  background: transparent;
  width: 40%;
  margin: 10px 30%;
}

#play {
  height: 50px;
  width: 50px;
  margin: 10px auto;
  border-radius: 50%;
  border: 1px solid #FFF;
  background: url('../assets/note_half.png') no-repeat 18px center;
  background-size: 16px;
}

#notesBox {
  position: relative;
  width: 90%;
  margin: 0 auto;
}

#notesBox .placeholder {
  width: 25%;
  position: absolute;
  opacity: .5;
  top: 0;
  text-align: center;
}

#notesBox .placeholder.secondLine {
  top: 110px;
}

#notesBox .placeholder img {
  height: 50px;
}

.lines {
  width: 100%;
}

.note {
  position: absolute;
  top: 0;
  color: #FFF;
  height: 90px;
  width: 25%;
}

.note.secondLine {
  top: 110px;
}

.note img {
  position: absolute;
  height: 40px;
  left: calc(50% - 10px);
}

.note img.beats {
  animation: beats .5s;
}

.note span {
  position: absolute;
  bottom: 0;
  display: block;
  font-size: 1rem;
  left: calc(50% - 10px);
}

#exit {
  height: 26px;
  width: 26px;
  background: url('../assets/back.png') no-repeat center;
  background-size: cover;
  position: absolute;
  right: 6vw;
  top: 40px;
}

</style>
