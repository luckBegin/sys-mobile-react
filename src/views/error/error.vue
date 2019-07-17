<template>
	<div class="c-full-container container">
		<div class="tip c-flex-column-center">
			<div>
				{{ code }}
			</div>
			<div class="tip-small">
				{{ desc }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';

	@Component({
		components: {},
	})
	export default class Home extends Vue {

		private code: string = '';
		private desc:string = '';

		private created(): void{
			this.code = this.$route.query.code as string;
			if( this.code === '401')
				this.desc = '用户未登录' ;
			if( this.code === '403')
				this.desc = '暂无权限访问,请联系系统管理员' ;
		}
	}
</script>
<style scoped>
	.container{
		background: url("../../assets/img/error.jpg") round;
		position: relative;
	}
	.tip{
		position: absolute;
		bottom: 35%;
		width: 100%;
		font-size: 25px;
		font-weight: bold;
		color: rgba(0,0,0,.75);
	}
	.tip-small{
		font-size: 15px;
		font-weight: normal;
		margin-top: 5px;
		color: rgba(123, 123, 123, 0.75);
	}
</style>
