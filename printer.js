const printer = require('printer')

module.exports = {
  getPrinterList: function() {
    return printer.getPrinters()
  },
  print: function(printerName, buffer) {
    printer.printDirect({
      data: buffer,
      printer: printerName,
      type: "RAW",
      success:function(jobID){
        console.log("sent to printer with ID: "+jobID);
      },
      error:function(err){
        console.log(err);
      }
    });
  }
}
