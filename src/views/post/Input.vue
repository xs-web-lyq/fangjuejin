<template>
  <div class="myComment">
    <div class="myComment__comment">
      <div ref="comment" contenteditable="true" spellcheck="false" class="myComment__comment__input"
        placeholder="请输入评论内容">
      </div>
      <div class="myComment__comment__bottom">
        <span>
          <span class="myComment__comment__bottom__icon iconfont">&#xe627;</span>
          <!-- <span class="myComment__comment__bottom__icon iconfont">&#xe695;
          </span> -->
          <input ref="inputFile" class="myComment__comment__bottom__input" type="file" accept="image/*"
            @change="handleFileChange" />
        </span>
        <!-- <span class="myComment__comment__bottom__btn">发送</span> -->
        <el-tooltip content="ctr+enter" placement="top-start">
          <el-button class="myComment__comment__bottom__btn" @click="handlesend">发送</el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, ref, nextTick } from 'vue'
export default {
  name: 'Input',
  emits: ['handleSend'],
  setup(props, context) {
    // ??????
    const { ctx } = getCurrentInstance()
    const inputFile = ref(null)
    console.log(context.emit);
    const handlesend = () => {
      const comment = ctx.$refs.comment.innerText.trim()
      context.emit('handleSend', comment)
      ctx.$refs.comment.innerText = ''
    }
    // 文件上传功能
    const handleFileChange = (e) => {
      const currentTarget = e.target
      if (currentTarget) {
        // 将文件列表转为by转化为数组
        const file = Array.from(currentTarget.files)
        // 使用formData对象将文件转为二进制数据
        const formData = new FormData()
        formData.append('file', file[0])
        console.log(formData);

      }
    }
    return { handlesend, handleFileChange }
  }
}
</script >
<style lang='scss' scoped>
.myComment {
  &__comment {
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    // min-height: 150px;
    max-height: 300px;

    &__input {
      // appearance: none;
      // -webkit-appearance: none;
      overflow: auto;
      resize: none;
      min-height: 50px;
      max-height: none;
      width: 700px;
      padding: 10px;
      border-radius: 5px;
      background: rgba(161, 157, 157, 0.5);
      outline: none;

      &:focus {
        min-height: 70px;
        background: rgba(209, 204, 204, 0.5);
      }
    }

    &__bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 10px;
      // background-color: #3cf10a;

      &>span {
        display: flex;
        align-items: center;
        color: #0a6ff2;
      }


      // background
      &__icon {
        font-size: 20px;
        margin-right: 10px;


        &:hover {
          color: rgb(0, 157, 255);
          cursor: pointer;
        }
      }

      &__btn {
        width: 50px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        background: rgb(0, 157, 255);
        color: #fff;

        &:hover {
          background: rgb(5, 130, 208);
          cursor: pointer;
          color: #fff;
        }

      }

      &__input {
        width: 70px;
        // height: 30px;
        // border-radius: 5px;
        // background: rgba(161, 157, 157, 0.5);
        // outline: none;
        // color: #fff;
      }
    }
  }
}
</style>

