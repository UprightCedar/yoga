import { fetch } from "./fetch"; //引用fetch.js
// const appid = 'wx607cf098ef356470'


// jsdk 签名
export function getSign(params) { 
  return fetch('/api/my/signature?url=' + params)
}

// 腾讯视频签名
export function getTecSign() {
  return fetch('/api/my/vod_signature')
}

// 分享信息

export function getShareInfo(params) { 
  return fetch(`/api/my/share?id=${params.id}&type=${params.type}`)
}

// 获取用户信息
export function getUser() { 
  return fetch('/api/my/info')
}

// 获取微信号

export function getWx() { 
  return fetch('/api/lesson/get_service_wechat')
}

// 检测是否微信和手机号互相绑定过
export function checkPhone(phone) {
  return fetch(`/api/my/check_mobile_user?mobile=${phone}`)
}

// 修改密码
export function changePhone(params) {
  return fetch(`/api/my/password`, {
    method: 'post',
    data: params
  })
}

// 我的课程
export function getCourse(params) { 
  return fetch('/api/lesson/my?page=' + params)
}
// 发送验证码
export function sedCode(params) { 
  return fetch('/api/my/send_sms', {
    method: 'post',
    data: params
  })
}

// 验证验证码
export function checkCode(params) { 
  return fetch('/api/my/mobile_bind', {
    method: 'post',
    data: params
  })
}


// 文章列表
export function getArticleList() { 
  return fetch('/api/information/index')
}

export function getArticleUrl(params) { 
  return fetch(`/api/information/detail/${params}`)
}

/**
 * @params  课程 type = 2 训练营 type = 1
 */
export function getCourseList(type) { 
  return fetch(`/api/lesson/index?page=1&type=${type}`)
}

/**
 *@params id 课程/训练营 id 详情
 */

export function getDetail(id) { 
  return fetch(`/api/lesson/detail/${id}`)
}

export function getCurrentCourseEval(params) { 
  return fetch(`/api/circle/news?page=${params.page}&group_id=${params.id}`)
}


/**
 *@params id 课程/训练营id 收藏
 */

export function collectCourse(id) { 
  return fetch(`/api/lesson/fav`, {
    method: 'post',
    data:　{id: id}
  })
}

/**
 *@params id 课程/训练营id 取消收藏
 */

export function cancleCollect(id) { 
  return fetch(`/api/lesson/unfav`, {
    method: 'post',
    data:　{id: id}
  })
}


/**
 * 获取视频详情  @params group_id, goods_id
 */

export function getVideoDetail(group_id, goods_id) { 
  return fetch(`/api/lesson/video?group_id=${group_id}&goods_id=${goods_id}`)
}

/**
 *@params 获取圈子 
 */

export function getTrend(params) { 
  return fetch(`/api/circle/news?page=${params}`)
}


/**
 *提问题params.type = 2
 *回答params.type = 3
 *发动态params.type = 1
 */

export function addTrend(params) { 
  return fetch(`/api/circle/publish`, {
    method: 'post',
    data: params
  })
}
/**
 * 
 * 获取评论内层主的互动
 */
export function getSomeoneReply(params) { 
  return fetch(`/api/circle/replies/23`)
}

/**
 * 
 * 获取圈子动态单条详情
 */
export function getSomeoneTrend(params) { 
  return fetch(`/api/circle/detail/${params.id}?page=${params.page}`)
}



// 获取自己的动态
export function myTrend(params) { 
  return fetch(`/api/circle/news?page=${params}&mine=1`)
}

// 获取圈子单条回答的详情
export function getSomeOneAnswer(params) { 
  return fetch(`/api/circle/answer/${params}?page=${1}`)
}

// 更新动态
export function updataTrend(params) {
  return fetch(`/api/circle/news_single?news_id=${params}`)
}


// 评论后更新数据
export function updateEval(params) {
  return fetch(`/api/circle/single?${params}`)
}


/**
 * 
 * 评论动态，或者评论回答
 */
export function replayOrCommit(params) { 
  return fetch(`/api/circle/evaluate`, {
    method: 'post',
    data: params
  })
}

//  获取动态内层主的互动
export function getComments(params) { 
  return fetch(`/api/circle/replies/${params}`)
}
/**
 * 
 * 删除动态或者评论
 */
export function delEval(params) { 
  return fetch(`/api/circle/delete`, {
    method: 'post',
    data: params
  })
}


/**
 * 
 * 点赞
 */
export function addSuport(params) { 
  return fetch(`/api/circle/thumb`, {
    method: 'POST',
    data: params
  })
}

