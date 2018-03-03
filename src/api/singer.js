import {commonParams, options} from './config'
import jsonp from '@/common/js/jsonp'
import axios from 'axios'

export function getSingerList() {
	const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

	const data = Object.assign({}, commonParams, {
		channel: 'singer',
		page: 'list',
		key: 'all_all_all',
		pagesize: 100,
		pagenum: 1,
		hostUin: 0,
		needNewCode: 0,
		platform: 'yqq',
		g_tk: 1664029744
	})

	return jsonp(url, data, options)
}
export function getSingerDetail(singerId) {
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

	const data = Object.assign({}, commonParams, {
		hostUin: 0,
		needNewCode: 0,
		platform: 'yqq',
		order: 'listen',
		g_tk: 1664029744,
		begin: 0,
		num: 100,
		songstatus: 1,
		singermid: singerId
	})

	return jsonp(url, data, options)
}

export function getSongKey(songmId) {
	const url = '/api/getDiscList'

	const data = Object.assign({}, commonParams, {
		hostUin: 0,
		loginUin: 0,
		needNewCode: 0,
		platform: 'yqq',
		format: 'json',
		cid: 205361747,
		songmid: songmId,
		filename: `C400${songmId}.m4a`,
		guid: 7743456921
	})

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}