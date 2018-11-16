const ESC = 0x1B,
      FF  = 0x0C,
      FS  = 0x1C,
      GS  = 0x1D,
      DC1 = 0x11,
      DC4 = 0x14,
      DLE = 0x10,
      NL  = 0x0A,
      SP  = 0x20,
      US  = 0x1F;

const Command = {

  DLE_EOT            : (n) => [DLE, 0x04, n],              // DLEEOTn

  ESC_init           : [ESC, 0x40],                        // 初始化打印机 ESC@

  ESC_exclamation    : (n) => [ESC, 0x21, n],              // ESC!n
  ESC_minus          : (n) => [ESC, 0x2D, n],              // 下划线0关闭，1开启1点宽，2开启2点宽
  ESC_rev            : (n) => [ESC, 0x7B, n],              // 设置0/取消1反向打印 ESC{n
  ESC_3              : (n) => [ESC, 0x33, n],
  ESC_a              : (n) => [ESC, 0x61, n],              // 对齐模式0，48左/1，49中/2，50右
  ESC_d              : (n) => [ESC, 0x64, n],              // 打印并进纸n行
  ESC_e              : (n) => [ESC, 0x65, n],              // 打印并反向进纸n行
  ESC_E              : (n) => [ESC, 0x45, n],              // 设置1/取消0加粗模式
  ESC_G              : (n) => [ESC, 0x47, n],              // ESCGn
  ESC_J              : (n) => [ESC, 0x4A, n],              // ESCJn
  ESC_M              : (n) => [ESC, 0x4D, n],              // ESCMn
  ESC_t              : (n) => [ESC, 0x07, n],              // ESCtn
  ESC_V              : (n) => [ESC, 0x56, n],              // ESCtn
  ESC_Z              : (m, n, k) => [ESC, 0x5A, m, n, k],  // ESCZmnk

  FS_and             : [FS, 0x26],                         // 进入汉字打印模式
  FS_C               : (n) => [FS, 0x21, n],

  GS_exclamation     : (n) => [GS, 0x21, n],        // ESC!n 字体放大
  GS_B               : (n) => [GS, 0x42, n],        // GSBn
  GS_f               : (n) => [GS, 0x66, n],        // GSfn
  GS_h               : (n) => [GS, 0x68, n],        // GShn
  GS_H               : (n) => [GS, 0x48, n],        // GSHn
  GS_K               : (m, n) => [GS, 0x6B, m, n],  // GSKmn
  GS_v0              : (m) => [GS, 0x76, 0x30, m],  // GSv0m
  GS_w               : (n) => [GS, 0x77, n],        // GSwn
  GS_W               : (m, n) => [GS, 0x57, m, n],        // GSwn
  GS_x               : (n) => [GS, 0x78, n],        // GSxn
  GS_V               : (m, n) => [GS, 0x56, m, n],        // 切纸 48全切

  LF       : [NL],

}


module.exports = Command