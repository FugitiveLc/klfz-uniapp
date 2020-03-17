const BASE_URL = "http://zaixiahuangfeihongqingcijiao.top:8081/mobile/";
//const BASE_URL = "http://localhost:8081/";
// 获取分页获取文章  getArticlePage 
export const getArticlePage = params=>{
   return  uni.request({
	    url: `${BASE_URL}article`,
		data:params
	})
}
// 获取所有分页
export const getAllCategory = ()=>{
  return uni.request({
	    url: `${BASE_URL}category` 
	})
}
// 按照文章类型 获取文章分页
export const getArticleByCategoryPage = (id,params)=>{
	return uni.request({
	    url: `${BASE_URL}article/${id}/category`,
		data:params
	})
}
// 按照文章id获取文章
export const getArticleById = id=>{
	return uni.request({
		url:`${BASE_URL}article/${id}` 
	})
}
// 查询收藏的文章 根据文章ids[] 来查
export const getArticleByIds = params=>{
	return uni.request({
	url:`${BASE_URL}article`, 
		data:params,
		header: {
		'content-type': 'application/x-www-form-urlencoded'
		},
		method:'POST'
	})
}

 