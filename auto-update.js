/**
 * 自动更新
 */

var output =  document.querySelector( "#output" )
var gui = require('nw.gui') //操作nw应用
var updater = require('node-webkit-updater') //热更新
var pkg = require('./package.json')
var upd = new updater(pkg)
var copyPath, execPath
var path = require('path')
var progressTimer //设置一个定时器，用来模拟下载的进去条

if (gui.App.argv.length) {
  copyPath = gui.App.argv[0]
  execPath = gui.App.argv[1]
  console.log('替换旧版本')
  output.innerHTML = copyPath + ' 替换旧版本 ' + execPath
  // 替换旧版本
  upd.install(copyPath, function(err) {
    if (!err) {
      // 重启
      output.innerHTML = '重启 ' + execPath
      upd.run(execPath, null)
      gui.App.quit()
    } else {
      output.innerHTML = err
    }
  })
} else {
  // 从manifest目录校验版本
  console.log('从manifest目录校验版本')
  output.innerHTML = '从manifest目录校验版本'
  upd.checkNewVersion(function(error, newVersionExists, manifest) {
    console.log(error, newVersionExists, manifest)
    if (!error && newVersionExists && confirm('检测到新版本，您需要升级吗?')) {
      // 有新版本显示下载进度条开始下载
      console.log('有新版本显示下载进度条开始下载')
      output.innerHTML = '有新版本显示下载进度条开始下载'
      setTimeout(function() {
        var startC = parseInt(Math.floor(Math.random() + 1) * 3)
        progressTimer = setInterval(function() {
          startC += Math.random() * 2
          if (startC >= 95) {
            clearInterval(progressTimer)
            startC = 95
          }
          console.log(startC.toFixed(2) + '%')
          output.innerHTML = startC.toFixed(2) + '%'
        }, 2000)
      }, 1000)

      // 下载新版本
      console.log('下载新版本')
      output.innerHTML = '下载新版本'
      upd.download(function(error, filename) {
        console.log(error, filename)
        if (!error) {
          clearInterval(progressTimer)
          // 下载完成关闭应用
          console.log('下载完成即将关闭应用')
          output.innerHTML = '下载完成即将关闭应用'
          upd.unpack(filename, function(error, newAppPath) {
            console.log(error, newAppPath)
            if (!error) {
              var newAppDir = path.dirname(newAppPath)
              console.log('重启应用')
              output.innerHTML = '重启应用'
              console.log(newAppPath, [upd.getAppPath(), upd.getAppExec()])
              // 重启应用
              output.innerHTML = `${newAppPath}, [${upd.getAppPath()}, ${upd.getAppExec()}, cwd: ${newAppDir}]`
              upd.runInstaller(newAppPath, [upd.getAppPath(), upd.getAppExec()],  {cwd: newAppDir})
              gui.App.quit()
            }
          }, manifest)
        }
      }, manifest)
    } else if (!error && !newVersionExists) {
      console.log('您已经是最新版本')
    }
  })
}