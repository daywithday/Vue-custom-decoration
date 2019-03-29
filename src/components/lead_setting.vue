<template>
	<div class="lead_tool_content">
		<div @click="addedit()" class="text_content">
			<div class="lead_list">
				<div class="lead_list_item" v-for="(item,index) in data.leadList" v-bind:key="index" :style="{width:'calc(100% / '+data.leadList.length+')'}">
					<img :src="item.imgUrl" v-show="data.modelType == 'imageNav'" />
					<p :style="{backgroundColor:data.backgroundColor,color:data.fontColor}">{{item.title}}</p>
				</div>
			</div>
		</div>

		<div class="edit3 edit" v-show="data.state == 'active'">
			<h3 class="edit_head" style="color: red;">图文导航</h3>
			<div class="edit3_control">
				<div class="select_group" style="display: flex;justify-content: space-around;">
					<div style="width: 70px;">

						<span>选择模板：</span>
					</div>

					<div style="width: calc(100% - 70px);" class="select_model">
						<img src="../../static/img/img_lead.png" :class="data.modelType =='imageNav'?'active':''" @click="select_model('imageNav')" />
						<img src="../../static/img/font_lead.png" :class="data.modelType =='textNav'?'active':''" @click="select_model('textNav')" />
					</div>
				</div>
				<div class="select_group" style="display: flex;justify-content: space-around;">
					<div style="width: 70px;">

						<span>滑动设置：</span>
					</div>
					<div style="width: calc(100% - 70px);">
						<input type="radio" :name="'slideSetting'+randomId" :id="'slideSetting1'+randomId" value="fixed" v-model="data.slideSetting" /><label :for="'slideSetting1'+randomId">固定</label>
						<input type="radio" :name="'slideSetting'+randomId" :id="'slideSetting2'+randomId" value="horizontal" v-model="data.slideSetting" /><label :for="'slideSetting2'+randomId">横向滑动</label>
					</div>
				</div>
				<div class="select_group" style="display: flex;justify-content: space-around;">
					<div style="width: 70px;">
						<span>背景颜色：</span>
					</div>
					<div style="width: calc(100% - 70px);display: flex;align-items: center;">
						<div class="color_control">
							<div class="color_control_button" @click="showSketch1()">
								<div :style="{backgroundColor:data.backgroundColor}">

								</div>
							</div>
							<Sketch class="color_control_view" v-show="hasSketch1" v-model="backgroundColor" style="display:inline-block;"></Sketch>
						</div>&#x3000;
						<button @click="clearColor1()">重置</button>
					</div>
				</div>
				<div class="select_group" style="display: flex;justify-content: space-around;">
					<div style="width: 70px;">
						<span>文字颜色：</span>
					</div>
					<div style="width: calc(100% - 70px);display: flex;align-items: center;">
						<div class="color_control">
							<div class="color_control_button" @click="showSketch2()">
								<div :style="{backgroundColor:data.fontColor}">

								</div>
							</div>
							<Sketch class="color_control_view" v-show="hasSketch2" v-model="fontColor" style="display:inline-block;"></Sketch>
						</div>&#x3000;
						<button @click="clearColor2()">重置</button>
					</div>
				</div>

				<ul class="edit1_item_group">
					<li v-for="(item,index) in data.leadList" v-bind:key="index" v-dragging="{ item: item, list: data.leadList, group: 'item' }">
						<div class="edit1_item">
							<div class="edit1_item_left" v-show="data.modelType == 'imageNav'">
								<img :src="item.imgUrl">
								<p @click="showChangeBtn(randomId,index)">更换图片</p>
								<div class="edit1_item_left_change" v-show="item.changeBtn">
									<label :for="''+randomId+index">图片地址：</label><input type="text" name="" :id="''+randomId+index" value="" v-model="item.imgUrl" @blur="hideChangeBtn(index)" />
								</div>
							</div>
							<div class="edit1_item_right">
								<label for>标题：</label>
								<input type="text" v-model="item.title">
								<br>
								<br>
								<label for>链接：</label>

								<!--<input type="text" v-model="item.jumpUrl">-->

								<div style="display: inline-block;position: relative;">
									<select v-model="item.jumpUrl" class="page_select">
										<option disabled value="">选择跳转到的页面</option>
										<option v-for="(i,index) in pages" v-bind:key="index" :value="i.id">{{i.type_name}}{{i.id}}</option>
									</select>
								</div>

							</div>
							<button @click="remove_ImgItem(index)" class="swiper-slide-remove">X</button>
						</div>
					</li>
				</ul>

				<div class="edit1_newItem" @click="add_edit1_item()" v-show="!fullList">
					<p style="color: #337ab7;">
						<i class="glyphicon glyphicon-plus"></i> 添加一个图文导航
					</p>
					<p>建议尺寸 750x350 像素</p>
				</div>
			</div>

		</div>
		<button @click="remove_content()" class="remove_content">X</button>

	</div>
