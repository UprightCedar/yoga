<template>
  <div class="community-page">
    <bg></bg>
    <trend-list :evaluteList='evaluteList' @getTrend='getTrend' @updataTrends='updataTrends' :infiniteId='infiniteId'></trend-list>
    <nav-bar></nav-bar>
  </div>
     
</template>

<script>
import navBar from '@/components/navBar'
import trendList from '@/components/trendList'
import { getTrend } from '../fetch/api'
export default {
  name: 'community',
  data () {
    return {
      evaluteList: [],
      page: 0,
      infiniteId: +new Date(),
    }
  },
  activated() {
    document.title = '圈子';
    
  },
  methods: {
    getTrend($state) {
      this.page += 1;
      getTrend(this.page).then(res => {
        if (res.state == 200) {
          let lists = res.data.data
          if (lists.length) {
            lists.forEach((item, index) => {
              if (item.img_paths) {
                item.img_paths = item.img_paths.split(',')
              }
            })
            
            this.evaluteList.push(...lists)
            $state.loaded();
          }else {
            $state.complete()
          }
        } else {
          this.$toast.top(res.msg)
        }
      })
    },
    updataTrends($state) {
      this.page = 0
      this.evaluteList = []
      this.infiniteId += 1
    }
  },
  
  components: {
    navBar,
    trendList
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.community-page {
  padding-bottom: 120px;
}
</style>
