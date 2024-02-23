```js
// 示例
<template>
  <BaseVirtualRoll 
    :data="yourDataArray"
    :height="containerHeight"
    :fixedBlockHeight="blockHeight"
    :pageMode="true"
  >
    <!-- Your content here -->
  </BaseVirtualRoll>
</template>

<script>
import BaseVirtualRoll from 'path/to/BaseVirtualRoll.vue';

export default {
  components: {
    BaseVirtualRoll,
  },
  data() {
    return {
      yourDataArray: [/* your data array here */],
      containerHeight: 500, // Example height value
      blockHeight: 50, // Example block height value
    };
  },
};
</script>
