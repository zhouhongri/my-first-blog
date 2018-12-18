<template>
  <div class="add-comment-container">
    <div class="tab-container">
      <ul>
        <li @click="isWrite = true" :class="isWrite ? 'active' : ''">Write</li>
      </ul>
      <div v-if="accessToken == null">
        <a href="/#/Login">Login</a>
      </div>
    </div>
    <textarea v-if="isWrite" rows="5" v-model="obj.commentContent"
              placeholder="说点什么？「支持 MarkDown 语法」"/>
    <button @click="addComment" class="add-comment-btn">Comment
    </button>
  </div>
</template>
<style lang="scss" scoped>
  .add-comment-container {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    border: solid 1px #eeeeee;
    margin: 30px 0;
    .tab-container {
      padding: 0 10px;
      border-bottom: solid 1px #eeeeee;
      background-color: #f9fafc;
      display: flex;
      ul {
        margin-top: 8px;
        list-style: none;
        display: flex;
        flex-grow: 1;
        margin-right: 10px;
      }
      li {
        padding: 10px;
        font-size: 14px;
        cursor: pointer;
        margin-bottom: -1px;
        color: #586069;
        user-select: none;
      }

      li.active {
        color: #24292e;
        background-color: #ffffff;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border-top: solid 1px #eeeeee;
        border-left: solid 1px #eeeeee;
        border-right: solid 1px #eeeeee;
      }

      div {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        user-select: none;
        a {
          color: #2196F3;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    textarea {
      margin: 10px;
      border-radius: 3px;
      padding: 15px 30px 15px 15px;
      border: solid 1px #eeeeee;
      background-color: #ffffff;
      font-size: 14px;
      color: #4b595f;
      outline: none;
      &:disabled {
        cursor: not-allowed;
      }
    }

    .markdown-body {
      margin: 15px;
      min-height: 107px;
    }

    .add-comment-btn {
      cursor: pointer;
      user-select: none;
      margin: 0 15px 15px 0;
      border-radius: 4px;
      float: right;
      background-color: #34d058;
      color: #ffffff;
      align-self: flex-end;
      padding: 8px 12px;
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      white-space: nowrap;
      vertical-align: middle;
      user-select: none;
      border: none;
      outline: none;
      &:hover {
        background-color: #34c058;
      }
      &:disabled {
        background-color: #94d3a2;
        cursor: not-allowed;
      }
    }
  }

  .width-match-parent-btn {
    cursor: pointer;
    user-select: none;
    margin: 30px 0px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 4px;
    font-size: 16px;
    background-color: #eff7ff;
    color: #3593f2;
    &:hover {
      background-color: #3593f2;
      color: #ffffff;
    }
  }


</style>
<script>
  export default {
    props: ['blogId'],
    data() {
      return {
        obj: {
          blogId: this.blogId,
          commentContent: ''
        },
        isWrite: true,
        newComment: null,
        renderedMarkdown: '',
        accessToken: null
      }
    },
    computed: {
      commentBtnDisabled() {
        return this.accessToken != null || this.newComment == null || this.newComment.trim().length === 0
      }
    },
    methods: {
      addComment() {
        this.axios.post('/comment/insert?', JSON.stringify(this.obj), {
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        }).then((response) => {
          if (response.data) {
            this.$emit('addCommentSuccess', response.data)
            this.isWrite = true
            this.newComment = null
            this.renderedMarkdown = ''
          }
        }).catch((response) => {
          this.$Message.error(response)
        })
      }
    },
    mounted() {
      this.$nextTick(() => {

      })
    }
  }
</script>
