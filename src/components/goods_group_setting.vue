<template>
	<div class="full_text_content">
		<div @click="addedit()" class="text_content">
			<div v-if="data.tamplate == 'top'"><!--顶部固定菜单-->
				<div class="title_group1">
					<div class="title_group_item1" style="color: red;border-bottom: 1px solid red;padding: 0 5px;box-sizing: border-box;">
						全部
					</div>
					<div class="title_group_item1" v-for="(itm,index) in data.goods_group" v-bind:key="index">
						{{itm.title}}
					</div>
				</div>
				<div class="goods_group1" v-if="data.listStyle == 'goods-big'">
					<div class="goods_group_item1" v-for="i in forNum">
						<img :src="goodlisg.imgUrl" />
						<p>{{goodlisg.name}} </p>
						<p>{{goodlisg.price}} <img src="../../static/img/u896.png" /></p>
					</div>
				</div>
				<div class="goods_group3" v-if="data.listStyle == 'goods-small'">
					<div class="goods_group_item1" v-for="i in forNum">
						<img :src="goodlisg.imgUrl" />
						<p>{{goodlisg.name}} </p>
						<p>{{goodlisg.price}} <img src="../../static/img/u896.png" /></p>
					</div>
				</div>
        <div class="goods_group4" v-if="data.listStyle == 'goods-info'">
          <div class="goods_group_item1" v-for="i in forNum">
            <img :src="goodlisg.imgUrl"/>
            <div>
              <p>{{goodlisg.name}} </p>
              <br/>
              <br/>
              <br/>
              <p>{{goodlisg.price}} <img src="../../static/img/u896.png"
                                         style="position: absolute;bottom: 5px;right: 5px;"/></p>
            </div>
          </div>
        </div>
			</div>

			<div v-if="data.tamplate == 'left'"><!--左侧固定菜单-->
				<div class="title_group2">
					<div class="title_list">
						<div class="title_group_item2" style="color: red;padding: 0 5px;box-sizing: border-box;">
							全部
						</div>
						<div class="title_group_item2" v-for="(itm,index) in data.goods_group" v-bind:key="index">
							{{itm.title}}
						</div>
					</div>

					<div class="goods_group5" v-if="data.listStyle == 'goods-big'">
						<div class="goods_group_item2" v-for="i in forNum">
							<img :src="goodlisg.imgUrl" />
							<p>{{goodlisg.name}} </p>
							<p>{{goodlisg.price}} <img src="../../static/img/u896.png" style="position: absolute;bottom: 5px;right: 5px;" /></p>

						</div>
					</div>
					<div class="goods_group6" v-if="data.listStyle == 'goods-small'">
						<div class="goods_group_item2" v-for="i in forNum">
							<img :src="goodlisg.imgUrl" />
							<div>

								<p>{{goodlisg.name}} </p>
								<p>{{goodlisg.price}} <img src="../../static/img/u896.png" style="position: absolute;bottom: 5px;right: 15px;" /></p>

							</div>
						</div>
					</div>
					<div class="goods_group2" v-if="data.listStyle == 'goods-info'">
						<div class="goods_group_item2" v-for="i in forNum">
							<img :src="goodlisg.imgUrl" />
							<div>

								<p>{{goodlisg.name}} </p>
								<p>{{goodlisg.price}} <img src="../../static/img/u896.png" style="position: absolute;bottom: 5px;right: 5px;" /></p>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

    <div class="edit2 edit" v-show="data.state == 'active'">
      <h3 class="edit_head">商品分组</h3>
      <div class="">
        <div class="edit_item_1">
          <label for="">列表样式：</label>
          <input type="radio" :name="'tamplate'+randomId" :id="'tamplate1'+randomId" value="top"
                 v-model='data.tamplate'/><label :for="'tamplate1'+randomId">顶部固定菜单</label>&#x3000;
          <input type="radio" :name="'tamplate'+randomId" :id="'tamplate2'+randomId" value="left"
                 v-model='data.tamplate'/><label :for="'tamplate2'+randomId">左侧菜单</label>&#x3000;
        </div>
        <div class="margin_5" style="margin: 10px;">
          <label for="">列表样式：</label>
          <input type="radio" :name="'listStyle'+randomId" :id="'listStyle1'+randomId" value="goods-big"
                 v-model='data.listStyle'/><label :for="'listStyle1'+randomId">大图</label>&#x3000;
          <input type="radio" :name="'listStyle'+randomId" :id="'listStyle2'+randomId" value="goods-small"
                 v-model='data.listStyle'/><label :for="'listStyle2'+randomId">小图</label>&#x3000;
          <input type="radio" :name="'listStyle'+randomId" :id="'listStyle3'+randomId" value="goods-info"
                 v-model='data.listStyle'/><label :for="'listStyle3'+randomId">详细</label>
        </div>
        <div class="group_item" v-for="(itm,index) in data.goods_group" v-bind:key="index"
             v-dragging="{ item: itm, list: data.goods_group, group: 'itm' }">
          <div>
            <label for="">分组名称：</label> <input type="" name="" id="" value="" placeholder="单行输入" v-model="itm.title"
                                               maxlength="10"/></div>
          <div>
            <label for="">商品分组：</label>
            <a style="text-decoration: none;cursor: pointer;" data-toggle="modal"
               :data-target="'#myModal'+randomId">{{itm.name}}</a>
          </div>
          <div>
            <label for="">显示个数：</label>
            <input type="" name="" id="" value="" placeholder="" v-model="itm.showCount"/>
          </div>
          <button @click="remove_ImgItem(index)" class="swiper-slide-remove">X</button>
        </div>

        <div class="group_item">
          <p style="text-align: center;cursor: pointer;" v-if="!full_group" data-toggle="modal"
             :data-target="'#myModal'+randomId">添加 <img src="../../static/img/u416.png"/></p>
        </div>
        <div>
          <span style="color: gray;">请优先勾选希望展示的分组，再进行分组名称自定义。</span>
        </div>

        <!-- 这是 bootstrap 弹窗 里面放上列表和事件结果 对应的放入商品到 data.goodsList 即可-->
        <div class="modal fade" :id="'myModal'+randomId" tabindex="-1" role="dialog"
             :aria-labelledby="'myModalLabel'+randomId" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" :id="'myModalLabel'+randomId">从商品库中勾选您希望展示的商品分组</h4>
              </div>
              <div class="modal-body">
                <div class="table table-hover">
                  <table class="table">
                    <thead>
                    <tr>
                      <th>
                        <input type="checkbox" name="" id="" value=""/>
                      </th>
                      <th>
                        分组
                      </th>
                      <th>
                        商品数量
                      </th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr v-for="(item,index) in goods_group" v-bind:key="index">
                      <td>
                        <input type="checkbox" name="" id="" value="true" v-model="item.checked"/>
                      </td>
                      <td>
                        <span>{{item.title}}</span>
                      </td>
                      <td>
                        {{item.num}}
                      </td>
                    </tr>

                    </tbody>
                  </table>

                  <div style="text-align: right;">
                    <button @click="pageTo(currentPage - 1)">上一页</button>
                    <button v-if="(currentPage - 1)>0" @click="pageTo(currentPage - 1)">{{currentPage - 1}}</button>
                    <button @click="pageTo(currentPage)" disabled="disabled">{{currentPage}}</button>
                    <button v-if="(currentPage + 1)<totalPage" @click="pageTo(currentPage - 1)">{{currentPage + 1}}
                    </button>
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
        full_group: false,
        toastShow: false,
        toastText: '',
        goodlisg: {
          name: '新衣服',
          id: '77',
          price: '¥88',
          imgUrl: 'http://bpic.588ku.com/original_pic/18/05/04/cb1db68eb460eae7fd0cf0e0761ba409.jpg!/fw/254/quality/90/unsharp/true/compress/true',
          checked: true
        },
        forNum: [{
          'a': '0'
        }, {
          'a': '0'
        }, {
          'a': '0'
        }
        ],
        randomId: 'editor' + (Math.random() * 100000000000000000),
        // 从数据库获取的商品列表当前页 和 总页数
        currentPage: 1, // 当前页 起始为1
        totalPage: 3, // 总页数
        randomId: 'editor' + (Math.random() * 100000000000000000),
        // 从数据库获取的商品列表放这里 待用户选择
        goods_group: [{
          title: '分组1', // 用户可自定义修改的名称
          name: '分组1', // 商品分组固有名称 不可改
          goodsFrom: '77', // 商品分组ID
          checked: true, // 选中状态
          num: '17', // 商品分组内部商品数量
          showCount: '3' // 默认商品分组的显示个数 用户可修改
        }, {
          title: '分组2',
          name: '分组2',
          goodsFrom: '78',
          checked: false,
          num: '1',
          showCount: '1' // 显示个数
        }]
      };
    },
    props: ["data"],
    mounted() {

    },
    beforeCreate(){
        let that = this
        let getUserId = localStorage.getItem("dUserId");
        let getShopId = localStorage.getItem("dShopId");
					that.axios.post('/baseUrl/api/miniapp/shop/decoration/good/groups', {
						shopId: parseInt(getShopId)
					})
					.then(function(response) {
            console.log(response.data);
            if(response.data.code == 0){
              if(response.data.data.goodGroups.length>0){
                let goodGroups = response.data.data.goodGroups
                for(let i in goodGroups){
                  goodGroups[i].title = goodGroups[i].goodGroupName
                  goodGroups[i].checked = i==0?true:false
                  goodGroups[i].name = goodGroups[i].goodGroupName
                  goodGroups[i].goodsFrom = goodGroups[i].goodGroupId
                  goodGroups[i].num = goodGroups[i].goodAmount
                  goodGroups[i].showCount = 1
                }
                that.goods_group = goodGroups
              }else{
                that.toast('您还没有设置商品分组，请先设置商品分组')
              }
            }
					})
					.catch(function(error) {
						console.log(error);
					});
				
    },
    methods: {
      addedit() {
        this.$emit('quiet', '')
        this.data.state = 'active'
      },
      remove_content() {
        this.$emit('remove', '')
      },
      toast (str) {
    let v = this
    v.toastText = str
    v.toastShow = true
    setTimeout(function(){
      v.toastShow = false
    }, 1500)
  },
      remove_ImgItem(index) {
        var len = this.data.goods_group.length
        if (len <= 1) {

        } else {
          this.full_group = false
          this.data.goods_group.splice(index, 1);
        }
      },
      pageTo(page) {
        // 当前页不加载，大于总页数不加载 小于 1 不加载
        if (page == this.currentPage || page > this.totalPage || page < 1) {
          
        } else {
          // 在这里执行加载页面 page 为第几页 数量由后台控制，一个页面尽量在二十个数据以内
          // 在这里执行加载页面 page 为第几页 数量由后台控制，一个页面尽量在二十个数据以内
          // 在这里执行加载页面 page 为第几页 数量由后台控制，一个页面尽量在二十个数据以内

          // 如果请求回来的总页数 也要赋值给  this.totalPage 以免数据出错

          this.currentPage = page
        }
      }
    },
    watch: {

      goods_group: {
        handler(curVal, oldVal) {
          var ary = []
          curVal.forEach(function (item, index) {
            if (item.checked == true) {
              ary.push(item)
            } else {

            }
          })
          this.data.goods_group = ary
        },
        deep: true
      }
    },
    components: {},
    beforeDestroy() {

    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .edit_head {
    color: #FF0000;
    font-size: 16px;
  }

  .title_group1 {
    width: 100%;
    height: 40px;
    overflow-x: hidden;
    display: flex;
    justify-content: flex-start;
  }

  .title_group_item1 {
    width: 50px;
    height: 100%;
    line-height: 40px;
    text-align: center;
    overflow: hidden;
    text-overflow: inherit;
    white-space: nowrap;
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
  .goods_group1 {
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
  }

  .goods_group_item1 {
    width: 100%;
  }

  .goods_group_item1 > img {
    display: block;
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }

  .goods_group_item1 > p {
    margin-bottom: 10px;
  }

  .goods_group_item1 > p:nth-child(3) {
    color: red;
    font-weight: bold;
    font-size: 16px;
    position: relative;
  }

  .goods_group_item1 > p > img {
    position: absolute;
    right: 0;
    width: 24px;
    height: 24px;
  }

  .title_group2 {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .title_list {
    width: 80px;
    background-color: #f0f0f0;
  }

  .title_group_item2 {
    width: 80px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: #f6f6f6;
  }

  .title_group_item2:nth-child(1) {
    background-color: #ffffff;
    border-left: 2px solid red;
  }

  .goods_group2 {
    width: calc(100% - 80px);
  }

  .goods_group_item2 {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
  }

  .goods_group_item2 > img {
    width: 86px;
    height: 86px;
    display: inline-block;
    margin-right: 10px;
  }

  .goods_group_item2 div {
    width: 124px;
    height: 86px;
    position: relative;
  }

  .goods_group_item2 > div > p {
    width: 100%;
    white-space: pre-wrap;
  }

  .goods_group_item2 > div > p:nth-child(2) {
    position: absolute;
    bottom: 2px;
    left: 0;
  }

	.goods_group_item2>div>p:nth-child(2)>img {
		position: absolute;
		right: 5px;
		bottom: 0;
	}

	.edit_item_1 {
		margin: 10px 10px;
	}

	.group_item {
		border: 1px dashed rgba(204, 204, 204, 1);
		width: calc(100% - 20px);
		padding: 10px;
		margin: 10px;
		box-sizing: border-box;
		background-color: white;
		position: relative;
	}

	.group_item>div {
		padding-left: 20px;
		margin: 10px 0;
	}

	.swiper-slide-remove {
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

	.goods_group3 {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.goods_group3>.goods_group_item1 {
		width: 50%;
		padding: 5px 10px;
	}

	.goods_group3>.goods_group_item1>img {
		width: 100%;
		height: 170px;
	}

	.goods_group4 {
		width: 100%;
	}

	.goods_group4>.goods_group_item1 {
		width: 100%;
		padding: 5px 10px;
		display: flex;
		justify-content: space-around;
	}

	.goods_group4>.goods_group_item1>img {
		width: 100px;
		height: 100px;
		margin-right: 10px;
	}

	.goods_group4>.goods_group_item1>div {
		width: calc(100% - 110px);
		position: relative;
	}

	.goods_group5 {
		width: calc(100% - 80px);
	}

	.goods_group5>.goods_group_item2 {
		display: block;
		position: relative;
	}

	.goods_group5>.goods_group_item2>img {
		width: 100%;
		height: 170px;
	}

	.goods_group6 {
		width: calc(100% - 80px);
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.goods_group6>.goods_group_item2 {
		display: block;
		box-sizing: border-box;
		position: relative;
		width: 50%;
		padding: 5px 10px;
	}

	.goods_group6>.goods_group_item2>img {
		width: 100%;
		height: 100px;
	}
</style>
