<template>
	<div id="app">
					<div id="app" class="content_main_1" style="display: flex;justify-content: center;">
						<div class="phone_view">
							<div class="view_content" :style="{backgroundColor:'rgba('+head_tool.data.backgroundColor+')'}">
								<component v-bind:is="item.toolType" :data="item.data" @quiet="setQuiet" @remove="remove_content(index)" v-for="(item,index) in totalTools" v-bind:key="index"></component>
							</div>

							<div class="view_edit">
								<p>基础组件</p>
								<div>
									<button @click="addTools('pic_ad_tool')">图片广告</button>
									<button @click="addTools('full_text_tool')">富文本</button>
									<button @click="addTools('goods_tool')">商品</button>
									<button onclick="addedit()">商品分组</button>
									<button @click="addTools('lead_tool')">图文导航</button>
									<button @click="addTools('full_text_tool')">文本</button>
									<button onclick="addedit()">关联链接</button>
									<button onclick="addedit()">标题</button>
									<button onclick="addedit()">搜索商品</button>
								</div>
								<p>营销组件</p>
								<div>
									<button>分享活动</button>
									<button>抽奖活动</button>
									<button>秒杀活动</button>
									<button>拼团活动</button>
									<button>免费名额</button>
								</div>
							</div>
						</div>

						<div class="edit_manege"></div>
					</div>

					

					<div class="content_footer">
						<button @click="saveSetting()">保存</button>
						<button>取消</button>
					</div>
					<div style="height: 40px;"></div>
				</div>
</template>

