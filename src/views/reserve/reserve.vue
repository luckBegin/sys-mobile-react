<template>
	<div class="c-full-container contentContainer">
		<div style="height: 100%;background: #fff;">
			<common-header title="房台预定" navigateBack='false'/>
			<div class="formWrapper">
				<el-form :model="form.data" label-width="25%" :rules="form.rules" ref="form" class="form">
					<el-form-item label="预定店" prop="shopId" class="form-item">
						<el-select class="select" v-model="form.data.shopId" placeholder="请选择活动区域">
							<el-option v-for="item in ENUM_Shops " :label="item.key" :value="item.value"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="预定类型" prop="typeId" class="form-item">
						<el-select class="select" v-model="form.data.typeId" placeholder="请选择预定类型">
							<el-option v-for="item in ENUM_Types " :label="item.key" :value="item.value"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="客户姓名" prop="name" class="form-item">
						<el-input v-model="form.data.name" placeholder="请输入客户姓名"></el-input>
					</el-form-item>

					<el-form-item label="客户电话" prop="tel" class="form-item">
						<el-input type="tel" v-model="form.data.tel" placeholder="请输入客户电话"></el-input>
					</el-form-item>

					<el-form-item label="到店时间" prop="arriveTime" class="form-item">
						<el-date-picker type="datetime" placeholder="选择到店时间" v-model="form.data.arriveTime"
						                style="width: 100%;"></el-date-picker>
					</el-form-item>

					<el-form-item label="客户人数" prop="count" class="form-item">
						<el-input v-model="form.data.count" placeholder="请输入客户人数"></el-input>
					</el-form-item>

					<el-form-item label="备注" prop="remark" class="form-item">
						<el-input v-model="form.data.remark" placeholder="请输入备注"></el-input>
					</el-form-item>

					<div class="c-flex-row-center" style="margin: 20px 10px">
						<el-button type="primary" class="btn" @click="submit($event)">提交</el-button>
					</div>

					<div class="c-flex-row-center lookup" @click="lookup">
						查看我的预定
					</div>
				</el-form>
			</div>
		</div>
		<slider-page ref="slidePage" title="我的预定">
			<div class="reserve-wrapper c-container-bg" slot="body">
				<div class="reserve-item-wrapper" v-for="item in reverseList">
					<div class="c-flex-row-space reserve-title">
						<span>{{ item.name }}</span>
						<a :href="'tel:'+  item.tel ">{{ item.tel }}</a>
					</div>
					<div style="padding: 10px 0">
						<div class="reserve-item">
							<span>人数:</span>
							<span>{{ item.count }}</span>
						</div>
						<div class="reserve-item">
							<span>类型:</span>
							<span>
							{{ item.typeInfo.name }}
						</span>
						</div>
						<div class="reserve-item">
							<span>店铺:</span>
							<span>{{ item.shopInfo.name }}</span>
						</div>
						<div class="reserve-item">
							<span>到店时间:</span>
							<span>{{ item.arriveTime | dateFilter( 'y-m-d h:i:s') }}</span>
						</div>
						<div class="reserve-item">
							<span>预定时间:</span>
							<span>{{ item.createTime | dateFilter( 'y-m-d h:i:s') }}</span>
						</div>
						<div class="reserve-item">
							<span>备注:</span>
							<span> {{ item.remark | nullFilter}}</span>
						</div>
					</div>
				</div>
			</div>
		</slider-page>
	</div>
</template>

