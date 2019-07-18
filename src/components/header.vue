<template>
	<div class="header">
		<i class="el-icon-arrow-left iconBack" v-if="navigateBack === 'true' || navigateBack === 'eventEmit'" @click="back"></i>
		{{ title }}
	</div>
</template>

<script lang="ts">
	import {Component, Prop, Vue} from 'vue-property-decorator';

	@Component
	export default class Header extends Vue {
		@Prop() private title!: string;
		@Prop() private navigateBack!: boolean | 'eventEmit' ;

		private back(): void {
			if( this.navigateBack === 'eventEmit')
				this.$emit('back') ;
			else
				this.$router.back() ;
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.header{
		width: 100%;
		height: 55px;
		background: rgb(64, 158, 255);
		text-align: center;
		line-height: 55px;
		color:#fff;
		font-weight: bold;
		font-size: 18px;
		position: relative;
	}
	.iconBack{
		position: absolute;
		left: 3%;
		top:calc( 50% - 13px) ;
		font-size: 26px;
		font-weight: bold;
	}
</style>
