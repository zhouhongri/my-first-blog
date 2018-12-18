<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
        <el-breadcrumb-item>基本表单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="infoForm" :model="infoForm" :rules="rules" label-width="120px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="infoForm.title" style="width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="标签" prop="name">
            <el-input v-model="infoForm.name" style="width: 300px;">
            </el-input>
            <span class="el-icon-plus" style="font-size: 20px;margin-left: 10px;" @click="addLabelName"></span>
            <span class="el-icon-minus" style="font-size: 20px;margin-left: 10px;" @click="delLabelName"></span>
          </el-form-item>
          <el-form-item prop="name" v-for="(v, i) in items" :key="i">
            <el-input v-model="items[i].name" style="width: 300px;">
            </el-input>
          </el-form-item>
          <el-form-item label="详细" prop="content">
            <div>
              <v-ueditor
                id="ueditor"
              ></v-ueditor>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        infoForm: {
          title: '',
          name: '',
          content: '',
          labelNames: ''
        },
        items: [],
        //表单验证
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入详细内容', trigger: 'blur'}
          ]
        },
      }
    },
    computed: {

    },
    mounted() {
      //初始化
    },
    methods: {
      addLabelName() {
        this.items.push({name: ''})
      },
      delLabelName() {
        this.items.splice(this.items.length - 1, 1)
      },
      onSubmit() {
        //提交
        this.infoForm.content = window.UM.getEditor('ueditor').getContent()
        this.$refs.infoForm.validate((valid) => {
          if (valid) {
            var arrays = []
            this.infoForm.content = this.infoForm.content.replace(new RegExp("background-color:#2b2b2b;","gm"),"background-color:#2b2b2b;width:100%;overflow-x: auto;")
            for (let i in this.items) {
              arrays.push(this.items[i].name)
            }
            this.infoForm.labelNames = this.infoForm.name + ',' + arrays.toString();
            this.axios.post('/blogs/insert?', JSON.stringify(this.infoForm), {
              headers: {
                "Content-Type": "application/json;charset=utf-8"
              }
            }).then((response) => {
              if (response.data == 1) {
                this.$Message.success('保存成功')
              } else {
                this.$Message.error('保存失败')
              }
            }).catch(function (response) {
              console.log(response);
            });
          }
        });
      }
    },
  }
</script>
