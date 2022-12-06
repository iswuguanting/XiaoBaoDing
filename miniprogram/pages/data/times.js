export function timer(ti) {
  var time = new Date(ti);
  var y = time.getFullYear();
  var M = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var m = time.getMinutes();
  var s = time.getSeconds();

  var time = new Date();
  var yout = time.getFullYear();
  var Mout = time.getMonth() + 1;
  var dout = time.getDate();
  var hout = time.getHours();
  var mout = time.getMinutes();
  var sout = time.getSeconds();



  // 星期几
  var day1 = new Date().getDay();
  // 0 1 2 3 4 5 6
  let timeday1 = ''
  // 日 一 二 三 四 五 六
  switch (day1) {
    case 0:
      timeday1 = '星期日'
      break;
    case 1:
      timeday1 = '星期一'
      break;
    case 2:
      timeday1 = '星期二'
      break;
    case 3:
      timeday1 = '星期三'
      break;
    case 4:
      timeday1 = '星期四'
      break;
    case 5:
      timeday1 = '星期五'
      break;
    case 6:
      timeday1 = '星期六'
      break;
    default:
      timeday1 = '错误的日期'
      break;
  }
  // 计算时间戳是星期几
  var day2 = new Date(ti).getDay();
  // 0 1 2 3 4 5 6
  let timeday2 = ''
  // 日 一 二 三 四 五 六
  switch (day2) {
    case 0:
      timeday2 = '星期日'
      break;
    case 1:
      timeday2 = '星期一'
      break;
    case 2:
      timeday2 = '星期二'
      break;
    case 3:
      timeday2 = '星期三'
      break;
    case 4:
      timeday2 = '星期四'
      break;
    case 5:
      timeday2 = '星期五'
      break;
    case 6:
      timeday2 = '星期六'
      break;
    default:
      timeday2 = '错误的日期'
      break;
  }

  let datatime = new Date()
  let datatimeout = new Date(ti)
  let datatime1 = new Date().getTime()
  let datatimeout2 = new Date(ti).getTime()
  let getti = yout + '-' + Mout + '-' + dout;
  let setti = y + '-' + M + '-' + d;
  return [{
    getti: getti,
    getti: getti,
    timeout: timeday1,
    nianout: yout,
    yueout: Mout,
    riout: dout,
    shiout: hout,
    fenout: mout,
    miaoout: sout,
    thistime: datatime,
    thistime1: datatime1,
  }, {
    setti: setti,
    timeday: timeday2,
    thistimeout2: datatimeout2,
    thistimeout: datatimeout,

    nian: y,
    yue: M,
    ri: d,
    shi: h,
    fen: m,
    miao: s,
  }]
}