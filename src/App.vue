<template>
  <div id="app">
    <!--<div class="content-wrapper" style="display: flex;justify-content: space-between;">-->
    <!--<div class="left_lead2">
				<div class="page_name">店铺管理</div>
				<div class="left_lead2_list">
					<div class="left_lead2_list_item">
						<a href="#">门店管理</a>
					</div>
					<div class="left_lead2_list_item">
						<a href="#">门店概况</a>
					</div>
					<div class="left_lead2_list_item active">
						<a href="#">小程序装修</a>
					</div>
					<div class="left_lead2_list_item">
						<a href="#">风格设置</a>
					</div>
				</div>
    </div>-->
    <!--<div class="right_content">-->
    <!--<div class="content_lead">
					<div class="content_lead_item active">
						<a href="#">小程序概况</a>
					</div>
					<div class="content_lead_item">
						<a href="#">微页面</a>
					</div>
					<div class="content_lead_item">
						<a href="#">店铺导航</a>
					</div>
    </div>-->
    <!--<div class="content_main">-->
    <div id="app" class="content_main_1" style="display: flex;justify-content: center;">
      <div class="phone_view">
        <div class="view_content" :style="{backgroundColor:head_tool.data.backgroundColor}">
          <div class="view_component"
            v-for="(item,index) in totalTools"
            v-bind:key="index"
            v-dragging="{ item: item, list: totalTools, group: 'item' }"
          >
            <component
              v-bind:is="item.toolType"
              :imgList="imgList"
              :data="item.data"
              :pages="pages"
              @quiet="setQuiet"
              @remove="remove_content(index)"
            ></component>

            <!--动态切换组件-->
          </div>
        </div>
        <div class="view_edit">
          <p>基础组件</p>
          <div>
            <button @click="addTools('pic_ad_tool')">图片广告</button>
            <!--<button @click="addTools('full_text_tool')">富文本</button>-->
            <button @click="addTools('single_pic_tool')">单页图片</button>
            <button @click="addTools('goods_tool')">商品</button>
            <button @click="addTools('goods_group_tool')">商品分组</button>
            <button @click="addTools('lead_tool')">图文导航</button>
            <button @click="addTools('text_tool')">文本</button>
            <button @click="addedit('flink_tool')">关联链接</button>
            <button @click="addedit('title_tool')">标题</button>
            <button @click="addedit('search_tool')">搜索商品</button>
          </div>
          <p>营销组件</p>
          <div>
            <button @click="addTools('fxhd')">分享活动</button>
            <button @click="addimg('cjhd')">抽奖活动</button>
            <button @click="addimg('mshd')">秒杀活动</button>
            <button @click="addimg('pthd')">拼团活动</button>
            <button @click="addimg('mfme')">免费名额</button>
          </div>
        </div>
      </div>

      <div class="edit_manege"></div>
    </div>

    <!--<div class="content_main_2">
						<div class="item_img">
							<img src="../static/img/u60.png" style="width: 100%;">
						</div>
						<div class="item_mgs">
							<a href>
								<i class="fa fa-commenting-o" style="font-size: 23px;"></i> 在线客服
							</a>
							<p>电话客服： 400-00-530</p>
						</div>
						<div class="item_name">
							<p>吉修手机版</p>
							<p>随时随地管理店铺</p>
						</div>
    </div>-->
    <div class="content_footer">
      <button @click="saveSetting()">保存</button>
      <button>取消</button>
    </div>
    <div class="toast" v-show="toastShow">{{toastText}}</div>

    <!--<div style="height: 40px;"></div>-->
  </div>
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
</template>

