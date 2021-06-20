import { request2 } from './request2'

export function getDetail(iid) {
    return request2({
      url: '/detail',
      params: {
        iid
      }
    })
}

export function getRecommend(){     // 推荐的接口
  return request2({
    url:'/recommend'
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title,
    this.desc = itemInfo.desc,
    this.newPrice = itemInfo.price,
    this.oldPrice = itemInfo.oldPrice,
    this.discount = itemInfo.discountDesc,
    this.columns = columns,
    this.services = services,
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop {
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

export class  GoodsParam {
  constructor(info, rule) {
    // images可能没有值, 有些商品有, 有些没有
    this.image = info.image ? info.image[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}