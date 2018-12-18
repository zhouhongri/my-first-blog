<template>
  <div class="blog-list-container">
    <labels-list @blogsChange="getBlogs" ref="labelsList"></labels-list>
    <div class="table-header">
      <span>名称</span>
      <span>创建时间</span>
    </div>
    <ul v-if="issues && issues.length > 0" class="issue-list" ref="issueList">
      <li class="issue-item" v-for="issue in issues" :key="issue.id">
        <router-link tag="a" :to="{name: 'BlogDetail', params: {issue: issue}}">
          {{issue.title}}
        </router-link>
        <ul>
          <li class="tag tag-small" v-for="label in labelList[issue.id]" :key="label.id"
              :style="{ backgroundColor: '#' + label.color}">{{label.name}}
          </li>
        </ul>
        <span class="time">
          {{$moment(issue.createTime).format('YYYY-MM-DD')}}
        </span>
      </li>
    </ul>
    <div v-else class="no-data">
      <div></div>
      <span>该分类下还没有文章哦</span>
    </div>
    <div class="bottom-bar">
      <input type="text" class="fl query" v-model="obj.keyword" placeholder="按文章标题或内容搜索..."
             @keyup.enter="searchIssues()"/>
      <pagination :totalNum="totalNum" :currentPage="obj.pageNum" :pageSize="obj.pageSize"
                  @currentPageChanged="handleCurrentPageChanged"/>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  $time-width: 150px;
  .no-data {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    div {
      flex: 1 0 160px;
      background: url("../assets/no-data.png") no-repeat bottom;
    }
    span {
      flex-grow: 1;
      text-align: center;
      padding: 30px;
      color: #666666;
      font-size: 14px;
    }
  }
</style>
<script>
  import Pagination from '../components/Pagination.vue'
  import LabelsList from '../components/LabelsList.vue'

  export default {
    data() {
      return {
        obj: {
          keyword: '',
          pageNum: 1,
          pageSize: 10,
          ids: ''
        },
        totalNum: 0,
        issues: [],
        labelList: [],
      }
    },
    components: {Pagination, LabelsList},
    watch: {},
    mounted() {
      this.$nextTick(() => {
        this.getIssues()
      })
    },
    methods: {
      searchIssues() {
        this.getIssues()
      },
      handleCurrentPageChanged(val) {
        this.obj.pageNum = val
        this.getIssues()
      },
      getIssues() {
        this.axios.get('/blogs/page?' + this.$qs.stringify(this.obj), {}, {}).then((response) => {
          this.totalNum = response.data.total;
          this.issues = response.data.result;
          var array = response.data.result;
          var arrayIds = [];
          for (let i in array) {
            arrayIds.push(array[i].id);
          }
          if (arrayIds != null && arrayIds.length > 0) {
            this.getLables(arrayIds.toString());
            this.$refs.labelsList.blogIds = arrayIds.toString();
          }
        }).catch(function (response) {
          console.log(response);
        });
      },
      getLables(blogIds) {
        if (blogIds.length <= 0) {
          return;
        }
        this.axios.get('/labels/getByBlogId?blogIds=' + blogIds, {}, {}).then((response) => {
          this.labelList = response.data;
        }).catch(function (response) {
          console.log(response);
        });
      },
      getBlogs(blogIds) {
        if (blogIds != null) {
          this.obj.ids = blogIds.toString();
        } else {
          this.obj.ids = '';
        }
        this.getIssues();
      }
    },
  }
</script>