/**
 * 
 * 客服相关
 */
export function getContact(params) { 
  return fetch(`/api/my/service`)
}

/**
 * 
 * 获取分享图片的文案
 */
export function shareImg(params) { 
  return fetch(`/api/my/copywrite?string_id=1&image_id=5`)
}

/**
 * 
 * 获取课程页的banner图
 */
export function getBanner(params) { 
  return fetch(`/api/my/banner`)
}

/**
 * 
 * 单张或多张图片上传
 */
export function postImg(params) { 
  return fetch(`/api/my/img`, {
    method: 'post',
    data: params
  })
}


/**
 * 
 * 上传视频
 */
export function postVideo(params) { 
  return fetch(`/api/my/video`, {
    method: 'post',
    data: params
  })
}

/**
 * 
 * 获取前台的语言包
 */
export function getPackage(params) { 
  return fetch(`/api/my/language`)
}

/**
 * 
 *  删除图片
 */
export function deleteImg(params) { 
  return fetch(`/api/my/del_img`, {
    method: 'post',
    data: params
  })
}

export function deleteVideo(params) { 
  return fetch(`/api/my/del_video`, {
    method: 'post',
    data: params
  })
}


/**
 * 
 * 购买课程或者训练营生成订单
 */
export function buyCourse(params) { 
  return fetch(`/api/order/group`, {
    method: 'post',
    data: params
  })
}


/**
 * 
 * 查看订单状态
 */
// export function getOrder(params) { 
//   return fetch(`/api/order/status`)
// }


/**
 * 
 * 获取会员的信息
 */
export function getVip(params) { 
  return fetch(`/api/order/vip_info?type=${params}`)
}


/**
 * 
 *  购买会员，购买或升级私教会员
 */
export function buyVip(params) { 
  return fetch(`/api/order/vip`, {
    method: 'post',
    data: params
  })
}


/**
 * 
 *  赠送课程或者训练营
 */
export function sendCourse(params) { 
  return fetch(`/api/order/giving`, {
    method: 'post',
    data: params
  })
}

export function getSendInfo(params) { 
  return fetch(`/api/order/giving_detail?id=${params}`)
}


/**
 * 
 *  在赠送上添加赠送语
 */
export function sendText(params) { 
  return fetch(`/api/order/giving_message`, {
    method: 'post',
    data: params
  })
}

/**
 * 
 *  赠送记录 或 收到的赠送记录
 */
export function sendRecord(params) { 
  return fetch(`/api/order/givings?type=${params.type}&page=${params.page}`)
}


/**
 * 
 *  接受赠送
 */
export function reciveSend(params) { 
  return fetch(`/api/order/get_giving`, {
    method: 'post',
    data: params
  })
}

/**
 * 
 *  支付回调接口
 */
export function payCallBack(params) { 
  return fetch(`/api/callback/wechat_pay?order_id=1&paid_info`)
}

/**
 * 
 *  消息通知开关
 */
export function msgBtn(params) { 
  return fetch(`/api/notification/setting`, {
    method: 'post',
    data: params
  })
}

export function getSetting(params) { 
  return fetch(`/api/notification/my_setting`)
}

/**
 * 
 *  消息通知-首页
 */
export function msgType(params) { 
  return fetch(`/api/notification/index`)
}


/**
 * 
 *  消息通知列表（分类型） 
 */
export function msgList(params) { 
  return fetch(`/api/notification/lst?type=${params.type}&page=${params.page}`)
}


/**
 * 
 *  消息通-已读
 */
export function msgRead(params) { 
  return fetch(`/api/notification/read`, {
    method: 'post',
    data: params
  })
}



/**
 * 
 *  修改个人资料
 */
export function changUserInfo(params) { 
  return fetch(`/api/my/edit_info`, {
    method: 'post',
    data: params
  })
}

// 获取系统消息
export function getSysMsg(params) {
  return fetch(`/api/notification/system?page=${params}`)
}

/**
 * 
 *  咨询 投诉 反馈
 */
export function feedBack(params) { 
  return fetch(`/api/feedback/consultation`, {
    method: 'post',
    data: params
  })
}

// 收藏
export function collectList(params) { 
  return fetch(`/api/my/fav?type=${params.type}&page=${params.page}`)
}

// 获取 关于的信息
export function getAbout() {
  return fetch(`/api/my/about`)
}


export function getClass (params) {
  return fetch(`/api/lesson/lesson?page=${params}`)
}


export function getMoreCourse (params) {
  return fetch(`/api/lesson/index?page=${params.page}&type=2&category_id=${params.id}`)
}