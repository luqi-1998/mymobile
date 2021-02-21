import _fetch from './request'

function auInfo (isError = false) {
  return _fetch({
    url: '/au/info',
    needToken: true,
    isError: isError
  })
}
function upload (data) {
  return _fetch({
    url: '/upload',
    method: 'post',
    needToken: true,
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
function auEdit (data) {
  return _fetch({
    url: '/au/edit',
    method: 'post',
    needToken: true,
    data
  })
}

export { auInfo, upload, auEdit }
