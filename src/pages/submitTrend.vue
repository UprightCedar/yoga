<template>
  <div class="submitTrend-page">
    {{posterCover}}
    <div class="problem-title" v-if='type == 2'><input type="text" v-model.trim="title" placeholder="请输入您的问题，以问号结束"></div>
    <div class="submit-trend-wrap">
      <textarea class="trend-text-input" :placeholder="type == 1 ? '请输入你的动态' : ''" v-model.trim="content"></textarea>
    </div>
    <div class="submit-trend-imgs">
      <div v-for='(item,index) in imgs' :key='index' class="trend-imgs-box">
        <img :src="item" alt="" class="trend-img-item">
        <img src="../assets/issue_del_icon@3x.png" alt="" class="del-trend-imgs" @click="deleteImg(item, index)">
      </div>
      <div class="trend-imgs-box" v-if='videoUrl !== ""'>
        <img src="../assets/issue_del_icon@3x.png" alt="" class="del-trend-imgs" @click="deleteVideo(videoUrl)">
        <video :src="videoUrl" 
               class="trend-img-item" 
               preload="auto" 
               @ended="endVideo()"
               crossorigin="*"
               ref="videoTime"
              @pause='pauseVideo'
              id='video'
              v-show="!showPost"></video>
        <img :src="posterCover" alt="" v-show='showPost' class="video-poster" >
        <img src="../assets/video_icon.png" alt="" class="video-icon" v-show='showPost' @click.stop="playVideo"> 
      </div>
      <div class="add-img-box add-img" v-if='imgs.length != 0 && imgs.length < 9'>
        <img src="../assets/issue_addphoto@3x.png" alt="" class="add-img" >
        <input type="file" @change="selectImg($event)" class="input-img" name="img1" accept="image/*" ref="inputImg1">
      </div>
    </div>
    <div class="add-trend-btn">
      <div class="add-btns-box">
        <div class="add-img-btn" @click='videoUrl === "" ?  "" : toast()' :style="videoUrl ? 'opacity: 0.5' : 'opacity: 1'">
          <img src="../assets/issue_photo_icon@3x.png" alt="">
          <span>图片</span>
          <input type="file" @change="imgs.length < 9 ? selectImg($event) : imgToast()" :disabled='videoUrl ? true : false' class="input-img1" name="img2" accept="image/*" ref="inputImg2" v-if='videoUrl === ""'>
        </div>
        <div class="add-video-btn" @click='imgs.length === 0 ? "" : toast()' :style="imgs.length ? 'opacity: 0.5' : 'opacity: 1'">
          <img src="../assets/issue_phptp_icon@3x.png" alt="">
          <span>视频</span>
          <input type="file" @change='selectVideo' class="input-img1" accept="video/*" :disabled='imgs.length ? true : false' ref="inputVideo" v-if='imgs.length == 0'>
        </div>
      </div>
      <!-- 发问题有title就行 -->
      <div :class="[title !=='' ?  'can-submit' : '' , 'submit-trend-btn']"  @click="submitTrends" v-if='type == 2'>发表</div>
      <div :class="[content !==''  ?  'can-submit' : '' , 'submit-trend-btn']"  @click="submitTrends" v-if='type == 1'>发表</div>
    </div>
    <div class="loading-bg" v-if='showLoading'>
      <loading></loading>
    </div>
  </div>
</template>

<script>
import { postImg, deleteImg, deleteVideo, addTrend, getTecSign } from '../fetch/api'
// 获取原视频   宽高
function getVideoDimensionsOf(url){
	return new Promise(function(resolve){
		// create the video element
		let video = document.createElement('video');

		// place a listener on it
		video.addEventListener( "loadeddata", function () {
			// retrieve dimensions
			let height = this.videoHeight;
			let width = this.videoWidth;
			// send back result
			resolve({
				height : height,
        width : width,
        video: video
			});
		}, false );

		// start download meta-datas
    video.src = url;
	});
}




