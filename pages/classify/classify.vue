<template>
	<view>
		<view class="header">
			<image src="../../static/img/logo.png"   ></image>
		</view>
		<view class="class-body" >
			<view class="classify"  v-for="item in categorys"
				:key="item.categoryId" @tap="toPath(item.categoryId,item.categoryName)">
				<view><text class="name">{{item.categoryName}}</text></view> 
				<view><text class="iconfont icon-youjiantou"></text></view>
			</view>
		</view>
	</view>
</template> 

<script>
 import {BASE_URL} from '../../js/request.js'
	export default {
		data() {
			return {
			 categorys: []	
			}
		},
		onLoad(){
			//拉取所有 分类
			uni.request({
				url:`${BASE_URL}category`,
				success: (res) => {
					if(res.data.code==200){
						this.categorys = res.data.data;
					}else{
						uni.showModal({
							title:"提示",
							content:"网络出了点小问题...",
							showCancel:false
						})
					}
				}
			})
		},
		methods: {
			toPath(categoryId,categoryName){
				uni.navigateTo({
					url:`/pages/articleByClassify/articleByClassify?id=${categoryId}&name=${categoryName}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
  .header{
	  @include paved;
	  height:200upx;
	  image{
		width:150upx;
		height:150upx;
		border-radius: 50%;
		margin:25upx 300upx;
	  }
  }
  .class-body{
	  @include paved; 
	  $line-height:75rpx;
	  @mixin line {
	  	height:$line-height;
	  	line-height: $line-height;
	  }
	  margin-top:25upx;
	  padding-left:30rpx;
	  box-sizing: border-box;
	  .classify{
		   display: flex;
		    border-bottom:1px solid rgba(230,230,230,0.7); 
			view{
				flex:1;
				&:nth-child(2){
				   text-align: right;	
				}
				.name{
				   @include line;
				   font-size:32rpx;
				}
				.iconfont{
				   @include line;
				   font-size:20rpx;
				   color:#666666;
				   margin-right:30rpx;
				}
			}
	  }
	 
  }
</style>
