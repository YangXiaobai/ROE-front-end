<template>
  <div class="login">
    <img src="../assets/Logo.png" id="logo">
    <p id="sentence">
      <span>-Bob Dylan-</span>
      <br />
      <span>If you don't underestimate me, <br /> I won't underestimate you.</span>
    </p>
    <input type="text" v-model="userName" />
    <button @click="confirm" :class="{disabled:!userName}">Confirm</button>
    <p @click="observer" id="observer">Observer</p>
    <img src="../assets/home_bg_corner.png" id="corner">
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      userName: '',
      socketId: ''
    }
  },
  mounted() {

  },
  methods: {
    confirm() {
      let userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        userInfo = JSON.parse(userInfo);
        this.socketId = userInfo.id;
      }
      let name = this.userName,
        id = this.socketId;
      let that = this;
      if (!!name && !!id) {
        this.$axios.post('/voter', that.$qs.stringify({
            id: id,
          }))
          .then(function(res) {
            console.log(res);
            localStorage.setItem('userInfo', JSON.stringify({
              name: name,
              id: id
            }));
            that.$router.push({ path: '/options' });
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    observer() {
      localStorage.setItem('userInfo', JSON.stringify({
        id: this.socketId
      }));
      this.$router.push({ path: '/result' });
      // let that = this;
      // this.$axios.post('/observer', that.$qs.stringify({
      //     id: that.socketId,
      //   }))
      //   .then(function(res) {
      //     console.log(res);
      //     this.$router.push({ path: '/result' });
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    }
  },
  sockets: {
    connect: function() {
      this.socketId = this.$socket.id;
      console.log(this.socketId);
    }
  }
}

</script>
<style scoped>
#logo {
  height: 60px;
}

#sentence {
  color: #7a7bbf;
  text-align: center;
  margin: 50px 0 80px 0;
}

#sentence span {
  font-size: 1rem;
}

#observer {
  color: #FFF;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  margin: 10px 0;
}

#corner {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 100px;
}

button.disabled {
  opacity: .5;
}

</style>
