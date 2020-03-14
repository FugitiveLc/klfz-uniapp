<script>

	export default {
		onLaunch: function() {
		  //加载我的收藏
		  uni.getStorage({
		      key: this.$store.state.collKey,
		      success:  (res) => {
			      this.$store.dispatch('initCollect',JSON.parse(res.data))
		      }
		  });
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style lang="scss">
@import url("./static/font/iconfont.css");
  body{
	  width:96vw;
	  margin:0 2vw;
	  background-color: #f0f0f0;
  }
</style>
