<template>
	<transition name="slide">
		<music-list :title="title" :bg-image="bgImage" :songs="getSong"></music-list>
	</transition>
</template>

<script type="text/ecmascript-6">
	import {mapGetters} from 'vuex'
	import {getSingerDetail} from '@/api/singer'
	import {ERR_OK} from '@/api/config'
	import {createSong} from '@/common/js/song'
	import MusicList from '@/components/music-list/music-list'
	export default {
		data() {
			return {
				songs: [],
				length: 100
			}
		},
		computed: {
			...mapGetters([
				'singer'
			]),
			getSong() {
				if (this.length === this.songs.length) {
					return this.songs
				}
			},
			title() {
				return this.singer.name
			},
			bgImage() {
				return this.singer.avatar
			}
		},
		created() {
			this._getDetail()
		},
		components: {
			MusicList
		},
		methods: {
			_getDetail() {
				if (!this.singer.id) {
					this.$router.push('/singer')
					return
				}
				getSingerDetail(this.singer.id).then((res) => {
					if (res.code === ERR_OK) {
						this.length = res.data.list.length
						this.songs = this._normalizeSongs(res.data.list)
					}
				})
			},
			_normalizeSongs(list) {
				let ret = []
				list.forEach((item) => {
					let {musicData} = item
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
  @import '../../common/stylus/variable'
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
