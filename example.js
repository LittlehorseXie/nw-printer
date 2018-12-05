
var data = {
  id: 190,

}

function printOrderRecive(name = '', data = {}) {
  console.log(name, data)
  var Buffer = require('./escpos.js')
  var buffer = new Buffer()

  buffer = buffer.setLineHeight(70)
    .setTextSize(2).setLineHeight(50).setText(data.id, 'center')
    .setTextSize(1).setLineHeight(100).setText(`${data.delivery_way} ${data.deliver_time}`, 'center')
    .setLineHeight(70).setDecLine()
    .setBoldOn()
    .setLineHeight(70)
  data.sku_detail && data.sku_detail.forEach(item => {
    buffer = buffer.setThreeCol(item.quantity, item.sku_name, `￥${item.price}`)
  })
  buffer = buffer.setLine()
    .setLineHeight(100).setText(`备注：${data.description}`).setBoldOff()
    .setLineHeight(50).setDecLine()
    .setLineHeight(70)
    .setTwoCol('开具发票', data.invoiced)
    .setTwoCol('包装费', `￥${data.package_fee}`)
    .setTwoCol('配送费', `￥${data.deliver_fee}`)
    .setLineHeight(50)
    .setDecLine()
    .setBoldOn().setText(`合计：￥${data.total_price}  `, 'right').setBoldOff()
    .setDecLine()
    .setLineHeight(70)
    .setText(`送货地址：${data.receiver_address}`)
    .setText(`客户：${data.receiver_name} ${data.receiver_phone}`)
    .setDecLine()
    .setText(`下单时间: ${data.create_time}`, 'center')
    .setLine(2)
    .setBoldOn().setText(`${data.tagg_shop_name} \n \n`, 'center').setBoldOff()
    .setLine(2)
    .cut()
    .getBuffer()

    printer.print(name, buffer)
}

module.exports = printOrderRecive