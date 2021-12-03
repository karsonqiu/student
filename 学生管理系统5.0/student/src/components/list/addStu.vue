<template>
  <div class="addcontent">
    <div class="addcontent-box">
      <div class="toptitle">
        新增学生
        <div class="shutdowm" @click="shutdowm">
          <img src="@/assets/images/shutdowm.png" />
        </div>
      </div>
      <form action="#" id="add-student-form">
        <div class="intext">
          <label for="name">姓名</label>
          <input type="text" id="name" name="name" v-model="user.name" />
        </div>
        <div class="inradio">
          <label for="">性别</label>
          <input
            type="radio"
            id="men"
            value="0"
            name="sex"
            v-model="user.sex"
            checked
          />
          <label for="men" class="sex">男</label>
          <input
            type="radio"
            id="women"
            value="1"
            name="sex"
            v-model="user.sex"
          />
          <label for="women" class="sex">女</label>
        </div>
        <div class="intext">
          <label for="email">邮箱</label>
          <input type="text" id="email" name="email" v-model="user.email" />
        </div>
        <div class="intext">
          <label for="number">学号</label>
          <input type="text" id="number" name="sNo" v-model="user.sNo" />
        </div>
        <div class="intext">
          <label for="years">出生年</label>
          <input type="text" id="years" name="birth" v-model="user.birth" />
        </div>
        <div class="intext">
          <label for="phone">手机号</label>
          <input type="text" id="phone" name="phone" v-model="user.phone" />
        </div>
        <div class="intext">
          <label for="address">住址</label>
          <input
            type="text"
            id="address"
            name="address"
            v-model="user.address"
          />
        </div>
        <div class="inreset">
          <label></label>
          <button id="addsubmit" @click.prevent="commit">提交</button>
          <input type="reset" id="reset" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        name: "",
        sex: 0,
        email: "",
        birth: "",
        phons: "",
        address: "",
        sNo: "",
      },
    };
  },
  methods: {
    ...mapActions("listStore", ["getList"]),
    shutdowm() {
      this.$emit("shutdowm", false);
    },
    async commit() {
      try {
        const { msg, status: type } = await this.$api.addStu(this.user);
        this.$showToast({ msg, type });
        this.shutdowm();
        this.getList({ page: 1 });
      } catch (error) {
        this.$showToast({ msg: error, type: "fail" });
      }
    },
  },
};
</script>

<style scoped src="@/style/index.css">
</style>