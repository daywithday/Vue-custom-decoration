<template>
  <div class="search_content" :style="{backgroundColor:data.titleColor,}" @click="addedit()">

    <form class="form_search" action="">
      <input type="search" class="search_text" placeholder="搜索" v-model="data.text"
             v-if="data.shape=='block'&&data.font_set=='center'" style="text-align: center;background-position: 15%;"
             :style="{backgroundColor:data.backgroundColor,color:data.fontColor,height:data.inputheight+'px',}">
      <input type="search" class="search_text" placeholder="搜索" v-model="data.text"
             v-if="data.shape=='block'&&data.font_set=='left'"
             :style="{backgroundColor:data.backgroundColor,color:data.fontColor,height:data.inputheight+'px'}">
      <input type="search" class="search_text_round" placeholder="搜索" v-model="data.text"
             v-if="data.shape=='round'&&data.font_set=='center'" style="text-align: center;background-position: 15%;"
             :style="{backgroundColor:data.backgroundColor,color:data.fontColor,height:data.inputheight+'px'}">
      <input type="search" class="search_text_round" placeholder="搜索" v-model="data.text"
             v-if="data.shape=='round'&&data.font_set=='left'"
             :style="{backgroundColor:data.backgroundColor,color:data.fontColor,height:data.inputheight+'px'}">
      <!--<div style="height: 36px;">-->
      <!--<img src="../../static/img/sousuo.png" >-->
      <!--<input type="search" >-->
      <!--</div>-->
      <!--<img src="../../static/img/sousuo.png" alt="" class="img_search">-->
    </form>
    <div class="edit2 edit" v-show="data.state == 'active'">
      <h3 class="edit_head">商品搜索</h3>
      <div class="edit_item_1" style="display: flex">
        <div class="label_dib"><label for="">搜索热词：</label></div>
        <div>
          <label class="label_dic">鼠标拖拽调整热词顺序，搜索框默认展示第一个热词，其他搜索词将以标签形式显示在搜索页中
            <a data-toggle="modal" :data-target="'#myModal'">查看示例</a></label>
          <div class="group_item">
            <div><input type="text" placeholder="请输入热词" v-model="data.text"><button @click="remove_textItem(index)" class="remove_content">X</button></div>
          </div>
          <div class="group_item"   v-for="(item,index) in data.textListL"
               v-bind:key="index" v-dragging="{ item: item, list: data.textListL, group: 'item' }" v-show="full_group">
            <div><input type="text" placeholder="请输入热词" v-model="item.title"><button @click="remove_textItem(index)" class="remove_content">X</button></div>

          </div>
            <div class="group_item" @click="add_edit1_item()" v-show="!fullList">
            <span style="text-align: center;cursor: pointer;"><a>+添加热词</a></span>
          </div>
        </div>
      </div>
      <div class="edit_item_1">
        <br>
        <h3 class="edit_head">搜索样式 ：</h3>
        <div class="group_item_2">
          <div>
            <span>方框样式：</span>
            <input type="radio" :name="'shape'" :id="'shape1'" value="block"
                   v-model='data.shape'/><label :for="'shape1'">方形</label>&#x3000;
            <input type="radio" :name="'shape'" :id="'shape2'" value="round"
                   v-model='data.shape'/><label :for="'shape2'">圆形</label>&#x3000;
          </div>
          <br>
          <div>
            <span>文字位置：</span>
            <input type="radio" :name="'font_set'" :id="'font_set1'" value="center"
                   v-model='data.font_set'/><label :for="'font_set1'">居中</label>&#x3000;
            <input type="radio" :name="'font_set'" :id="'font_set2'" value="left"
                   v-model='data.font_set'/><label :for="'font_set2'">居左</label>&#x3000;
          </div>
          <br>
          <div>
            <span>框体高度：</span> <label>高度：{{ data.inputheight }}</label>
            <input type="range" min="35" max="50" v-model.number="data.inputheight">
          </div>
          <br>
          <div>
            <div class="select_group" style="display: flex;justify-content: space-around;">
              <div style="width: 70px;">
                <span>框体颜色：</span>
              </div>
              <div style="width: calc(100% - 70px);display: flex;align-items: center;">
                <div class="color_control">
                  <div class="color_control_button" @click="showSketch1()">
                    <div :style="{backgroundColor:data.backgroundColor}">

                    </div>
                  </div>
                  <Sketch class="color_control_view" v-show="hasSketch1" v-model="backgroundColor"
                          style="display:inline-block;"></Sketch>
                </div>&#x3000;
                <button @click="clearColor1()">重置</button>
              </div>
            </div>
            <br>
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
                  <Sketch class="color_control_view" v-show="hasSketch2" v-model="fontColor"
                          style="display:inline-block;"></Sketch>
                </div>&#x3000;
                <button @click="clearColor2()">重置</button>
              </div>
            </div>
          </div>
          <br>

          <div>
            <div class="select_group" style="display: flex;justify-content: space-around;">
              <div style="width: 70px;">
                <span>背景颜色：</span>
              </div>
              <div style="width: calc(100% - 70px);display: flex;align-items: center;">
                <div class="color_control">
                  <div class="color_control_button" @click="showSketch3()">
                    <div :style="{backgroundColor:data.titleColor}">

                    </div>
                  </div>
                  <Sketch class="color_control_view" v-show="hasSketch3" v-model="titleColor"
                          style="display:inline-block;"></Sketch>
                </div>&#x3000;
                <button @click="clearColor3()">重置</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 这是 bootstrap 弹窗 里面放上列表和事件结果 对应的放入商品到 data.goodsList 即可-->
    <div class="modal fade" :id="'myModal'" tabindex="-1" role="dialog" :aria-labelledby="'myModalLabel'" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content" style="height: 650px;width: 450px">
          <div class="modal-header">
            <h4 class="modal-title" :id="'myModalLabel'">查看事例：</h4>
          </div>
          <div class="modal-body">
            <img src="https://img.yzcdn.cn/public_files/2018/04/09/c082850a5eb10919363b83751e044a8a.png" alt="事例图片" height="450px" width="300px">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">我知道了</button>
          </div>
        </div>
        <!-- /.modal-content -->
      </div>
      <!-- /.modal -->
    </div>
    <button @click="remove_content()" class="remove_content">X</button>
  </div>
