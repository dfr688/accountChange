<template>
  <div class="swiper">
    <swiper :options="swiperOption" class="swiper">
            <swiper-slide class="text">
                <slot></slot>
            </swiper-slide>
    </swiper>
  </div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import 'swiper/dist/css/swiper.css'
	
export default {
  name: '',
  data () {
    return {
      swiperOption: {
					direction: 'vertical',
					slidesPerView: 'auto',
					freeMode: true,
					setWrapperSize: true,
					
					// mousewheel:true,
			}
    }
		},
	
	components: {
			swiper,
			swiperSlide
	},
}
</script>


<style scoped>
	.swiper{
		height: 100%;
	}
		/* .swiper{
        height: 300px;
        overflow: hidden;
    }
    .text{
        font-size: 18px;
        text-align: left;
        padding: 30px;
        box-sizing: border-box;
        height: auto;
    } */
		.text{
			height: auto;
		}

</style>
