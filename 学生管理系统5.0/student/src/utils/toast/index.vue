<template>
  <div class="toast-wrapper" :class="[type, animate]" v-if="exist">
    <div class="toast-content">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exist: true,
      show: true,
    };
  },
  computed: {
    animate() {
      return this.show ? "fade-in" : "fade-out";
    },
  },
};
</script>

<style>
.toast-wrapper {
  width: 260px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  position: fixed;
  top: 0;
  margin-top: 50px;
  border-radius: 10px;
  left: calc(50% - 130px);
  z-index: 1000;
}
.success {
  background: #B0BFF9;
}
.fail {
  background: #FD767B;
}
.toast-content {
  color: #fff;
  font-weight: 600;
}

@keyframes fadeIn {
  0% {
    top: -100px;
    opacity: 0;
  }
  100% {
    top: 0px;
    opacity: 1;
  }
}

@keyframes fadeOut {
  100% {
    top: -100px;
    opacity: 0;
  }
  0% {
    top: 0px;
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.5s forwards;
}
.fade-out {
  animation: fadeOut 0.5s forwards;
}
</style>