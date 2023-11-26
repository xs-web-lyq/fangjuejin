<template>
  <div class="me">
    <div class="content">
      <div class="header">
        <div class="header__left">
          <img src="" alt="">
          <div class="header__left__info">
            <div class="header__left__info__name">{{ userData.name }}</div>
            <div class="header__left__info__desc">{{ userData.position }}</div>
          </div>
        </div>
      </div>
      <div class="conlist">
        <div class="conlist__top">文章</div>
        <Item :essay="essayList"></Item>
      </div>
    </div>
    <div class="side">
      <div class="side__title">个人成就</div>
      <ul class="side__list">
        <li><span class="iconfont">&#xec8c;</span>文章被点赞 {{ userData.follow }}</li>
        <li><span class="iconfont">&#xe8c7;</span>文章被阅读 {{ userData.see }}</li>
        <li><span class="iconfont">&#xe799;</span>掘力值 {{ userData.essayNum }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import Item from '../../components/Item.vue'
export default {
  name: 'Me',
  components: { Item },
  setup() {
    // 获取路由
    const route = useRoute()
    // 获取用户id
    const userId = route.params.id
    console.log(userId);
    const { proxy } = getCurrentInstance()
    // 用户信息
    const userInfo = reactive({ userData: {}, essayList: [] })
    // 获取用户信息
    const getUserInfo = async () => {
      const { userData, essayList } = await proxy.$api.getUserInfo({ id: userId })
      console.log(userData, essayList);
      userInfo.userData = userData
      userInfo.essayList = essayList

    }
    onMounted(() => {
      getUserInfo()
    })
    const { userData, essayList } = toRefs(userInfo)
    return { userData, essayList }
  }
}
</script>
<style lang='scss' scoped>
@import url('../../style/iconfont.scss');

.me {
  display: flex;
  width: 1000px;
  padding-top: 90px;
  margin: 0 auto;
}

.content {
  width: 700px;
}

.header {

  &__left {
    display: flex;
    align-items: center;
    height: 150px;
    padding: 10px;
    border-radius: 5px;
    background: #fff;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: #4d4848;
      margin-right: 10px;
      background-image: url("../../assets/img/111.webp");
      background-size: cover;
    }

    &__info {
      &__name {
        font-size: 20px;
        font-weight: 600;
      }

      &__desc {
        font-size: 14px;
        color: #969696;
        margin-top: 5px;
        font-weight: 400;
        line-height: 20px;
        height: 20px;

      }
    }
  }

}

.conlist {
  margin-top: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px #ccc;

  &__top {
    position: relative;
    // width: 50px;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #333;
    padding-left: 10px;
    padding-bottom: 10px;
    border-bottom: #bcb8b8 1px solid;

    &::before {
      position: absolute;
      left: 18px;
      bottom: 0;
      content: '';
      display: inline-block;
      width: 15px;
      height: 4px;
      border-radius: 2px;
      ;
      background: #0084ff;

    }
  }
}

.side {
  width: 280px;
  border-radius: 5px;
  margin-left: 20px;
  background: #fff;
  height: 200px;
  box-sizing: border-box;

  &__title {
    font-size: 16px;
    line-height: 50px;
    padding: 0 20px;
    border-bottom: #bcb8b8 1px solid;
    color: #333;
    font-weight: 600;
  }

  &__list {
    line-height: 30px;

    &>li {
      padding: 0 20px;
      font-size: 14px;
      margin-top: 10px;

      &>span {
        display: inline-block;
        width: 30px;
        height: 30px;
        color: #0e84f3;
        background-color: #dde0e2;
        border-radius: 50%;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        margin-right: 10px;
        color: #969696;
      }
    }
  }

}
</style>
