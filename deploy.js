#!/usr/bin/env node
/**
 * deploy.js
 *
 * 将dist中的替换到后端项目中
 */

// 依赖项
const fromDir = './dist'
const toDir = '../athletic-2019-05/public'
const fileutils = require('./fileutils')

// 导出主程序
function main() {
  console.log('移动文件中')
  const list = ['/js', '/css', '/fonts', '/img']
  list.forEach(r => {
    if (fileutils.test(toDir + r)) {
      fileutils.rm(toDir + r)
    }
    fileutils.cp(fromDir + r, toDir + r)
  })
  fileutils.cp(fromDir + '/index.html', toDir + '/../resources/views/welcome.blade.php')
  console.log('已成功将前端文件导出到后端项目中')
}
main()
