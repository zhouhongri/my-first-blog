<template>
  <div class="comment">
    <div class="comment-title">
      <!--<div @click="openGitHub()">
        <img :src="comment.user.avatar_url">
        <span>{{comment.user.login}}</span>
      </div>-->
      <span class="time">{{$moment(comment.createTime).format('YYYY-MM-DD HH:mm')}}</span>
    </div>
    <article class="comment-body markdown-body" v-html="comment.commentContent"/>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        renderedMarkdown: this.comment.commentContent
      }
    },
    props: ['comment'],
    methods: {},
    mounted() {
      this.$nextTick(() => {

      })
    }
  }
</script>
