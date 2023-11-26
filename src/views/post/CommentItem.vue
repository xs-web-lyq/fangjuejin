<template>
  <template v-for="item in comment">
    <div :class="{ allComment__item: true, allComment__item__indentation: item.type === 2 }">
      <div class="allComment__item__img"></div>
      <div class="allComment__item__content">
        <div class="allComment__item__content__name">
          {{ item.name }} <span v-if="item.type === 2">@{{ item.to.name }}</span>
        </div>
        <div class="allComment__item__content__text">
          {{ item.content }}
        </div>
        <div class="allComment__item__content__more">
          <span class="item__content__time">{{ item.time }}天前</span>
          <span class="item__content__helf iconfont">&#xe600; {{ item.helpNum }}</span>
          <span class="item__content__comment iconfont" @click="handleReply(item.name, item.id, item.type)">&#xe891; <i
              v-if="item.type === 1">{{ item.reply.length
              }}</i></span>
        </div>
        <Input v-show="commentId === item.id" @handleSend="handleSend" />
      </div>
    </div>
    <comment-item v-if="item.reply" :comment="item.reply" @handleSend="handleSend"></comment-item>
  </template>
</template>

<script>
import Input from './Input.vue'
import { useRouter, useRoute } from 'vue-router'
import { getCurrentInstance, ref, nextTick } from 'vue'
export default {
  name: 'CommentItem',
  props: ['comment'],
  emits: ['handleSend'],
  components: { Input },
  setup(props, context) {
    const proxy = getCurrentInstance().proxy
    // 评论id
    const commentId = ref(0)
    const handleSend = (comment) => {
      context.emit('handleSend', comment)
      commentId.value = null
    }
    const handleReply = (name, preId, type) => {
      commentId.value = preId
      proxy.$store.commit('saveCommentId', preId)

    }
    return { handleSend, handleReply, commentId }
  }
}
</script>
<style lang='scss' scoped>
.allComment {
  &__item {
    margin: 10px 0;
    display: flex;
    align-items: center;

    &__indentation {
      padding-left: 40px;
      font-size: 12px !important;
    }

    &__img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #eee;
      align-self: flex-start;
      background-image: url("../../assets/img/222.webp");
      background-size: cover;
    }

    &__content {
      flex: 1;
      padding: 0 15px;

      &__name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      &__text {
        font-size: 14px;
        line-height: 25px;
      }

      &__more {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: #8e8b8b;

        &>span {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>

