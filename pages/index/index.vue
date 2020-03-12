<template>
	<view class="content">
		 <article-item v-for="item in list" :article="item"
		  :key="item.articleId" ></article-item>
		 <botton-tips v-if="end" :tips="'我是有底限的!'"></botton-tips> 
	</view>
</template>
<script>
	import ArticleItem from '../../components/ArticleItem.vue'
	import BottonTips from '../../components/BottonTips.vue'
	import {BASE_URL} from '../../js/request.js'
	export default { 
		data() {
			return {
				current:1,
				end:false,
				list:[] 
			}
		},
		components:{
			ArticleItem,
			BottonTips
		},
		onLoad() {
			uni.request({
				url:`${BASE_URL}article`, 
				data:{ 
					size:10 
				},
				success: (res) => { 
					 this.current=res.data.data.current; //获取到当页的页码
					 this.list= res.data.data.records;
					 if(res.data.data.pages<=this.current){
					 	this.end=true; 
					 } 
				}
			})
		},
		onReachBottom() {
		   if(this.end) return;  //已经是最后页
		   uni.showLoading({
			   title: '加载中...',
			   mask:true
		   });
			uni.request({
				url:`${BASE_URL}article`, 
				data:{
					current:this.current+1,
					size:10
				}, 
				success: (res) => { 
					 //console.log(res.data); 
					this.current=res.data.data.current;
					uni.hideLoading() 
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
				}
			})
		 },
		methods: {
			
		}
	}
</script>

<style lang="scss" >


</style>
