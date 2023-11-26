<template>
  <div class="wrapper" ref="wrapper">
    <Nav :nav="nav" @getNewData="getNewData" :centerTag="centerTag" />
    <Center :essay="essay" :contentStyle="contentStyle" :rowHeight="rowHeight" @getCenterTag="getCenterTag" />
    <Side :article="article" />
  </div>
</template>

<script>
import Center from './Center.vue'
import Nav from './Nav.vue'
import Side from './Side.vue'
import { throttle2 } from '../../utils/util.js'


import { ref, computed, toRefs, reactive, getCurrentInstance, nextTick, onUnmounted } from 'vue'

export default {
  name: 'Content',
  components: { Center, Nav, Side },
  setup() {
    const homeData = reactive({ nav: {}, essayList: [], article: {} })
    // 存储全部文章
    let essayL = ref([
      {
        title: "大模型子站",
        author: "liu",
        desc: "大文不聊技术，聊一下我和我老婆从掘金认识到结婚，再大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },

      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "本文不聊技术",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },

      {
        title: "掘金认识",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "婆从掘金",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "我老婆从掘金",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "掘金认识到结",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },

      {
        title: "认识到结婚技",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "识到结婚技术，",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "掘金认识到",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },

      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },

      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },

      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能", "综合"],
      },
      {
        title: "后端",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆再大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "技术，聊一下我和我老婆从掘金认识到结婚，再大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能"],
      },
      {
        title: "本文不聊技",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊到结婚，再大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["前端", "人工智能"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大文不聊技术，聊一下我和我老婆从掘金认识到结婚，再大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["后端", "人工智能"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["代码人生", "人工智能"],
      },
      {
        title: "后端",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊一下我和我老婆再大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["开发工具"],
      },
      {
        title: "大模型子站",
        author: "liu",
        desc: "技术，聊一下我和我老婆从掘金认识到结婚，再大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["关注", "IOS", "大模型子站"],
      },
      {
        title: "本文不聊技",
        author: "liu",
        desc: "大家好，我是沐华。本文不聊技术，聊到结婚，再大家好，我是沐华。本文不聊技术，聊一下我和我老婆从掘金认识到结婚，再",
        help: 10,
        tag: ["阅读", "Android"],
      },
    ])
    const { proxy } = getCurrentInstance()
    const getNewData = (data) => {
      const { nav, essay, article } = data
      homeData.nav = nav
      homeData.essayList = essay
      homeData.article = article
    }
    // center上方向tag
    const centerTag = ref(111)
    // 获取当前点击的tag
    const getCenterTag = (index) => {
      centerTag.value = index
    }
    const { essayList } = toRefs(homeData)
    // 用于push增加数据量
    const addData = () => {
      // 当top值到达一定值时，触发请求数据增加数据
      essayList.value = [...essayList.value, ...essayL.value]
    }
    // console.log(essayList.value);
    // 获取数据 
    // console.log('xxx', homeData);
    // console.log('essay');
    // 设置元素高度
    const itemHeight = ref(100)

    // 计算全部列表高度
    const rowHeight = computed(() => {
      return itemHeight.value * essayList.value.length
    })

    // 获取屏幕高度
    const screenHeight = computed(() => {
      return document.documentElement.clientHeight
    })
    // 设置渲染元素个数 ---- 通过屏幕高度和元素高度计算
    const itemCount = computed(() => {
      // 向上取整
      return Math.ceil(screenHeight.value / itemHeight.value)
    })


    // 计算容器高度
    // const containerHeight = computed(() => {
    //   return itemHeight.value * itemCount
    // })
    // 显示的开始下标
    const startIndex = ref(0)
    // 显示的结束下标
    const endIndex = computed(() => {
      return Math.min(startIndex.value + itemCount.value + 3, essayList.value.length)
    })
    let essay = computed(() => {
      return homeData.essayList.slice(startIndex.value, endIndex.value)
    })
    // 问题1：如何动态截取响应式数组
    // 问题2：如何设置容器高度
    // 问题3：如何监听滚动条滚动
    // 问题4：如何计算当前显示的元素
    // 问题5：如何获取当前渲染的元素列表


    const onScroll = () => {
      // 获取滚动条滚动的距离
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset
      // 计算当前显示开始下标 --- 并设置缓冲区 2个元素
      startIndex.value = Math.max(Math.floor(scrollTop / itemHeight.value) - 2, 0)
      if (endIndex.value > (essayList.value.length - 3)) {
        addData()
        console.log("addData---->", endIndex.value);
      }
      console.log(scrollTop, startIndex.value);
    }
    // 将content绝对定位设置距离top高度
    const contentStyle = computed(() => {
      return startIndex.value * itemHeight.value
    })
    // console.log(screenHeight.value);
    // // 监听滚动条滚动
    window.addEventListener('scroll', throttle2(onScroll, 100, { leading: true, trailing: true }))

    // 组件销毁时取消监听
    onUnmounted(() => {
      window.removeEventListener('scroll', onScroll)

    })
    const { nav, article } = toRefs(homeData)

    return { essay, article, nav, contentStyle, getNewData, rowHeight, centerTag, getCenterTag }
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
  position: relative;
  display: flex;
  // height: 2000px;
  padding: 80px 100px 0 100px;
  background-color: #eee;

}
</style>

