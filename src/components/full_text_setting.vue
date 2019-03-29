<template>
	<div class="full_text_content" :style="{padding:data.fullScreen?'':'10px'}">
		<div v-html="text" @click="addedit()" class="text_content" :style="{backgroundColor:'rgba('+data.backgroundColor+')'}">
			
		</div>
		<div class="edit2 edit" v-show="data.state == 'active'">
			<h3 class="edit_head">富文本</h3>
			<div class="edit2_control1">
				<span>背景颜色：</span>

				<div class="color_control">
					<div class="color_control_button" @click="showSketch()">
						<div :style="{backgroundColor:'rgba('+data.backgroundColor+')'}">

						</div>
					</div>
					<Sketch class="color_control_view" v-show="hasSketch" v-model="backgroundColor" style="display:inline-block;"></Sketch>
				</div>

				<button @click="clearColor()">重置</button>
				<span>是否全屏:</span>
				<input type="checkbox" name="fullscreen" id="fullscreen" value="" v-model="data.fullScreen" /><label for="fullscreen">是否全屏</label>
			</div>

			<div class="edit2_control2">
				<script :id="randomId" type="text/plain"></script>
			</div>

			<span style="color: gray;">小程序富文本展示以实际效果为准，左侧预览仅供参考</span>
			
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
				hasSketch: false,
				text: '<img draggable="false" v-if="text" src="../../static/img/u1834.png" style="width: 100%;height: 360px;display: inline-block;"/>',
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
				
				backgroundImg: '../../static/img/u1834.png',
				//每个编辑器生成不同的id,以防止冲突
				randomId: 'editor_ ' + (Math.random() * 100000000000000000),
				// my_data:data,
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
			var that = this
			that.initEditor()
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
				this.hasSketch = !this.hasSketch
			},
			initEditor() {
				//dom元素已经挂载上去了
				this.$nextTick(() => {
					this.instance = UE.getEditor(this.randomId, this.ueditorConfig);

					this.instance.addListener('contentChange', () => {
						this.text = this.instance.getContent();
						this.data.text = this.instance.getContent();
						if (!this.text) {
							this.text = '<img draggable="false" v-if="text" src="../../static/img/u1834.png" style="width: 100%;height: 360px;display: inline-block;"/>'
						}
					});

				});
			},
			clearColor() {
				this.hasSketch = false
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
			}
		},
		components: {
			Sketch
		},
		beforeDestroy() {
			// 组件销毁的时候，要销毁 UEditor 实例
			if(this.instance !== null && this.instance.destroy) {
				this.instance.destroy();
			}
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>