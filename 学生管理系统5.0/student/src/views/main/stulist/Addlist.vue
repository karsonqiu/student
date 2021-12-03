<template>
  <div>
    <div class="tablehead">
      <span class="student">学生列表</span>
      <span class="addstudent" @click="addStu">新增学生</span>
    </div>
    <transition>
      <AddStu v-if="showadd" @shutdowm="shutdowm" />
    </transition>
  </div>
</template>

<script>
import AddStu from "@/components/list/addStu.vue";
export default {
  components: {
    AddStu,
  },
  data() {
    return {
      showadd: false,
    };
  },
  methods: {
    addStu() {
      this.showadd = true;
    },
    shutdowm() {
      this.showadd = false;
    },
  },
};
</script>

<style scoped>
.content .tablebox .tablehead {
  height: 54px;
  line-height: 54px;
  padding: 0 20px;
  color: #606266;
}

.content .tablebox .tablehead span {
  display: inline-block;
  font-size: 1.1rem;
}

.content .tablebox .tablehead .student::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 24px;
  vertical-align: middle;
  margin-right: 10px;
  background-color: #6280f3;
  border-radius: 25%;
}

.content .tablebox .tablehead .addstudent {
  cursor: pointer;
  float: right;
  color: #6280f3;
}

.content .tablebox .tablehead .addstudent::before {
  content: "";
  display: inline-block;
  width: 18px;
  height: 18px;
  background-image: url("~@/assets/images/add.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  vertical-align: middle;
  margin-right: 4px;
}
.v-enter {
  opacity: 0;
}
.v-enter-active {
  transition: all 0.5s;
}
.v-leave-to {
  opacity: 0;
}
.v-leave-active {
  transition: all 0.5s;
}
</style>