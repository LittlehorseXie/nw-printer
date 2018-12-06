var printer = require('./printer.js')

var mockData = {
  id: 001,
  delivery_way: '外送',
  deliver_time: '立即送达',
  sku_detail: [{
    quantity: 10,
    sku_name: '火米饼套餐',
    price: 20
  }],
  description: '多放火贝 火火火火',
  invoiced: '',
  package_fee: 1,
  deliver_fee: 10,
  total_price: 31,
  receiver_address: '火星1区101路1号',
  receiver_name: '火星人',
  receiver_phone: 00001,
  create_time: '0001-01-01',
  tagg_shop_name: '火星1号商店'
}

function getPrinterList() {
  var list = printer.getPrinterList()
  var res = []
  list.forEach(item => res.push(item.name))
  return res
}

function getPrinter(name) {
  return printer.getPrinter(name)
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

module.exports = {
  mockData,
  getPrinterList,
  getPrinter,
  printOrderRecive
}