<template>
  <div class="home">
    <div class="home__header">
      <div class="home__header__left">
        <router-link to="/">
          <div class="home__header__logo">
            <img class="home__header__logo__img"
              src="	https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg"
              alt="" />
          </div>
        </router-link>

        <ul class="home__header__titles">
          <li :class="{ home__header__titles__title: true, topActive: index === currentIndex }"
            v-for="(item, index) in titles" :key="item" @click="getTagEssayClick(item.tag)">{{ item.title }}</li>
        </ul>
      </div>
      <div class="home__header__right">
        <el-input class="home__header__right__input" v-model="search" placeholder="探索稀土掘金" suffix-icon="Search"
          @keydown.enter="searchEssay" />
        <div class="home__header__right__center">
          创作者中心
        </div>
        <el-popover placement="bottom-end" :width="300" trigger="hover">
          <template #reference>
            <div class="home__header__right__icon iconfont">&#xe664;</div>
          </template>
          <template #default>
            <div class="home__header__right__more">
              <div class="home__header__right__infos">
                <div class="home__header__right__info" @click="handleWriteClick">
                  <div class="home__header__right__info__icon iconfont">&#xe625;</div>
                  <div class="home__header__right__info__title">写文章</div>
                </div>
                <div class="home__header__right__info" @click="handlePinsClick">
                  <div class="home__header__right__info__icon iconfont">&#xe68e;</div>
                  <div class="home__header__right__info__title">发沸点</div>
                </div>
                <div class="home__header__right__info">
                  <div class="home__header__right__info__icon iconfont">&#xe68e;</div>
                  <div class="home__header__right__info__title">写笔记</div>
                </div>
                <div class="home__header__right__info">
                  <div class="home__header__right__info__icon iconfont">&#xe615;</div>
                  <div class="home__header__right__info__title">草稿箱</div>
                </div>
              </div>
              <div class="home__header__right__divider"></div>
              <div class="home__header__right__inspiration">
                <div class="home__header__right__inspiration__title">创作灵感</div>
                <div class="home__header__right__inspiration__more">查看更多>
                </div>
              </div>
              <ul class="home__header__right__ul">
                <li class="home__header__right__ul__li">
                  <span class="home__header__right__ul__li__title">活动</span>写原创好文，瓜分万元现金大奖 💰
                </li>
                <li class="home__header__right__ul__li">
                  <span class="home__header__right__ul__li__title">活动</span>
                  快速搬家，掘金写作之旅即刻启航！
                </li>
                <li class="home__header__right__ul__li">
                  <span class="home__header__right__ul__li__title">话题</span>
                  网络协议的研究应用
                </li>
              </ul>
            </div>
          </template>
        </el-popover>
        <div class="home__header__right__vip">
          <img class="home__header__right__img"
            src="	https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/24127194d5b158d7eaf8f09a256c5d01.svg" alt="">
          <div class="home__header__right__words">会员</div>
        </div>
        <el-popover placement="top-start" :width="300" trigger="hover"
          content="this is content, this is content, this is content">
          <template #reference>
            <div class="home__header__admin" @click="handleToLoginClick" v-if="!isLogin">
              <div class="home__header__admin__login">登录</div>|
              <div class="home__header__admin__register">注册</div>
            </div>
            <div class="home__header__admin__loding" v-else></div>
          </template>
          <template #default>
            <div class="home__header__right__more">
              <div class="home__header__right__hot">
                <div class="home__header__right__top">首次登录 / 注册免费领取</div>
                <div class="home__header__right__infos">
                  <div class="home__header__right__info" @click="handleWriteClick">
                    <div class="home__header__right__info__icon iconfont">&#xe625;</div>
                    <div class="home__header__right__info__title">写文章</div>
                  </div>
                  <div class="home__header__right__info" @click="handlePinsClick">
                    <div class="home__header__right__info__icon iconfont">&#xe68e;</div>
                    <div class="home__header__right__info__title">发沸点</div>
                  </div>
                  <div class="home__header__right__info">
                    <div class="home__header__right__info__icon iconfont">&#xe68e;</div>
                    <div class="home__header__right__info__title">写笔记</div>
                  </div>
                </div>
              </div>

              <div class="home__header__right__ins">免费试学课程 · 收藏优质内容 · 提升成长等级</div>
              <div class="home__header__right__btn" @click="handleToLoginClick">登录/注册</div>
            </div>
          </template>
        </el-popover>
      </div>
      <el-dialog v-model="centerDialogVisible" title="登录掘金畅享更多权益" align-center width="700px">
        <div class="login">
          <div class="login__details">
            <div class="login__details__title">验证码登录 / 注册</div>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
              <el-form-item prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入手机号">
                  <template #prepend>
                    <el-select v-model="ruleForm.prephone" style="width: 80px" placement="bottom-start">
                      <el-option v-for="item in spaces" :label="item.label" :key="item.value" :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="ruleForm.password" placeholder="验证码">
                  <template #append>
                    <el-text type="primary" style="width: 60px" @click="handleGetCode">获取验证码</el-text>
                  </template>
                </el-input>

              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="login__details__btn" @click="handleLogin">登录/注册</el-button>
              </el-form-item>
              <el-form-item>
                <el-text class="login__details__password" type="primary" @click="handleTopsLoginClick">密码登录</el-text>
              </el-form-item>
            </el-form>
          </div>
          <div class="login__other">
            <div class="login__other__top">
              扫码登录（6.4.1及以上版本支持）
            </div>
            <div ref="canvas" class="login__other__img">
              <vue-qr text="Hello world!" :size="150"></vue-qr>
            </div>
            <div class="login__other__info">
              <div class="login__info__tital">打开 <span class="login__info__link">稀土掘金APP</span></div>
              <div class="login__info__tital">点击“我-左上角扫一扫”登录</div>
            </div>
          </div>

        </div>
        <div class="login__bottom">
          注册登录即表示同意 <span class="login__bottom__pro">用户协议</span> 和 <span class="login__bottom__ord">隐私政策</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { reactive, ref, getCurrentInstance, onMounted, onUpdated } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
