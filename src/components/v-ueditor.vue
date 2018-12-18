<template>
  <div class="ueditor">
    <script :id="id" class="my-editor" name="content" type="text/plain">{{ content }}</script>
  </div>
</template>
<script>
import $ from '../../static/editor/third-party/jquery'
window.$ = window.jQuery = $
window.UMEDITOR_HOME_URL = '/static/editor/'
require('../../static/editor/umeditor.config')
require('../../static/editor/umeditor')

export default {
  name: 'vUeditor',
  props: {
    newstyle: {
      type: Boolean,
      default: true
    },
    content: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => {}
    },
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      instance: null
    }
  },
  watch: {
    content (val) {
      if (this.instance) {
        try {
          this.instance.setContent(val)
        } catch (e) {

        }
      }
    }
  },
  methods: {
    setContent () {
      this.instance.setContent(this.content)
    },
    init () {
      this.instance = UM.getEditor(this.id, {
        initialFrameWidth: '100%',
        ...this.config
      });
      this.instance.ready(() => {
        this.$emit('ready', this.instance)
      })
      this.instance.addListener('contentChange', () => {
        this.$emit('change', this.instance)
      })
      this.instance.addListener('selectionchange', (editor) => {
        this.instance.fireEvent('contentChange')
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  beforeDestroy () {
    // 组件销毁的时候，要销毁 UEditor 实例
    if (this.instance !== null && this.instance.destroy) {
      this.instance.destroy()
    }
  }
}
</script>
<style scoped>
  .my-editor{
    height: 800px;
  }
</style>
