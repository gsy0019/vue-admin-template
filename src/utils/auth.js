import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  // console.log(Cookies.get(TokenKey))
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  // console.log(Cookies.set(TokenKey))
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
