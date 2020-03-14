<template>
	<view class="article" @tap="toPath(article.articleId)">
		<view class="title" v-text="article.articleTitle">震惊！深圳某男子，上班 啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</view>
		<view class="desc" v-text="article.articleDesc"> </view>
		<view class="author-time">
			<view class="author"  ><text class="iconfont icon-zuozhe"></text >{{article.articleAuthor}}</view>
			<view class="time"><text class="iconfont icon-shijian"></text>{{article.createTime | formatDate('yyyy-MM-dd')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"ArticleItem",
		props:{
			article:Object
		},methods:{
			toPath(id){
				uni.navigateTo({
					url:`/pages/details/details?id=${id}`
				});
			} 
		}
	}
</script>

<style lang="scss" scoped>
.article{
	margin:0.2rem 0;
	padding:0.1rem 0.2rem;
	background-color: #FFFFFF;
	.title{
		@include omits;	
		color:$uni-color-title;
		font:{
			weight:600;
			size:$uni-font-size-title;
			}
	}
	.desc{
		@include omits(2); 
		margin:0.2rem 0;
		color:$uni-color-subtitle;
		text-indent:2em;
		font-size: $uni-font-size-paragraph;
	}
	.author-time{
		display: flex;
		margin-left:0.3rem;
		border-bottom:1upx dashed rgba(27,151,220,0.1);
		padding-bottom:0.2rem;
		.author,.time{
			flex:1;
			font-size: 25rpx;
			.iconfont{
				margin-right:0.2rem;
				font-size:28rpx;
			}
		}
	}
}
</style>
