<template>
  <el-row :gutter="20">
    <el-col :span="4"><div class="grid-content bg-purple"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{title}}</el-checkbox></div></el-col>
    <el-col :span="20">
      <div class="grid-content bg-purple clearfix">
        <el-checkbox-group v-model="checked" @change="handleCheckedCitiesChange" >
          <el-checkbox v-for="box in boxes" :label="box.label" :key="box.value">{{box.label}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'checkGroup',
    data() {
      return {
        checkAll: false,
        isIndeterminate: true,
        checked: [],
        boxes: [],
        title: '',
        checkBoxes: []
      }
    },
    methods: {
      handleCheckAllChange(val) {
        console.log(val)
        this.checked = val ? this.boxes : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        console.log(this.boxes)
        console.log(value)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.boxes.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.boxes.length;
      },
      getNow(data, title) {
        this.boxes = data
        this.title = title
      }
    },
    mounted() {
      this.getNow()
    }
  }
</script>

<style rel='stylesheet/scss' lang='scss' >

  .el-row{
    border: 1px solid #ccc;
    margin-left: 0 !important;
    margin-right: 0 !important;
    .el-col-4{
      width: 120px;
      height: 100%;
    }
    .el-col-20{
      border-left: 1px solid #ccc;
    }
    .el-checkbox{
      width: 98px;
      margin-left: 10px;
      margin-right: 10px;
      line-height: 40px;
    }
  }



</style>
