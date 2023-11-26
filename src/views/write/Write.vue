<template>
  <div class="write">
    <MdEditor v-model="content" @onUploadImg="onUploadImg">
    </MdEditor>
    <el-button class="write__btn" @click="saveData" type="primary">保存</el-button>
  </div>
</template>

<script>
import {
  toRefs,
  reactive, getCurrentInstance
} from "vue";
import showdown from "showdown";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { ElMessage } from "element-plus";

export default {
  name: 'Write',
  components: {
    MdEditor
  },
  setup() {
    const state = reactive({
      content: ''
    });
    const proxy = getCurrentInstance().proxy;

    const onUploadImg = async (
      files,
      callback
    ) => {
      const res = await Promise.all(
        Array.from(files).map((file) => {
          return new Promise(async (rev, rej) => {
            const form = new FormData();
            form.append("files", file);
            // 请求图片上传接口 返回网络 url 给 callback
            const res = await proxy.$api.uploadFile(form);
            if (res?.state) {
              rev(res.value.url);
            }
          });
        })
      );
      callback(res.map((item) => item));
    };

    // 点击页面定义的按钮，保存数据，content为markdown文本内容
    // 这里没必要使用toolbar的save按键保存文本再点击按钮调用接口
    const saveData = async () => {
      const { content } = state;
      // 转换markdown文本为html
      const converter = new showdown.Converter();
      const data = {
        content: converter.makeHtml(content),
        userId: 110,
      };
      const res = await proxy.$api.addEssay(data);
      if (res?.state) {
        ElMessage.success(res?.message ?? "新增成功");
      }
    }

    return {
      ...toRefs(state),
      onUploadImg,
      saveData,
    };

  }
}
</script>
<style lang='scss' scoped>
.write {
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 90px;
  background-color: #fff;

  &__btn {
    position: absolute;
    bottom: 150px;
    right: 10px;

  }
}
</style>
