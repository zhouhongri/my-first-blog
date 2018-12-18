<template>
  <div class="about-me bga-back-top">
    <Divider>自我简介</Divider>
    <div style="padding: 20px;">
      <h1>周洪日</h1>
      <h2>1995-11-24</h2>
      <h2>黑龙江哈尔滨</h2>
      <h3>1305709327@qq.com</h3>
      <h3>哈尔滨学院</h3>
      <h2>
        自我学习能力强；
      </h2>
      <h2>
        对于新兴技术有浓重的学习欲望；
      </h2>
      <h2>
        在工作中注重代码规范、技术文档编写；
      </h2>
    </div>
    <Divider>了解的技术</Divider>
    <div>
      <i-circle :percent="85" class="get">
        <span class="demo-Circle-inner" style="font-size:24px">JAVA</span>
      </i-circle>
      <i-circle :percent="60" class="get">
        <span class="demo-Circle-inner" style="font-size:24px">Linux</span>
      </i-circle>
      <i-circle :percent="80" class="get">
        <span class="demo-Circle-inner" style="font-size:24px">Spring</span>
      </i-circle>
      <i-circle :percent="75" class="get">
        <span class="demo-Circle-inner" style="font-size:24px">Spring Boot</span>
      </i-circle>
      <i-circle :percent="65" class="get">
        <span class="demo-Circle-inner" style="font-size:24px">VUE</span>
      </i-circle>
      <i-circle :percent="80" class="get">
        <span class="demo-Circle-inner" style="font-size:24px">JAVA SCRIPT</span>
      </i-circle>
      <i-circle :percent="70" class="get">
        <span class="demo-Circle-inner" style="font-size:24px">HTML</span>
      </i-circle>
      <i-circle :percent="60" class="get">
        <span class="demo-Circle-inner" style="font-size:24px">CSS</span>
      </i-circle>
      <i-circle :percent="70" class="get">
        <span class="demo-Circle-inner" style="font-size:24px">MyBatis</span>
      </i-circle>
      <i-circle :percent="65" class="get">
        <span class="demo-Circle-inner" style="font-size:24px">MySql</span>
      </i-circle>
      <i-circle :percent="60" class="get">
        <span class="demo-Circle-inner" style="font-size:24px">Oracle</span>
      </i-circle>
      <i-circle :percent="60" class="get">
        <span class="demo-Circle-inner" style="font-size:24px">Redis</span>
      </i-circle>
      <i-circle :percent="40" class="get">
        <span class="demo-Circle-inner" style="font-size:24px">Mongodb</span>
      </i-circle>
      <i-circle :percent="70" class="get">
        <span class="demo-Circle-inner" style="font-size:24px">Maven</span>
      </i-circle>
      <i-circle :percent="70" class="get">
        <span class="demo-Circle-inner" style="font-size:24px">Git</span>
      </i-circle>
      <i-circle :percent="30" class="get">
        <span class="demo-Circle-inner" style="font-size:24px">hadoop</span>
      </i-circle>
    </div>

  </div>
</template>
<style lang="scss" scoped>
  .get {
    margin: 20px;
  }

  .about-me {
    flex-grow: 1;
    padding: 30px;
    overflow-y: auto;
  }
</style>
<script>
  import ICircle from "iview/src/components/circle/circle";

  export default {
    components: {ICircle},
    data() {
      return {}
    },
    methods: {},
    mounted() {
      this.$nextTick(() => {

      })
    }
  }
</script>
