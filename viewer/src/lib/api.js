import axios from 'axios'

const ROOT_URL = 'http://localhost:5000'

// const getReq = {
//   headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*'
//   },
//   crossdomain: true,
//   method: 'get'
// }
//
// function get (url) {
//   return axios({
//     ...getReq,
//     url
//   })
// }


function cvjson_fetchRankings (batch) {
  const { query } = batch
  const rankUrl = `${ROOT_URL}/batch?q=${query}&el=_rank`

  return Promise.resolve()
    .then(() => axios.get(rankUrl))
    .then(resp => {
      return resp.data.media["ranking.json"]
    })
}

function cvjson_fetchElements (batch, label, pageNo, limit) {
  const { query } = batch
  const rankedUrl = `${ROOT_URL}/batch?q=${query}&rank_by=${label}&limit=${limit}&page=${pageNo}`

  return Promise.resolve()
    .then(() => axios.get(rankedUrl))
    .then(resp => {
      return resp.data
        .map(el => ({ element_id: el.id, ...el.media["preds.json"] }))
        .filter(el => el.id !== '_rank')
      // NOTE: past slicing to do paging
      // const urls = rankedElements.slice(fromIndex, fromIndex + itemsPerPage).map(getElementUrl)
      // const promises = urls.map(url => Promise.resolve(url).then(url => axios.get(url).catch(err => null)))
      // return Promise.all(promises)
    })
}

export default {
  fetchBatches: () => axios.get(`${ROOT_URL}/elementmap`),
  fetchElement: elementId => axios.get(`${ROOT_URL}/element?id=${elementId}`),
  cvjson_fetchElements,
  cvjson_fetchRankings,
}
