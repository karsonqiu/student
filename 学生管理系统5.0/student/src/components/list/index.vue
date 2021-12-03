<template>
  <div class="tableheight">
    <div class="empty" v-if="tbody.length === 0">
      <img src="@/assets/images/empty.png" />
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="(item, i) in thead" :key="i">{{ item }}</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody id="information">
        <tr v-for="(item, i) in tbody" :key="item.id">
          <td>{{ size * nowPage - size + i + 1 }}</td>
          <td>{{ item.sNo }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.sex === 0 ? "男" : "女" }}</td>
          <td>{{ item.email }}</td>
          <td>{{ new Date().getFullYear() - item.birth }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.address }}</td>
          <td>
            <span @click="redact(item)">编辑</span
            ><span @click="del(item.sNo, item.name)">删除</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Transition>
      <redactStu v-if="showredact" @shutdowm="shutdowm" />
    </Transition>
  </div>
</template>

<script>
const redactStu = () => import("./redactStu.vue");
import { mapMutations, mapActions } from "vuex";
export default {
  props: {
    thead: {
      type: Array,
      default: () => [
        "序号",
        "学号",
        "姓名",
        "性别",
        "邮箱",
        "年龄",
        "手机号",
        "住址",
      ],
    },
    tbody: {
      type: Array,
      default: () => [],
    },
    nowPage: {
      type: Number,
    },
    size: {
      type: Number,
    },
  },
  components: {
    redactStu,
  },
  data() {
    return {
      showredact: false,
    };
  },
  methods: {
    ...mapActions("listStore", ["delStu"]),
    ...mapMutations("listStore", ["setActiveStu"]),
    shutdowm(e) {
      this.showredact = e;
    },
    redact(item) {
      this.showredact = true;
      this.setActiveStu(item);
    },
    del(sNo, name) {
      const flag = window.confirm(`是否确定删除${name}`);
      if (flag) {
        this.delStu(sNo);
      }
    },
  },
};
</script>

<style scoped>
.tableheight {
  position: relative;
  height: calc(84% - 54px);
  overflow: hidden;
  overflow-y: auto;
}

.tableheight .empty {
  position: absolute;
  width: 16%;
  top: 34%;
  left: 42%;
  z-index: 0;
}

.tableheight .empty img {
  width: 100%;
}

.tableheight table {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
  line-height: 44px;
}

table thead tr {
  background-color: #f5f7fa;
  border-top: 1px solid #ebeef5;
}

table thead tr th {
  font-size: 1rem;
  color: #a7abb4;
}

table tbody tr td span {
  font-size: 1rem;
  color: #6280f3;
  margin: 0 6px;
  cursor: pointer;
}
table tbody tr {
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}

table tbody tr td {
  font-size: 1rem;
  color: #606266;
}

table tbody tr:hover {
  background-color: #fafafa;
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