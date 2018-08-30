// 歌曲播放数量处理
export function handlePlayAmoumt (num) {
  if (isNaN(num)) {
    return
  }
  if (num >= 10000) {
    let m = num / 10000
    let s = m.toFixed(1)
    return s + '万'
  } else {
    return num
  }
}

// 从一堆数据中随机取9个不重复的数数
export function getPar (arr, num) {
  if (arr.length < num) {
    return arr
  } else {
    let newArr = []
    while (newArr.length < num) {
      let i = Math.floor(arr.length * Math.random())
      if (!isExist(newArr, arr[i])) {
        newArr.push(arr[i])
      }
    }
    return newArr
  }
}

// 判断某数组中是否存在某数
function isExist (arr, num) {
  for (let item of arr) {
    if (item === num) {
      return true
    }
  }
  return false
}