export default {
  name: 'submitTrend',
  data () {
    return {
      type: 1,
      imgs: [],
      videoUrl: '',
      showLoading: false,
      content: '',
      id: '',
      title: '',
      videoId: '',
      showPost: true,
      posterCover: ''
    }
  },
  mounted() {
    document.getElementsByClassName('submitTrend-page')[0].style.minHeight = window.innerHeight + 'px'
  },
  activated() {
    const query = this.$route.query
    this.type = query.type
    this.id  = query.group_id
    this.imgs = []
    this.videoUrl = ''
    this.showLoading = false
    this.content = ''
    this.title = ''
    this.videoId = ''
    if (query.type == 1) {
      document.title = '发动态'; 
    } else if (query.type == 2) {
     document.title = '提问题'; 
    };
  },
  methods: {

    playVideo() {
      this.showPost = false
      this.$refs.videoTime.play()
      this.launchFullScreen()
    },
    
    endVideo() {
      this.exitFullscreen()
      this.showPost = true
      this.$refs.videoTime.webkitExitFullScreen()
    },
    pauseVideo() {
      this.exitFullscreen()
      this.showPost = true
    },
    exitFullscreen() {
      var de = document;
      if (de.exitFullscreen) {
          de.exitFullscreen();
      } else if (de.mozCancelFullScreen) {
          de.mozCancelFullScreen();
      } else if (de.webkitCancelFullScreen) {
          de.webkitCancelFullScreen();
      }
    },
    launchFullScreen() {
      var element = document.documentElement;
      if(element.requestFullScreen) {
          element.requestFullScreen(); 
      } else if(element.mozRequestFullScreen) {
          element.mozRequestFullScreen(); 
      } else if(element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen(); 
      }
    },
    getSignature(callback) {
      getTecSign().then(result => {
        if (result.state == 200) {
          callback(result.data.signature)
        }
      })
    },
    selectImg(e) {
      const inputFile = e.target.files
      const inputImg1 = this.$refs.inputImg1
      const inputImg2 = this.$refs.inputImg2
      if(inputFile.length){ 
        let data = new FormData();
        data.append('file', inputFile[0]);
        data.append('type', 6)
        this.showLoading = true
        postImg(data).then(res => {
          this.showLoading = false
          if (inputImg1) {
            inputImg1.value = '';
          };
          if (inputImg2) {
            inputImg2.value = '';
          };
          if (res.state == 200) {
            if (this.imgs.length < 10) {
              this.imgs.push(res.data[0])
            }
          } else {
            this.$toast.top(res.msg)
          }
        })
      }
    },
    getUrl(file) {
      var url = null; 
      if (window.createObjcectURL != undefined) { 
          url = window.createOjcectURL(file); 
      } else if (window.URL != undefined) { 
          url = window.URL.createObjectURL(file); 
      } else if (window.webkitURL != undefined) { 
          url = window.webkitURL.createObjectURL(file); 
      } 
      return url; 
    },
    selectVideo(e) {
      const inputFile = this.$refs.inputVideo
      const that = this
      const video_file = this.$refs.inputVideo.files[0]
      this.videoSrc = this.getUrl(video_file)
      if(this.$refs.inputVideo.files[0].length !== 0){ 
        this.showLoading = true
        qcVideo.ugcUploader.start({
          videoFile: video_file,//视频，类型为 File
          getSignature: that.getSignature,//前文中所述的获取上传签名的函数
          error: function(result){//上传失败时的回调函数
            that.showLoading = false
            that.$toast.top('上传失败')
          },
          finish: function(result){//上传成功时的回调函数
            that.showLoading = false
            that.videoUrl = result.videoUrl
            that.videoId = result.fileId
            that.$toast.top('上传成功')
            that.getVideoCover(result.videoUrl)
          }
        }) 
      }
      setTimeout(() => {
        this.showLoading = false
      }, 60 * 1000)
    },
    getVideoCover(url) {
      let that = this
      let video = document.getElementById('video')
      if (video) {
        getVideoDimensionsOf(url).then(function(dimensions){
          var canvas = document.createElement("canvas");
          canvas.width = 720;
          canvas.height = 405;
          alert(dimensions.width)
          alert(dimensions.height)
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          let src = canvas.toDataURL("image/png");
          that.posterCover = src
        });
      } else {
        setTimeout(() => {
          this.getVideoCover(this.videoUrl)
        }, 1000);
      }
      
    },




    

    toast() {
      this.$toast.top('图片或视频只能上传一种！')
    },
    imgToast() {
      this.$toast.top('最多只能只能上传9张图片！')
    },
    deleteImg(url, index) {
      this.showLoading = true
      deleteImg({url: url}).then(res => {
        this.showLoading = false
        if (res.state == 200) {
          this.$toast.top(res.msg)
          this.imgs.splice(index,1);
        } else {
          this.$toast.top(res.msg)
        }
      })
      setTimeout(() => {
        this.showLoading = false
      }, 60 * 1000)
    },
    deleteVideo(url) {
      this.showLoading = true
      deleteVideo({url: url}).then(res => {
        this.showLoading = false
        if (res.state == 200) {
          this.videoUrl = ''
          this.$toast.top(res.msg)
        } else {
          this.$toast.top(res.msg)
        }
      })
      setTimeout(() => {
        this.showLoading = false
      }, 60 * 1000)
    },
    submitTrends() {
      if (this.type == 1) {
        if (this.content) {
          const params = {
            type: this.type,
            content:　this.content,
            group_id: this.id,
            video_path: this.videoUrl,
            video_id: this.videoId,
            image_paths: this.imgs.length > 0 ? this.imgs.join(',') : ''
          }
          this.postTrend(params)
        } else {
          this.$toast.top('内容不能为空')
        }   
      } else if (this.type == 2) {
        if (!this.title) {
          this.$toast.top('问题标题不能为空')
        // } 
        // else if (!this.content || !this.imgs.length) {
          // this.$toast.top('问题描述不能为空')
        } else {
          const params = {
            content: this.title,
            type: this.type,
            desc:　this.content,
            group_id: this.id,
            video_path: this.videoUrl,
            video_id: this.videoId,
            image_paths: this.imgs.length > 0 ? this.imgs.join(',') : ''
          }
          this.postTrend(params)
        }
      }
    },

    postTrend(params) {
      addTrend(params).then(res => {
        if (res.state == 200) {
          this.$toast.top(res.msg)
          this.$router.go(-1)
        } else {
          this.$toast.top(res.msg)
        };
        let trendUpdate = JSON.parse(localStorage.getItem('trendUpdate'))
        trendUpdate.doWhat = 2
        localStorage.setItem('trendUpdate', JSON.stringify(trendUpdate))
      })
    }

  },
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.submitTrend-page {
  background: #F4F6F9;
  position: relative;
}

.can-submit {
  background: #B78FDA!important;
  color: #fff!important;
}

.submit-trend-wrap {
  background: #fff;
  padding: 30px;
}

.trend-text-input {
  border: 0;
  outline: medium;
  width: 690px;
  resize: none;
  height: 300px;
  overflow-y: scroll; 
  font-size: 32px;
  color: #444C52;
}

.trend-text-input::placeholder {
  color: #ABB5BC;
}

.trend-imgs-box {
  position: relative;
  width: 116px;
  height: 116px;
  margin-right: 22px;
  margin-bottom: 20px;
}

.submit-trend-imgs {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 30px 0;
  background: #fff;
}

.trend-img-item {
  width: 116px;
  height: 116px;
}

.video-poster {
  width: 116px;
  height: 116px;
  background: rgba(0,0,0,.4)
}

.del-trend-imgs {
  width: 36px;
  height: 36px;
  position: absolute;
  top: -18px;
  right: -18px;
}

.add-img-box {
  position: relative;
  margin-bottom: 20px;
}

.add-img {
  width: 116px;
  height: 116px;
}

.input-img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.add-trend-btn {
  height: 96px;
  background: #fff;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #e1e2e3;
}

.add-img-btn, .add-video-btn {
  display: flex;
  align-items: center;
  position: relative;
}

.add-video-btn {
  margin-left: 64px;
}

.add-btns-box {
  font-size: 28px;
  color: #444D52;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-btns-box img {
  width: 44px;
  height: 44px;
  margin-right: 20px;
}

.input-img1 {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
}

.submit-trend-btn {
  width: 120px;
  height: 66px;
  background: #E1E2E4;
  color: #1E1E1E;
  text-align: center;
  line-height: 68px;
  border-radius: 33px;
  font-size: 28px;
}

.video-icon {
  position: absolute;
  width: 38px;
  height: 38px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.loading-bg {
  background: rgba(255,255,255,0);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.problem-title {
  height: 100px;
  padding: 0 30px;
  background: #fff;
  margin-bottom: 12px;
}

.problem-title input {
  font-size: 32px;
  font-weight: 600;
  color: #444C52;
  border: 0;
  outline: medium;
  width: 690px;
}


.problem-title input::placeholder {
  color: #ABB5BC;
}





</style>