</template>

<script>
  import { Sketch } from "vue-color";
  import vueDrag from 'vue-dragging';
  export default {
    name: "HelloWorld",
    data() {
      return {
        msg: "Welcome to Your Vue.js App",
        hasSketch1: false,
        hasSketch2: false,
        hasSketch3: false,
        fullList: false,
        full_group:false,
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
        titleColor: {
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
    props: ["data"],
    watch: {
      backgroundColor: {
        handler(curVal, oldVal) {
          this.hasSketch1 = false
          this.hasSketch2 = false
          this.hasSketch3 = false
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
      titleColor: {
        handler(curVal, oldVal) {
          this.hasSketch1 = false
          this.hasSketch2 = false
          this.hasSketch3 = false
          this.data.titleColor = 'rgba('+
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
          this.hasSketch3 = false
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
      add_edit1_item() {
        var that = this
        var len = that.data.textListL.length
        if(len==1&&that.full_group==false){
          that.full_group=true
        }else if(that.full_group==true&&len < 10) {
          that.data.textListL.push({
            id: len + 1,
            title:'',
          })
          that.fullList = false
        } else{
          that.fullList = true
        }
      },
      remove_textItem(n) {
        var that = this
        var len = that.data.textListL.length
        if(len > 0) {
          that.fullList = false
          that.data.textListL.splice(n, 1);
        }
      },
      showSketch1() {
        this.hasSketch1 = !this.hasSketch1
        this.hasSketch2 = false
        this.hasSketch3 = false
      },
      showSketch2() {
        this.hasSketch1 = false
        this.hasSketch2 = !this.hasSketch2
        this.hasSketch3 = false
      },
      showSketch3() {
        this.hasSketch1 = false
        this.hasSketch2 = false
        this.hasSketch3 = !this.hasSketch3
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
      clearColor3() {
        this.hasSketch3 = false
        this.titleColor = {
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
        this.data.titleColor = 'rgba(255,255,255,1)'
      },
    },

    components: {
      Sketch
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .group_item {
    border: 1px dashed rgba(204, 204, 204, 1);
    width: calc(100% - 20px);
    padding: 10px;
    margin-top: 10px;
    box-sizing: border-box;
    background-color: white;
    position: relative;
  }
  .group_item_2 {
    border: none;
    width: calc(100% - 20px);
    padding: 10px;
    margin-top: 10px;
    box-sizing: border-box;
    background-color: white;
    position: relative;
  }
  .group_item>div {
    padding-left: 20px;
    margin: 10px 0;
  }
  a{text-decoration:none}
  .search_text_round{
    border-radius:10px;
    height: 35px;
    border:1px solid lightgrey;
    background-image:url("../../static/img/sousuo.png");
    background-repeat:no-repeat;
    background-size:7% 40%;
    background-position: left;
    padding-left: 20px;
  }
  .search_text{
    height: 35px;
    border:1px solid lightgrey;
    background-image:url("../../static/img/sousuo.png");
    background-repeat:no-repeat;
    background-size:7% 40%;
    background-position: left;
    /*border-right: none;*/
    padding-left: 20px;
    /*background-position: 15%;*/
  }
  .search_content{
    width: 100%;
    height: 150px;
    position: relative;
    display: flex;
    margin: auto;
    border-bottom: 2px solid slategray;
    background-color: rgba(248, 248, 248, 1);;
  }
  .form_search{
    display: flex;
    margin: auto;
  }

  .img_search{
    height: 25px;
    border:1px solid lightgrey;
    margin-left: 0px;
    border-left: none;
    width: 25px;
  }
  .label_dib{
    width: 150px;
    margin-right: 0px;
    padding-left: 20px;}
  .label_dic {
    padding-top: 3px;
    color: slategrey;
  }


</style>
