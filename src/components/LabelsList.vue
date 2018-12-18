<template>
  <ul class="label-list">
    <li @click="setActiveLabel(null)">
      <span class="tag" style="background-color: #3593f2;">ALL</span>
    </li>
    <li v-for="label in labelsData" :key="label.id" @click="setActiveLabel(label)">
      <span class="tag" v-if="label.name"
            :style="{ backgroundColor: '#' + label.color}">{{label.name}}</span>
      <span v-else class="tag tag-unchecked">{{label.name}}</span>
    </li>
  </ul>
</template>
<script>

  export default {
    data() {
      return {
        labelsData: [],
        blogIds: null
      }
    },
    computed: {},
    watch: {
      blogIds: function () {
        this.getLabels();
      }
    },
    mounted() {
      this.$nextTick(() => {

      })
    },
    methods: {
      getLabels() {
        if (this.blogIds.length <= 0) {
          return;
        }
        this.axios.get('/labels/getGroupBeanByName?blogIds=' + this.blogIds, {}, {}).then((response) => {
          this.labelsData = response.data;
        }).catch(function (response) {
          console.log(response);
        });
      },
      setActiveLabel(label) {
        if (label == null) {
          this.$emit('blogsChange', null);
          return;
        }
        this.axios.get('/labels/getByBean?name=' + label.name, {}, {}).then((response) => {
          if (response.data != null) {
            var arrays = [];
            for (let i in response.data) {
              arrays.push(response.data[i].blogId);
            }
            this.$emit('blogsChange', arrays);
          }
        }).catch(function (response) {
          console.log(response);
        });
      },
    }
  }
</script>
