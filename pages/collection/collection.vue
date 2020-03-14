<template>
	<view>
		<article-item   v-for="item in $store.state.collectShow " :article="item"
		 :key="item.articleId" ></article-item>
		<botton-tips  v-if="isEnd" :tips="info"></botton-tips> 
	</view>
</template>

<script>
	import ArticleItem from '../../components/ArticleItem.vue'
	import BottonTips from '../../components/BottonTips.vue'
	import {getArticleByIds} from '../../js/request.js'
	export default {
		data() {
			return {
			  end: false,
			  current:1,
			  info:'就这么多了，没了!' // '你还没有收藏呀！':'就这么多了，没了!'
			}
		},	
		components:{
			ArticleItem,
			BottonTips
		},	 
		computed:{
			 isEnd(){
				  let len=this.$store.state.collect.length;
				  this.info=  len==0 ?'你还没有收藏呀！':'就这么多了，没了!' 
				return len==0 || len>=10 && len == this.$store.state.collectShow.length;
			 }
		},
		onLoad() {
			//拿到收藏的id数组  数组长度少于10则加载出来 否则 加载前10条
			let coll=this.$store.state.collect;
			if(coll.length==0){ //没有收藏
				 this.info='你还没有收藏呀！';
				
				 return;
			}
			let ids= coll.length>10?coll.slice(0,10):coll;
			getArticleByIds(
				 {
					'ids[]':ids,
				 }).then(r =>{
				  let [err,res] =r; 
				  this.$store.commit('initCollectShow',res.data.data)
			})
		},
		onReachBottom() {
			  let coll=this.$store.state.collect;
			  let caLength=this.$store.state.collectShow.length; //显示的列表
			  let ids =  coll.length< caLength+10  
				          ? coll.slice(caLength,coll.length)
							 :coll.slice(caLength,caLength+10);
			  this.end = ids.length==0; //没有更多了
			  if(this.end){  
				  return;
			  }
			  uni.showLoading({
			     title: '加载中...',
			     mask:true
			  });
			  getArticleByIds({				
				  'ids[]':ids		   
			  }).then(r=>{
				   uni.hideLoading() 
				  let [err,res] =r;
				  if(res.data.data.length>0){
					  this.$store.dispatch('collectShowPushFun',res.data.data)		   
				  }			  
			  })
		} 
	}
</script>

<style>

</style>
