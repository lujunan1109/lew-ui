<template>
  <div>
    <dynamic-form title="监控摄像头数据发布数字孪生"
                     :m-top="cameraDialogProps.top"
                     :add-tree-dialog-props="cameraDialogProps"
                     :rules="addCameraForm.rules"
                     :form-data="addCameraForm"
                     @setRef="el => treeEl = el"
                     @updateKeys="updateKeys"
                     @selectedNodes="selectedNodes"
                     @addSubmit="postSubmit" />
                     <div class="button__text">
                      <base-button  @click="cameraDialogProps.upShow = true">展示弹窗</base-button>
                     </div>
                     <base-dialog 
                     v-bind="dialogProps"
               :show.sync="upShow"
               title="标题">
              <div style="height: 200px;">
                内容
              </div>
              </base-dialog>
              <base-button @click="upShow = true"> 点击展示弹窗</base-button>

              <base-date :value.sync="params.time"
                   type="datetimerange"
                   size="mini"
                   class="w360" />

                   <base-virtual-roll 
                    :data="yourDataArray"
                    :height="containerHeight"
                    :fixedBlockHeight="blockHeight"
                    :pageMode="false"
                  >
                  <template #default="{ data }">
                      <div>{{ data.id }}</div>
                  </template>
                  </base-virtual-roll>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeEl: null,
      cameraDialogProps: {
        top: '15vh',
        upShow: false,
        width: '500px',
        customClass: 'editPassword',
      },
      addCameraForm: {
        renderAry: [
          {
            type: 'mul',
            prop: 'seletedLs',
            label: '发布数据',
            showCheckbox: true,
            defaultKeys: [1, 2],
            customProps: {
              id: 'id',
              label: 'key',
              children: 'children',
            },
            treeData: 'lsTreeData',
          },
        ],
        seletedLs: '',
        lsTreeData: [{
          id: 1,
          key: 'Parent',
          children: [
            {
              id: 2,
              key: 'Child 1',
              children: [
                {
                  id: 3,
                  key: 'Grandchild 1',
                  children: []
                },
                {
                  id: 4,
                  key: 'Grandchild 2',
                  children: []
                }
              ]
            },
            {
              id: 5,
              key: 'Child 2',
              children: []
            }
          ]
        }],
      },
      dialogProps: {
        width: '550px',
        customClass: 'editPassword dialog-p18'
      },
      upShow: false,
      params: {
        time: [

        ]
      },
      yourDataArray: [{
        id: 1,
        height: 100
      }],
      containerHeight: 500, // Example height value
      blockHeight: 50, // Example block height value
    }
  },
  created() {
    this.yourDataArray = new Array(1000).fill({
      id: 1,
      height: 100
    }).map((item, inx) => {
      return {
        id: inx + 1,
        item
      }
    })
  },
  methods: {
    selectedNodes(node) {
      console.log(node);
      const { treeEl } = this;
      this.addCameraForm.renderAry[0].defaultKeys = treeEl.getCheckedKeys();
      console.log(this.addCameraForm.renderAry[0].defaultKeys, 'checkedKeys');
    },
    updateKeys(keys) {
      console.log(keys, 2222);
      this.treeEl.setCheckedKeys(keys);
    },
    postSubmit() {
      console.log('提交');
    }
  }
};
</script>

<style scoped>
.button__text {
  display: flex;
}

.button-custom {
  width: 200px;
  height: 60px;
}
</style>