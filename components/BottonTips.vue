<template>
	<view class="tips">{{tips}}</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			tips:String
		}
	}
</script>

<style lang="scss" scoped>
$line-height:50rpx;
.tips{     
	text-align: center;
	font-size:24rpx;
	letter-spacing: 3rpx;
	color:#666666;
	line-height: $line-height;
	height: $line-height;
}
</style>
