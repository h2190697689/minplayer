export default class Singer {
  constructor (value) {
    this.singer_id = value.Fsinger_id
    this.fother_name = value.Fother_name
    this.name = value.Fsinger_name
    this.singer_mid = value.Fsinger_mid
    this.singer_pic = 'http://y.gtimg.cn/music/photo_new/T001R150x150M000' + value.Fsinger_mid + '.jpg?max_age=2592000'
  }
}
