var Command = require('./command')
var iconv = require('iconv-lite')
var sprintf = require('sprintf-js').sprintf
var MutableBuffer = require('mutable-buffer').MutableBuffer
var middleCharLen = 22

function getChnCount(str) {
  return str.replace(/[\u0391-\uFFE5]/g, 'aa').length - str.length
}

var Buffer = function() {
  this._buf = new MutableBuffer()
  this._buf.write(Command.ESC_init)
}

Buffer.prototype = {
  /**
     * 打印文字
     * @function setThreeCol              设置左中右布局
     *    @param {string, string, string}
     * @function setTwoCol                设置左右布局
     *    @param {string, string}
     * @function setDecLine               分割线
     *    @param {}
     * @function setBoldOn                开启粗体模式
     *    @param {}
     * @function setBoldOff               关闭粗体模式
     *    @param {}
     * @function setLineHeight            设置字行高
     *    @param {number}
     * @function setLine                  换行并打印
     *    @param {number}
     * @function setText                  写文字
     *    @param {string}
     * @function setTextDirection         设置文字布局
     *    @param {string}
     * @function setTextSize              设置字体大小
     *    @param {number}
     * @function cut                      留点切纸
     *    @param {} 
     * @function getBuffer                获取字符
     *    @param {} 
     */
  setThreeColText: function (l, m, r) {
    const chnLen = getChnCount(m)
    const buf = sprintf(`%3s  %-${middleCharLen-chnLen}s %8s`, l, m, r)
    this._buf.write(iconv.encode(buf,'GBK'))
    this._buf.write(Command.LF)
  },
  setThreeCol: function (first, second, third) {
    const chnLen = getChnCount(second)
    const charLen = second.length + chnLen
    // console.log(charLen, middleCharLen)
    if (charLen <= middleCharLen) {
      this.setThreeColText(first, second, third)
    } else {
      let charList = [2]
      for (var i = 1; i < second.length; i++) {
        var charCode = second.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) {
          charList.push(1 + charList[i - 1])
        } else {
          charList.push(2 + charList[i - 1])
        }
      }
      let indexList = [0]
      for (var i = 10; i < charList.length; i++) {
        if(charList[i] % 22 >= 0 && charList[i] % 22 < 2 && !(charList[i+1] && charList[i+1] % 22 >= 0 && charList[i+1] % 22 < 2)) {
          indexList.push(i)
        }
      }
      this.setThreeColText(first, second.slice(0, indexList[1]), third)
      // console.log(second.slice(0, indexList[1]))
      if (indexList.length === 2) {
        this.setThreeColText('', second.slice(indexList[1]), '')
        // console.log(second.slice(indexList[1]))
      } else {
        for(let i = 2; i < indexList.length; i++) {
          if (i === indexList.length - 1) {
            this.setThreeColText('', second.slice(indexList[i]), '')
            // console.log(second.slice(indexList[i]))
          } else {
            this.setThreeColText('', second.slice(indexList[i - 1], indexList[i]), '')
            // console.log(second.slice(indexList[i - 1], indexList[i]))
          }
        }
      }
    }
    return this
  },
  setTwoCol: function (one, two) {
    const buf = sprintf(`%-${30-one.length}s%8s`, one, two)
    this._buf.write(iconv.encode(buf,'GBK'))
    this._buf.write(Command.LF)
    return this
  },
  setDecLine: function () {
    this._buf.write(Command.ESC_minus(2))
    this._buf.write(sprintf(`%40s`, ' '))
    this._buf.write(Command.ESC_minus(0))
    this._buf.write(sprintf(`%40s`, ' '))
    this._buf.write(Command.LF)
    return this
  },
  setBoldOn: function () {
    this._buf.write(Command.ESC_E(1))
    return this
  },
  setBoldOff: function  () {
    this._buf.write(Command.ESC_E(0))
    return this
  },
  setLineHeight: function (num) {
    this._buf.write(Command.ESC_3(num))
    return this
  },
  setLine: function (n) {
    if (!n) {
      this._buf.write(Command.LF)
      return this
    }
    this._buf.write(Command.ESC_d(n))
    return this
  },
  setText: function (str, direction) {
    if (direction && direction === 'center') {
      this._buf.write(Command.ESC_a(49))
      this._buf.write(iconv.encode(str,'GBK'))
    } else if(direction && direction === 'right') {
      this._buf.write(Command.ESC_a(50))
      this._buf.write(iconv.encode(str,'GBK'))
    } else {
      this._buf.write(Command.ESC_a(48))
      this._buf.write(iconv.encode(str,'GBK'))
    }
    this._buf.write(Command.LF)
    return this
  },
  setTextDirection: function(direction) {
    if (direction && direction === 'center') {
      this._buf.write(Command.ESC_a(49))
    } else if(direction && direction === 'right') {
      this._buf.write(Command.ESC_a(50))
    } else {
      this._buf.write(Command.ESC_a(48))
    }
    return this
  },
  setTextSize: function (n) {
    switch(n) {
      case 2:
        this._buf.write(Command.GS_exclamation(17))
        break
      default:
        this._buf.write(Command.GS_exclamation(0))
    }
    return this
  },
  cut: function() {
    this._buf.write(Command.GS_V(49))
    return this
  },
  getBuffer: function() {
    this._buf.flush()
    return this._buf.buffer
  }
}

module.exports = Buffer