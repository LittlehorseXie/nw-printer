const ESC = 0x1B,
      FS  = 0x1C,
      GS  = 0x1D,

const Command = {

  LF                 : [0x0A],                             // 打印并走纸
  ESC_init           : [ESC, 0x40],                        // 初始化打印机 ESC @

  ESC_exclamation    : (n) => [ESC, 0x21, n],              // ESC!n
  ESC_minus          : (n) => [ESC, 0x2D, n],              // 下划线0关闭，1开启1点宽，2开启2点宽
  ESC_rev            : (n) => [ESC, 0x7B, n],              // 设置0/取消1反向打印 ESC{n
  ESC_3              : (n) => [ESC, 0x33, n],              // 设置字符行间距
  ESC_a              : (n) => [ESC, 0x61, n],              // 对齐模式0，48左/1，49中/2，50右
  ESC_d              : (n) => [ESC, 0x64, n],              // 打印并进纸n行
  ESC_e              : (n) => [ESC, 0x65, n],              // 打印并反向进纸n行
  ESC_E              : (n) => [ESC, 0x45, n],              // 设置1/取消0加粗模式
  ESC_G              : (n) => [ESC, 0x47, n],              // 设置1/取消0加重模式
  ESC_J              : (n) => [ESC, 0x4A, n],              // 打印并走纸n行

  FS_and             : [FS, 0x26],                         // 进入汉字打印模式

  GS_exclamation     : (n) => [GS, 0x21, n],        // 字体放大 GS!n
  GS_B               : (n) => [GS, 0x42, n],        // 设置字符黑、白反转打印模式
  GS_h               : (n) => [GS, 0x68, n],        // 设置条码高度
  GS_v0              : (m) => [GS, 0x76, 0x30, m],  // 打印点图数据
  GS_w               : (n) => [GS, 0x77, n],        // 设置条码宽度
  GS_W               : (m, n) => [GS, 0x57, m, n],  // 设置打印区宽度
  GS_V               : (m) => [GS, 0x56, m],        // 切纸 48全切 49六点半切

  

}


module.exports = Command