import {mapGetters} from 'vuex'

export const songMixin = {
  computed: {
    ...mapGetters(['songList'])
  },
  mounted () {
    this.addBottom()
  },
  methods: {
    addBottom () {
      if (this.songList && this.songList.length) {
        this.$refs.scroll.$el.style.marginBottom = '66px'
      }
    }
  },
  watch: {
    songList (list) {
      if (list.length) {
        this.$refs.scroll.$el.style.marginBottom = '66px'
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      }
    }
  }
}
