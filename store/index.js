 import Vue from 'vue'
 import Vuex from 'vuex'
 
 Vue.use(Vuex)
 
 import {getArticleByIds} from '../js/request.js'
 export default new Vuex.Store({
	 state:{
	    collectShow:[],
		collect:[], //收藏id数组
		collKey:"collect"
	 },
	 mutations:{  //用来修改值
		   collectShowPush (state,val) { //加载更多收藏显示 
			    state.collectShow = state.collectShow.concat(val)
		   },
		   unshiftCollectShow(state,val){ //添加一个最新收藏
			   state.collectShow.unshift(val)
		   },
		   setCollect(state,val){ //app启动 获取收藏列表
			   state.collect=val;
		   },
		   initCollectShow(state,val){ //进入收藏页面  
			    state.collectShow=val;
		   },
		   unshiftCollect(state,val){
			     state.collect.unshift(val);
		   },
		   deleteCollectShowIndex(state,index){ //移除显示的收藏
			   state.collectShow.splice(index,1) 
		   },
		   deleteCollectIndex(state,index){ //移除缓存中的收藏
		   		 state.collect.splice(index,1)
		   }
	 },
	  actions: {
	     collectShowPushFun(context,val){
			 context.commit('collectShowPush',val)
		 },
		initCollect(context,val){
		  context.commit('setCollect',val)
		},
		updateCollect(context,val){ 
			//判断是否显示在收藏页
			let showIndex =context.state.collectShow.findIndex(v=>{
				  return v.articleId == val.id;
			})
			//判断是添加还是抹除
			if(val.status){ //收藏
				//添加到收藏中去 并且 添加到收藏显示中去  
				  context.commit('unshiftCollect',val.id)
				if(showIndex == -1){ //显示列表中没有 所以 要拉取信息 然后添加到显示列表第一个
					//拉取文章信息 并且添加到显示列表
					getArticleByIds({
					  'ids':[val.id]		   
					}).then(r=>{
						let [err,res] =r;
						context.commit('unshiftCollectShow',res.data.data[0])		   
					})
				}
			}else{ //去除
			  //获取 这玩意在收藏列表中的位置
			    let index = context.state.collect.findIndex(v=>{
				   return v==val.id;
			    })
				if(showIndex != -1){ 	//判断显示的地方是否有要动
					 context.commit('deleteCollectShowIndex',showIndex)
				}
				context.commit('deleteCollectIndex',index)
			}
			console.log("最新的id"+val.id);
			console.log(context.state.collect);
			console.log("序列化 "+JSON.stringify(context.state.collect));
			//同步至缓存中 TODO
			uni.setStorage({
			    key: context.state.collKey,
			    data:JSON.stringify(context.state.collect),
			    success: function () {
			    }
			});
		}
	 }
 })
 