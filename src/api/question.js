import _fetch from './request'

function interviewFilters () {
  return _fetch({
    url: '/interview/filters'
  })
}
// 获取模拟面试题
function interviewQuestions (data) {
  return _fetch({
    url: '/interview/questions',
    needToken: true,
    params: data
  })
}
// 下一个面试题
function questionsId (id) {
  return _fetch({
    url: '/questions/' + id,
    method: 'get',
    needToken: true
  })
}
// 提交试题
function questionsSubmit (data) {
  return _fetch({
    url: '/questions/submit',
    method: 'post',
    needToken: true,
    data
  })
}
export { interviewFilters, interviewQuestions, questionsSubmit, questionsId }
