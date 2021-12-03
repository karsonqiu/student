<template>
  <div class="redact">
    <div class="redact-box">
      <div class="toptitle">
        编辑信息
        <div class="redact-shutdowm" @click="shutdowm">
          <img src="@/assets/images/shutdowm.png" />
        </div>
      </div>
      <form action="#" id="redact-form">
        <div class="intext">
          <label for="redact-name">姓名</label>
          <input
            type="text"
            id="redact-name"
            name="name"
            :value="activeStu.name"
            @input="nextlist.name = $event.target.value"
          />
        </div>
        <div class="inradio">
          <label for="">性别</label>
          <input
            type="radio"
            id="redact-men"
            value="0"
            name="sex"
            :checked="activeStu.sex === 0"
            @change="nextlist.sex = $event.target.value"
          />
          <label for="redact-men" class="sex">男</label>
          <input
            type="radio"
            id="redact-women"
            value="1"
            name="sex"
            :checked="activeStu.sex === 1"
            @change="nextlist.sex = $event.target.value"
          />
          <label for="redact-women" class="sex">女</label>
        </div>
        <div class="intext">
          <label for="redact-email">邮箱</label>
          <input
            type="text"
            id="redact-email"
            name="email"
            :value="activeStu.email"
            @input="nextlist.email = $event.target.value"
          />
        </div>
        <div class="intext">
          <label for="redact-number">学号</label>
          <input
            type="text"
            id="redact-number"
            name="sNo"
            readonly
            :value="activeStu.sNo"
          />
        </div>
        <div class="intext">
          <label for="redact-years">出生年</label>
          <input
            type="text"
            id="redact-years"
            name="birth"
            :value="activeStu.birth"
            @input="nextlist.birth = $event.target.value"
          />
        </div>
        <div class="intext">
          <label for="redact-phone">手机号</label>
          <input
            type="text"
            id="redact-phone"
            name="phone"
            :value="activeStu.phone"
            @input="nextlist.phone = $event.target.value"
          />
        </div>
        <div class="intext">
          <label for="redact-address">住址</label>
          <input
            type="text"
            id="redact-address"
            name="address"
            :value="activeStu.address"
            @input="nextlist.address = $event.target.value"
          />
        </div>
        <div class="inreset">
          <label></label>
          <button id="redact-submit" @click.prevent="updatelist">
            确认修改
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("listStore", ["activeStu"]),
    nextlist() {
      return {
        ...this.activeStu,
      };
    },
  },
  methods: {
    shutdowm() {
      this.$emit("shutdowm", false);
    },
    async updatelist() {
      try {
        const data = await this.$api.updateStu(this.nextlist);
        this.$showToast({ msg: data.msg, type: data.status });
        Object.assign(this.activeStu, this.nextlist);
        this.shutdowm();
      } catch (error) {
        this.$showToast({ msg: error, type: "fail" });
      }
    },
  },
};
</script>

<style scoped>
.redact {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9;
}

.redact .redact-box {
  position: absolute;
  width: 28%;
  left: 42%;
  top: 20%;
  background-color: #fff;
  border-radius: 4px;
}

.redact .redact-box .toptitle {
  position: relative;
  width: 100%;
  height: 44px;
  background-color: #6280f3;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  text-align: center;
  line-height: 44px;
  color: #fff;
}

.redact .redact-box .toptitle .redact-shutdowm {
  position: absolute;
  width: 20px;
  right: 12px;
  top: 0;
  cursor: pointer;
}

.redact .redact-box .toptitle .redact-shutdowm img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

.redact .redact-box #redact-form {
  padding: 10px 0;
  width: 100%;
  height: 100%;
}

.redact .redact-box #redact-form .inradio input {
  margin: 3px;
}

.redact .redact-box #redact-form div {
  color: #606266;
  margin: 12px 0;
}

.redact .redact-box #redact-form div label:not(.sex) {
  margin-right: 8px;
  width: 22%;
  display: inline-block;
  text-align: right;
}

.redact .redact-box #redact-form .intext input {
  padding-left: 10px;
  width: 60%;
  border: 1px solid #dcdfe6;
  height: 32px;
  border-radius: 4px;
}

.redact .redact-box #redact-form .intext #redact-number {
  background-color: #f5f7fa;
}

.redact .redact-box #redact-form .inreset #redact-submit {
  width: 80px;
  height: 36px;
  background-color: #6280f3;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 8px 0;
}
</style>