<script lang="ts">
	import {Component, Vue} from 'vue-property-decorator';
	import {RESPONSE} from "@/service/httpClient";
	import {ENUM} from "@/service/models/ENUMS.model";
	import {AdaptorUtils} from "@/utils/adaptor";
	import {map, filter} from 'rxjs/operators';
	import {FormBuilder, FormGroupI} from "@/service/form/formBuilder.service";
	import {Validators} from "@/service/form/validators";
	import {RoomService} from "@/service/room/room.service";
	import {SesssionStorageService} from "@/service/storage";
	import {DateUtils} from "@/utils/date.utils";

	@Component({
		components: {},
	})
	export default class Reserve extends Vue {
		private created(): void {
			this.getShops();
			this.getTypes();
		}

		ENUM_Shops: ENUM[] = [];
		ENUM_Types: ENUM[] = [];
		sliderShow: boolean = false;
		form: FormGroupI = FormBuilder.group({
			shopId: [null, [Validators.required]],
			name: [null, [Validators.required]],
			arriveTime: [null, [Validators.required]],
			tel: [null, [Validators.required]],
			typeId: [null, [Validators.required]],
			count: [null],
			remark: [null]
		});

		private getShops(): void {
			const data = SesssionStorageService.get('userInfo').shopInfo;
			this.ENUM_Shops = AdaptorUtils.reflect(data, {id: 'value', name: 'key'});
			this.form.patchVal({shopId: this.ENUM_Shops[0].value})
		}

		private getTypes(): void {
			RoomService.types()
			.pipe(map((res: RESPONSE) => res.data))
			.subscribe((data: any) => {
				this.ENUM_Types = AdaptorUtils.reflect(data, {id: 'value', name: 'key'});
				this.form.patchVal({typeId: this.ENUM_Types[0].value})
			});
		}

		private submit($event: MouseEvent): void {
			this.sliderShow = true;
			const value = this.form.value;
			if (!this.form.valid) {
				this.$message.warning('请填写每项信息');
				return;
			}
			const el = $event.currentTarget as HTMLButtonElement;
			el.disabled = true;
			value.arriveTime = DateUtils.format(value.arriveTime, 'y-m-d h:i:s');
			RoomService.makeReserve(value)
			.pipe(filter((res: RESPONSE) => {
				el.disabled = false;
				return res.success
			}))
			.subscribe((res: RESPONSE) => {
				this.$message.success('预定成功');
				this.form.reset({
					shopId: this.ENUM_Shops[0].value,
					typeId: this.ENUM_Types[0].value
				});
			})
		}

		private lookup(): void {
			const slidePage = (this.$refs as any).slidePage;
			slidePage.show();
			this.getReverseList();
		}

		reverseList: any[] = [];

		private getReverseList(): void {
			const now = DateUtils.getNow(false, 'y-m-d');
			RoomService.reserveList({createTime: now})
			.pipe(map((res: RESPONSE) => res.data))
			.subscribe((data: any[]) => {
				this.reverseList = data;
			})
		}
	}
</script>
<style scoped>
	.contentContainer {
		overflow-x: hidden;
		position: relative;
	}

	.form {
		background: #fff;
		padding: 0;
	}

	.form-item {
		padding: 0.5rem 0 0.5rem 20px;
		border-bottom: 1px solid #DCDFE6;
	}

	.select {
		border: none;
		width: 100%;
	}

	.form-item /deep/ .el-input__inner {
		border: none;
		width: 100%;
		padding-left: 17px;
	}

	.el-form-item {
		margin-bottom: 0;
	}

	.form-item /deep/ .el-form-item__error {
		color: #F56C6C;
		font-size: 12px;
		line-height: 1;
		padding-top: 4px;
		position: absolute;
		top: 30px;
		left: 17px;
	}

	.form-item /deep/ .el-input__icon {
		display: none;
	}

	.btn {
		width: 100%;
	}

	.lookup {
		color: rgb(64, 158, 255);
		font-size: 14px;
	}

	.reserve-wrapper {
		height: 100%;
		padding: 10px 0;
	}

	.reserve-item-wrapper {
		background: #fff;
		margin: 0 8px 10px 8px;
		border-radius: 5px;
		box-shadow: 0 0 2px #8e8e8e
	}

	.reserve-item {
		margin-bottom: 5px;
		padding: 3px 15px;
	}

	.reserve-item > span:nth-of-type(1) {
		color: rgba(0, 0, 0, 0.65);
		margin-right: 10px;
	}

	.reserve-title {
		background: rgb(250, 250, 250);
		padding: 15px;
		border-bottom: 1px solid #e8e8e8;
		font-size: 16px;
	}

	.reserve-title > span {
		color: rgba(0, 0, 0, 0.85)
	}

	.reserve-title > a {
		color: #1890ff;
		text-decoration: none;
	}
</style>
