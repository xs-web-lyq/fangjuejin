<template>
  <div class="post">
    <div class="left">
      <ul class="left__ul">
        <li :class="{ left__ul__li: true, left__ul__li__active: follow }" @click="handleFollow">
          <i class="left__ul__li__icon iconfont">&#xe600;</i>
          <div class="left__ul__li__num">{{ essay.help }}</div>
        </li>
        <li class="left__ul__li iconfont">
          <i class="left__ul__li__icon iconfont">&#xe891;</i>
          <div class="left__ul__li__num">{{ essay.comment }}</div>
        </li>
        <li class="left__ul__li iconfont">
          <i class="left__ul__li__collect iconfont">&#xe673;</i>
          <div class="left__ul__li__num">{{ essay.collect }}</div>
        </li>
      </ul>
    </div>
    <div class="center">
      <div class="center__title">{{ essay.title }}</div>
      <div class="center__info">
        <span>{{ essay?.authorData?.name }}</span>
        <span>{{ essay.creatTime }}</span>
        <span><i class="iconfont">&#xe661;</i>{{ essay.looked }}</span>
        <span><i class="iconfont">&#xe71a;</i>阅读{{ essay.lengthTime }}分钟</span>
        <span><i class="iconfont">&#xe602;</i>专栏{{ essay.column }}</span>
      </div>
      <div class="center__text">
        <div v-html="handleMarkdown">
        </div>
      </div>
      <Comment :essay="essay" />
    </div>
    <div class="side">
      <div class="side__cart">
        <div class="cart__info">
          <div class="cart__info__img">
            <div class="cart__info__img__back" @click="handleUser"></div>
          </div>
          <div class="cart__info__dec">
            <div class="cart__info__name">{{ authorData?.name }}</div>
            <div class="cart__info__position">{{ authorData.position }}</div>
            <div class="cart__info__ranks">
              <span class="cart__info__rank" v-for="item in authorData.rank" :key="item">{{ item }}</span>
            </div>
          </div>
        </div>
        <div class="cart__data">
          <div>
            <div>{{ authorData.essayNum }}</div>
            <div class="cart__data__text">文章</div>
          </div>
          <div>
            <div>{{ authorData.see }}</div>
            <div class="cart__data__text">阅读</div>
          </div>
          <div>
            <div>{{ authorData.follow }}</div>
            <div class="cart__data__text">粉丝</div>
          </div>
        </div>
        <div class="cart__bottom">
          <div class="cart__bottom__follow">关注</div>
          <div class="cart__bottom__letter">私信</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, getCurrentInstance, ref, computed } from 'vue'
// 引入markdown-it 将markdown格式的文本渲染成html
import MarkDownIt from 'markdown-it'
import Comment from './Comment.vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'Post',
  components: {
    Comment
  },
  setup() {
    const essay = ref({})
    const { proxy } = getCurrentInstance()
    // 设置点赞
    const follow = ref(false)
    const router = useRouter()
    const route = useRoute()
    // 进行点赞设置
    const handleFollow = () => {
      if (follow.value === false) {
        essay.value.help++
        follow.value = true
        // proxy.$api.unFollow({ id: proxy.$route.params.id })
      } else {
        essay.value.help--
        follow.value = false
        // proxy.$api.follow({ id: proxy.$route.params.id })
      }
    }

    onMounted(() => {
      getEssayData()
    })
    // 获取文章信息
    const getEssayData = async () => {
      try {
        const res = await proxy.$api.getEssay({ id: proxy.$route.params.id })
        essay.value = res
      } catch (err) {
        console.log(err)
      }
    }
    // 首屏渲染时可能没有数据，所以如果没有值则给一个{}
    const authorData = computed(() => {
      return essay.value?.authorData || {}
    })
    // 将内容转换为mardown格式
    const handleMarkdown = computed(() => {
      if (essay.value?.text) {
        // 创建markdown-it实例
        const md = new MarkDownIt()
        return md.render(essay.value.text)
      }
    })
    // 点击头项跳转到主页
    const handleUser = () => {
      // console.log();
      router.push(`/user/${authorData.value.id}`)
    }

    onUnmounted(() => {
      // 当组件卸载时，重置essay.value，避免内存泄漏
      essay.value = {}
    })
    return { essay, authorData, handleMarkdown, handleFollow, follow, handleUser }
  }
}
</script>
<style lang='scss' scoped>
@import '../../style/iconfont.scss';



