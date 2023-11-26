<template>
  <div class="nav">
    <div class="left">
      <ul class="left__infos">
        <li :class="{ left__infos__li: true, active: isActive === index }" @click="handleScroll(index)"
          v-for="(item, index) in nav" :key="item.title">
          <span class="left__infos__icon iconfont" v-html="item.icon"></span>
          <span class="left__infos__title">{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, computed, watch } from 'vue'
import { throttle2 } from '../../utils/util.js'
export default {
  name: 'Nav',
  props: ['nav', 'centerTag'],
  setup(props, content) {
    const { proxy } = getCurrentInstance()
    const isActive = ref(2)
    const currentTag = ref(2)
    const centerTag = computed(() => {
      return props.centerTag
    })
    watch(centerTag, async () => {
      await handleNavClick(currentTag.value)
    })

    // 和后端约定：index = 0 大模型子站 2 为关注等等
    const handleNavClick = async (index) => {
      try {
        isActive.value = index
        currentTag.value = index
        const data = await proxy.$api.getAllList({ id: index, tag: props.centerTag })
        content.emit('getNewData', data)
      } catch (err) {
        console.log(err)
      }
    }
    // 节流函数
    const handleScroll = throttle2(handleNavClick, 500, { leading: true, trailing: false })
    onMounted(async () => {
      const data = await proxy.$api.getAllList({ id: isActive.value })
      content.emit('getNewData', data)
    })
    return { isActive, handleScroll }
  }
}
</script>
<style lang='scss' scoped>
.left {
  width: 200px;
  height: 600px;
  background-color: #fff;
  border-radius: 5px;

  &__infos {
    padding: 10px;

    &__li {
      padding: 5px;
      line-height: 30px;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #f5f7fa;
      }
    }



    &__icon {
      font-size: 14px;
    }

    &__title {
      font-size: 16px;
      margin-left: 10px;
    }

  }
}

.active {
  color: rgb(12, 204, 150)
}
</style>
