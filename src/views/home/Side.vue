<template>
  <div class="side">
    <div class="right">
      <div class="right__hello">
        <div class="right__hello__infos">
          <div class="right__hello__info">下午好！</div>
          <div class="right__hello__detail">点亮在社区的每一天</div>
        </div>
        <el-button class="right__hello__btn" type="primary" plain>去签到</el-button>
      </div>
      <div class="right__essay">
        <div class="right__essay__top">
          <div class="right__essay__left">
            <span class="right__essay__icon iconfont">&#xe625;</span>
            <span class="right__essay__title">好文章</span>

          </div>
          <div class="right__essay__right iconfont">
            &#xe64f; 换一换
          </div>
        </div>
        <ul class="right__essay__content">
          <li class="right__essay__infos" v-for="(item, index) in goodEssay" :key="item.id"
            @click="handleToPost(item.id)">
            <div class="right__essay__index">{{ index + 1 }} </div>
            <div class="right__essay__info">{{ item.title }}</div>
          </li>
        </ul>
        <div class="right__essay__more">
          查看更多>>
        </div>
      </div>
      <div class="right__advert1" ref="advert1">
        <div class="right__advert1__delete iconfont" @click="(e) => handleDeleteAdvert(e)">&#xe6f2;</div>
        <div class="right__advert1__advert">广告</div>
      </div>
      <div class="right__authors">
        <div class="right__authors__top">
          <span class="right__authors__icon iconfont">&#xe64b;</span>
          <span class="right__authors__list">作者榜</span>
        </div>
        <ul class="right__authors__items">
          <li class="right__authors__item" v-for="item in authorList" :key="item.id">
            <div class="right__authors__left" @click="handleAuthorClick(item.id)">
              <div class="right__authors__head">
                <img class="right__authors__img" src="../../assets/img/111.webp" alt="">
              </div>
              <div class="right__authors__infos">
                <div class="right__authors__name">{{ item.name }}</div>
                <div class="right__authors__info">{{ item.info }}</div>
              </div>
            </div>
            <div class="right__authors__follow" v-if="!item.follow" @click="handleFollowClick(item.id)">+ 关注</div>
          </li>
        </ul>
        <div class="right__authors__more">查看更多>></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'Side',
  setup() {
    // 获取代理
    const { proxy } = getCurrentInstance()
    const goodEssay = ref([
      {
        id: 1,
        title: 'ArrayList和LinkedList使用不当',
      },
      {
        id: 2,
        title: 'null 不好，我真的推荐你使用',
      },
      {
        id: 3,
        title: '基于 node-ssh 开发前端部署',

      },
      {
        id: 4,
        title: '用 HTML5实战打击乐Demo',
      }, {
        id: 5,
        title: '代码刚上线，页面就白屏了',
      }
    ])
    const authorList = ref([
      {
        id: 1,
        name: "京东云开发者",
        info: "技术运营@京东科技信息",
        follow: false,
      },
      {
        id: 2,
        name: "京东云开发者",
        info: "技术运营@京东科技信息",
        follow: true,
      },
      {
        id: 3,
        name: "京东云开发者",
        info: "技术运营@京东科技信息",
        follow: true,
      },
      {
        id: 4,
        name: "京东云开发者",
        info: "技术运营@京东科技信息",
        follow: false,
      },
      {
        id: 5,
        name: "京东云开发者",
        info: "技术运营@京东科技信息",
        follow: true,
      }
    ])
    const router = useRouter()
    // 点击跳转文章
    const handleToPost = (id) => {
      router.push(`/post/${id}`)
    }
    // 点击作者
    const handleAuthorClick = (id) => {
      router.push(`/user/${id}`)
    }
    // 关注作者
    const handleFollowClick = (id) => {

      const index = authorList.value.findIndex((item) => {
        return item.id === id
      })
      // console.log("follow---->", id, index);
      console.log(authorList.value[index].follow);
      authorList.value[index].follow = true
    }
    // 删除广告
    const handleDeleteAdvert = (e) => {
      // e.stopPropagation()
      proxy.$refs.advert1.style.display = 'none';
      // console.log(e);
    }
    return {
      goodEssay, authorList, handleToPost, handleAuthorClick, handleFollowClick, handleDeleteAdvert
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../style/iconfont.scss';
@import '../../style/mixin.scss';

.side {
  position: absolute;
  right: 100px;
}

.right {
  width: 255px;
  height: 700px;

  &__hello {
    display: flex;
    height: 90px;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    border-radius: 10px;
    margin-bottom: 20px;

    &__info {
      font-size: 16px;
      color: #000;
      padding: 5px 0;

    }

    &__btn {
      height: 40px;
    }
  }

  &__essay {
    border-radius: 10px;
    background-color: #fff;
    height: 270px;
    padding: 15px;
    border-bottom: #eee;

    &__top {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
    }

    &__icon {
      color: #108ee9;
      margin-right: 10px;
    }

    &__title {
      font-size: 16px;
    }

    &__right {
      font-size: 12px;
    }

    &__content {}

    &__infos {
      padding: 4px;
      display: flex;
      align-items: center;
      line-height: 30px;
      border-radius: 5px;

      &:hover {
        background: #ebeaea;
        cursor: pointer;
      }

    }

    &__index {
      margin-right: 10px;
      font-size: 16px;

      background-image: linear-gradient(to bottom, #fc0404, rgb(255, 170, 0));
      color: transparent;
      -webkit-background-clip: text;
      -moz-background-clip: text;
      background-clip: text;
    }

    &__info {
      color: #000;
      font-size: 12px;
      @include ellipsis;
    }

    &__more {
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      color: #999
    }
  }

  &__advert1 {
    position: relative;
    margin-top: 20px;
    height: 120px;
    border-radius: 5px;
    background-image: url('../../assets/img/advert1.png');
    background-size: contain;

    &__delete {
      position: absolute;
      font-size: 13px;

      text-align: center;
      top: 5px;
      right: 5px;
      color: #eee;
    }

    &__advert {
      position: absolute;
      bottom: 5px;
      right: 5px;
      border-radius: 5px;
      width: 40px;
      text-align: center;
      line-height: 20px;
      color: #d2d0d0;
      background-color: rgba(0, 0, 0, 0.4);

      // opacity: 0.5;
      &:hover {
        width: 60px;
        background-color: rgba(0, 0, 0, 0.6);
      }
    }

  }

  &__advert2 {
    margin: 20px 0;
    height: 120px;
    border-radius: 5px;
    background-image: url('../../assets/img/advert1.png');
    background-size: contain;
  }

  &__authors {
    height: 380px;
    background-color: #fff;
    border-radius: 10px;
    margin-top: 20px;

    &__top {
      padding: 10px 0;
      margin-left: 10px;
      font-size: 16px;
      border-bottom: 1px solid #eee;
      line-height: 20px;

    }

    &__icon {
      display: inline-block;
      border-radius: 50%;
      background-color: #108ee9;
      color: #d6d3d3;
      font-size: 22px;

    }

    &__list {
      margin-left: 10px;
      vertical-align: top;
    }

    &__items {
      padding: 10px;
    }

    &__item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 10px 5px;
      border-radius: 5px;

      &:hover {
        background-color: #f3f0f0;
        cursor: pointer;
      }
    }

    &__head {
      width: 30px;
      height: 30px;
      background-color: #000;
    }

    &__img {
      width: 100%;
      height: 100%;
    }

    &__infos {
      flex: 1;
      margin-left: 10px;
      overflow: hidden;
    }

    &__name {
      font-size: 13px;
      color: #000;
      margin-bottom: 3px;

    }

    &__left {
      flex: 1;
      display: flex;
    }

    &__info {
      font-size: 12px;
      color: #999;
      @include ellipsis;
    }

    &__follow {
      margin-left: 10px;
      width: 40px;
      color: #108ee9;
    }

    &__more {
      font-size: 14px;
      text-align: center;
      line-height: 30px;
      color: #999;
    }
  }

}
</style>