<script>
	import pic_ad_setting from "./components/pic_ad_setting";
	import head_setting from "./components/head_setting";
	import full_text_setting from "./components/full_text_setting";
	import goods_setting from "./components/goods_setting";
	import lead_setting from "./components/lead_setting";
	export default {
		name: "app",
		data() {
			return {
				totalTools: [],
				postUrl: '',
				backgroundColor: '255,255,255,1',
				xml_content:'',
				head_tool: {
					toolType: "head_setting", // 模块类型 标题
					id: "0",
					data: {
						state: "active",     //模块操作激活状态 quiet 为静默   active为当前正在操作
						title: "页面标题",   // 页面标题 
						backgroundColorStyle: "1", //页面整体的背景色  1为默认值  2 为自定义 
						backgroundColor: '255,255,255,1',  // 页面的自定义背景色 rgba 
					}
				},
				pic_ad_tool: {
					toolType: "pic_ad_setting", // 模块类型 图片广告
					id: "1",
					data: {
						state: "active", //模块操作激活状态 quiet 为静默   active为当前正在操作
						imgListL: [{  // 图片列表 至少保留一个 图片 否则会出错
							id: 0,
							url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546106336400&di=5600976ae525fe2d6aa55d0602add08f&imgtype=0&src=http%3A%2F%2Fpic1.nipic.com%2F2008-12-30%2F200812308231244_2.jpg',
							title: '', // 图片 广告的 标题
							jumpUrl: '', // 图片广告的跳转地址 
							changeBtn: false // 图片的修改地址按钮激活状态 
						}]
					}
				},
				full_text_tool: {
					toolType: "full_text_setting", // 模块类型 富文本
					id: "2",
					data: {
						state: "active", //模块操作激活状态 quiet 为静默   active为当前正在操作
						backgroundColor: '255,255,255,1', // 页面的自定义背景色 rgba 
						fullScreen: false, // 文本全屏 还是有padding 
						text: '',  // 富文本编辑器的主要内容
					}
				},
				goods_tool: {
					toolType: "goods_setting", // 模块类型  商品列表
					id: "3",
					data: {
						state: "active", //模块操作激活状态 quiet 为静默   active为当前正在操作
						source:'1',      //商品来源 1 商品库 2 商品分组
						goodsList:[],    //商品列表
						listStyle:'1',   //列表样式  1大图 2小图 3详细列表 
						showStyle:'1',   //显示样式 1 卡片样式
						showContent:['name','price','buyBtn','addCarBtn'],  // 数组成员代表显示内容  名字 价格 购买按钮 添加购物车按钮
						jumpUrl:'', //跳转地址
					}
				},
				lead_tool:{
					toolType: "lead_setting", // 模块类型  图文导航
					id: "4",
					data: {
						modelType:'1',        // 模板类型 1图文导航 2 文字导航
						slideSetting:'1',     // 滑动设定 1 固定 2 横向滑动
						backgroundColor: '255,255,255,1', // 背景色 rgba 
						fontColor: '255,255,255,1', // 文字颜色  rgba 
						leadList:[{    // 导航列表
							imgUrl : 'http://pic1.nipic.com/2008-12-30/200812308231244_2.jpg', 
							title: '', // 导航 标题
							jumpUrl: '', // 导航的跳转地址 
							changeBtn: false // 导航的修改地址按钮激活状态 
						}]
					}
				}
			};
		},
		components: {
			head_setting,
			pic_ad_setting,
			full_text_setting,
			goods_setting,
			lead_setting
		},

		methods: {
			saveSetting() {
				var that = this

//				json 代码   that.totalTools 
				//还原数据 只要将这里导出的 that.totalTools 赋值给 that.totalTools 即可还原环境
				
				
//				xml 代码 
				this.xml_content = $.json2xml(that.totalTools);
				
				
				
				
				
				//在这里操作保存内容 
				/** 
		   totalTools	为当前操作所有的数据结果，内部为一个数组 按顺序保存了 当前应用的 控件名称、属性等，
						具体可以使用 Vue-tools 查看 或者提交到某地址 直接看结果 该参数是一个对象数据，通过遍历该数据即可得到每一个操作模块的内容
						每一个对象中包含属性有	  toolType 模块类型
												id 模块id
												data 用户操作模块编辑的内容
						
						toolType 模块类型共有10种
							1、head 标题 为每一个页面的标题
							2、pic_ad_settings 图文广告
							
						

		 
		 */
			},
			addTools(n) {
				var that = this;
				if(n == "head_tool") {
					let newHead_tool = new Object();
					newHead_tool = JSON.parse(JSON.stringify(that.head_tool));
					that.setQuiet();
					that.totalTools.push(that.head_tool);
				} else if(n == "pic_ad_tool") {
					let newpic_ad_tool = new Object();
					newpic_ad_tool = JSON.parse(JSON.stringify(that.pic_ad_tool));
					that.setQuiet();
					that.totalTools.push(newpic_ad_tool);
				} else if(n == 'full_text_tool') {
					let newfull_text_tool = new Object();
					newfull_text_tool = JSON.parse(JSON.stringify(that.full_text_tool));
					that.setQuiet();
					that.totalTools.push(newfull_text_tool);
				}  else if(n == 'goods_tool') {
					let newgoods_tool = new Object();
					newgoods_tool = JSON.parse(JSON.stringify(that.goods_tool));
					that.setQuiet();
					that.totalTools.push(newgoods_tool);
				}  else if(n == 'lead_tool') {
					let newlead_tool = new Object();
					newlead_tool = JSON.parse(JSON.stringify(that.lead_tool));
					that.setQuiet();
					that.totalTools.push(newlead_tool);
				}
			},
			setQuiet() {
				var that = this;
				var len = that.totalTools.length;
				for(let index = 0; index < len; index++) {
					if(that.totalTools[index].data.state) {
						that.totalTools[index].data.state = "quiet";
					}
				}
			},
			setActive(n) {
				var that = this;
				setQuiet();
				var len = that.totalTools.length;
				for(let index = 0; index < len; index++) {
					if(that.totalTools[index].toolType == n) {
						that.totalTools[index].data.state = "active";
					}
				}
			},
			remove_content(n){
				this.totalTools.splice(n, 1);
			}
		},
		created() {
			this.addTools("head_tool");
		}
	};
</script>

<style>
	#app {}
</style>