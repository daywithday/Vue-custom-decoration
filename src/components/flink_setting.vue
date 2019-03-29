<template>
  <div class="title_content" @click="addedit()">
    <div class="div_title" style="height:auto;width: 100%">
      <div
        v-for="(item,index3) in data.textListL"
        v-bind:key="'info3-'+index3"
        v-dragging="{ item: item, list: data.textListL, group: 'item' }"
      >
        <div v-if="item.link_type!=='微页面'&&item.link_type!=='商品分组'">
          <div style="height: 30px;border-bottom: 1px solid #ccc" v-if="item.link_type=='外链'">
            <h5 style="text-align: center;padding-top:8px">{{item.botton_value_one}}</h5>
          </div>
          <div style="height: 30px;border-bottom: 1px solid #ccc" v-if="item.link_type!=='外链'">
            <h5 style="text-align: center;padding-top:8px">点击编辑第一条关联链接</h5>
          </div>
          <div style="height: 30px;border-bottom: 1px solid #ccc" v-if="item.link_type!=='外链'">
            <h5 style="text-align: center;padding-top:8px">点击编辑第二条关联链接</h5>
          </div>
          <div style="height: 30px;border-bottom: 1px solid #ccc" v-if="item.link_type!=='外链'">
            <h5 style="text-align: center;padding-top:8px">点击编辑第三条关联链接</h5>
          </div>
        </div>
        <div v-if="item.link_type=='微页面'">
          <div style="height: 30px;border-bottom: 1px solid #ccc" v-if="item.link_type!=='外链'">
            <h5 style="text-align: center;padding-top:8px">第一条{{item.botton_value_one}}关联链接</h5>
          </div>
          <div
            style="height: 30px;border-bottom: 1px solid #ccc"
            v-if="item.link_type!=='外链'"
            v-show="item.wei_num_link >'1'"
          >
            <h5 style="text-align: center;padding-top:8px">第二条{{item.botton_value_one}}关联链接</h5>
          </div>
          <div
            style="height: 30px;border-bottom: 1px solid #ccc"
            v-if="item.link_type!=='外链'"
            v-show="item.wei_num_link >'2'"
          >
            <h5 style="text-align: center;padding-top:8px">第三条{{item.botton_value_one}}关联链接</h5>
          </div>
          <div
            style="height: 30px;border-bottom: 1px solid #ccc"
            v-if="item.link_type!=='外链'"
            v-show="item.wei_num_link >'3'"
          >
            <h5 style="text-align: center;padding-top:8px">第四条{{item.botton_value_one}}关联链接</h5>
          </div>
          <div
            style="height: 30px;border-bottom: 1px solid #ccc"
            v-if="item.link_type!=='外链'"
            v-show="item.wei_num_link >'4'"
          >
            <h5 style="text-align: center;padding-top:8px">第五条{{item.botton_value_one}}关联链接</h5>
          </div>
        </div>
        <div v-if="item.link_type=='商品分组'">
          <div style="height: 30px;border-bottom: 1px solid #ccc" v-if="item.link_type!=='外链'">
            <h5 style="text-align: center;padding-top:8px">第一条{{item.botton_value_one}}的关联链接</h5>
          </div>
          <div
            style="height: 30px;border-bottom: 1px solid #ccc"
            v-if="item.link_type!=='外链'"
            v-show="item.wei_num_link >'1'"
          >
            <h5 style="text-align: center;padding-top:8px">第二条{{item.botton_value_one}}的关联链接</h5>
          </div>
          <div
            style="height: 30px;border-bottom: 1px solid #ccc"
            v-if="item.link_type!=='外链'"
            v-show="item.wei_num_link >'2'"
          >
            <h5 style="text-align: center;padding-top:8px">第三条{{item.botton_value_one}}的关联链接</h5>
          </div>
          <div
            style="height: 30px;border-bottom: 1px solid #ccc"
            v-if="item.link_type!=='外链'"
            v-show="item.wei_num_link >'3'"
          >
            <h5 style="text-align: center;padding-top:8px">第四条{{item.botton_value_one}}的关联链接</h5>
          </div>
          <div
            style="height: 30px;border-bottom: 1px solid #ccc"
            v-if="item.link_type!=='外链'"
            v-show="item.wei_num_link >'4'"
          >
            <h5 style="text-align: center;padding-top:8px">第五条{{item.botton_value_one}}的关联链接</h5>
          </div>
        </div>
      </div>

      <div
        v-for="(item,index2) in data.textListL"
        v-bind:key="'info2-'+index2"
        v-dragging="{ item: item, list: data.textListL, group: 'item' }"
        v-if="item.link_type=='微页面'"
      >
        <div style="height: 30px;border-bottom: 1px solid #ccc" v-if="item.link_type=='外链'">
          <h5 style="text-align: center;padding-top:8px">{{item.botton_value_one}}</h5>
        </div>
      </div>
    </div>
    <div class="edit2 edit" v-show="data.state == 'active'">
      <h3 class="edit_head">关联链接</h3>
      <div class="edit_item_1">
        <div>
          <div
            class="group_item"
            v-for="(item,index) in data.textListL"
            v-bind:key="'info-'+index"
            v-dragging="{ item: item, list: data.textListL, group: 'item' }"
            v-show="full_group"
          >
            <span style="color:red">*</span>
            <label>内容来源：</label>
            <input
              type="button"
              v-if="item.botton_value_one!==''"
              v-model="item.link_type+' | '+item.botton_value_one"
              style="border: 1px solid cornflowerblue; width: 180px;background:aliceblue;"
              @click="addlink_one()"
            >
            <a
              data-toggle="dropdown"
              href="#"
              :data-target="'#aaa'"
              class="dropdown"
              style="text-decoration: none"
            >
              <span
                v-if="item.botton_value_one!==''||item.link_type=='微页面'"
                @click="restore_one(index)"
              >x</span>
              <input
                class="dropdown-toggle subtext_input_left"
                type="button"
                data-toggle="dropdown"
                v-model="item.botton_text_one"
              >
              <!--选择跳转到的页面-->
              <span class="caret" data-toggle="dropdown"></span>
              <ul
                class="dropdown-menu"
                style="height:100px;overflow:scroll;overflow-x: hidden; overflow-y: auto;"
              >
                <li role="presentation">
                  <a data-toggle="modal" :data-target="'#myModa1'+[index]">微页面分类</a>
                </li>
                <li role="presentation">
                  <a data-toggle="modal" :data-target="'#myModa2'+[index]">商品分组</a>
                </li>
                <li role="presentation">
                  <a data-toggle="modal" :data-target="'#myModa3'+[index]">自定义链接</a>
                </li>
              </ul>
              <div v-if="item.link_type=='外链'" style="margin-top:5px; ">
                &#x3000;
                <label style="color: black">链接名称：</label>
                <input type="text" v-model="item.botton_value_one">
              </div>
              <div v-if="item.link_type=='外链'" style="margin-top:5px; ">
                &#x3000;
                <label style="color: black">链接地址：</label>
                <input type="text" v-model="item.link_address">
              </div>
            </a>
            <div v-if="item.link_type=='微页面'||item.link_type=='商品分组'">
              <label>链接条数：</label>
              <select style="width: 100px" v-model="item.wei_num_link">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <button @click="remove_textItem(index)" class="remove_content">X</button>
            <div class="modal fade" :id="'myModa1'+[index]">
              <div class="modal-dialog">
                <div class="modal-content" style="height:auto;width:800px">
                  <div class="modal-header">
                    <h4 class="modal-title" :id="'myModalLabel'">微页面分类：</h4>
                  </div>
                  <div class="modal-body">
                    <div id="dynamic-component-demo_1" class="demo">
                      <div>
                        <button
                          style="margin-right: 10px;background:none;border: 1px solid #ccc"
                        >分类管理</button>
                        <button
                          style="margin-right: 10px;background:none;border: 1px solid #ccc"
                          @click="remove_set()"
                        >刷新</button>
                        <input
                          type="search"
                          v-model="data.searchVal"
                          style="border:1px solid lightgrey;background-image:url(../../static/img/sousuo.png);background-repeat:no-repeat;background-size:9% 50%;background-position: left;padding-left: 20px;position:absolute; right:20px; "
                        >
                      </div>
                      <div
                        style="height: 80px;width: 750px;background-color:silver;border-top:1px solid slategray;margin-top:10px;"
                      >
                        <span style="line-height:80px;">标题</span>
                        <span style="margin-left: 600px">创建时间</span>
                      </div>
                      <div v-for="(item,index1) in list" v-bind:key="'info1-'+index1">
                        <div
                          style="height: 80px;width: 750px;border-top:1px solid slategray;line-height:80px;"
                        >
                          <input
                            type="radio"
                            name="link_type"
                            v-model="data.textListL[index].weitype_name"
                            :value="item.type_name"
                          >
                          <a href>{{item.type_name}}</a>
                          <span style="float:right;align">{{data.nowTime}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="weilink_save(item.mylink,index)"
                    >保存</button>
                    <button type="button" class="btn btn-deault" data-dismiss="modal">取消</button>
                  </div>
                </div>
                <!-- /.modal-content -->
              </div>
              <!-- /.modal -->
            </div>
            <div class="modal fade" :id="'myModa2'+[index]">
              <div class="modal-dialog">
                <div class="modal-content" style="height:auto;width:800px">
                  <div class="modal-header">
                    <h4 class="modal-title" :id="'myModalLabel'">微页面分类：</h4>
                  </div>
                  <div class="modal-body">
                    <div id="dynamic-component-demo_2" class="demo">
                      <div>
                        <button
                          style="margin-right: 10px;background:none;border: 1px solid #ccc"
                        >管理分组</button>
                        <button style="margin-right: 10px;background:none;border: 1px solid #ccc">刷新</button>
                        <input
                          type="search"
                          v-model="data.searchVal_goods"
                          style="border:1px solid lightgrey;background-image:url(../../static/img/sousuo.png);background-repeat:no-repeat;background-size:9% 50%;background-position: left;padding-left: 20px;position:absolute; right:20px; "
                        >
                      </div>
                      <div
                        style="height: 80px;width: 750px;background-color:silver;border-top:1px solid slategray;margin-top:10px;"
                      >
                        <span style="line-height:80px;">标题</span>
                        <span style="margin-left: 600px">创建时间</span>
                      </div>
                      <div v-for="(item,index4) in list_goods" v-bind:key="'info4-'+index4">
                        <div
                          style="height: 80px;width: 750px;border-top:1px solid slategray;line-height:80px;"
                        >
                          <input
                            type="radio"
                            name="link_type2"
                            v-model="data.textListL[index].goodstype_name"
                            :value="item.type_name"
                          >
                          <a>{{item.type_name}}</a>
                          <span style="float:right;align">{{data.nowTime}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="goodslink_save(item.mylink,index)"
                    >保存</button>
                    <button type="button" class="btn btn-deault" data-dismiss="modal">取消</button>
                  </div>
                </div>
                <!-- /.modal-content -->
              </div>
              <!-- /.modal -->
            </div>
            <div class="modal fade" :id="'myModa3'+[index]">
              <div class="modal-dialog">
                <div class="modal-content" style="height:auto;width:auto">
                  <div class="modal-header">
                    <h4 class="modal-title" :id="'myModalLabel'">自定义链接：</h4>
                  </div>
                  <div class="modal-body">
                    <div id="dynamic-component-demo_3" class="demo">
                      链接地址：
                      <input type="text" placeholder="http://" v-model="item.mylink">
                      <span style="color: red" v-show="item.mylink==''">请输入链接</span>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="mylink_save(item.mylink,index)"
                    >保存</button>
                    <button type="button" class="btn btn-deault" data-dismiss="modal">取消</button>
                  </div>
                </div>
                <!-- /.modal-content -->
              </div>
              <!-- /.modal -->
            </div>
          </div>

          <div class="group_item" @click="add_edit1_item()">
            <span style="text-align: center;cursor: pointer;">
              <a>+添加热词</a>
            </span>
          </div>
          <button @click="remove_content()" class="remove_content">X</button>
        </div>
      </div>
    </div>
    <button @click="remove_content()" class="remove_content">X</button>
    <div class="toast" v-show="toastShow">{{toastText}}</div>
  </div>
</template>
<script>
import Vue from "vue";
import { Sketch } from "vue-color";
export default {
  name: "HelloWorld",
  data() {
    return {
      nowTime: "",
      currentTab: "Home",
      toastShow: false,
      toastText: "",
      tabs: ["Home", "Posts", "Archive"],
      msg: "Welcome to Your Vue.js App",
      hasSketch3: false,
      fullthis: false,
      full_group: false,
      columeTypeArr: [
        {
          value: "String",
          label: "字符串"
        },
        {
          value: "Int",
          label: "整数"
        },
        {
          value: "Decimal",
          label: "数值型"
        }
      ]
    };
  },
  computed: {
    currentTabComponent: function() {
      return "tab-" + this.currentTab.toLowerCase();
    },
    list: function() {
      //搜索功能
      var _this = this;
      //逻辑-->根据input的value值筛选List中的数据
      var arrByZM = []; //声明一个空数组来存放数据
      for (var i = 0; i < _this.data.typeListL.length; i++) {
        //for循环数据中的每一项（根据name值）
        if (
          _this.data.typeListL[i].type_name.search(_this.data.searchVal) != -1
        ) {
          //判断输入框中的值是否可以匹配到数据，如果匹配成功
          arrByZM.push(_this.data.typeListL[i]);
          //向空数组中添加数据
        }
      }
      return arrByZM;
    },
    list_goods: function() {
      //搜索功能
      var _this = this;
      //逻辑-->根据input的value值筛选List中的数据
      var arrByZM = []; //声明一个空数组来存放数据
      for (var i = 0; i < _this.data.typegoods_ListL.length; i++) {
        //for循环数据中的每一项（根据name值）
        if (
          _this.data.typegoods_ListL[i].type_name.search(
            _this.data.searchVal_goods
          ) != -1
        ) {
          //判断输入框中的值是否可以匹配到数据，如果匹配成功
          arrByZM.push(_this.data.typegoods_ListL[i]);
          //向空数组中添加数据
        }
      }
      return arrByZM;
    }
  },

  props: ["data"],
  mounted() {},
  created() {
    this.timeFormate(new Date());
  },
  methods: {
    toast(str) {
      let v = this;
      v.toastText = str;
      v.toastShow = true;
      setTimeout(function() {
        v.toastShow = false;
      }, 1500);
    },
    remove_set(index) {
      $("#myModa1" + [index]).removeData("modal");
    },
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      this.data.nowTime =
        year + "年" + month + "月" + date + "日" + " " + hh + ":" + mm;
    },
    mylink_save(text, index) {
      //自定义链接保存事件
      var that = this;
      if (text == "") {
        that.toast('请输入链接')

      } else {
        that.data.textListL[index].botton_text_one = "修改";
        that.data.textListL[index].botton_value_one = text;
        that.data.textListL[index].link_type = "外链";
        that.data.textListL[index].link_address =
          "http://" + that.data.textListL[index].botton_value_one;
        $("#myModa3" + [index]).modal("hide");
      }
    },
    weilink_save(text, index) {
      //微页面链接保存事件
      var that = this;
      if (that.data.textListL[index].weitype_name == "") {
        that.toast('请选择类型')

      } else {
        that.data.textListL[index].botton_text_one = "修改";
        that.data.textListL[index].botton_value_one =
          that.data.textListL[index].weitype_name;
        that.data.textListL[index].link_type = "微页面";
        $("#myModa1" + [index]).modal("hide");
      }
    },
    goodslink_save(text, index) {
      //商品分组页面链接保存事件
      var that = this;
      if (that.data.typegoods_ListL[index].goodstype_name == "") {
        that.toast('请选择类型')
      } else {
        that.data.textListL[index].botton_text_one = "修改";
        that.data.textListL[index].botton_value_one =
          that.data.textListL[index].goodstype_name;
        that.data.textListL[index].link_type = "商品分组";
        $("#myModa2" + [index]).modal("hide");
      }
    },
    restore_one(index) {
      var that = this;
      that.data.textListL[index].botton_text_one = "选择跳转的页面";
      that.data.textListL[index].botton_value_one = "";
      that.data.textListL[index].botton_link_one = "";
      that.data.textListL[index].link_type = "";
      that.data.textListL[index].weitype_name = "";
    },

    linktext_one(text, link, index) {
      var that = this;
      that.data.textListL[index].botton_text_one = "修改";
      that.data.textListL[index].botton_value_one = text;
      that.data.textListL[index].botton_link_one = link;
    },
    add_edit1_item() {
      var that = this;
      var len = that.data.textListL.length;
      if (len == 1 && that.full_group == false) {
        that.full_group = true;
      } else if (that.full_group == true && len < 10) {
        that.data.textListL.push({
          id: len + 1,
          title: "",
          botton_text_one: "选择跳转的页面",
          botton_value_one: "",
          botton_link_one: "",
          mylink: "",
          link_type: "",
          link_address: "",
          weitype_name: "",
          wei_num_link: "3",
          goodstype_name: ""
        });
      } else {
      }
    },
    remove_textItem(n) {
      var that = this;
      var len = that.data.textListL.length;
      if (len > 0) {
        that.data.textListL.splice(n, 1);
      }
    },
    addedit() {
      this.$emit("quiet", "");
      this.data.state = "active";
    },
    remove_content() {
      this.$emit("remove", "");
    },
    change_item() {
      this.fullthis = !this.fullthis;
    },
    remove_textItem(n) {
      var that = this;
      var len = that.data.textListL.length;
      if (len > 0) {
        that.data.textListL.splice(n, 1);
      }
    },
    showSketch3() {
      this.hasSketch3 = !this.hasSketch3;
    },
    clearColor3() {
      this.hasSketch3 = false;
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
      };
      this.data.titleColor = "rgba(255,255,255,1)";
    }
  },
  components: {
    Sketch
    //      'tab-home':tabhome,
    //      'tab-posts':tabposts,
    //      'tab-archive':tabarchive
  }
};
//  var tabhome = { template: '<div>Home component</div>'}
//  var tabposts = {template: '<div>Posts component</div>'}
//  var tabarchive = { template: '<div>Archive component</div>'}
Vue.component("tab-home", {
  template: `<div>
    <button style="margin-right: 10px">新建</button>
    <button style="margin-right: 10px">草稿管理</button>
    <button style="margin-right: 10px">刷新</button>
      <input type="search" style="border:1px solid lightgrey;background-image:url(../../static/img/sousuo.png);background-repeat:no-repeat;background-size:9% 50%;background-position: left;padding-left: 20px;position:absolute; right:20px; ">
    </div>`
});
Vue.component("tab-posts", {
  template: "<div>Posts component</div>"
});
Vue.component("tab-archive", {
  template: "<div>Archive component</div>"
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#liangjie:after {
  content: "X";
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
.toast {
  position: fixed;
  z-index: 2000;
  left: 50%;
  top: 45%;
  transition: all 0.5s;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  -o-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  border-radius: 5px;
  color: #fff;
  background: rgba(17, 17, 17, 0.7);
  height: 45px;
  line-height: 45px;
  padding: 0 15px;
  max-width: 300px;
}
.group_item > div {
  padding-left: 20px;
  margin: 10px 0;
}
.title_content {
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  margin: auto;
  border: 1px dashed blue;
  background-color: rgba(248, 248, 248, 1);
}
.div_content_left {
  padding-top: 10px;
  margin: auto 0;
}
.div_content_center {
  padding-top: 10px;
  margin: auto;
}
.div_content_right {
  padding-top: 10px;
  margin: auto 0 auto auto;
}

.img_search {
  height: 25px;
  border: 1px solid lightgrey;
  margin-left: 0px;
  border-left: none;
  width: 25px;
}
.label_dib {
  width: 80px;
  margin-right: 0px;
  padding-left: 20px;
  margin-top: 5px;
}
.label_dic {
  padding-top: 6px;
}
.ytest {
  height: auto;
}
.subtext_input_right {
  margin: auto;
  direction: rtl;
  border-style: none none none none;
  background-color: transparent;
}
.subtext_input_left {
  border-style: none none none none;
  background-color: transparent;
  margin: auto;
}
.subtext_input_center {
  border-style: none none none none;
  background-color: transparent;
  text-align: center;
  margin: auto;
}
.flex_ground {
  display: flex;
}
input[type="date"]::-webkit-inner-spin-button {
  visibility: hidden;
}
/*.label_long{ white-space: inherit;width: inherit; }*/
.label_long {
  word-wrap: break-word;
  word-break: normal;
  width: auto;
  word-break: break-all;
  overflow: hidden;
}
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
.span:hover {
  text-decoration: none;
}
.search_text {
  height: 35px;
  border: 1px solid lightgrey;
  background-image: url("../../static/img/sousuo.png");
  background-repeat: no-repeat;
  background-size: 7% 40%;
  background-position: left;
  /*border-right: none;*/
  padding-left: 20px;
  /*background-position: 15%;*/
}
h5 {
  font-weight: bold;
}
</style>
