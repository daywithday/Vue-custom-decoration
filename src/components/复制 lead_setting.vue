<template>
	<div class="full_text_content">
		<div @click="addedit()" class="text_content">
			
		</div>
		
		<div class="edit2 edit" v-show="data.state == 'active'">
			<h3 class="edit_head">富文本</h3>
			<div class="edit2_control1">
				
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
				
			};
		},
		props: ["data"],
		
		mounted() {
			
		},
		methods: {
			addedit() {
				this.$emit('quiet', '')
				this.data.state = 'active'
			},
			remove_content() {
				this.$emit('remove', '')
			}
		},
		components: {
			
		},
		beforeDestroy() {
		
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>