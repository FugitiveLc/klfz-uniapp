<template>
	<view class="article" v-if="Object.keys(article).length>0"> 
		<view class="title">{{article.articleTitle}}</view>
		<view>
			<text class="subtitle">{{article.createTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</text>  
			<text class="subtitle">{{article.articleAuthor}}</text>
			<text @tap="collect" :class="['subtitle collect iconfont icon-shoucang ', isCollect ? 'red':'']"></text>
		</view>
		<view class="spilt"></view>
		<view class="desc">
			<text class="label">摘要</text>
             {{article.articleDesc}}
		</view>
		   <u-parse :content="article.articleContent" @preview="preview" @navigate="navigate" ></u-parse>
	</view>
</template>

<script>
  import uParse from '@/components/u-parse/u-parse.vue'
 import {getArticleById} from '../../js/request.js'
	export default {
		data() {
			return {
			    article:{},
				id:"",
				actionTimer:null,
				isCollect:false  //是否被收藏
			 };
		},
		components:{
			uParse  
		},
		onLoad(options){
			this.id=options.id;
			this.isCollect=this.isCollectFun();
			getArticleById(options.id).then(r=>{
				let[err,res] = r;
				if(res.data.code==200){
					this.article=res.data.data;
				}else{
					uni.showModal({
						title:"提示",
						content:"网络出了点小问题...",
						showCancel:false
					})
				}
			})
		},
	    methods: {
			isCollectFun(){ //判断文章是否被收藏
				return -1 != this.$store.state.collect.findIndex(v=>{
					  return v == this.id;
				});
			},
			preview(src, e) {
			},
			navigate(href, e) {
			},
			collect(){
				this.isCollect = !this.isCollect;
				//调用vuex的方法 将id传过去 和状态传过去 
				//判断现在的状态是收藏还是没收藏 
				let collStatus= this.isCollectFun();
				// 防止有人抽风作死的点收藏按钮 所以应该进行防抖处理
				if(this.actionTimer) clearTimeout(this.actionTimer); //停下之前的那个操作
				this.actionTimer = setTimeout(()=>{
					if(this.isCollect ^ collStatus){  //收藏 true
						 //调用收藏方法
						 this.$store.dispatch("updateCollect",{
						 	id:this.id,
						 	status:this.isCollect
						 })
					}	
				},300);
			}
	  }
	}
</script>

<style lang="scss" scoped>
 @import url("../../components/u-parse/u-parse.css");
 uni-page-wrapper,uni-page-body{ 
	 height:100%;
 }
 .red{
	 color:red !important;
 } 
 .article{
	 @include paved;
	 padding:15upx;
	 box-sizing: border-box;
	 height:100%;
	 .title{
		 text-indent:0.5em;
	 	font:{
			size:$uni-font-size-title;
			weight:600;
		}
		 
	 }
		.subtitle{
				 color:#666666;
				 font-size:35rpx;
				 margin:0.3rem 0.5rem;
		}
		.collect{
			 margin-left:100rpx;
			 font-size: 50rpx;
			 position: relative;
			 top:8rpx;
		} 
 
	 .spilt{
		 width:100%;
		 height:1px;
		 background-color: #7F7F7F;
		 margin-bottom:0.3rem;
		 margin-top:0.2em;
	 }
	 .desc{
		padding:8upx;
		box-sizing: border-box;
		background-color: #f8f8f8; 
		font-size: 28upx;
		color:#666;
		border-radius: $uni-border-radius-lg;
		.label{
			font-size:36upx;
			color:#000;
			padding-right:1rem;
		}
	 }
 }
 
</style>
