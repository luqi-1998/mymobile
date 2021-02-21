import _fetch from './request'

function companiesList (data) {
  return _fetch({
    url: '/companies/list',
    params: data
  })
}

export { companiesList }
