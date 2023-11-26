<template>
  <div class="search">
    <div class="search__header">
      <div class="search__header__left">
        <span class="header__left__all">综合</span>
        <span class="header__left__new">最新优先</span>
        <span class="header__left__hot">最热优先</span>
      </div>
      <div class="search__header__right">
        <el-select v-model="fliterValue" placeholder="请选择" size="small" label-width="100px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
    </div>
    <div class="search__content">
      <div class="search__content__item" v-for="(item, index) in searchList" :key="item.id">
        <div class="content__item__left">
          <div class="content__item__top">
            {{ item.name }}-{{ item.createTime }}
          </div>
          <div class="content__item__title">
            {{ item.title }}
          </div>
          <div class="content__item__info">
            {{ item.description }}
          </div>
          <div class="content__item__bottom">
            <span class="content__item__bottom__btn iconfont">&#xe600;<b class="content__item__bottom__num">{{ item.help
            }}</b></span>
            <span class="content__item__bottom__btn iconfont">&#xe891;<b class="content__item__bottom__num">{{
              item.comment }}</b></span>
          </div>
        </div>
        <div class="content__item__right"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import { useStore } from 'vuex'
import storage from '../../utils/storage.js'
import { ref } from 'vue'
export default {
  name: 'Search',
  setup() {
    // 获取保存在vuex中的数据
    const searchList = storage.getItem('searchList')
    // 获取筛选时间
    const fliterValue = ref(0)
    // 时间筛选
    const options = [
      {
        value: 0,
        label: '不限'
      },
      {
        value: 1,
        label: '近一天'
      },
      {
        value: 2,
        label: '近一周'
      },
      {
        value: 3,
        label: '近一月'
      }
    ]
    return { searchList, options, fliterValue }
  }
}
</script>
<style lang='scss' scoped>
@import '../../style/iconfont.scss';
@import '../../style/mixin.scss';

.search {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  border-radius: 7px;
  background: #fff;
  padding: 20px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }

  &__content {
    margin-top: 10px;
    border-top: #e7e9e9 1px solid;
    padding-top: 10px;


    &__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: #eeecec 1px solid;
      margin-bottom: 10px;
    }
  }
}

.header {
  &__left {

    &__all,
    &__new,
    &__hot {
      padding: 0 10px;
      border-right: 1px solid #ccc;

      &:hover {
        cursor: pointer;
        color: #007fff;
      }
    }

    &__hot {
      border-right: none;
    }
  }
}

.content {
  &__item {
    &__left {
      flex: 1;
      padding-left: 10px;
      overflow: hidden;
    }

    &__top {
      font-size: 14px;
      line-height: 30px;
      color: #a6a2a2
    }

    &__title {
      font-size: 16px;
      line-height: 30px;
      color: #000;
    }

    &__info {
      font-size: 12px;
      line-height: 30px;
      color: #5a5757;
      @include ellipsis;
    }

    &__bottom {
      margin-top: 10px;
      color: #5a5757;

      &__btn {
        position: relative;
        display: inline-block;
        border: 1px solid #cfcbcb;
        border-radius: 3px;
        margin-right: 10px;
        // vertical-align: bottom;
        text-align: center;
        padding: 2px 15px;
      }

      &__num {
        position: absolute;
        top: 0;
        right: 2px;
        font-size: 10px;
        color: #82b7eb;
      }
    }

  }
}
</style>