</template>

<script>
	import { Sketch } from "vue-color";
	export default {
		name: "HelloWorld",
		data() {
			return {
				mark: 0,
				fullList: false,
				randomId: 'editor' + (Math.random() * 100000000000000000),
				hasSketch1: false,
				hasSketch2: false,
				backgroundColor: {
					hsl: {
						h: 0,
						s: 0,
						l: 1,
						a: 1
					},
					hex: "#FFFFFF",
					hex8: "#FFFFFFFF",
					rgba: {
						r: 255,
						g: 255,
						b: 255,
						a: 1
					},
					hsv: {
						h: 0,
						s: 0,
						v: 1,
						a: 1
					},
					oldHue: 0,
					source: "hsva",
					a: 1
				},
				fontColor: {
					hsl: {
						h: 0,
						s: 0,
						l: 1,
						a: 1
					},
					hex: "#FFFFFF",
					hex8: "#FFFFFFFF",
					rgba: {
						r: 0,
						g: 0,
						b: 0,
						a: 1
					},
					hsv: {
						h: 0,
						s: 0,
						v: 1,
						a: 1
					},
					oldHue: 0,
					source: "hsva",
					a: 1
				},
			};
		},
		props: ["data","pages"],
		watch: {
			backgroundColor: {
				handler(curVal, oldVal) {
					this.hasSketch1 = false
					this.hasSketch2 = false
					this.data.backgroundColor = 'rgba('+
						curVal.rgba.r +
						"," +
						curVal.rgba.g +
						"," +
						curVal.rgba.b +
						"," +
						curVal.rgba.a +')';

				},
				deep: true
			},
			fontColor: {

				handler(curVal, oldVal) {
					this.hasSketch1 = false
					this.hasSketch2 = false
					this.data.fontColor = 'rgba('+
						curVal.rgba.r +
						"," +
						curVal.rgba.g +
						"," +
						curVal.rgba.b +
						"," +
						curVal.rgba.a + ')';

				},
				deep: true
			}
		},
		mounted() {

		},
		methods: {
			addedit() {
				this.$emit('quiet', '')
				this.data.state = 'active'
			},
			remove_content() {
				this.$emit('remove', '')
			},
			select_model(n) {
				this.data.modelType = n
			},
			showSketch1() {
				this.hasSketch1 = !this.hasSketch1
				this.hasSketch2 = false
			},
			showSketch2() {
				this.hasSketch1 = false
				this.hasSketch2 = !this.hasSketch2
			},
			clearColor1() {
				this.hasSketch1 = false
				this.backgroundColor = {
					hsl: {
						h: 0,
						s: 0,
						l: 1,
						a: 1
					},
					hex: "#FFFFFF",
					hex8: "#FFFFFFFF",
					rgba: {
						r: 255,
						g: 255,
						b: 255,
						a: 1
					},
					hsv: {
						h: 0,
						s: 0,
						v: 1,
						a: 1
					},
					oldHue: 0,
					source: "hsva",
					a: 1
				}
				this.data.backgroundColor = 'rgba(255,255,255,1)'
			},
			clearColor2() {
				this.hasSketch2 = false
				this.fontColor = {
					hsl: {
						h: 0,
						s: 0,
						l: 1,
						a: 1
					},
					hex: "#FFFFFF",
					hex8: "#FFFFFFFF",
					rgba: {
						r: 0,
						g: 0,
						b: 0,
						a: 1
					},
					hsv: {
						h: 0,
						s: 0,
						v: 1,
						a: 1
					},
					oldHue: 0,
					source: "hsva",
					a: 1
				}
				this.data.fontColor = 'rgba(0,0,0,1)'
			},

			add_edit1_item() {
				var that = this
				var len = that.data.leadList.length

				if(len < 10) {
					that.data.leadList.push({
						imgUrl: 'http://pic1.nipic.com/2008-12-30/200812308231244_2.jpg',
						title: '', // 导航 标题
						jumpUrl: '', // 导航的跳转地址
						changeBtn: false // 导航的修改地址按钮激活状态
					})
					that.fullList = false
				} else {
					that.fullList = true
				}

			},
			remove_ImgItem(n) {
				var len = this.data.leadList.length
				if(len <= 1) {
					this.mark = 0
				} else {
					this.fullList = false
					this.data.leadList.splice(n, 1);
				}
			},
			showChangeBtn(title, n) {

        var that = this;
        localStorage.setItem("dIsPageSelectImg", true);
        layer.open({
          type: 2,
          area: ['900px', '800px'],
          fixed: false, //不固定
          maxmin: true,
          content: '/images/select',
          title: '图片库',
          end : function() {
            let arrSelectImgs = JSON.parse(localStorage.getItem("dPageSelectedImgs"));
            var imgOne = that.data.imgListL[0];
            imgOne.url = arrSelectImgs[0];
            localStorage.setItem("dIsPageSelectImg", false);
            localStorage.setItem("dPageSelectedImgs", '');
          }

        });

				// var that = this
				// that.$set(that.data.leadList[n], 'changeBtn', true)
				// this.$nextTick(() => {
				// 	document.getElementById('' + title + n).focus()
				// })

			},
			hideChangeBtn(n) {
				var that = this
				that.$set(that.data.leadList[n], 'changeBtn', false)
			}
		},
		components: {
			Sketch
		},
		beforeDestroy() {

		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.lead_tool_content {
		position: relative;
	}

	.select_model {
		background-color: #eee;
	}

	.select_model>img {
		box-sizing: border-box;
		border: 1px solid none;
	}

	.select_model>.active {
		border: 1px solid blue;
		box-sizing: border-box;
	}

	.lead_list {
		width: 100%;
		display: flex;
		justify-content: space-around;
	}

	.lead_list_item {
		margin: 0px 1px;
	}

	.lead_list_item>img {
		width: 100%;
	}

	.lead_list_item>p {
		width: 100%;
		height: 42px;
		line-height: 42px;
		text-align: center;
		overflow: hidden;
		text-overflow: inherit;
		white-space: nowrap;
	}

	.edit1_item_group {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.edit1_item {
		background-color: white;
		padding: 20px;
		border: 1px dashed rgba(204, 204, 204, 1);
		display: flex;
		justify-content: flex-start;
		margin-bottom: 15px;
		position: relative;
	}

	.edit1_item .swiper-slide-remove {
		background-color: rgba(0, 0, 0, 0.3);
		width: 20px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		border: none;
		color: white;
		font-size: 12px;
		position: absolute;
		right: -7.5px;
		top: -7.5px;
		border-radius: 50%;
	}

	.edit1_item .edit1_item_left {
		width: 80px;
		height: 80px;
		position: relative;
	}

	.edit1_item .edit1_item_right {
		height: 80px;
		padding-left: 20px;
		position: relative;
	}

	.edit1_item .edit1_item_left img {
		width: 80px;
		height: 80px;
	}

	.edit1_item .edit1_item_left p {
		width: 100%;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.5);
		position: absolute;
		left: 0;
		bottom: 0;
		color: white;
		cursor: pointer;
	}

	.edit1_item .edit1_item_left .edit1_item_left_change {
		position: absolute;
		z-index: 10;
		width: 315px;
		background-color: white;
	}

	.edit1_newItem {
		background-color: white;
		padding: 20px;
		border: 1px dashed rgba(204, 204, 204, 1);
		text-align: center;
		margin-bottom: 15px;
		cursor: pointer
	}

	.select_group {
		margin: 5px 0;
	}
</style>
