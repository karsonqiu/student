<template>
  <div>
    <div
      id="student-list"
      class="content-item show-list"
      data-id="student-list"
    >
      <form class="screenbox">
        <div class="check">
          <input
            type="text"
            id="check-search"
            name="search"
            placeholder="请输入学号/邮箱"
            v-model="check.search"
          />
        </div>
        <div class="check-radio">
          <label for="">性别</label>
          <input
            type="radio"
            id="check-all"
            name="sex"
            value="-1"
            checked
            v-model="check.sex"
          />
          <label for="check-men" class="check-sex">全部</label>
          <input
            type="radio"
            id="check-men"
            name="sex"
            value="0"
            v-model="check.sex"
          />
          <label for="check-men" class="check-sex">男</label>
          <input
            type="radio"
            id="check-women"
            name="sex"
            value="1"
            v-model="check.sex"
          />
          <label for="check-women" class="check-sex">女</label>
        </div>
        <div class="check-inreset">
          <button class="check-button" @click.prevent="checkStu">查询</button>
          <input type="reset" id="check-reset" />
          <button class="check-reset">重置</button>
        </div>
      </form>

      <div class="tablebox">
        <Addlist />
        <StuList />
      </div>
      <transition> </transition>
    </div>
  </div>
</template>

<script>
import StuList from "./StuList.vue";
import Addlist from "./Addlist.vue";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      check: {
        sex: -1,
        search: "",
        page: 1,
        size: 10,
      },
    };
  },
  computed: {
    ...mapState("listStore", ["checkmodule"]),
  },
  components: {
    StuList,
    Addlist,
  },
  methods: {
    ...mapActions("listStore", ["checkList"]),
    async checkStu() {
      await this.checkList(this.check);
      if (this.checkmodule) {
        this.$showToast({ msg: "查询成功", type: "success" });
      }
    },
  },
};
</script>

<style scoped src="@/style/index.css">
</style>