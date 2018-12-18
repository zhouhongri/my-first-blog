<template>
  <div v-if="issue" class="blog-detail-container">
    <div class="title-container">
      <span class="title">{{dataObj.title}}</span>
      <ul>
        <li class="tag tag-small" v-for="label in labels" :key="label.id"
            :style="{ backgroundColor: '#' + label.color}">{{label.name}}
        </li>
      </ul>
      <span class="back" @click="back">
        <img src="../assets/back-icon.svg"
             class="back-icon">返回
      </span>
    </div>
    <div class="header-container">
      <span>发布时间：{{$moment(dataObj.createTime).format('YYYY-MM-DD')}}</span>
      <span>阅读数：{{dataObj.readCount}}</span>
    </div>
    <div style="border: 1px solid #ccc;">
      <div class="content" v-html="issue.content"></div>
    </div>
    <div class="comment-container bga-back-top" ref="commentContainer" style="min-height: 500px;">
      <comment v-if="comments != null" v-for="comment in comments" :key="comment.id" :comment="comment"/>
      <add-comment :blog-id="issue.id" @addCommentSuccess="handleAddCommentSuccess"/>
    </div>
  </div>
</template>
<script>
  import Comment from '../components/Comment.vue'
  import AddComment from '../components/AddComment.vue'

  export default {
    data() {
      return {
        issue: this.$route.params.issue,
        labels: [],
        comments: [],
        dataObj: {}
      }
    },
    components: {Comment, AddComment},
    methods: {
      updateBlogById(url, config) {
        var tempId = window.localStorage.getItem('blogId' + this.issue.id);
        if (tempId == null) {
          tempId = Math.random() + this.issue.id;
          window.localStorage.setItem('blogId' + this.issue.id, tempId);
        }
        this.axios.get('/blogs/updateReadCount?id=' + this.issue.id + '&tempId=' + tempId, {}, {}).then((response) => {
          this.dataObj = response.data;
        }).catch((response) => {
          this.$Message.error(response);
        })
      },
      getLabels() {
        this.axios.get('/labels/getByBean?blogId=' + this.issue.id, {}, {}).then((response) => {
          this.labels = response.data;
        }).catch((response) => {
          this.$Message.error(response);
        })
      },
      getComments() {
        this.axios.get('/comment/getByBean?blogId=' + this.issue.id, {}, {}).then((response) => {
          this.comments = response.data;
        }).catch((response) => {
          this.$Message.error(response);
        })
      },
      back() {
        this.$router.go(-1)
      },
      handleAddCommentSuccess(comment) {
        this.comments.push(comment)
        this.$nextTick(() => {
          // 如果这里不加个 setTimeout 的话，Comment 数量太多时不会自动滚动到底部
          setTimeout(() => {
            let commentContainer = this.$refs.commentContainer
            commentContainer.scrollTop = commentContainer.scrollHeight - commentContainer.clientHeight
          }, 20)
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (this.issue != undefined && this.issue != null) {
          this.updateBlogById();
          this.getLabels();
          this.getComments();
        } else {
          this.back();
        }
      })
    }
  }
</script>
<style>
  .content{
    padding: 12px 15px;
  }
</style>