// import QRCode from 'qrcode'
import vueQr from 'vue-qr/src/packages/vue-qr.vue'


const useLogoEffect = (centerDialogVisible) => {
  const { proxy } = getCurrentInstance()
  const router = useRouter()
  const spaces = reactive([
    { lable: "中国 +84", value: "+84" },
    { lable: "美国 +85", value: "+85" },
    { lable: "中国 +84", value: "+82" },
    { lable: "中国 +84", value: "+83" },
    { lable: "中国 +84", value: "+822" },
    { lable: "中国 +84", value: "+86" },
    { lable: "中国 +84", value: "+87" },
    { lable: "中国 +84", value: "+88" },
  ])
  // 搜索
  const search = ref('')
  // 登录状态
  const isLogin = ref(false)
  // 登录
  const ruleForm = reactive({
    phone: '',
    password: '',
    prephone: '+84',
  })
  // code
  let code = ref(null)
  // 表单验证
  const rules = {
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入验证码', trigger: 'blur', pattern: /^\d{4}$/ },
    ],
  }
  // 获取验证码
  const handleGetCode = async () => {
    const data = await proxy.$api.getCode()
    code.value = data.code
  }
  // 登录/注册
  const handleLogin = async () => {
    // 验证表单
    proxy.$refs.ruleFormRef.validate(async (valid) => {
      try {
        if (valid) {
          const data = await proxy.$api.login(ruleForm)
          proxy.$store.commit("saveUserInfo", data)
          // 登录成功
          isLogin.value = true
          // token
          centerDialogVisible.value = false
          ElMessage.success("登录成功")

        }
      } catch (err) {
        console.log(err);
        ElMessage.error("登录失败")
      }


    })
  }
  // 密码登录
  const handleTopsLoginClick = () => {

  }
  // 搜索框逻辑
  const searchEssay = async (event) => {
    if (event.which === 13) {
      const serachList = await proxy.$api.search({ search: search.value })
      proxy.$store.commit("saveSearchList", serachList)
      router.push({ name: 'Search' })
    }

  }
  return { search, isLogin, searchEssay, spaces, rules, ruleForm, handleLogin, handleGetCode, handleTopsLoginClick }

}

// 顶部导航栏
const useTopsEffect = (centerDialogVisible) => {
  const router = useRouter()
  const titles = reactive([
    { title: "首页", tag: 'content' },
    { title: "沸点", tag: 'pins' },
  ])
  const currentIndex = ref(0)
  // 获得标签文章
  const getTagEssayClick = async (tag) => {
    currentIndex.value = titles.findIndex(item => item.tag === tag)
    router.push(`/${tag}`)
  }
  // 点击去登录
  const handleToLoginClick = () => {
    centerDialogVisible.value = true
  }
  // 写文章
  const handleWriteClick = () => {
    console.log("写文章=======>");
    router.push({ name: 'Write' })
  }
  // 发沸点
  const handlePinsClick = () => {
    console.log("发沸点=======>");
    router.push({ name: 'Pins' })
  }
  return { titles, currentIndex, handleWriteClick, handleToLoginClick, getTagEssayClick, handlePinsClick }
}


export default {
  name: 'Home',
  components: {
    vueQr
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const centerDialogVisible = ref(false)
    // 登录框相关数据操作
    const { search, spaces, isLogin, searchEssay, rules, ruleForm, handleLogin, handleGetCode, handleTopsLoginClick } = useLogoEffect(centerDialogVisible)
    // 顶部导航栏相关数据操作
    const { titles, currentIndex, handleToLoginClick, getTagEssayClick, handleWriteClick, handlePinsClick } = useTopsEffect(centerDialogVisible)


    return {
      titles, spaces, rules, search, searchEssay, isLogin,
      handleLogin, handleGetCode, handleTopsLoginClick,
      currentIndex, getTagEssayClick, centerDialogVisible,
      handleToLoginClick, ruleForm, handleWriteClick, handlePinsClick
    }
  },

}
</script>
<style lang='scss' scoped>
@import '../style/iconfont.scss';
@import '../style/mixin.scss';

