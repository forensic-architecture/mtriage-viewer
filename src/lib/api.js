import axios from 'axios'

const ROOT_URL = process.env.VUE_APP_SERVER_URL

function cvjson_fetchRankings (batch) {
  const { query } = batch
  const url = `${ROOT_URL}/batch?q=${query}&el=_rank`

  return Promise.resolve()
    .then(() => axios.get(url))
    .then(resp => {
      return resp.data.media["ranking.json"]
    })
}

function fetchFromBatch (query, elements) {
  const url = `${ROOT_URL}/batch`
  const data = { query, elements }
  return Promise.resolve()
    .then(() => axios({
      method: 'post',
      url,
      data,
    }))
    .then(res => res.data
      .map(el => ({
        element_id: el.id,
        ...el.media["preds.json"]
      }))
    )
  // TODO: this is where we are.
  // return Promise.reject(Error("TODO"))
}

function fetchAttribute (attr, query) {
  const url = `${ROOT_URL}/batch_attribute?a=${attr}&q=${query}`
  return Promise.resolve()
    .then(() => axios.get(url))
    .then(resp => {
      return resp.data
    })
}

function cvjson_fetchElements (batch, label, pageNo, limit) {
  const { query } = batch
  const url = `${ROOT_URL}/batch?q=${query}&rank_by=${label}&limit=${limit}&page=${pageNo}`

  return Promise.resolve()
    .then(() => axios.get(url))
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
  fetchFromBatch,
  fetchAttribute,
  cvjson_fetchElements,
  cvjson_fetchRankings,
}
