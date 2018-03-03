import {commonParams, options} from './config'
import jsonp from '@/common/js/jsonp'

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
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_radiolist.fcg'
	const data = Object.assign({}, commonParams, {
		channel: 'radio',
		page: 'index',
		tpl: 'wk',
		new: 1,
		p: Math.random(),
		platform: 'yqq',
		hostUin: 0,
		loginUin: 0,
		sin: 0,
		sortId: 5,
		needNewCode: 0
	})
	return jsonp(url, data, options)
}