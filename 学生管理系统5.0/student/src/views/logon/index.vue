<template>
  <div class="backg">
    <div class="register">
      <h2>用户注册</h2>
      <form action="#" class="register-form" @submit.prevent="logon">
        <div>
          <label for="reg-user">用户名</label>
          <input type="text" id="reg-user" name="reguser" v-model="user" />
        </div>
        <div>
          <label for="reg-account">账号</label>
          <input type="text" name="regaccount" v-model="account" />
        </div>
        <div>
          <label for="reg-password">密码</label>
          <input type="password" name="regpassword" v-model="password" />
        </div>
        <div>
          <label for="reg-repeatword">确认密码</label>
          <input type="password" name="regrepeatword" v-model="repeatword" />
        </div>
        <div class="positionr">
          <label></label>
          <button class="button-register">注册</button>
          <router-link :to="{ name: 'Login' }"
            ><div class="login-button">返回登陆</div>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      account: "",
      password: "",
      repeatword: "",
    };
  },
  methods: {
    async logon() {
      try {
        if (
          this.user &&
          this.account &&
          this.password &&
          this.password &&
          this.repeatword
        ) {
          const data = await this.$api.logon(
            `username=${this.user}&account=${this.account}&password=${this.password}&rePassword=${this.repeatword}`
          );
          this.$showToast({ msg: data.msg, type: data.status });
          this.$router.push("/login");
        } else {
          this.$showToast({ msg: "请填写注册信息", type: "fail" });
        }
      } catch (error) {
        this.$showToast({ msg: error, type: "fail" });
      }
    },
  },
};
</script>

<style scoped src="@/style/register.css">
</style>