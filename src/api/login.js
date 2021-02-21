import _fetch from './request'

function auCode (data) {
  return _fetch({
    url: '/au/code',
    method: 'post',
    data: data
  })
}
function auLogin (data) {
  return _fetch({
    url: '/au/login',
    method: 'post',
    data: data
  })
}
export { auCode, auLogin }
