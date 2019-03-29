<template>
  <div class="title_content":class="data.subtitle==''?'':'ytest'" :style="{backgroundColor:data.titleColor,}" @click="addedit()">
    <div class="div_title"
         :class="data.font_set=='div_content_center'?'div_content_center':(data.font_set=='div_content_left'?'div_content_left':'div_content_right')">
      <div>
      <h3 v-text="data.label_text" v-if="data.label_text!=''"></h3>
        <h3 v-if="data.label_text==''">点击编辑『标题』<span style="font-size: small" v-if="data.label_title!=''">-</span> <a style="font-size: small" v-if="data.label_title!=''" v-text="data.label_title"></a></h3>
      <div >

        <input type="text" v-if="data.titleset=='default'" class="label_long"
               :class="data.font_set=='div_content_center'?'subtext_input_center':(data.font_set=='div_content_left'?'subtext_input_left':'subtext_input_right')"
              v-model="data.subtitle">
        <div v-if="data.titleset=='weixin'">
          <label v-if="data.titleset=='weixin'">{{data.date}}</label>&#x3000;
          <label for="" class="label_long" v-if="data.titleset=='weixin'">{{data.author}}</label>
          &#x3000;<a for="" class="label_long" v-if="data.titleset=='weixin'"> {{data.linktitle}}</a>
        </div>
      </div>
      </div>
  </div>
    <div class="edit2 edit" v-show="data.state == 'active'">
      <h3 class="edit_head">标题</h3>
      <div class="edit_item_1" style="display: flex">
        <div class="label_dib"><label for="">标题名：</label>
      </div>
        <div class="label_dic"><input type="text" v-model="data.label_text"></div>
      </div>

        <br>
          <div>
            <span>标题模板：</span>
            <input type="radio" :name="'titleset'" :id="'titleset1'" value="default"
                   v-model='data.titleset'/><label :for="'titleset1'">传统</label>&#x3000;
            <input type="radio" :name="'titleset'" :id="'titleset2'" value="weixin"
                   v-model='data.titleset'/><label :for="'titleset2'">模仿微信图文页样式</label>&#x3000;
          </div>
          <br>
          <div>
            <span>显示位置：</span>
            <input type="radio" :name="'font_set'" :id="'font_set1'" value="div_content_center"
                   v-model='data.font_set'/><label :for="'font_set1'">居中</label>&#x3000;
            <input type="radio" :name="'font_set'" :id="'font_set2'" value="div_content_left"
                   v-model='data.font_set'/><label :for="'font_set2'">居左</label>&#x3000;
            <input type="radio" :name="'font_set'" :id="'font_set2'" value="div_content_right"
                   v-model='data.font_set'/><label :for="'font_set2'">居右</label>&#x3000;
          </div>
          <br>
      <div v-if="data.titleset=='default'">
          <div>
            <div class="edit_item_1" style="display: flex">
              <span>副标题名：</span>
            <input type="text" v-model="data.subtitle"></div>
            <br>
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
        <div class="group_item" @click="change_item()" v-show="!fullthis">
          <span style="text-align: center;cursor: pointer;"><a>+添加一个文本导航</a></span>
        </div>
        <div class="group_item" v-show="fullthis">
          <div class="flex_ground">
          <div><span>导航名称：</span>
          </div>
          <input type="text" v-model="data.label_title">
          </div>
          <div class="flex_ground">
          <div class="label_dib"><span>链接到：</span>
          </div>
            <select v-model="data.jumpUrl" class="page_select">
						<option disabled value="">选择跳转到的页面</option>
						<option v-for="(i,index) in pages" v-bind:key="index" :value="i.id">{{i.type_name}}{{i.id}}</option>
					</select>

          </div>
          <div class="modal fade" :id="'myModa2'">
            <div class="modal-dialog" style="width:1000px">
              <div class="modal-content" style="height: 650px;width:1000px">
                <div class="modal-header">
                  <h4 class="modal-title" :id="'myModalLabel'">查看事例：</h4>
                </div>
                <div class="modal-body">
                  <div id="dynamic-component-demo_1" class="demo">
                    <button
                      v-for="tab in tabs"
                      v-bind:key="tab"
                      v-bind:class="['tab-button', { active: currentTab === tab }]"
                      v-on:click="currentTab = tab"
                    >{{ tab }}</button>

                    <component
                      v-bind:is="currentTabComponent"
                      class="tab"
                    ></component>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-dismiss="modal">我知道了</button>
                </div>
              </div>
              <!-- /.modal-content -->
            </div>
            <!-- /.modal -->
          </div>
          <button @click="change_item()" class="remove_content">X</button>
        </div>
      </div>
      <div v-if="data.titleset=='weixin'">
        <div>
        <div class="edit_item_1" style="display: flex">
          <span>&#x3000;&#x3000;日期：</span>
          <input type="date" v-model="data.date"></div>
        <br>
        <div class="edit_item_1" style="display: flex">
          <span>&#x3000;&#x3000;作者：</span>
          <input type="text" v-model="data.author"></div>
        <br>
        <div class="edit_item_1" style="display: flex">
          <span>链接标题：</span>
          <input type="text" v-model="data.linktitle"></div>
        </div>
        <div class="edit_item_1" style="display: flex">
          <span>链接地址：</span>
          <input type="radio" :name="'linkset'" :id="'linkset1'" value="linkset1"
                 v-model='data.linkset'/><span :for="'linkset1'">引导关注:</span>&#x3000;
          <a style="cursor:pointer;text-decoration: none">设置快速关注链接</a>
        </div>
          <div class="edit_item_1" style="display: flex">&#x3000;&#x3000;&#x3000;&#x3000;&#x3000;
          <input type="radio" :name="'linkset'" :id="'linkset2'" value="linkset2"
                 v-model='data.linkset'/><span :for="'linkset2'">其他链接:</span>&nbsp;&nbsp;
            <select v-model="data.jumpUrl" class="page_select">
						<option disabled value="">选择跳转到的页面</option>
						<option v-for="(i,index) in pages" v-bind:key="index" :value="i.id">{{i.type_name}}{{i.id}}</option>
					</select>
          </div>
        <div class="modal fade" :id="'myModal'">
          <div class="modal-dialog">
            <div class="modal-content" style="height: 650px;width: 450px">
              <div class="modal-header">
                <h4 class="modal-title" :id="'myModalLabel'">查看事例：</h4>
              </div>
              <div class="modal-body">
                <div id="dynamic-component-demo" class="demo">
                  <button
                    v-for="tab in tabs"
                    v-bind:key="tab"
                    v-bind:class="['tab-button', { active: currentTab === tab }]"
                    v-on:click="currentTab = tab"
                  >{{ tab }}</button>

                  <component
                    v-bind:is="currentTabComponent"
                    class="tab"
                  ></component>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">我知道了</button>
              </div>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal -->
        </div>
      </div>
    </div>

    <button @click="remove_content()" class="remove_content">X</button>
  </div>
