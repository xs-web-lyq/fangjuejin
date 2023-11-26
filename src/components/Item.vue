<template>
  <div class="item">
    <li class="content__infos__li" v-for="(item, index) in essay" :key="index" @click="handlePostClick(index)">
      <div class="content__infos__left">
        <div class="infos__left__title">{{ item.title }}</div>
        <div class="infos__left__info">{{ item.desc }}</div>
        <div class="infos__left__details">
          <div class="infos__details__left">
            <span class="infos__details__name">{{ item.author }}</span>
            <span class="infos__details__comment iconfont">&#xe661; 评论</span>
            <span class="infos__details__identity iconfont">&#xe600; {{ item.help }}k</span>
          </div>
          <div class="infos__details__tags">
            <span class="infos__details__tag" v-for="(it, index) in item.tag" :key="index">{{ it }}</span>
          </div>
        </div>
      </div>
      <div class="content__infos__right"> </div>
    </li>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'Item',
  props: ['essay'],
  setup() {
    const router = useRouter()
    const handlePostClick = (index) => {
      router.push({ name: 'Post', params: { id: index } })
    }
    return { handlePostClick }
  }
}
</script>
<style lang='scss' scoped>
@import '../style/iconfont.scss';
@import '../style/mixin.scss';

.item {
  // width: 680px;
}

.content {
  &__infos {
    &__li {
      border-radius: 5px;
      margin: 10px 0;
      padding-left: 10px;
      height: 100px;
      display: flex;

      &:hover {
        background-color: #f5f5f5;
        cursor: pointer;
      }
    }

    &__left {
      flex: 1;
      overflow: hidden;
    }

    &__right {
      width: 150px;
      margin-left: 20px;
      background-image: url(../assets/img/222.webp);
      background-size: cover;
    }
  }
}

.infos {
  &__left {


    &__title {
      line-height: 30px;
      font-size: 16px;
      color: #000;
    }

    &__info {
      line-height: 20px;
      font-size: 14px;
      color: #999;
      @include ellipsis;
    }

    &__details {
      line-height: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__details {

    font-size: 12px;
    color: #999;

    &__name {

      margin-right: 10px;
    }

    &__comment {

      margin-right: 10px;
      font-size: 12px;
    }

    &__identity {
      font-size: 12px;
    }

    &__tag {
      font-size: 12px;
      margin-right: 10px;
      color: #108ee9;
    }
  }
}
</style>
