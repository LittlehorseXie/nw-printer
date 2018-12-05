const printer = nw.require('printer')

module.exports = {
  /**
   * @returns {Array} 返回打印机列表
   */
  getPrinterList: function() {
    return printer.getPrinters()
  },
  /**
   * 调用打印功能
   * @param {string} printerName 打印机名称，可以由getPrinterList获取
   * @param {buffer} buffer 打印内容的buffer串
   */
  print: function(printerName, buffer) {
    printer.printDirect({
      data: buffer,
      printer: printerName,
      type: "RAW",
      success:function(jobID){
        console.log("sent to printer with ID: "+jobID)
      },
      error:function(err){
        console.log(err)
      }
    })
  },
  /**
   * 判断当前打印机是否连接成功
   * @param {string} printerName 打印机名称，可以由getPrinterList获取
   */
  getPrinter: function(printerName) {
    try{
      printer.getPrinter(printerName)
    } catch(e) {
      return false
    }
    return true
  }
}
