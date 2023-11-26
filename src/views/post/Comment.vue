<template>
  <div class="comment">
    <div class="title">评论 <span class="title__num"></span></div>
    <div class="myComment">
      <div class="myComment__img">
      </div>
      <Input @handleSend="handleSend" />
    </div>
    <div class="allComment">
      <comment-item :comment="commentList" @handleSend="handleSend"></comment-item>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { ref, getCurrentInstance, onMounted } from 'vue'
import CommentItem from './CommentItem.vue'
import Input from './Input.vue'
export default {
  name: 'Comment',
  components: { CommentItem, Input },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const essayId = route.params.id
    const { proxy } = getCurrentInstance()
    const commentList = ref([])
    // 获取评论列表
    const getCommentList = async () => {
      const res = await proxy.$api.getCommentList({ id: essayId })
      commentList.value = res
    }
    // 获取更多评论
    console.log(proxy.$store.state.commentId);


    onMounted(() => {
      getCommentList()
    })
    // 发送评论
    const handleSend = (comment) => {
      const commentId = proxy.$store.state.commentId
      if (comment) {
        // { essayId,userId, content, time, type, to }
        const res = proxy.$api.addComment({
          essayId,
          userId: 1,
          commentId,
          comment: comment,
          time: new Date(),
          type: 1,
          to: {}
        })

        if (res) {
          getCommentList()
        }
      }
    }
    return { commentList, handleSend }
  }
}
</script>
<style lang='scss' scoped>
@import '../../style/iconfont.scss';

.comment {
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  // height: 500px;
  // background: #fff;

}

.myComment {
  display: flex;
  align-items: center;

  &__img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-image: url("../../assets/img/111.webp");
    background-size: cover;
    margin-right: 10px;
  }
}

.title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}
</style>

