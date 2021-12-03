<template>
  <div class="list">
    <List :tbody="list" :nowPage="nowPage" :size="size" />
    <Page
      :nowPage="nowPage"
      :totalPage="totalPage"
      @current-page="cpage"
      @current-size="csize"
    />
  </div>
</template>

<script>
import List from "@/components/list";
import Page from "@/components/page";
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("listStore", [
      "list",
      "nowPage",
      "totalPage",
      "size",
      "checkmodule",
      "check",
    ]),
  },
  components: {
    List,
    Page,
  },
  methods: {
    ...mapActions("listStore", ["getList", "checkList"]),
    cpage(e) {
      if (this.checkmodule) {
        const check = { ...this.check, page: e };
        this.checkList(check);
      } else {
        this.getList({ page: e });
      }
    },
    csize(e) {
      if (this.checkmodule) {
        const check = { ...this.check, page: 1, size: e };
        this.checkList(check);
      } else {
        this.getList({ page: 1, size: e });
      }
    },
  },
  async created() {
    this.getList({ page: 1 });
  },
};
</script>

<style scoped>
.list {
  height: 100%;
}
</style>