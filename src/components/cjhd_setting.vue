<template>
  <div class="fxhd_content">
    <div class="img_content" @click="addedit()" style="display: block;">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <transition-group tag="div" name="image">
            <div class="swiper-slide" v-show="index===mark" v-for="(item,index) in data.imgListL" v-bind:key="index">
              <div id="img_cjhd"><img :src="item.url" draggable="false" v-if=""></div>
              <div class="text_set">
                <input style="width: 25%" type="text"  v-model="item.head_settitle"/>
                <input style="width: 50%" type="text"  v-model="item.head_settitle"/>
                <input style="width: 25%" type="text"  v-model="item.head_settitle"/>
              </div>
              <p v-if="item.title" >{{item.title}}</p>
            </div>
          </transition-group>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

    <div class="edit1 edit" v-show="data.state == 'active'">
      <h3 class="edit1_head cjhd_head">抽奖活动设置</h3>
      <div class="edit1_mode">
        <ul class="edit1_item_group" id="uuid1">
          <li v-for="(item,index) in data.imgListL" v-bind:key="index" >
            <div class="edit1_item">
              <div>
                <label for>图片设置：高度</label>
                <input type="text" v-model="item.img_height">
                <br>
                <label for style="text-indent:60px">宽度</label>
                <input type="text" v-model="item.img_width">
                <br><br>
                <label for>分享文案设置：</label>
                <input type="text" v-model="item.font_settext">
                <br><br>
                <label for>分享标题设置：</label>
                <input type="text" v-model="item.head_settitle">
                <br><br>
                <label for>&#x3000;&#x3000;标题大小：</label>
                <input type="text" v-model="item.head_size">
                <br><br>
                <label for>&#x3000;&#x3000;标题风格：</label>
                <input type="text" v-model="item.head_family">
                <br><br>
                <label for>&#x3000;&#x3000;标题颜色：</label>
                <input type="text" v-model="item.head_color">
                <br><br>
                <label for>&#x3000;&#x3000;字体大小：</label>
                <input type="text" v-model="item.font_size">
                <br><br>
                <label for>&#x3000;&#x3000;字体风格：</label>
                <input type="text" v-model="item.font_color">
                <br><br>
                <label for>&#x3000;&#x3000;字体颜色：</label>
                <input type="text" v-model="item.font_family">
              </div>
            </div>
          </li>
        </ul>
        <button @click="remove_content()" class="remove_content">X</button>
      </div>
      <div>
        <button @click="saveSetting()" class="button_blue">保存</button>
        <button class="button_blue">取消</button>
      </div>
    </div>

    <button @click="remove_content()" class="remove_content">X</button>
  </div>
</template>

<script>
  export default {
    name: "HelloWorld",
    data() {
      return {
        msg: "Welcome to Your Vue.js App",
        mySwiper: '',
        mark: 0,
        fullList: false,
        //每个图片管理器生成不同的id,以防止冲突
        randomId: 'editor_ ' + (Math.random() * 100000000000000000),
        // my_data:data,
      };
    },
    props: ["data"],
    methods: {
      addedit() {
        this.$emit('quiet', '')
        this.data.state = 'active'
      },
      remove_content() {
        this.$emit('remove', '')
      },
    },

  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .image-enter-active {
    transform: translateX(0);
    transition: all 1.5s ease;
  }
  .edit1_head{
    font-size: larger;
    text-align: center;
    background:cornflowerblue;
    width:50%;
    line-height: inherit;
    margin-left: 15%;
  }
  .image-leave-active {
    transform: translateX(-100%);
    transition: all 1.5s ease;
  }
  .swiper-slide{
    padding: auto;
    margin: auto;
  }
  #img_cjhd{
    width: 70%;
    margin: auto;
  }
  #title_fxhd{
    width:50%;

  }
  .image-enter {
    transform: translateX(100%);
  }

  .image-leave {
    transform: translateX(0);
  }
  .page_select{
    width: 174px;
    height: 26px;
  }
  .button_blue{
    background:cornflowerblue;
    color:white;
    width: 80px;
    height: 35px;
    border: none;
    margin-left: 50px;
  }
  .text_set{
    display: flex;

  }
</style>
