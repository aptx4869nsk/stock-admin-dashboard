<template>
  <div>
    <div class="bg-blue-500 text-white p-4">
      This is a Tailwind CSS component.
    </div>
    <el-button type="primary">Click me!</el-button>
  </div>
</template>

<script>
import { ElButton } from "element-plus";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    ElButton,
  },
};
</script>
