<template>
	<view class="article" v-if="Object.keys(article).length>0"> 
		<view class="title">{{article.articleTitle}}</view>
		<view ><text class="subtitle">{{article.createTime | formatDate('yyyy-MM-dd hh:mm:ss')}}</text>  <text class="subtitle">{{article.articleAuthor}}</text></view>
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
			 article:{}  
			 };
		},
		components:{
			uParse  
		},
		onLoad(options){
			getArticleById(id).then(r=>{
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
			preview(src, e) {
			  // do something
			},
			navigate(href, e) {
			  // do something
			}
	  }
	}
</script>

<style lang="scss" scoped>
 @import url("../../components/u-parse/u-parse.css");
 uni-page-wrapper,uni-page-body{ 
	 height:100%;
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
		 font-size:15upx;
		 margin:0.3rem 0.5rem;
	 }
	 .spilt{
		 width:100%;
		 height:1px;
		 background-color: #7F7F7F;
		 margin-bottom:0.2rem;
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
