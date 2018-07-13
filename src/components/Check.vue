<template>
  <div class="check">
    <div id="notesBox">
      <div class="lines"></div>
      <div class="note" @click="play">
        <img src="../assets/note_half.png" :style="{bottom:noteBottom}" :class="{beats:isBeating}">
      </div>
    </div>
    <p v-text="score" id="score"></p>
    <p id="sentence">Your estimation is automatically
      <br /> converted to music notes</p>
    <button @click="submit" id="submit">Check Billboard</button>
    <p @click="goBack" id="reselect">reselect</p>
    <audio preload="auto" id="audioC">
      <source src="../assets/notes/C.mp3" type="audio/mp3" />
    </audio>
    <audio preload="auto" id="audioD">
      <source src="../assets/notes/D.mp3" type="audio/mp3" />
    </audio>
    <audio preload="auto" id="audioE">
      <source src="../assets/notes/E.mp3" type="audio/mp3" />
    </audio>
    <audio preload="auto" id="audioF">
      <source src="../assets/notes/F.mp3" type="audio/mp3" />
    </audio>
    <audio preload="auto" id="audioG">
      <source src="../assets/notes/G.mp3" type="audio/mp3" />
    </audio>
    <audio preload="auto" id="audioA">
      <source src="../assets/notes/A.mp3" type="audio/mp3" />
    </audio>
  </div>
</template>
<script>
export default {
  name: 'Check',
  data() {
    return {
      score: '',
      userInfo: {},
      noteBottom: 0,
      matches: {
        1: 1,
        3: 2,
        5: 3,
        8: 4,
        13: 5,
        21: 6
      },
      isBeating: false
    }
  },
  mounted() {
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
    } else {
      this.$router.push({ path: '/' })
    }
    let score = location.href.split('?')[1];
    this.score = score;
    this.noteBottom = (this.matches[score] * 12) + 'px';
  },
  methods: {
    submit() {
      let that = this;
      this.$axios.post('/score', that.$qs.stringify({
          score: that.score,
          userInfo: that.userInfo
        }))
        .then(function(res) {
          console.log(res);
          localStorage.setItem('results', JSON.stringify(res.data));
          that.$router.push({ path: '/result' });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    play() {
      this.isBeating = true;
      let audio1 = document.querySelector('#audioC');
      let audio2 = document.querySelector('#audioD');
      let audio3 = document.querySelector('#audioE');
      let audio4 = document.querySelector('#audioF');
      let audio5 = document.querySelector('#audioG');
      let audio6 = document.querySelector('#audioA');
      eval('audio' + this.matches[this.score] + '.play()');
      var to = setTimeout(() => {
        this.isBeating = false;
      }, 300);
    },
    goBack() {
      this.$router.push({ path: '/options' });
    },
    exit() {
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
    },
    list: function(list) {
      localStorage.setItem('results', JSON.stringify(list));
    }
  }
}

</script>
<style scoped>
#score {
  font-size: 3rem;
  color: #FFF;
  text-align: center;
  margin: 40px 0 0px 0;
}

#sentence {
  font-size: 1rem;
  color: #FFF;
  text-align: center;
  margin: 0 0 60px 0;
}

.lines {
  width: 100%;
}

#notesBox {
  position: relative;
  width: 90%;
  margin: 126px auto 0 auto;
}

.note {
  position: absolute;
  top: 0;
  color: #FFF;
  height: 80px;
  width: 30%;
  left: 35%;
}

.note img {
  position: absolute;
  height: 40px;
  left: calc(50% - 10px);
}

.note img.beats {
  animation: beats .3s;
}

#submit {
  border: 1px solid #FFF;
  background: transparent;
}

#reselect {
  color: #FFF;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  margin: 10px 0;
}

</style>
