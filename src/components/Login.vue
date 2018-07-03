<template>
  <div class="login">
    <img src="../assets/Logo.png" id="logo">
    <p id="sentence">
      <span>-Bob Dylan-</span>
      <br />
      <span>If you don't underestimate me, <br /> I won't underestimate you.</span>
    </p>
    <input type="text" v-model="userName" />
    <button @click="confirm">Confirm</button>
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
  methods: {
    confirm() {
      let name = this.userName,
        id = this.socketId;
      if (!!name && !!id) {
        localStorage.setItem('userInfo', JSON.stringify({
          name: name,
          id: id
        }));
        this.$router.push({ path: '/options' });
      }
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

</style>
