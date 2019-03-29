<template>
  <div class="full_text_content">
    <div @click="addedit()" class="text_content">
      <!--大图模式-->
      <div class="goods_list_1" v-if="data.listStyle == 'goods-big'">
        <div class="goods_list1_item" v-for="(item,index) in data.goodsList" v-bind:key="index">
          <img class="goods_list1_item_img" :src="item.imgUrl">
          <div class="goods_list1_item_content">
            <div class="goods_list1_item_content_left">
              <p v-show="data.goodsName">{{item.name}}</p>
              <p v-show="data.price">
                {{item.price}}&#x3000;
                <s style="color: #999;">{{item.price}}</s>
              </p>
            </div>
            <div class="goods_list1_item_content_right">
              <img v-show="data.shopCar" src="../../static/img/u896.png">
              <button v-show="data.buyBtn">购买</button>
            </div>
          </div>
        </div>
      </div>

      <!--小图模式 -->
      <div class="goods_list_2" v-if="data.listStyle == 'goods-small'">
        <div class="goods_list2_item" v-for="(item,index) in data.goodsList" v-bind:key="index">
          <img class="goods_list2_item_img" :src="item.imgUrl">
          <div class="goods_list2_item_content">
            <div class="goods_list2_item_content_left">
              <p v-show="data.goodsName">{{item.name}}</p>
              <p v-show="data.price">
                {{item.price}}&#x3000;
                <s style="color: #999;">{{item.price}}</s>
              </p>
            </div>
            <div class="goods_list2_item_content_right">
              <img v-show="data.shopCar" src="../../static/img/u896.png">
              <button v-show="data.buyBtn">购买</button>
            </div>
          </div>
        </div>
      </div>

      <!--详细模式-->
      <div class="goods_list_3" v-if="data.listStyle == 'goods-info'">
        <div class="goods_list3_item" v-for="(item,index) in data.goodsList" v-bind:key="index">
          <img class="goods_list3_item_img" :src="item.imgUrl">
          <div class="goods_list3_item_content">
            <div class="goods_list3_item_content_left">
              <p v-show="data.goodsName">{{item.name}}</p>
              <br>
              <br>
              <br>
              <p v-show="data.price">
                {{item.price}}&#x3000;
                <s style="color: #999;">{{item.price}}</s>
              </p>
            </div>
            <div class="goods_list3_item_content_right">
              <br>
              <br>
              <img v-show="data.shopCar" src="../../static/img/u896.png">
              <button v-show="data.buyBtn">购买</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="edit3 edit" v-show="data.state == 'active'">
      <h3 class="edit_head">商品展示</h3>
      <div class="edit3_control1">
        <div class="margin_5">
          <label for>商品来源：</label>
          <input
            type="radio"
            :name="'goodsForm'+randomId"
            :id="'goodsForm1'+randomId"
            value="1"
            v-model="data.source"
          >
          <label :for="'goodsForm1'+randomId">商品库</label>&#x3000;
          <input
            type="radio"
            :name="'goodsForm'+randomId"
            :id="'goodsForm2'+randomId"
            value="2"
            v-model="data.source"
          >
          <label :for="'goodsForm2'+randomId">商品分组</label>
        </div>
        <div class="goods_control margin_5" v-if="data.source == 1">
          <div class="addgoods_content">
            <div style="display: inline-block;width: 70px;">
              <label for>添加商品：</label>
            </div>

            <div class="goods_list">
              <!-- 点击 div 触发商品列表替换 弹窗-->
              <div
                class="goods_list_item"
                v-for="(item,index) in data.goodsList"
                v-bind:key="index"
                v-dragging="{ item: item, list: data.goodsList, group: 'item' }"
                data-toggle="modal"
                :data-target="'#myModal'+randomId"
                style="cursor: pointer;"
              >
                <img :src="item.imgUrl">
              </div>

              <div
                class="add_good_btn"
                data-toggle="modal"
                :data-target="'#myModal'+randomId"
                style="cursor: pointer;"
              >
                <img src="../../static/img/u900.png">
              </div>
            </div>

            <!-- 这是 bootstrap 弹窗 里面放上列表和事件结果 对应的放入商品到 data.goodsList 即可-->
            <div
              class="modal fade"
              :id="'myModal'+randomId"
              tabindex="-1"
              role="dialog"
              :aria-labelledby="'myModalLabel'+randomId"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-hidden="true"
                    >&times;</button>
                    <h4 class="modal-title" :id="'myModalLabel'+randomId">从商品库中勾选您需要展示的商品</h4>
                  </div>
                  <div class="modal-body">
                    <div class="table table-hover">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>
                              <input type="checkbox" name id value>
                            </th>
                            <th>标题</th>
                            <th>价格</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,index) in goodsList" v-bind:key="index">
                            <td>
                              <input type="checkbox" name id value="true" v-model="item.checked">
                            </td>
                            <td>
                              <img :src="item.imgUrl" style="width: 50px;height: 30px;">
                              <span>{{item.name}}</span>
                            </td>
                            <td>{{item.price}}</td>
                          </tr>
                        </tbody>
                      </table>

                      <div style="text-align: right;">
                        <button @click="pageTo(currentPage - 1)">上一页</button>
                        <button
                          v-if="(currentPage - 1)>0"
                          @click="pageTo(currentPage - 1)"
                        >{{currentPage - 1}}</button>
                        <button @click="pageTo(currentPage)" disabled="disabled">{{currentPage}}</button>
                        <button
                          v-if="(currentPage + 1)<totalPage"
                          @click="pageTo(currentPage - 1)"
                        >{{currentPage + 1}}</button>
                        <button @click="pageTo(currentPage + 1)">下一页</button>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal">提交更改</button>
                  </div>
                </div>
                <!-- /.modal-content -->
              </div>
              <!-- /.modal -->
            </div>
          </div>
          <p style="text-align: center;">拖动商品可进行排序</p>
        </div>
        <div class="goods_control2 margin_5" v-if="data.source == 2">
          <div>
            <label for>商品分组：</label>
            <select class="page_select">
              <option disabled value>选择跳转到的页面</option>
              <option v-for="(i,index) in goods_group" v-bind:key="index" :value="i.goodGroupId">{{i.goodGroupName}}</option>
            </select>
          </div>
          <br>
          <div>
            <label for>显示个数：</label>
            <input type="text" name id value style="width: 70px;">
            <span>最多显示五十个</span>
          </div>
        </div>
        <div class="margin_5">
          <label for>列表样式：</label>
          <input
            type="radio"
            :name="'listStyle'+randomId"
            :id="'listStyle1'+randomId"
            value="goods-big"
            v-model="data.listStyle"
          >
          <label :for="'listStyle1'+randomId">大图</label>&#x3000;
          <input
            type="radio"
            :name="'listStyle'+randomId"
            :id="'listStyle2'+randomId"
            value="goods-small"
            v-model="data.listStyle"
          >
          <label :for="'listStyle2'+randomId">小图</label>&#x3000;
          <input
            type="radio"
            :name="'listStyle'+randomId"
            :id="'listStyle3'+randomId"
            value="goods-info"
            v-model="data.listStyle"
          >
          <label :for="'listStyle3'+randomId">详细</label>
        </div>
        <div class="margin_5 content_style">
          <div>
            <label for>显示样式：</label>
            <input
              type="radio"
              :name="'showStyle'+randomId"
              id="showStyle"
              value="1"
              v-model="data.showStyle"
            >
            <label for="showStyle">卡片样式</label>&#x3000;
          </div>
          <div style="display: flex;justify-content: space-around;">
            <div style="display: inline-block;width: 70px;">
              <label for>显示内容：</label>
            </div>

            <div style="display: inline-block;width: calc(100% - 70px);">
              <input
                type="checkbox"
                :name="'goodsName'+randomId"
                :id="'goodsName'+randomId"
                value="true"
                v-model="data.goodsName"
              >
              <label :for="'goodsName'+randomId">商品名称</label>&#x3000;
              <input
                type="checkbox"
                :name="'price'+randomId"
                :id="'price'+randomId"
                value="true"
                v-model="data.price"
              >
              <label :for="'price'+randomId">商品价格</label>&#x3000;
              <br>
              <input
                type="checkbox"
                :name="'buyBtn'+randomId"
                :id="'buyBtn'+randomId"
                value="true"
                v-model="data.buyBtn"
              >
              <label :for="'buyBtn'+randomId">购买按钮</label>&#x3000;
              <input
                type="checkbox"
                :name="'shopCar'+randomId"
                :id="'shopCar'+randomId"
                value="true"
                v-model="data.shopCar"
              >
              <label :for="'shopCar'+randomId">购物车</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="remove_content()" class="remove_content">X</button>
    <div class="toast" v-show="toastShow">
  {{toastText}}