<script>
//引入组件（模块系统）
import pic_ad_setting from "./components/pic_ad_setting";
import head_setting from "./components/head_setting";
import full_text_setting from "./components/full_text_setting";
import goods_setting from "./components/goods_setting";
import lead_setting from "./components/lead_setting";
import text_setting from "./components/text_setting";
import goods_group_setting from "./components/goods_group_setting";
import single_pic_setting from "./components/single_pic_setting";
import fxhd_setting from "./components/fxhd_setting.vue";
import cjhd_setting from "./components/cjhd_setting.vue";
import mshd_setting from "./components/mshd_setting.vue";
import search_setting from "./components/search_setting.vue";
import title_setting from "./components/title_setting.vue";
import flink_setting from "./components/flink_setting.vue";
export default {
  //提供一个接口给外界，让其他文件通过 import 来引入使用。
  name: "app",
  data() {
    //在使用组件化的项目中使用的是如下形式
    return {
      // 使用return包裹后数据中变量只在当前组件中生效，不会影响其他组件，防止变量污染
      totalTools: [],
      postUrl: "",
      backgroundColor: "rgba(255,255,255,1)",
      xml_content: "",
      pages: "",
      imgList: "",
      goods_group: "",
      toastShow: false,
      toastText: "",
      head_tool: {
        toolType: "head_setting", // 模块类型 标题
        id: "0",
        data: {
          state: "active", //模块操作激活状态 quiet 为静默   active为当前正在操作
          title: "页面标题", // 页面标题
          backgroundColorStyle: "1", //页面整体的背景色  1为默认值  2 为自定义
          backgroundColor: "rgba(255,255,255,1)" // 页面的自定义背景色 rgba
        }
      },
      pic_ad_tool: {
        toolType: "pic_ad_setting", // 模块类型 图片广告
        id: "1",
        data: {
          state: "active", //模块操作激活状态 quiet 为静默   active为当前正在操作
          imgListL: [
            {
              // 图片列表 至少保留一个 图片 否则会出错
              id: 0,
              url:
                "https://onezhan.oss-cn-hangzhou.aliyuncs.com/img/ozRes/oz_defaultNoImg.png",
              title: "", // 图片 广告的 标题
              jumpUrl: "", // 图片广告的跳转地址
              changeBtn: false // 图片的修改地址按钮激活状态
            }
          ]
        }
      },
      full_text_tool: {
        toolType: "full_text_setting", // 模块类型 富文本
        id: "2",
        data: {
          state: "active", //模块操作激活状态 quiet 为静默   active为当前正在操作
          backgroundColor: "rgba(255,255,255,1)", // 页面的自定义背景色 rgba
          fullScreen: false, // 文本全屏 还是有padding
          text: "" // 富文本编辑器的主要内容
        }
      },
      goods_tool: {
        toolType: "goods_setting", // 模块类型  商品列表
        id: "3",
        data: {
          state: "active", //模块操作激活状态 quiet 为静默   active为当前正在操作
          source: "1", //商品来源 1 商品库 2 商品分组
          goodsList: [
            {
              name: "这里显示商品名称",
              id: "56",
              price: "¥99",
              imgUrl:
                "https://onezhan.oss-cn-hangzhou.aliyuncs.com/img/ozRes/oz_defaultNoImg.png"
            },
            {
              name: "这里显示商品名称",
              price: "¥99",
              id: "55",
              imgUrl:
                "https://onezhan.oss-cn-hangzhou.aliyuncs.com/img/ozRes/oz_defaultNoImg.png"
            }
          ], //商品列表
          listStyle: "goods-big", //列表样式  goods-big->大图  goods-small->小图   goods-info->详细列表
          showStyle: "1", //显示样式 1 卡片样式
          goodsName: true,
          buyBtn: true,
          price: true,
          shopCar: true,
          jumpUrl: "" //跳转地址
        }
      },
      lead_tool: {
        toolType: "lead_setting", // 模块类型  图文导航
        id: "4",
        data: {
          state: "active", //模块操作激活状态 quiet 为静默   active为当前正在操作
          modelType: "imageNav", // 模板类型 imageNav 图文导航 textNav 文字导航
          slideSetting: "fixed", // 滑动设定 fixed 固定 horizontal 横向滑动
          backgroundColor: "rgba(255,255,255,1)", // 背景色 rgba
          fontColor: "0,0,0,1", // 文字颜色  rgba
          leadList: [
            {
              // 导航列表
              imgUrl: "http://pic1.nipic.com/2008-12-30/200812308231244_2.jpg",
              title: "导航一", // 导航 标题
              jumpUrl: "", // 导航的跳转地址
              changeBtn: false // 导航的修改地址按钮激活状态
            },
            {
              // 导航列表
              imgUrl: "http://pic1.nipic.com/2008-12-30/200812308231244_2.jpg",
              title: "导航二", // 导航 标题
              jumpUrl: "", // 导航的跳转地址
              changeBtn: false // 导航的修改地址按钮激活状态
            },
            {
              // 导航列表
              imgUrl: "http://pic1.nipic.com/2008-12-30/200812308231244_2.jpg",
              title: "导航三", // 导航 标题
              jumpUrl: "", // 导航的跳转地址
              changeBtn: false // 导航的修改地址按钮激活状态
            },
            {
              // 导航列表
              imgUrl: "http://pic1.nipic.com/2008-12-30/200812308231244_2.jpg",
              title: "导航四", // 导航 标题
              jumpUrl: "", // 导航的跳转地址
              changeBtn: false // 导航的修改地址按钮激活状态
            }
          ]
        }
      },
      text_tool: {
        toolType: "text_setting", // 模块类型 文本
        id: "5",
        data: {
          state: "active", //模块操作激活状态 quiet 为静默   active为当前正在操作
          backgroundColor: "rgba(255,255,255,1)", // 自定义背景色 rgba
          Color: "rgba(0,0,0,1)", // 文字的颜色 rgba
          fontSize: "14px", // 文字的大小
          jumpUrl: "", // 跳转地址
          textAlign: "left", // 文本对齐方式
          underline: "0", // 下划线 0 没有 1有
          fullScreen: false, // 文本全屏 还是有padding
          text: "" // 文本编辑器的主要内容
        }
      },
      title_tool: {
        toolType: "title_setting", // 模块类型 标题
        id: "6",
        data: {
          state: "active", //模块操作激活状态 quiet 为静默   active为当前正在操作
          text: "", // 标题内容
          showStyle: "", //标题样式
          textAlign: "left", // 标题对齐方式
          subhead: "", // 副标题
          backgroundColor: "rgba(255,255,255,1)", // 自定义背景色 rgba
          leadName: "", // 导航名称
          jumpUrl: "" // 跳转地址
        }
      },
      goods_group_tool: {
        toolType: "goods_group_setting", // 模块类型 商品分组
        id: "7",
        data: {
          state: "active", //模块操作激活状态 quiet 为静默   active为当前正在操作
          listStyle: "goods-big", //列表样式  goods-big->大图  goods-small->小图   goods-info->详细列表
          tamplate: "top", //  left-》左侧分组    top-》顶部分组
          goods_group: [
            {
              title: "分组1", // 用户可自定义修改的名称
              name: "分组1", // 商品分组固有名称 不可改
              goodsFrom: "77", // 商品分组ID
              checked: true, // 选中状态
              num: "17", // 商品分组内部商品数量
              showCount: "4" // 默认商品分组的显示个数
            }
          ]
        }
      },
      single_pic_tool: {
        toolType: "single_pic_setting", // 模块类型 图片广告
        id: "8",
        data: {
          state: "active", //模块操作激活状态 quiet 为静默   active为当前正在操作
          imgListL: [
            {
              // 图片列表 至少保留一个 图片 否则会出错
              id: 0,
              url:
                "https://onezhan.oss-cn-hangzhou.aliyuncs.com/img/ozRes/oz_defaultNoImg.png",
              title: "", // 图片 广告的 标题
              jumpUrl: "", // 图片广告的跳转地址
              changeBtn: false, // 图片的修改地址按钮激活状态
              height: "200" //图片的高度
            }
          ]
        }
      },
      about_link_tool: {
        toolType: "about_link_setting", // 模块类型 关联链接
        id: "9",
        data: {
          state: "active", //模块操作激活状态 quiet 为静默   active为当前正在操作
          LinkList: [
            {
              // 链接列表 至少保留一个 链接 否则会出错
              id: 0,
              title: "", // 链接的 标题
              jumpUrl: "" // 链接的跳转地址
            }
          ]
        }
      },
      fxhd: {
        toolType: "fxhd_setting", // 模块类型 图片广告
        id: "10",
        data: {
          state: "active", //模块操作激活状态 quiet 为静默   active为当前正在操作
          imgListL: [
            {
              // 图片列表 至少保留一个 图片 否则会出错
              id: 0,
              url:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547825391418&di=0275359c8f2dcb2dbb15c9952d8b4468&imgtype=0&src=http%3A%2F%2Fwww.pigcms.com%2FPublic%2Fuplode%2Fimage%2F20141221%2F20141221200605_30352.jpg",
              title: "", // 图片 广告的 标题
              jumpUrl: "", // 图片广告的跳转地址
              changeBtn: false // 图片的修改地址按钮激活状态
            }
          ]
        }
      },
      cjhd: {
        toolType: "cjhd_setting",
        id: "11",
        data: {
          state: "active", //模块操作激活状态 quiet 为静默   active为当前正在操作
          imgListL: [
            {
              // 图片列表 至少保留一个 图片 否则会出错
              id: 0,
              url:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548675820&di=d636f67a8f0216f347c6f247fe58ed0e&imgtype=jpg&er=1&src=http%3A%2F%2Fbpic.ooopic.com%2F16%2F43%2F48%2F16434817-829b83a6335ecd72f476e12ec7245a73-0.jpg",
              title: "", // 图片 广告的 标题
              jupmUrl: "", //图片广告的跳转地址
              changeBtn: false, // 图片的修改地址按钮激活状态
              img_height: "height", //图片设置：高度
              img_width: "width", //图片设置：宽度
              head_settitle: "head_settitle", //分享标题设置
              head_size: "head_size", //标题大小
              head_color: "head_color", //标题颜色
              head_family: "head_family", //标题风格
              font_settext: " font_settext", //分享文案设置
              font_size: "font_size", //字体大小
              font_color: "font_color", //字体颜色
              font_family: "font_family" //字体风格
            }
          ]
        }
      },
      mshd: {
        toolType: "mshd_setting", // 模块类型 商品分组
        id: "12",
        data: {
          state: "active", //模块操作激活状态 quiet 为静默   active为当前正在操作
          listStyle: "goods-small", //列表样式  goods-big->大图  goods-small->小图   goods-info->详细列表
          tamplate: "left", //  left-》左侧分组    top-》顶部分组
          goods_group: [
            {
              title: "分组1", // 用户可自定义修改的名称
              name: "分组1", // 商品分组固有名称 不可改
              goodsFrom: "77", // 商品分组ID
              checked: true, // 选中状态
              num: "17", // 商品分组内部商品数量
              showCount: "3" // 默认商品分组的显示个数
            }
          ]
        }
      },
      search_tool: {
        toolType: "search_setting",
        id: "13",
        data: {
          state: "active", //模块操作激活状态 quiet 为静默   active为当前正在操作
          shape: "block", //文字框形状
          font_set: "left", //文字位置
          index: "",
          backgroundColor: "rgba(255,255,255,1)",
          titleColor: "rgba(255,255,255,1)", // 背景色 rgba
          fontColor: "0,0,0,1", // 文字颜色  rgba
          inputheight: 35, //文字框高度
          text: "热词搜索", //第一个热词
          textListL: [
            {
              // 热词列表
              id: 0,
              title: ""
            }
          ]
        }
      },
      title_tool: {
        toolType: "title_setting",
        id: "14",
        data: {
          titleset: "default", //标题模板
          font_set: "div_content_center", //文字位置
          label_text: "", //标题
          titleColor: "rgba(255,255,255,1)", //背景色
          label_title: "", //导航名称
          subtitle: "", //副标题
          linktitle: "", //链接标题
          author: "", //作者
          date: "", //时间
          linkset: "linkset1",
          state: "active",
          botton_text: "选择跳转的页面",
          botton_value: "",
          botton_link: "",
          botton_text_one: "选择跳转的页面",
          botton_value_one: "",
          botton_link_one: ""
        }
      },
      flink_tool: {
        toolType: "flink_setting",
        id: "15",
        data: {
          state: "active",
          searchVal: "", //微页面搜索的值
          searchVal_goods: "", //商品分组搜索的值
          textListL: [
            {
              // 自定义链接列表
              id: 0,
              title: "",
              botton_text_one: "选择跳转的页面",
              botton_value_one: "", //链接名称
              botton_link_one: "",
              mylink: "", //自定义输入链接
              link_type: "", //链接类型
              link_address: "", //自定义链接地址
              weitype_name: "",
              wei_num_link: "3", //微信链接条数
              goodstype_name: ""
            }
          ],
          typeListL: [
            {
              //微页面
              id: 0,
              type_name: "最热分类",
              link_type: "" //链接类型
            },
            {
              id: 1,
              type_name: "最新分类",
              link_type: "" //链接类型
            },
            {
              id: 2,
              type_name: "未分类",
              link_type: "" //链接类型
            }
          ],
          typegoods_ListL: [
            {
              //微页面
              id: 0,
              type_name: "其他1",
              link_type: "" //链接类型
            },
            {
              id: 1,
              type_name: "列表中隐藏2",
              link_type: "" //链接类型
            },
            {
              id: 2,
              type_name: "最热商品3",
              link_type: "" //链接类型
            },
            {
              id: 2,
              type_name: "最新商品",
              link_type: "" //链接类型
            }
          ]
        }
      }
    };
  },
  components: {
    //注册组件
    head_setting,
    pic_ad_setting,
    full_text_setting,
    goods_setting,
    lead_setting,
    text_setting,
    goods_group_setting,
    single_pic_setting,
    fxhd_setting,
    cjhd_setting,
    mshd_setting,
    search_setting,
    title_setting,
    flink_setting
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
    saveSetting() {
      //保存按钮数据操作
      var that = this;

      //				json 代码   that.totalTools
      //还原数据 只要将这里导出的 that.totalTools 赋值给 that.totalTools 即可还原环境

      var intId = 123;
      // 拼接 xml 代码
      var xmlData = "<page ";
      that.totalTools.forEach(function(item, index) {
        if (item.toolType == "head_setting") {
          xmlData +=
            'title="' +
            item.data.title +
            '" backgroundColor="' +
            item.data.backgroundColor +
            '" >';
        } else if (item.toolType == "pic_ad_setting") {
          if (item.data.imgListL.length == 1) {
            intId += 1;
            xmlData +=
              '<u-singleImage id="' +
              intId +
              '"><img src="' +
              item.data.imgListL[0].url +
              '" onclick="page" click-data="' +
              item.data.imgListL[0].jumpUrl +
              '" title="' +
              item.data.imgListL[0].title +
              '"></img></u-singleImage> ';
          } else if (item.data.imgListL.length > 1) {
            intId += 1;
            var newImgList = item.data.imgListL;
            xmlData += '<u-carousel id="' + intId + '">';
            newImgList.forEach(function(nit, index) {
              xmlData +=
                ' <img src="' +
                nit.url +
                '" onclick="page" click-data="' +
                nit.jumpUrl +
                '" title="' +
                nit.title +
                '"></img>';
            });
            //  <img src='http://img.zcool.cn/community/017c5d554909920000019ae9d202fe.jpg@1280w_1l_2o_100sh.jpg' onclick='page' click-data='344' title='全世界最好玩的'></img>
            //  <img src='http://www.17qq.com/img_qqtouxiang/76490995.jpeg' onclick='page' click-data='12121'></img>
            xmlData += "</u-carousel>";
          }
        } else if (item.toolType == "full_text_setting") {
          intId += 1;
          xmlData +=
            '<u-rich-text id="' +
            intId +
            '"><rich-text nodes="' +
            item.data.text +
            '" padding="' +
            item.data.fullScreen +
            '" backgroundcolor="' +
            item.data.backgroundColor +
            '"  ></rich-text></u-rich-text>';
        } else if (item.toolType == "goods_setting") {
          intId += 1;
          xmlData +=
            '<u-goods id="' +
            intId +
            '" goods-form="' +
            item.data.source +
            '" show-type="' +
            item.data.listStyle +
            '" show-goodsName="' +
            item.data.goodsName +
            '" show-buyBtn="' +
            item.data.buyBtn +
            '" show-price="' +
            item.data.price +
            '" show-shopCar="' +
            item.data.shopCar +
            '">';

          if (item.data.goodsList) {
            item.data.goodsList.forEach(function(itm, index) {
              xmlData += '<goodsItem goodsId="' + itm.id + '"></goodsItem>';
            });
          } else {
          }
          xmlData += "</u-goods>";
        } else if (item.toolType == "lead_setting") {
          intId += 1;
          xmlData +=
            '<u-navigation id="' +
            intId +
            '"type="' +
            item.data.modelType +
            '" scrollType = "' +
            item.data.slideSetting +
            '" background-color = "' +
            item.data.backgroundColor +
            '" textColor="' +
            item.data.fontColor +
            '">';

          if (item.data.leadList) {
            item.data.leadList.forEach(function(itm, index) {
              xmlData +=
                '<navigationItem title="' +
                itm.title +
                '"  onclick="page" click-data="' +
                itm.jumpUrl +
                '" imageUrl="' +
                itm.imgUrl +
                shop / decoration / page;
              ('"></navigationItem>');
            });
          }
          xmlData += "</u-navigation>";
        } else if (item.toolType == "goods_group_setting") {
          intId += 1;
          xmlData +=
            '<u-goodsGroup id="' +
            intId +
            '" tamplate="' +
            item.tamplate +
            '">';
          if (item.data.goods_group) {
            item.data.goods_group.forEach(function(itn, index) {
              xmlData +=
                '<groupItem title="' +
                itn.title +
                '" show-type="' +
                item.data.listStyle +
                '" goods-form="' +
                itn.goodsFrom +
                '" show-count="' +
                itn.showCount +
                '"></groupItem>';
            });
          }
          xmlData += "</u-goodsGroup>";
        } else if (item.toolType == "single_pic_setting") {
          if (item.data.imgListL.length == 1) {
            intId += 1;
            xmlData +=
              '<u-singleImage id="' +
              intId +
              '"><img src="' +
              item.data.imgListL[0].url +
              '" onclick="page" height="' +
              item.data.imgListL[0].height +
              '" click-data="' +
              item.data.imgListL[0].jumpUrl +
              '" title="' +
              item.data.imgListL[0].title +
              '"></img></u-singleImage> ';
          }
        } else if (item.toolType == "text_setting") {
          intId += 1;

          xmlData +=
            '<u-text id="' +
            intId +
            '"><text content="' +
            item.data.text +
            '"backgroundColor="' +
            item.data.backgroundColor +
            '" color="' +
            item.data.Color +
            '" font="" font-size="' +
            item.data.fontSize +
            '" onclick="' +
            item.data.jumpUrl +
            '" click-data="666666"></text></u-text>';
        } else if (item.toolType == "search_setting") {
          intId += 1;
          xmlData +=
            '<u-search id="' +
            intId +
            '"><search shape="' +
            item.data.shape +
            '" fonts="' +
            item.data.font_set +
            '"backgroundColor="' +
            item.data.backgroundColor +
            '"titleColor="' +
            item.data.titleColor +
            '"fontColor="' +
            item.data.fontColor +
            '"inputheight="' +
            item.data.inputheight +
            '"text="' +
            item.data.text +
            '">';
          item.data.textListL.forEach(function(itm, index) {
            xmlData +=
              '<textListL textsId="' +
              itm.id +
              '" textsadd="' +
              itm.title +
              '"></textListL>';
          });
        } else if (item.toolType == "title_setting") {
          intId += 1;
          xmlData +=
            '<u-title id="' +
            intId +
            '"><title titleset="' +
            item.data.titleset +
            '" font_set="' +
            item.data.font_set +
            '" label_text="' +
            item.data.label_text +
            '">';
          if (item.data.titleset == "default") {
            xmlData +=
              '<u-defaule titleColor="' +
              item.data.titleColor +
              '" label_title="' +
              item.data.label_title +
              '" label_text="' +
              item.data.label_text +
              '" subtitle="' +
              item.data.subtitle +
              '"botton_value_one="' +
              item.data.botton_value_one +
              '" botton_link_one="' +
              item.data.botton_link_one +
              '">';
          } else {
            xmlData +=
              '<u-weixin date="' +
              item.data.date +
              '" linktitle="' +
              item.data.linktitle +
              '" author="' +
              item.data.author +
              '" linkset="' +
              item.data.linkset +
              '" botton_value="' +
              item.data.botton_value +
              '" botton_link_one="' +
              item.data.botton_link +
              '">';
          }
        } else if (item.toolType == "flink_setting") {
          intId += 1;
          item.data.textListL.forEach(function(itm, index) {
            if (itm.link_type !== "外链") {
              xmlData +=
                '<u-flink id="' +
                intId +
                '"><flink link_type="' +
                itm.link_type +
                '" link_num="' +
                itm.wei_num_link +
                '" link_type_name="' +
                itm.botton_value_one +
                '">';
            } else {
              xmlData +=
                '<u-self link_address="' +
                itm.link_address +
                '" link_type="' +
                itm.link_type +
                '" link_type_name="' +
                itm.botton_value_one +
                '">';
              //              xmlData+='<u-weixin date="'+item.data.date+'" linktitle="'+item.data.linktitle+'" author="'+item.data.author+'" linkset="'+item.data.linkset+'" botton_value="'+item.data.botton_value+'" botton_link_one="'+item.data.botton_link+'">'
            }
          });
        }
      });
      xmlData += "</page>";

      let getUserId = localStorage.getItem("dUserId");
      let getShopId = localStorage.getItem("dShopId");
      let pageId = localStorage.getItem("dPageId") || "";
      xmlData = xmlData.replace(/\"/g, "'");
      var jsonData = JSON.stringify(that.totalTools);
      let name = that.totalTools[0].data.title;
      // if (!pageId) {
      //   that.axios
      //     .post("/baseUrl/api/miniapp/decoration/shop/homepage", {
      //       shopId: parseInt(getShopId),
      //       userId: parseInt(getUserId),
      //       name: name,
      //       pageXml: xmlData,
      //       pageJson: jsonData
      //     })
      //     .then(function(response) {
      //       that.toast('页面数据保存成功')
      //       console.log(response.config.data);
      // 			console.log(response);
      // 			setTimeout(function(){
      // 				window.history.go(-1);
      // 			},500)
      //     })
      //     .catch(function(error) {
      //       console.log(error);
      //     });
      // } else {
      //   that.axios
      //     .post("/baseUrl/shop/decoration/page", {
      //       shopId: parseInt(getShopId),
      //       userId: parseInt(getUserId),
      //       pageId: pageId,
      //       name: name,
      //       pageXml: xmlData,
      //       pageJson: jsonData
      //     })
      //     .then(function(response) {
      // 			that.toast('页面数据保存成功')
      //       console.log(response.config.data);
      // 			console.log(response);
      // 			setTimeout(function(){
      // 				window.history.go(-1);
      // 			},500)
      //     })
      //     .catch(function(error) {
      //       console.log(error);
      //     });
      // }

      let isCreateNewPage = localStorage.getItem("dIsCreateNewPage");
      if (isCreateNewPage === "true") {
        pageId = null;
      }

      that.axios
        .post("/baseUrl/shop/decoration/page", {
          shopId: parseInt(getShopId),
          userId: parseInt(getUserId),
          pageId: pageId,
          name: name,
          pageXml: xmlData,
          pageJson: jsonData
        })
        .then(function(response) {
          that.toast("页面数据保存成功");
          console.log(response.config.data);
          console.log(response);
          setTimeout(function() {
            window.history.go(-1);
          }, 500);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addedit(p) {
      var that = this;
      if (p == "search_tool") {
        let newsearch_tool = new Object();
        newsearch_tool = JSON.parse(JSON.stringify(that.search_tool));
        that.setQuiet();
        that.totalTools.push(newsearch_tool);
      } else if (p == "title_tool") {
        let newtitle_tool = new Object();
        newtitle_tool = JSON.parse(JSON.stringify(that.title_tool));
        that.setQuiet();
        that.totalTools.push(newtitle_tool);
      } else if (p == "flink_tool") {
        let newflink_tool = new Object();
        newflink_tool = JSON.parse(JSON.stringify(that.flink_tool));
        that.setQuiet();
        that.totalTools.push(newflink_tool);
      }
    },
    addimg(m) {
      var that = this;
      if (m == "cjhd") {
        let newcjhd = new Object();
        newcjhd = JSON.parse(JSON.stringify(that.cjhd));
        that.setQuiet();
        that.totalTools.push(newcjhd);
      } else if (m == "mshd") {
        let newmshd = new Object();
        newmshd = JSON.parse(JSON.stringify(that.mshd));
        that.setQuiet();
        that.totalTools.push(newmshd);
      }
    },

    addTools(n) {
      //触发弹窗操作
      var that = this;
      if (n == "head_tool") {
        let newHead_tool = new Object();
        newHead_tool = JSON.parse(JSON.stringify(that.head_tool));
        that.setQuiet();
        that.totalTools.push(that.head_tool);
      } else if (n == "pic_ad_tool") {
        let newpic_ad_tool = new Object();
        newpic_ad_tool = JSON.parse(JSON.stringify(that.pic_ad_tool));
        that.setQuiet();
        that.totalTools.push(newpic_ad_tool);
      } else if (n == "full_text_tool") {
        let newfull_text_tool = new Object();
        newfull_text_tool = JSON.parse(JSON.stringify(that.full_text_tool));
        that.setQuiet();
        that.totalTools.push(newfull_text_tool);
      } else if (n == "goods_tool") {
        let newgoods_tool = new Object();
        newgoods_tool = JSON.parse(JSON.stringify(that.goods_tool));
        that.setQuiet();
        that.totalTools.push(newgoods_tool);
      } else if (n == "lead_tool") {
        let newlead_tool = new Object();
        newlead_tool = JSON.parse(JSON.stringify(that.lead_tool));
        that.setQuiet();
        that.totalTools.push(newlead_tool);
      } else if (n == "text_tool") {
        let newtext_tool = new Object();
        newtext_tool = JSON.parse(JSON.stringify(that.text_tool));
        that.setQuiet();
        that.totalTools.push(newtext_tool);
      } else if (n == "goods_group_tool") {
        let newgoods_group_tool = new Object();
        newgoods_group_tool = JSON.parse(JSON.stringify(that.goods_group_tool));
        that.setQuiet();
        that.totalTools.push(newgoods_group_tool);
      } else if (n == "single_pic_tool") {
        let newsingle_pic_tool = new Object();
        newsingle_pic_tool = JSON.parse(JSON.stringify(that.single_pic_tool));
        that.setQuiet();
        that.totalTools.push(newsingle_pic_tool);
      } else if (n == "fxhd") {
        let newfxhd = new Object();
        newfxhd = JSON.parse(JSON.stringify(that.fxhd));
        that.setQuiet();
        that.totalTools.push(newfxhd);
      }
    },
    setQuiet() {
      //改变state状态为全关闭
      var that = this;
      var len = that.totalTools.length;
      for (let index = 0; index < len; index++) {
        if (that.totalTools[index].data.state) {
          that.totalTools[index].data.state = "quiet";
        }
      }
    },
    setActive(n) {
      var that = this;
      setQuiet(); //全关闭再开启点击的
      var len = that.totalTools.length;
      for (let index = 0; index < len; index++) {
        if (that.totalTools[index].toolType == n) {
          that.totalTools[index].data.state = "active";
        }
      }
    },
    remove_content(n) {
      //删除
      this.totalTools.splice(n, 1);
    }
  },
  created() {
    //生命周期created在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
    let that = this;
    let getUserId = localStorage.getItem("dUserId");
    let getShopId = localStorage.getItem("dShopId");
    let isCreateNewPage = localStorage.getItem("dIsCreateNewPage");

    that.addTools("head_tool");
    if (getShopId) {
      if (isCreateNewPage === "false") {
        that.axios
          .post("/baseUrl/api/miniapp/show/shop/homepage", {
            shopId: parseInt(getShopId)
          })
          .then(function(response) {
            console.log(response.data);
            if (response.data.data.pageJson) {
              that.totalTools = JSON.parse(response.data.data.pageJson);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }

      that.axios
        .post("/baseUrl/api/miniapp/shop/pages", {
          shopId: parseInt(getShopId)
        })
        .then(function(response) {
          console.log(response.data);
          if (response.data.data.pages.length > 0) {
            let pages = response.data.data.pages;
            for (let i in pages) {
              pages[i].id = pages[i].pageId;
              pages[i].type_name = pages[i].pageName;
              pages[i].link_type = "";
              pages[i].createTime = pages[i].createTime;
            }
            that.pages = pages;
            that.flink_tool.data.typeListL = pages;
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
              let newgroups = new Array();
              for (let i in goodGroups) {
                newgroups[i] = {
                  id: goodGroups[i].goodGroupId,
                  type_name: goodGroups[i].goodGroupName,
                  link_type: ""
                };
              }
              that.flink_tool.data.typegoods_ListL = newgroups;
            } else {
              that.toast("您还没有设置商品分组，请先设置商品分组");
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
#app {
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
.view_component{
}
</style>
