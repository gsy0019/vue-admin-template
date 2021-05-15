/**
 * Created by PanJiaChen on 16/11/18.
 */
import axios from 'axios'
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // const valid_map1;
  axios({
    method: 'POST',
    url: ' http://139.196.34.172:8000/gateway',
    data: {
      "method": "user.UserService.queryUserByPage",
      "bizRequest": {
        "pageSize": 10,
        "pageNum": 1
      }
    }
  }
  ).then(response => {
    const valid_map = [response.data.bizResponse.bizData.data[0].userName, response.data.bizResponse.bizData.data[1].userName, response.data.bizResponse.bizData.data[2].userName, response.data.bizResponse.bizData.data[3].userName, response.data.bizResponse.bizData.data[4].userName]
    // console.log(valid_map)
    // console.log(valid_map.indexOf(str.trim())>=0)
    return valid_map.indexOf(str.trim()) >= 0
    // return true;
  })
  //  const valid_map = valid_map1
  
}
