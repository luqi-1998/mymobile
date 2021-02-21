import _fetch from './request'

function technicList (data) {
  return _fetch({
    url: '/articles/technic',
    params: data
  })
}
function articlesShare (data) {
  return _fetch({
    url: '/articles/share',
    method: 'get',
    params: data
  })
}
function hotData () {
  return _fetch({
    url: '/chart-data/hot',
    method: 'get'
  })
}
// 面试技巧详情
function technicInfo (id) {
  return _fetch({
    url: '/articles/technic/' + id,
    method: 'get'
  })
}

// 城市索引
function chartIndexes () {
  return _fetch({
    url: '/chart-data/indexes',
    method: 'get'
  })
}
// 市场数据
function statistics (data) {
  return _fetch({
    url: '/chart-data/statistics',
    method: 'get',
    params: data
  })
}
// 面经详情
function share (id) {
  return _fetch({
    url: '/articles/share/' + id,
    method: 'get'
  })
}
// 面经评论
function commentNems (id, data) {
  return _fetch({
    url: '/articles/comments/' + id,
    method: 'get',
    params: data
  })
}
// 面经热搜
function shareTopSearch () {
  return _fetch({
    url: '/articles/shareTopSearch',
    method: 'get'
  })
}
// 发表评论
function articlesComments (data) {
  return _fetch({
    url: '/articles/comments',
    method: 'post',
    needToken: true,
    data
  })
}
// 点赞文章
function articlesStar (data) {
  return _fetch({
    url: '/articles/star',
    method: 'post',
    needToken: true,
    data
  })
}
// 收藏面经
function articlesCollect (data) {
  return _fetch({
    url: '/articles/collect',
    method: 'post',
    needToken: true,
    data
  })
}
// 点赞面经
function articleCommentsStar (data) {
  return _fetch({
    url: '/article-comments/star',
    method: 'post',
    needToken: true,
    data
  })
}
export {
  technicList,
  hotData,
  articlesShare,
  technicInfo,
  chartIndexes,
  statistics,
  share,
  commentNems,
  shareTopSearch,
  articlesComments,
  articlesStar,
  articlesCollect,
  articleCommentsStar
}
