const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')
const semver = require('semver')
const chalk = require('chalk')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const log = console.log
const CWD = process.cwd()

const packagePath = path.resolve(CWD, './package.json')
const packageLockPath = path.resolve(CWD, './package-lock.json')

// 命令行入参
// --type 项目类型, package 包 | project 产品项目
const argvs = yargs(hideBin(process.argv))
  .option('release-as', {
    alias: 'r',
    describe: 'Specify the release type manually (like npm version <major|minor|patch>)',
    requiresArg: true,
    string: true,
    default: 'patch'
  })
  .option('type', {
    alias: 't',
    type: 'string',
    description: 'update type, <package|project>',
    default: 'package'
  }).argv



// 检查当前分支，只允许在仿真和预发布跟新版本号
const checkBranch = async () => {
  return new Promise(resolve => {
    const CMD = `git branch | awk  '$1 == "*"{print $2}'`
    exec(CMD, (err, stdout) => {
      if (err) {
        log(chalk.red(error.message))
      } else {
        const reg = /^(release\/)/
        if (reg.test(stdout)) {
          resolve(stdout)
        } else {
          log(chalk.red('请在预发布分支更新版本!!!!'))
          process.exit(1)
        }
      }
    })
  })
}

checkBranch().then((currentBranch) => {

  const packageJson = require(packagePath)
  const packageLockJson = require(packageLockPath)

  // 更新版本
  const updatePackageVersion = (newVersion) => {
    packageJson.version = newVersion
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2))
    if (packageLockJson) {
      packageLockJson.version = newVersion
      fs.writeFileSync(packageLockPath, JSON.stringify(packageLockJson, null, 2))
    }
  }

  // 如果当前项目是package
  if (argvs.type === 'package') {

    // ${packageJson.name}
    const CMD = `npm view tal-element versions --registry=http://npm-corp.speiyou.cn`

    exec(CMD, (err, stdout, stderr) => {
      if (err) {
        return log(chalk.red(stderr))
      }
      try {
        let releaseAs = argvs.releaseAs
        if (!releaseAs) {
          if (/^(feature\/beta-inner-vpn)$/.test(currentBranch)) {
            releaseAs = 'patch'
          } else {
            releaseAs = 'minor'
          }
        }
        const historyVersions = eval(stdout)
        const newVersion = semver.inc(historyVersions[historyVersions.length - 1], releaseAs)
        updatePackageVersion(newVersion)
        log(chalk.green(`更新版本成功 ${newVersion}`))
      } catch (error) {
        log(chalk.red('更新文件版本失败: ' + error.message))
      }
    })
  } else if (argvs.type === 'project') {
    // 只在release分支执行，更新版本号
    try {
      const newVersion = semver.inc(packageJson.version, argvs.releaseAs)
      updatePackageVersion(newVersion)
      log(chalk.green(`更新版本成功 ${newVersion}`))
    } catch (error) {
      log(chalk.red('更新文件版本失败: ' + error.message))
    }
  }
})





