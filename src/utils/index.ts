
// 获取当前运行环境
export const runEnv = () => {
  const location = window.location.hostname
  if (location.indexOf('-dev') > -1 || import.meta.env.MODE === 'development') {
    return 'dev'
  } else if (location.indexOf('one-ext') > -1) {
    return 'external'
  } else if (location.indexOf('.net') > -1 || location.indexOf('one-beta') > -1) {
    return 'beta'
  } else {
    return 'prod'
  }
}
