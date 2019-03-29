<template>
	<div class="full_text_content">
		<div @click="addedit()" class="text_content" :style="{backgroundColor:data.backgroundColor,color:data.Color,fontSize:data.fontSize,borderBottom:data.underline+'px solid #f7f7f7',textAlign:data.textAlign}">
			{{data.text}}
		</div>

		<div class="edit2 edit" v-show="data.state == 'active'">
			<h3 class="edit_head">文本</h3>
			<div class="my_text">
				<label for=""><span style="color: red;">*</span>文本：</label>
				<textarea placeholder="请输入要说明的文字, 最多100字" maxlength="100" v-model="data.text"></textarea>
			</div>
			<div class="my_radio">
				<label for="">文字大小：</label>
				<div>
					<input type="radio" :name="'fontSize'+randomId" :id="'fontSize1'+randomId" value="18px" v-model='data.fontSize' /><label :for="'fontSize1'+randomId">大</label>&#x3000;
					<input type="radio" :name="'fontSize'+randomId" :id="'fontSize2'+randomId" value="14px" v-model='data.fontSize' /><label :for="'fontSize2'+randomId">中</label>&#x3000;
					<input type="radio" :name="'fontSize'+randomId" :id="'fontSize3'+randomId" value="12px" v-model='data.fontSize' /><label :for="'fontSize3'+randomId">小</label>

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
							<div :style="{backgroundColor:data.Color}">

							</div>
						</div>
						<Sketch class="color_control_view" v-show="hasSketch2" v-model="fontColor" style="display:inline-block;"></Sketch>
					</div>&#x3000;
					<button @click="clearColor2()">重置</button>
				</div>
			</div>

			<div class="my_radio">
				<label for="">显示位置：</label>
				<div>
					<input type="radio" :name="'textAlign'+randomId" :id="'textAlign1'+randomId" value="left" v-model='data.textAlign' /><label :for="'textAlign1'+randomId">居左</label>&#x3000;
					<input type="radio" :name="'textAlign'+randomId" :id="'textAlign2'+randomId" value="center" v-model='data.textAlign' /><label :for="'textAlign2'+randomId">居中</label>&#x3000;
					<input type="radio" :name="'textAlign'+randomId" :id="'textAlign3'+randomId" value="right" v-model='data.textAlign' /><label :for="'textAlign3'+randomId">居右</label>

				</div>
			</div>
			<div style="padding: 20px;">
				<label for>链接：</label>

				<!--<input type="text" v-model="item.jumpUrl">-->

				<div style="display: inline-block;position: relative;">
					<select v-model="data.jumpUrl" class="page_select">
						<option disabled value="">选择跳转到的页面</option>
						<option v-for="(i,index) in pages" v-bind:key="index" :value="i.id">{{i.type_name}}{{i.id}}</option>
					</select>
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
					this.data.backgroundColor = 'rgba(' +
						curVal.rgba.r +
						"," +
						curVal.rgba.g +
						"," +
						curVal.rgba.b +
						"," +
						curVal.rgba.a + ')';

				},
				deep: true
			},
			fontColor: {

				handler(curVal, oldVal) {
					this.hasSketch1 = false
					this.hasSketch2 = false
					this.data.Color = 'rgba(' +
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
	.text_content {
		width: 100%;
		min-height: 30px;
		border: 1px dotted black;
		cursor: pointer;
		padding: 10px 20px;
		word-wrap: break-word;
		word-break: break-all;
		overflow: hidden;
		position: relative;
	}
	/*.text_content:after {
		content: ">";
		position: absolute;
		right: 10px;
		top: calc(50% - 10px);
	}*/
	
	.my_text {
		padding: 20px 20px;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.my_radio{
		padding: 20px 20px;
	}
	.my_radio>div{
		display: inline-block;
	}.my_radio>label {
	}
	.my_text>label {
		margin-right: 20px;
	}
	.select_group{
		padding: 20px 20px;
	}
	.my_text>textarea {
		margin: 0px;
		height: 128px;
		min-width: 250px;
		max-width: 280px;
	}
</style>