.home {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1;
  background-color: #fff;

  &__header {
    width: 1400px;
    margin: 0 auto;
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    font-size: 12px;

    &__left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%
    }

    &__logo {
      &__img {
        width: 107px;
        height: 40px;

      }
    }

    &__titles {
      display: flex;
      list-style-type: none;
      margin-left: 10px;

      &__title {
        font-size: 4px;
        margin: 0 10px;
        font-size: 12px;

        line-height: 40px;
        border-bottom: 2px solid #fff;

        &:hover {
          border-bottom: 2px solid #1e80ff;
          color: #1e80ff;
          cursor: pointer;

        }
      }
    }

    &__right {
      display: flex;
      align-items: center;
      height: 100%;

      &__input {
        width: 200px;
        height: 30px;
        border-radius: 5px;
        margin-right: 10px;

        // border: 1px solid #ccc;


      }

      &__center {
        line-height: 32px;
        width: 100px;
        font-size: 12px;
        text-align: center;
        color: #fff;
        background-color: #1e80ff;
        border-radius: 2px 0 0 2px;
      }

      &__icon {
        font-size: 14px;
        background-color: #4992f2;
        line-height: 32px;
        // border-left: 0.2px solid #fff;
        border-radius: 0 2px 2px 0;
        color: #fff;
        margin-right: 10px
      }

      &__icon:hover {
        background-color: #1e80ff;
        transform: rotate(180deg);
      }

      &__vip {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
      }

      &__img {
        height: 22px;
      }

      &__words {
        margin-left: 5px;
        font-size: 12px;
      }

      &__login {
        margin-left: 5px;
        font-size: 12px;

      }

      &__more {}

      &__hot {
        border: 1px solid #90b9ee;
        border-radius: 5px;
        padding: 10px;
        background-image: linear-gradient(to bottom, rgb(226, 236, 243), #fff);
      }

      &__infos {
        height: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 12px;
        color: #1e80ff;
      }

      &__info {
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &:hover {
          cursor: pointer;
        }
      }

      &__divider {
        width: 100%;
        height: 1px;
        background-color: rgb(134, 126, 126);
        margin: 10px 0;
      }

      &__inspiration {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #000;
      }

      &__ul {
        margin: 10px;
        font-size: 12px;

        &__li {
          padding: 5px 0;
          @include ellipsis;

          &__title {
            color: #c2d086;
            background-color: #ffffff;
            padding-right: 10px;
          }
        }
      }

      &__top {
        text-align: center;
        font-size: 15px;
        line-height: 20px;
        padding-bottom: 5px;
      }

      &__ins {
        @include ellipsis;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        margin: 5px 0;
      }

      &__btn {
        background-color: #1e80ff;
        color: #fff;
        font-size: 12px;

        line-height: 40px;
        text-align: center;
        border-radius: 5px;

        &:hover {
          background-color: #4c92ee;
          color: #eceaea;
          cursor: pointer;
        }
      }
    }

    &__admin {
      display: flex;
      border: 1px solid #ccc;
      line-height: 30px;
      color: #1e80ff;
      text-align: center;
      justify-content: space-around;
      width: 80px;
      border-radius: 5px;

      &__loding {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #fff;
        background-image: url("@/assets/img/333.awebp");
        background-size: cover;
      }
    }

    &__admin:hover {
      background-color: #fff;
      color: #1e80ff;
      cursor: pointer;
    }
  }
}

.login {
  padding-top: 20px;
  border-top: #c0bebe 1px solid;
  display: flex;
  justify-content: space-around;

  &__details {
    margin-right: 20px;

    &__title {
      font-size: 16px;
      margin-bottom: 12px;
    }

    &__btn {
      height: 40px;
      width: 100%;

    }

    &__password {
      &:hover {
        color: #669ce3;
        cursor: pointer;
      }
    }
  }

  &__other {
    margin: 0 5px;
    padding-left: 20px;
    border-left: #e9e7e7 1px solid;

    &__top {
      margin: 10px 0;
      font-size: 16px;
      color: #000;
      line-height: 20px;
    }

    &__img {
      width: 152px;
      height: 152px;
      border: 1px solid #ccc;
    }
  }

  &__info {
    &__tital {
      font-size: 14px;
      line-height: 30px;
    }

    &__link {
      color: #1e80ff;

      &:hover {
        color: #669ce3;
        cursor: pointer;
      }
    }
  }

  &__bottom {
    text-align: center;
    margin-top: 30px;
    font-size: 15px;
    line-height: 20px;

    &__pro,
    &__ord {
      color: #1e80ff;

      &:hover {
        color: #669ce3;
        cursor: pointer;
      }
    }


  }
}

.topActive {
  color: #1e80ff
}
</style>
