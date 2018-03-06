import {commonParams, options} from './config'
import jsonp from '@/common/js/jsonp'
import axios from 'axios'

export function getRecommend() {
	// body...
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
	const data = Object.assign({}, commonParams, {
		platform: 'h5',
		uin: 0,
		needNewCode: 1
	})
	return jsonp(url, data, options)
}

export function getDiscList() {
  const url = 'api/getRecommend'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    format: 'json',
    data: `{"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"QQMusic.MusichallServer","method":"GetNewSong","param":{"type":0}},"new_album":{"module":"QQMusic.MusichallServer","method":"GetNewAlbum","param":{"type":0,"category":"-1","genre":0,"year":1,"company":-1,"sort":1,"start":0,"end":39}},"toplist":{"module":"music.web_toplist_svr","method":"get_toplist_index","param":{}},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}}`
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve((res.data))
  })
}

export function getDiscItem(id) {
  const url = 'api/getDisc'
  const data = Object.assign({}, commonParams, {
    type: 1,
    utf8: 1,
    onlysong: 0,
    disstid: id,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    formate: 'jsonp'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res)
    return Promise.resolve((res.data))
  })
}
