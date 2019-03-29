<template>
  <div class="head_content">
    <div class="view_head" @click="addedit()">
      <img src="../../static/img/u408.png" style="width: 100%;">
      <h3>{{data.title}}</h3>
    </div>
    <div class="edit_title edit" v-show="data.state == 'active'">
      <form>
        <div class="input-group">
          <label for>页面名称：</label>
          <input type="text" name id value placeholder="单行输入" v-model="data.title">
        </div>
        <div class="input-group">
          <label for>页面描述：</label>
          <input type="text" name id value placeholder="用户通过微信分享是显示内容">
        </div>
        <div class="input-group">
          <label for>背景颜色：</label>&#x3000;&#x3000;
          <input
            type="radio"
            name="color"
            id="color1"
            value="1"
            v-model="data.backgroundColorStyle"
          >
          <label for="color1">默认颜色</label>&#x3000;&#x3000;
          <input
            type="radio"
            name="color"
            id="color2"
            value="2"
            v-model="data.backgroundColorStyle"
          >
          <label for="color2">自定义颜色</label>
        </div>
        <div class="input-group" v-if="data.backgroundColorStyle==2">
          <Sketch v-model="backgroundColor" style="display:inline-block"></Sketch>&#x3000;&#x3000;
          <button @click="clearColor()">重置</button>
        </div>
      </form>
      <div class="save_button">
        <button>保存</button>
        <button>取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Sketch } from "vue-color";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      backgroundColor:{
        hsl: { h: 0, s: 0, l: 1, a: 1 },
        hex: "#FFFFFF",
        hex8: "#FFFFFFFF",
        rgba: { r: 255, g: 255, b: 255, a: 1 },
        hsv: { h: 0, s: 0, v: 1, a: 1 },
        oldHue: 0,
        source: "hsva",
        a: 1
      }
      // my_data:data,
    };
  },
  watch: {
			backgroundColor: {
				handler(curVal, oldVal) {

					if(this.data.backgroundColorStyle == '1') {
						this.data.backgroundColor = '255,255,255,1'
					} else {
						this.data.backgroundColor =
							curVal.rgba.r +
							"," +
							curVal.rgba.g +
							"," +
							curVal.rgba.b +
							"," +
							curVal.rgba.a;
					}

				},
				deep: true
			}
		},
  props: ["data"],
  methods: {
    addedit() {
      this.$emit("quiet", "");
      this.data.state = "active";
    },
    clearColor() {
      this.data.backgroundColor = {
        hsl: { h: 0, s: 0, l: 1, a: 1 },
        hex: "#FFFFFF",
        hex8: "#FFFFFFFF",
        rgba: { r: 255, g: 255, b: 255, a: 1 },
        hsv: { h: 0, s: 0, v: 1, a: 1 },
        oldHue: 0,
        source: "hsva",
        a: 1
      };
    }
  },
  components: {
    Sketch
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
