<template>
  <div class="pageNum" v-show="totalPage > 1">
    <div class="my-page">
      <div class="page-size">
        <label for="page-size-inp">每页条数：</label>
        <input
          id="page-size-inp"
          type="number"
          min="1"
          max="20"
          v-model="size"
          @change="setSize"
        />
      </div>
      <ul class="my-turn-page">
        <li
          class="my-page-prev"
          :class="{ 'not-allow': nowPage === 1 }"
          @click="turnPage('prev')"
        >
          &lt;
        </li>
        <template v-if="totalPage <= 7">
          <li
            v-for="i in totalPage"
            :key="i"
            class="my-page-num"
            :class="{ optPage: i === nowPage }"
            @click="turnPage(i)"
          >
            {{ i }}
          </li>
        </template>

        <template v-else>
          <template v-if="nowPage <= 4">
            <li
              v-for="i in 6"
              :key="i"
              class="my-page-num"
              :class="{ optPage: i === nowPage }"
              @click="turnPage(i)"
            >
              {{ i }}
            </li>
          </template>

          <template v-if="nowPage > 4">
            <li
              class="my-page-num"
              :class="{ optPage: 1 === nowPage }"
              @click="turnPage(1)"
            >
              1
            </li>
            <li @click="turnPage(nowPage - 5 > 1 ? nowPage - 5 : 1)">...</li>
          </template>

          <template v-if="nowPage > 4 && totalPage - 4 >= nowPage">
            <li
              v-for="i in 5"
              :key="nowPage - 3 + i"
              class="my-page-num"
              :class="{ optPage: nowPage - 3 + i === nowPage }"
              @click="turnPage(nowPage - 3 + i)"
            >
              {{ nowPage - 3 + i }}
            </li>
          </template>

          <template v-if="totalPage - 4 >= nowPage">
            <li
              @click="
                turnPage(nowPage + 5 < totalPage ? nowPage + 5 : totalPage)
              "
            >
              ...
            </li>
            <li
              class="my-page-num"
              :class="{ optPage: totalPage === nowPage }"
              @click="turnPage(totalPage)"
            >
              {{ totalPage }}
            </li>
          </template>

          <template v-if="totalPage - 4 < nowPage">
            <li
              v-for="i in 6"
              :key="totalPage - 6 + i"
              class="my-page-num"
              :class="{ optPage: totalPage - 6 + i === nowPage }"
              @click="turnPage(totalPage - 6 + i)"
            >
              {{ totalPage - 6 + i }}
            </li>
          </template>
        </template>
        <li
          class="my-page-next"
          @click="turnPage('next')"
          :class="{ 'not-allow': nowPage === totalPage }"
        >
          &gt;
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nowPage: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      size: 10,
    };
  },
  methods: {
    turnPage(page) {
      let np = null;
      if (page === "prev") {
        np = this.nowPage - 1;
        if (this.nowPage <= 1) {
          np = 1;
        }
      } else if (page === "next") {
        np = this.nowPage + 1;
        if (this.nowPage >= this.totalPage) {
          np = this.totalPage;
        }
      } else {
        np = page;
      }
      this.$emit("current-page", np);
    },
    setSize() {
      this.$emit("current-size", this.size);
    },
  },
};
</script>

<style scoped>
.pageNum {
  position: absolute;
  width: calc(100% - 40px);
  height: 30px;
  right: 20px;
  bottom: 30px;
}

.pageNum .my-page {
  position: absolute;
  right: 20px;
}

.pageNum .page-size,
.pageNum .my-turn-page,
.pageNum .my-turn-page li,
.pageNum .my-turn-page span {
  float: left;
}

.pageNum .page-size {
  margin-right: 20px;
}

.pageNum .not-allow {
  cursor: not-allowed !important;
}

.pageNum .page-size #page-size-inp {
  width: 60px;
  height: 28px;
  outline: none;
  border: 1px solid #dcdfe6;
  line-height: 28px;
  font-size: 16px;
  padding-left: 4px;
  box-sizing: border-box;
}

.pageNum .my-page .my-turn-page li {
  text-align: center;
  line-height: 28px;
  color: #303133;
  margin: 0 5px;
  width: 30px;
  height: 28px;
  background-color: #f4f4f5;
  border-radius: 2px;
  cursor: pointer;
}

.pageNum .my-page .my-turn-page .optPage {
  background-color: #6280f3;
  color: #fff;
}
</style>