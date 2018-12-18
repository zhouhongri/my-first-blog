<template>
  <div>
    <div class="left-layout-container pc">
      <div class="user-info">
        <img @click="home" src="static/img/qq-header.jpg">
      </div>
      <ul class="other-site">
        <li @click="login()">
          <img src="static/img/log-in.png">
        </li>
        <li @click="openThirdPartySite()">
          <img src="static/img/github.png">
        </li>
      </ul>
      <ul class="left-menu">
        <router-link :class="isBlog ? 'selected-menu':''" tag="li" :to="{name: 'BlogList'}"><span>个人笔记</span>
        </router-link>
        <router-link :class="isWebNav ? 'selected-menu':''" tag="li" :to="{name: 'WebNav'}"><span>热门网站</span>
        </router-link>
        <router-link :class="isAboutMe ? 'selected-menu':''" tag="li" :to="{name: 'AboutMe'}"><span>关于我</span>
        </router-link>
      </ul>
      <div class="qq-group">
        <img src="static/img/qq.png">
      </div>
      <div class="copyright">@ {{copyright}}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .slide-fade-enter-active {
    transition: all .5s ease;
  }

  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-active {
    left: -15rem;
    opacity: 0;
  }

  .fade-enter-active {
    transition: all .5s ease;
  }

  .fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
<script>
  export default {
    data() {
      return {
        copyright: '2017-2018 ZhouHongRi'
      }
    },
    computed: {
      isBlog() {
        return this.$route.name === 'BlogList' && this.$route.name.startsWith('Blog')
      },
      isWebNav() {
        return this.$route.name === 'WebNav'
      },
      isAboutMe() {
        return this.$route.name === 'AboutMe'
      }
    },
    methods: {
      home() {
        this.$router.push('/')
      },
      login() {
        this.$router.push({name: 'Login'})
      },
      openThirdPartySite() {
        window.open('https://github.com/zhouhongri')
      },
    }
  }
</script>