</template>
<script>

  import Vue from "vue";
  import { Sketch } from "vue-color";
  export default {

    name: "HelloWorld",
    data() {
      return {

        currentTab: 'Home',
        tabs: ['Home', 'Posts', 'Archive'],
        msg: "Welcome to Your Vue.js App",
        hasSketch3: false,
        fullthis: false,
        full_group:false,
        columeTypeArr:[{
          value:'String',
          label:'字符串'
        },{
          value:'Int',
          label:'整数',
        },{
          value:'Decimal',
          label:'数值型'
        }],
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
    computed: {
      currentTabComponent: function () {
        return 'tab-' + this.currentTab.toLowerCase()
      }
    },

    props: ["data","pages"],
    watch: {
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
    },
    mounted() {

    },

    methods: {
      restore(){
        var that=this;
        that.data.botton_text='选择跳转的页面'
        that.data.botton_value=''
        that.data.botton_link=''
      },
      restore_one(){
        var that=this;
        that.data.botton_text_one='选择跳转的页面'
        that.data.botton_value_one=''
        that.data.botton_link_one=''
      },
      addlink(){
        var that=this;
      window.open('http://'+that.data.botton_link,'_blank')},
      linktext(text,link){
        var that=this;
        that.data.botton_text='修改'
        that.data.botton_value=text
        that.data.botton_link=link
      },
      addlink_one(){
        var that=this;
        window.open('http://'+that.data.botton_link_one,'_blank')},
      linktext_one(text,link){
        var that=this;
        that.data.botton_text_one='修改'
        that.data.botton_value_one=text
        that.data.botton_link_one=link
      },
      addedit() {
        this.$emit('quiet', '')
        this.data.state = 'active'
      },
      remove_content() {
        this.$emit('remove', '')
      },
      change_item(){
       this.fullthis=!this.fullthis
      },
      remove_textItem(n) {
        var that = this
        var len = that.data.textListL.length
        if(len > 0) {
          that.fullList = false
          that.data.textListL.splice(n, 1);
        }
      },
      showSketch3() {
        this.hasSketch3 = !this.hasSketch3
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
      Sketch,
//      'tab-home':tabhome,
//      'tab-posts':tabposts,
//      'tab-archive':tabarchive
    },

  };
//  var tabhome = { template: '<div>Home component</div>'}
//  var tabposts = {template: '<div>Posts component</div>'}
//  var tabarchive = { template: '<div>Archive component</div>'}
  Vue.component('tab-home', {
    template: `<div>
    <button style="margin-right: 10px">新建</button>
    <button style="margin-right: 10px">草稿管理</button>
    <button style="margin-right: 10px">刷新</button>
      <input type="search" style="border:1px solid lightgrey;background-image:url(../../static/img/sousuo.png);background-repeat:no-repeat;background-size:9% 50%;background-position: left;padding-left: 20px;position:absolute; right:20px; ">
    </div>`
  })
  Vue.component('tab-posts', {
    template: '<div>Posts component</div>'
  })
  Vue.component('tab-archive', {
    template: '<div>Archive component</div>'
  })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #liangjie:after{
    content:"X";
    display: block;
    width: 100px;
    height: 100px;
  }
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
  .title_content{
    width: 100%;
    height:auto;
    position: relative;
    display: flex;
    margin: auto;
    border: 1px dashed blue;
    background-color: rgba(248, 248, 248, 1);;
  }
  .div_content_left{
    padding-top: 10px;
    margin: auto 0;
  }
  .div_content_center{
    padding-top: 10px;
    margin: auto;
    }
  .div_content_right{
    padding-top: 10px;
    margin: auto 0 auto auto;
  }

  .img_search{
    height: 25px;
    border:1px solid lightgrey;
    margin-left: 0px;
    border-left: none;
    width: 25px;
  }
  .label_dib{
    width: 80px;
    margin-right: 0px;
    padding-left: 20px;
    margin-top: 5px;
  }
  .label_dic {
    padding-top: 6px;
  }
.ytest{
  height:auto;
}
.subtext_input_right{
  margin:auto;
  direction: rtl;
  border-style:none none none none;
  background-color:transparent;
}
  .subtext_input_left{
    border-style:none none none none;
    background-color:transparent;
      margin:auto;
    }
  .subtext_input_center{
    border-style:none none none none;
    background-color:transparent;
    text-align: center;
    margin:auto;
  }
  .flex_ground{
    display: flex;
  }
  input[type=date]::-webkit-inner-spin-button { visibility: hidden; }
  /*.label_long{ white-space: inherit;width: inherit; }*/
  .label_long{word-wrap: break-word; word-break: normal;width:auto;
    word-break:break-all;
    overflow: hidden;}
  .tab-button {
    padding: 6px 10px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border: 1px solid #ccc;
    cursor: pointer;
    background: #f0f0f0;
    margin-bottom: -1px;
    margin-right: -1px;
  }
  .tab-button:hover {
    background: #e0e0e0;
  }
  .tab-button.active {
    background: #e0e0e0;
  }
  .tab {
    border: 1px solid #ccc;
    padding: 10px;
  }
  .span:hover{
    text-decoration: none;
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
  /*.posts-tab {*/
    /*display: flex;*/
  /*}*/
  /*.posts-sidebar {*/
    /*max-width: 40vw;*/
    /*margin: 0;*/
    /*padding: 0 10px 0 0;*/
    /*list-style-type: none;*/
    /*border-right: 1px solid #ccc;*/
  /*}*/
  /*.posts-sidebar li {*/
    /*white-space: nowrap;*/
    /*text-overflow: ellipsis;*/
    /*overflow: hidden;*/
    /*cursor: pointer;*/
  /*}*/
  /*.posts-sidebar li:hover {*/
    /*background: #eee;*/
  /*}*/
  /*.posts-sidebar li.selected {*/
    /*background: lightblue;*/
  /*}*/
  /*.selected-post-container {*/
    /*padding-left: 10px;*/
  /*}*/
  /*.selected-post > :first-child {*/
    /*margin-top: 0;*/
    /*padding-top: 0;*/
  /*}*/
</style>
