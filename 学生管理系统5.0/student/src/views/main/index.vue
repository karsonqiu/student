<template>
  <div class="main">
    <header class="toolbar">
      <div class="_tool">
        <div class="fullscreen">
          <img src="@/assets/images/fullscreen.png" />
        </div>

        <div class="setup">
          <img src="@/assets/images/setup.png" />
          <div class="exit">
            <div class="triangle"></div>
            <!-- <div class="_exit" @click.prevent="exit">退出</div> -->
            <router-link class="_exit" :to="{ name: 'Login' }"
              >退出</router-link
            >
          </div>
        </div>
      </div>

      <div class="toolbar-logo">学生管理系统</div>

      <div class="nav-button">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>

    <aside class="nav" :class="{ navShrink: shrink, navMemu: !shrink }">
      <div class="topsun sun"><img src="@/assets/images/topsun.png" /></div>
      <div class="bottomsun sun">
        <img src="@/assets/images/bottomsun.png" />
      </div>
      <div class="logo">学生管理系统</div>
      <div class="headPor">
        <div class="por">
          <img src="@/assets/images/headpor.png" />
        </div>
        <span class="name">{{ userName }}</span>
      </div>
      <ul class="_nav">
        <router-link
          class="list-item student-list pitch"
          :to="{ name: 'stulist' }"
        >
          学生列表
        </router-link>
        <router-link
          class="list-item student-echarts"
          :to="{ name: 'statistics' }"
        >
          数据统计
        </router-link>
      </ul>
      <div class="shrink" @click="navShrink(true)" v-show="!shrink">
        <img src="@/assets/images/shrink.png" />
      </div>
      <div class="memu" @click="navShrink(false)" v-show="shrink">
        <img src="@/assets/images/memu.png" />
      </div>
    </aside>
    <div
      class="content"
      :class="{ contentShrink: conShrink, contentMemu: !conShrink }"
    >
      <router-view></router-view>
    </div>
    <content> </content>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: this.$cookie.getCookie("username"),
      shrink: false,
      conShrink: false,
    };
  },
  methods: {
    navShrink(e) {
      this.shrink = e;
      if (e) {
        setTimeout(() => {
          this.conShrink = e;
        }, 500);
      } else {
        this.conShrink = e;
      }
    },
  },
};
</script>

<style scoped src="@/style/index.css">
</style>