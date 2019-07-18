<template>
	<div class="slider" :class="{'slider-active': sliderShow }">
		<common-header :title="title" navigateBack = 'eventEmit' @back="navigateBack"/>
		<div class="slider-body">
			<slot name="body"></slot>
		</div>
	</div>
</template>

<script lang="ts">
	import {Component, Prop, Vue} from 'vue-property-decorator';

	@Component
	export default class SlidePage extends Vue {

		private navigateBack():void{
			this.hide() ;
		};

		@Prop() private title!: string;
		private sliderShow: boolean = false ;

		public show(): void{
			this.sliderShow = true ;
		}
		public hide(): void{
			this.sliderShow = false ;
		}
	}

</script>
<style scoped>
	.slider{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 100%;
		top:0;
		transition: left .4s ease-in;
	}
	.slider-body{
		height: calc( 100% - 55px);
		background: #fff;
	}
	.slider-active{
		left: 0 !important;
	}
</style>
