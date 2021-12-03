<template>
  <div>
    <div class="backg">
      <div class="login">
        <h2>用户登陆</h2>
        <form action="#" class="login-form" @submit.prevent="login">
          <div>
            <input
              type="text"
              name="account"
              placeholder="请输入用户名"
              v-model="account"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="请输入密码"
              v-model="password"
            />
          </div>
          <div class="fregister-botton">
            <router-link :to="{ name: 'Logon' }">
              <span class="register-botton">注册用户</span>
            </router-link>
          </div>
          <div>
            <button class="button-login">登录</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: "",
      password: "",
    };
  },
  created() {
    this.$cookie.removeCookie("username");
  },
  methods: {
    async login() {
      try {
        if (this.account && this.password) {
          const data = await this.$api.login(
            `account=${this.account}&password=${this.password}`
          );
          this.$cookie.setCookie("username", this.account);
          this.$router.push("/main/stulist");
          this.$showToast({ msg: data.msg, type: data.status });
        } else {
          this.$showToast({ msg: "请填写账号密码", type: "fail" });
        }
      } catch (error) {
        this.$showToast({ msg: error, type: "fail" });
      }
    },
  },
};
</script>

<style scoped src="@/style/login.css">
</style>