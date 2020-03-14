<template>
	<view class="content">
		 <article-item v-for="item in list" :article="item" :key="item.articleId"></article-item>
		 <botton-tips v-if="end" :tips="'我是有底限的!'"></botton-tips> 
	</view>
</template>

<script>
	import ArticleItem from '../../components/ArticleItem.vue'
	import BottonTips from '../../components/BottonTips.vue'
	import {getArticleByCategoryPage} from '../../js/request.js'
	export default {
		data() {
			return {
				current:1,
				end:false,
				list:[],
				id:''
			}
		},
		components:{
			ArticleItem,
			BottonTips
		},
		onLoad(option) {
			if(!option.id) return;
			//获取 类型id 和 类型名
			this.id=option.id
			  uni.setNavigationBarTitle({
			            title:option.name
			        });
			 getArticleByCategoryPage(this.id,{  
					size:10
				}).then(r =>{
			     let [err,res]=r;
				 this.current=res.data.data.current; //获取到当页的页码
				 this.list= res.data.data.records;
				 if(res.data.data.pages<=this.current){
				 	this.end=true; 
				 }
			 })
		},
		onReachBottom() {
		   if(this.end) return;  //已经是最后页
		   uni.showLoading({ 
			   title: '加载中...',
			   mask:true
		   });
		   getArticleByCategoryPage(this.id,{
					current:this.current+1,
					size:10
				}).then(r =>{
					uni.hideLoading() 
					let [err,res] = r;
		   			this.current=res.data.data.current;
		   			if(res.data.code==200){
		   				this.list=this.list.concat(res.data.data.records)
		   				if(res.data.data.pages<=this.current){
		   					this.end=true; 
		   				} 
		   			}else{
		   				uni.showModal({
		   					title:"提示",
		   					content:"网络出了点小问题...",
		   					showCancel:false
		   				})
		   			}	  
		   })			 
		 } 
	}
</script>