.post {
  position: relative;
  display: flex;
  width: 1150px;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 80px;
  // background-image: url("../../assets/img/111.webp");
  background-size: cover;

}

.left {
  position: absolute;
  top: 50px;
  left: -100px;


  &__ul {
    &__li {
      position: relative;
      top: 0;
      left: 0;
      width: 50px;
      height: 50px;
      font-size: 15px;
      margin-bottom: 20px;
      border-radius: 50%;
      text-align: center;
      background-color: #fff;
      color: #9a9696;

      &__active {
        background: rgb(11, 159, 233);
        color: #fff;

      }

      // &:hover {
      //   background-color: #c0c2c3;
      //   // color: #fff;
      // }

      &>i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 20px;

      }

      &__num {
        position: absolute;

        background-color: #d6d4d4;
        line-height: 25px;
        padding: 0 5px;
        transform-origin: left 50%;
        border-radius: 12.5px;
        top: -5px;
        right: -20px;
        font-size: 12px;
        ;
      }
    }
  }
}

.center {
  flex: 1;
  padding: 20px;
  border-radius: 5px;
  background: #fff;

  &__title {
    font-size: 24px;
    line-height: 40px;
  }

  &__info {
    line-height: 30px;

    &>span {
      margin-right: 10px;
      font-size: 13px;

      &>i {
        vertical-align: bottom;
        font-size: 16px;
        margin-right: 3px;
      }
    }
  }

  &__text {
    margin-top: 20px;
    font-size: 16px;
    border-radius: 5px;
    padding: 10px;
    line-height: 28px;
    background-color: rgb(191, 213, 22);
    text-indent: 2em;
  }
}

.side {
  &__cart {
    width: 300px;
    border-radius: 5px;
    height: 200px;
    margin-left: 20px;
    background-color: #fff;

  }
}

.cart {
  &__info {
    display: flex;
    height: 90px;
    padding: 20px 10px 5px;
    align-items: center;

    &__img {
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;

      &__back {
        width: 50px;
        height: 50px;
        background-image: url("../../assets/img/111.webp");
        background-size: cover;
        border-radius: 50%;
      }
    }

    &__dec {
      margin-left: 10px;
    }

    &__name {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    &__position {
      font-size: 13px;
      color: #8e8b8b;
    }

    &__ranks {
      display: flex;

      &>span {
        margin-right: 10px;
        font-size: 10px;
        margin-top: 5px;
        color: rgb(0, 145, 255);
      }
    }
  }

  &__data {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 15px;

    &>div {
      text-align: center;
      line-height: 25px;

      &:hover {
        color: rgb(0, 145, 255);
        cursor: pointer;
      }
    }

    &__text {
      font-size: 13px;
      color: #8e8b8b
    }
  }

  &__bottom {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;

    &__follow,
    &__letter {
      width: 40%;
      line-height: 35px;
      text-align: center;
      font-size: 15px;
      border-radius: 5px;
    }

    &__follow {
      background-color: rgb(0, 145, 255);
      color: #fff;

      &:hover {
        background-color: rgb(7, 86, 244);
        cursor: pointer;
      }
    }

    &__letter {
      background-color: #f5f0f0;
      color: rgb(56, 171, 237);
      border: 1px solid rgb(107, 151, 238);

      &:hover {
        background-color: #d0cdcd;
        cursor: pointer;
      }

    }
  }


}
</style>
