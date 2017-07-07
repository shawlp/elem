const host = 'https://mainsite-restapi.ele.me';

const imgHost = 'https://fuss10.elemecdn.com';

//首页接口api
//定位
//参数： latitude longitude
const geo = '/bgs/poi/reverse_geo_coding'; 

//天气
//参数： latitude longitude
const weather = '/bgs/weather/current';

//热门词
//参数： latitude longitude
const hotwords = '/shopping/v3/hot_search_words';

//轮播
//参数： latitude longitude  templates[]=main_template
const banner = '/shopping/v2/entries';

//列表
//轮播
//参数： latitude longitude  offset  limit
const list = '/shopping/restaurants';

// 详情
const detail = '/shopping/restaurant';

//keyword
const keylist = '/shopping/v1/restaurants/search';

// 详情获取菜单
const menu = '/shopping/v2/menu';

//搜索地址
//参数: keyword offset limit
const searchAddress = '/bgs/poi/search_poi_nearby';

export default {
	geoApi: host+geo,
	weatherApi: host+weather,
	hotwordsApi: host+hotwords,
	bannerApi: host+banner,
	listApi: host+list,
	imgHost,
	searchAddress: host+searchAddress,
	keylist: host+keylist,
	detail: host + detail,
	menu: host + menu
}