</div>

  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      currentPage: 1, // 当前页 起始为1
      totalPage: 3, // 总页数
      toastShow: false,
        toastText: '',
	  randomId: "editor" + Math.random() * 100000000000000000,
	  goods_group:[
		  {
			  goodGroupName:'您没有商品分组'
		  }
	  ],
      // 从数据库获取的商品列表放这里 待用户选择
      goodsList: [
        // {
        //   name: "新衣服",
        //   id: "77",
        //   price: "¥88",
        //   imgUrl:
        //     "http://bpic.588ku.com/original_pic/18/05/04/cb1db68eb460eae7fd0cf0e0761ba409.jpg!/fw/254/quality/90/unsharp/true/compress/true",
        //   checked: true
        // },
        // {
        //   name: "新衣服",
        //   price: "¥88",
        //   id: "78",
        //   imgUrl:
        //     "http://bpic.588ku.com/original_pic/18/05/04/cb1db68eb460eae7fd0cf0e0761ba409.jpg!/fw/254/quality/90/unsharp/true/compress/true",
        //   checked: true
        // }
      ] //商品列表
    };
  },
  props: ["data"],

  mounted() {},
  watch: {
    goodsList: {
      handler(curVal, oldVal) {
        var ary = [];
        curVal.forEach(function(item, index) {
          if (item.checked == true) {
            ary.push(item);
          } else {
          }
        });
        this.data.goodsList = ary;
      },
      deep: true
    }
  },
  methods: {
    addedit() {
      this.$emit("quiet", "");
      this.data.state = "active";
    },
    toast (str) {
    let v = this
    v.toastText = str
    v.toastShow = true
    setTimeout(function(){
      v.toastShow = false
    }, 1500)
  },
    remove_content() {
      this.$emit("remove", "");
    },
    pageTo(page) {
      // 当前页不加载，大于总页数不加载 小于 1 不加载
      if (page == this.currentPage || page > this.totalPage || page < 1) {
      } else {
        // 在这里执行加载页面 page 为第几页 数量由后台控制，一个页面尽量在二十个数据以内
        // 在这里执行加载页面 page 为第几页 数量由后台控制，一个页面尽量在二十个数据以内
        // 在这里执行加载页面 page 为第几页 数量由后台控制，一个页面尽量在二十个数据以内

        // 如果请求回来的总页数 也要赋值给  this.totalPage 以免数据出错

        this.currentPage = page;
      }
    }
  },
  beforeCreate() {
    let that = this;
    let getUserId = localStorage.getItem("dUserId");
      let getShopId = localStorage.getItem("dShopId");
    that.axios
      .post("/baseUrl/api/miniapp/shop/decoration/goods", {
        shopId: parseInt(getShopId)
      })
      .then(function(response) {
        console.log(response.data);
        if (response.data.data.goods.length <= 0) {
          that.toast('没有商品，请先添加商品')
        } else {
          let goodsList = response.data.data.goods;
          for (let k in goodsList) {
            goodsList[k].id = goodsList[k].goodId;
            goodsList[k].imgUrl = goodsList[k].goodImageUrl;
            goodsList[k].name = goodsList[k].goodName;
            goodsList[k].price = goodsList[k].goodPrice;
            goodsList[k].checked = k <= 1 ? true : false;
          }
          that.goodsList = goodsList;
          /** "goodId": 7,
        "goodImageUrl": "http://aa.com/1.png",
        "goodName": "敬酒2",
		"goodPrice": 0
		
		name: '新衣服',
					id: '77',
					price: '¥88',
					imgUrl: 'http://bpic.588ku.com/original_pic/18/05/04/cb1db68eb460eae7fd0cf0e0761ba409.jpg!/fw/254/quality/90/unsharp/true/compress/true',
					checked:true
		
		*/
        }
      })
      .catch(function(error) {
        console.log(error);
      });
      
    that.axios
      .post("/baseUrl/api/miniapp/shop/decoration/good/groups", {
        shopId: parseInt(getShopId)
      })
      .then(function(response) {
        console.log(response.data);
        if (response.data.code == 0) {
          if (response.data.data.goodGroups.length > 0) {
            let goodGroups = response.data.data.goodGroups;
            that.goods_group = goodGroups;
          } else {
            that.toast('您还没有设置商品分组，请先设置商品分组')
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  components: {},
  beforeDestroy() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add_good_btn {
  width: 78px;
  height: 78px;
  box-sizing: border-box;
  box-shadow: none;
  background: inherit inherit inherit inherit inherit inherit inherit inherit
    inherit;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(121, 121, 121);
  border-radius: 0px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add_good_btn > img {
  width: 20px;
  height: 20px;
}

.goods_list1_item {
  width: 100%;
  padding: 5px 10px;
}

.goods_list1_item_img {
  width: 100%;
  height: 170px;
  margin-bottom: 10px;
}

.goods_list1_item_content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.goods_list1_item_content_right {
  width: 60px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: inherit;
}

.goods_list1_item_content_right > img {
  width: 24px;
  height: 24px;
  margin: 0 auto;
  display: block;
}

.goods_list1_item_content_right > button {
  width: 60px;
  height: 24px;
  background: inherit;
  background-color: rgba(233, 71, 21, 1);
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(233, 71, 21, 1);
  border-radius: 3px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-size: 12px;
  color: #ffffff;
}

.goods_list_2 {
  display: flex;
  justify-content: space-around;
}

.goods_list2_item {
  width: 50%;
  padding: 5px 10px;
}

.goods_list2_item_img {
  width: 100%;
  height: 170px;
  margin-bottom: 10px;
}

.goods_list2_item_content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.goods_list2_item_content_right {
  width: 60px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: inherit;
}

.goods_list2_item_content_right > img {
  width: 24px;
  height: 24px;
  margin: 0 auto;
  display: block;
}

.goods_list2_item_content_right > button {
  width: 60px;
  height: 24px;
  background: inherit;
  background-color: rgba(233, 71, 21, 1);
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(233, 71, 21, 1);
  border-radius: 3px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-size: 12px;
  color: #ffffff;
}

.goods_list3_item {
  width: 100%;
  padding: 5px 10px;
  display: flex;
  justify-content: space-around;
}

.goods_list3_item_img {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}

.goods_list3_item_content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.goods_list3_item_content_left {
}

.goods_list3_item_content_right {
  width: 60px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: inherit;
}

.goods_list3_item_content_right > img {
  width: 24px;
  height: 24px;
  margin: 0 auto;
  margin-top: 30px;
  display: block;
}

.goods_list3_item_content_right > button {
  width: 60px;
  height: 24px;
  background: inherit;
  background-color: rgba(233, 71, 21, 1);
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(233, 71, 21, 1);
  border-radius: 3px;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-size: 12px;
  color: #ffffff;
}

label {
  font-size: 14px;
}

.edit_head {
  color: #ff0000;
  font-size: 16px;
}

.margin_5 {
  margin: 5px 5px;
}

.addgoods_content {
  border: 1px solid #bbb;
  padding: 5px;
  margin: 5px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
}

.goods_list {
  display: inline-block;
  display: flex;
  justify-content: flex-start;
  width: calc(100% - 70px);
  flex-wrap: wrap;
}

.goods_list_item {
  width: 78px;
  height: 78px;
  margin: 5px;
}
.toast {
            position: fixed;
            z-index: 2000;
            left: 50%;
            top:45%;
            transition:all .5s;
            -webkit-transform: translateX(-50%) translateY(-50%);
               -moz-transform: translateX(-50%) translateY(-50%);
                -ms-transform: translateX(-50%) translateY(-50%);
                 -o-transform: translateX(-50%) translateY(-50%);
                    transform: translateX(-50%) translateY(-50%);
            text-align: center;
            border-radius: 5px;
            color:#FFF;
            background: rgba(17, 17, 17, 0.7);
            height: 45px;
            line-height: 45px;
            padding: 0 15px;
            max-width: 300px;
        }
.goods_list_item > img {
  width: 78px;
  height: 78px;
}

.goods_control2 {
  border: 1px solid #bbb;
  padding: 15px;
  margin: 5px 0;
}

.content_style {
  border: 1px solid #bbb;
  padding: 5px;
  margin: 5px 0;
}
</style>
