<template>
	<div class="pic_ad_content">
		<div class="img_content" @click="addedit()" style="display: block;">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<transition-group tag="div" name="image">
						<div class="swiper-slide" v-show="index===mark" v-for="(item,index) in data.imgListL" v-bind:key="index">
							<img :src="item.url" draggable="false">
							<p v-if="item.title">{{item.title}}</p>
						</div>
					</transition-group>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</div>

		<div class="edit1 edit" v-show="data.state == 'active'">
			<h3 class="edit1_head">图片广告</h3>
			<div class="edit1_mode">
				<div class="edit1_mode_head">
					<span>选择模板:</span>
				</div>
				<div class="edit1_mode_content">
					<img src="../../static/img/u2286.png">
				</div>
			</div>

			<ul class="edit1_item_group" id="uuid1">
				<li v-for="(item,index) in data.imgListL" v-bind:key="index" v-dragging="{ item: item, list: data.imgListL, group: 'item' }">
					<div class="edit1_item">
						<div class="edit1_item_left">
							<img :src="item.url">
							<p @click="showChangeBtn(randomId,index)">更换图片</p>
							<div class="edit1_item_left_change" v-show="item.changeBtn">
								<label :for="''+randomId+index">图片地址：</label><input type="text" name="" :id="''+randomId+index" value="" v-model="item.url" @blur="hideChangeBtn(index)" />
							</div>
						</div>
						<div class="edit1_item_right">
							<label for>标题：</label>
							<input type="text" v-model="item.title">
							<br>
							<br>
							<label for>链接：</label>

							<!--<input type="text" v-model="item.jumpUrl">-->

							<div style="display: inline-block;position: relative;">
								<select v-model="item.jumpUrl" class="page_select">
									<option disabled value="">选择跳转到的页面</option>
									<option v-for="(i,index) in pages" v-bind:key="index" :value="i.id">{{i.type_name}}{{i.id}}</option>
								</select>
							</div>

						</div>
						<button @click="remove_ImgItem(index)" class="swiper-slide-remove">X</button>
					</div>
				</li>
			</ul>

			<div class="edit1_newItem" @click="add_edit1_item()" v-show="!fullList">
				<p style="color: #337ab7;">
					<i class="glyphicon glyphicon-plus"></i> 添加一个背景图
				</p>
				<p>建议尺寸 750x350 像素</p>
			</div>
			<span style="color: gray;">最多添加10个广告，拖动选中的图片广告可对其排序</span>
		</div>

		<button @click="remove_content()" class="remove_content">X</button>

	</div>
</template>

<script>
	//	import Swiper from 'swiper';
	//	import 'swiper/dist/css/swiper.min.css';

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
		props: ["data","pages"],
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
				var len = that.data.imgListL.length

				if(len < 10) {
					that.data.imgListL.push({
						id: len + 1,
						url: 'http://pic1.nipic.com/2008-12-30/200812308231244_2.jpg',
						title: '',
						jumpUrl: '',
						changeBtn: false
					})
					that.fullList = false
				} else {
					that.fullList = true
				}

			},
			createSwiper() {

			},
			autoPlay() {
				this.mark++;
				var len = this.data.imgListL.length
				if(this.mark >= len) { //当遍历到最后一张图片置零
					this.mark = 0
				}
			},
			play() {
				setInterval(this.autoPlay, 2500)
			},
			remove_ImgItem(n) {
				var len = this.data.imgListL.length
				if(len <= 1) {
					this.mark = 0
				} else {
					this.fullList = false
					this.data.imgListL.splice(n, 1);
				}
			},
			showChangeBtn(title, n) {

        var that = this;
        localStorage.setItem("dIsPageSelectImg", true);
        layer.open({
          type: 2,
          area: ['900px', '800px'],
          fixed: false, //不固定
          maxmin: true,
          content: '/images/select',
          title: '图片库',
          end : function() {
            let arrSelectImgs = JSON.parse(localStorage.getItem("dPageSelectedImgs"));
            var imgOne = that.data.imgListL[0];
            imgOne.url = arrSelectImgs[0];
            localStorage.setItem("dIsPageSelectImg", false);
            localStorage.setItem("dPageSelectedImgs", '');
          }

        });

				// var that = this
				// that.$set(that.data.imgListL[n], 'changeBtn', true)
				// this.$nextTick(() => {
				// 	document.getElementById('' + title + n).focus()
				// })

			},
			hideChangeBtn(n) {
				var that = this
				that.$set(that.data.imgListL[n], 'changeBtn', false)
			}

		},
		mounted() {
			this.play()
			this.createSwiper()
			this.$dragging.$on('dragged', ({
				value
			}) => {
				
			})
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.image-enter-active {
		transform: translateX(0);
		transition: all 1.5s ease;
	}

	.image-leave-active {
		transform: translateX(-100%);
		transition: all 1.5s ease;
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
</style>
