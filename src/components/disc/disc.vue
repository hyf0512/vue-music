<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
    import MusicList from '../music-list/music-list'
    import {mapGetters} from 'vuex'
    import {getDiscItem} from '@/api/recommend'
    import {ERR_OK} from '@/api/config'
    import {createSong} from '@/common/js/song'

    export default {
      data() {
        return {
          songs: []
        }
      },
      computed: {
        title() {
          return this.disc.title
        },
        bgImage() {
          return this.disc.cover
        },
        ...mapGetters([
          'disc'
        ])
      },
      created() {
        this._getDiscItem()
      },
      components: {
        MusicList
      },
      methods: {
        _getDiscItem() {
          getDiscItem(this.disc.content_id).then((res) => {
            let data = res.substring(res.indexOf('(') + 1, res.length - 1)
            data = JSON.parse(data)
            if (data.code === ERR_OK) {
              console.log(data.cdlist[0].songlist)
              this.songs = this._normalizeSongs(data.cdlist[0].songlist)
            }
          })
        },
        _normalizeSongs(list) {
          let ret = []
          list.forEach((musicData) => {
            if (musicData.songid && musicData.albummid) {
              createSong(musicData).then((res) => {
                ret.push(res)
              })
            }
          })
          return ret
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
