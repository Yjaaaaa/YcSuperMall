export default {
  AddCounter(state, payload) {
    payload.count ++
  },
  addToCart(state, payload) {
    payload.checked = true
    payload.disapper = true

    state.cartList.push(payload)   // 这里必须后push,要是先push的话改变不了checked、disapper的值

  }
}