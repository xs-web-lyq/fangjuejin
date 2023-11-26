<template>
  <div class="center" ref="center">
    <div class="content" ref="content">
      <div class="content__top">
        <ul class="content__top__ul">
          <li class="content__top__li" v-for="item in tags" @click="handleTimeClick(item.id)">{{ item.name }}
            <span class="content__top__bottom" v-show="item.id === currentIndex"></span>
          </li>
        </ul>
      </div>
      <div class="content__infos">
        <ul class="content__infos__ul" ref="scrollContent">
          <Item :essay="essay"></Item>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import { computed, getCurrentInstance, ref, watch, onUpdated } from 'vue'
// import { useRouter } from 'vue-router'
import Item from '../../components/Item.vue'
export default {
  name: 'Center',
  props: ['essay', 'contentStyle', 'rowHeight'],
  emits: ['getCenterTag'],
  components: {
    Item
  },
  setup(props, context) {
    const tags = [
      {
        id: 111,
        name: "推荐"
      },
      {
        id: 222,
        name: "最新"
      }
    ]
    const { proxy } = getCurrentInstance()
    // const props = defineProps({ essay })
    const currentIndex = ref(111)
    // watch不可以监听props，但是componet内部可以监听props
    const top = computed(() => {
      return props.contentStyle
    })
    // 获取center组件的dom
    watch(top, () => {
      // console.log(top);
      proxy.$refs.content.style.top = top.value + 'px'

      // console.log(proxy.$refs.center.style.top);
    })
    onUpdated(() => {
      proxy.$refs.center.style.height = props.rowHeight + 'px'
    })



    // 切换标签
    const handleTimeClick = (index) => {
      currentIndex.value = index
      context.emit('getCenterTag', index)

    }
    return { tags, currentIndex, handleTimeClick }
  }
}
</script>
<style lang='scss' scoped>
@import '../../style/iconfont.scss';
@import '../../style/mixin.scss';

.center {
  position: relative;
}

.content {
  position: absolute;
  top: 0;
  width: 700px;
  margin: 0 20px;
  background-color: #fff;
  border-radius: 5px;
  // transition: all 0.5s;

  &__top {
    border-bottom: 1px solid #ccc;

    &__ul {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #000;
    }

    &__li {
      position: relative;
      width: 60px;
      line-height: 40px;
      text-align: center;

      &:hover {
        color: #108ee9;
        cursor: pointer;
      }
    }

    &__bottom {
      position: absolute;
      left: 50%;
      bottom: 0;
      margin-left: -7.5px;
      display: inline-block;
      width: 15px;
      height: 3px;
      border-radius: 2px;
      background-color: #108ee9;
    }
  }

  &__infos {
    padding: 10px;
  }
}
</style>
