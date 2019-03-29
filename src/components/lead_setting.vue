<template>
	<div class="lead_tool_content">
		<div @click="addedit()" class="text_content">
			<div class="lead_list">
				<div class="lead_list_item" v-for="(item,index) in data.leadList" v-bind:key="index">
					<img :src="item.imgUrl" />
					<p>{{item.title}}</p>
				</div>
			</div>
		</div>

		<div class="edit3 edit" v-show="data.state == 'active'">
			<h3 class="edit_head">图文导航</h3>
			<div class="edit3_control">
				<div class="select_group">
					<span>选择模板：</span>
					<div>
						<img src="../../static/img/img_lead.png" />
						<img src="../../static/img/font_lead.png" />
					</div>
				</div>
				<div class="select_group">
					<span>滑动设置：</span>
					<div>
						<input type="radio" name="slideSetting" id="slideSetting1" value="1" /><label for="slideSetting1">固定</label>
						<input type="radio" name="slideSetting" id="slideSetting2" value="2" /><label for="slideSetting2">横向滑动</label>
					</div>
				</div>
				<div class="select_group">
					<span>背景颜色：</span>
					<div>
						<div class="color_control">
							<div class="color_control_button" @click="showSketch()">
								<div :style="{backgroundColor:'rgba('+data.backgroundColor+')'}">

								</div>
							</div>
							<Sketch class="color_control_view" v-show="hasSketch1" v-model="backgroundColor" style="display:inline-block;"></Sketch>
						</div>
						<button @click="clearColor()">重置</button>
					</div>
				</div>
				<div class="select_group">
					<span>文字颜色：</span>
					<div>
						<div class="color_control">
							<div class="color_control_button" @click="showSketch()">
								<div :style="{backgroundColor:'rgba('+data.backgroundColor+')'}">

								</div>
							</div>
							<Sketch class="color_control_view" v-show="hasSketch1" v-model="backgroundColor" style="display:inline-block;"></Sketch>
						</div>
						<button @click="clearColor()">重置</button>
					</div>
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
			};
		},
		props: ["data"],
		watch: {
			backgroundColor: {
				handler(curVal, oldVal) {

					this.data.backgroundColor =
						curVal.rgba.r +
						"," +
						curVal.rgba.g +
						"," +
						curVal.rgba.b +
						"," +
						curVal.rgba.a;

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
			showSketch() {
				this.hasSketch1 = !this.hasSketch1
			},
			clearColor() {
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
				this.data.backgroundColor = '255,255,255,1'
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

</style>