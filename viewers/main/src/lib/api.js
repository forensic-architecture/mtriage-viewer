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

function cvjson_fetchRankedElements (batch, fromIndex) {
  const { query } = batch
  const allUrl = `${ROOT_URL}/batch?q=${query}`
  const rankUrl = `${ROOT_URL}/batch?q=${query}&element=_rank`
  console.log(allUrl)
  console.log(rankUrl)
  return Promise.resolve([])
  // return axios.get(rUrl)
  //   .then(response => {
  //     const rankings = response.data
  //     const rankedElements = rankings[label]
  //     const urls = rankedElements.slice(fromIndex, fromIndex + 15).map(getElementUrl)
  //     const promises = urls.map(url => Promise.resolve(url).then(url => axios.get(url).catch(err => null)))
  //     return Promise.all(promises)
  //   })
  //   .then(fullElements => {
  //     return fullElements.map(el => el !== null ? el.data : null).filter(el => el !== null)
  //   })
}

export default {
  fetchElements: () => axios.get(`${ROOT_URL}/elementmap`),
  fetchElement: elementId => axios.get(`${ROOT_URL}/element?id=${elementId}`),
  cvjson_fetchRankedElements,
}
