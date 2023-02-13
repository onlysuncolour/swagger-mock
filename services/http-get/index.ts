const http = require('http')
type TPromiseCallBack = (v: any) => void;
const httpGet = (url) => {
  return new Promise((resolve: TPromiseCallBack, reject: TPromiseCallBack) => {
    http.get(url, res => {
      const { statusCode } = res; //获取请求的状态码
      const contentType = res.headers['content-type']; //获取请求类型
      let error;
      if (statusCode !== 200) { //如果请求不成功 （状态码200代表请求成功哦那个）
        error = new Error('请求失败\n' +
          `状态码: ${statusCode}`); //报错抛出状态码
      } else if (!/^application\/json/.test(contentType)) { //验证请求数据类型是否为json数据类型   json的content-type :'content-type':'application/json'
        error = new Error('无效的 content-type.\n' + //再次报错
          `期望的是 application/json 但接收到的是 ${contentType}`);
      }
      if (error) {//如果报错了
        reject(error)
          // console.error(error.message);
        res.resume(); //将请求的错误存入日志文件
        return;
      }
      //请求成功
      res.setEncoding('utf8'); //字符编码设为万国码
      let rawData = ''; //定义一个字符变量
      res.on('data', (chunk) => { rawData += chunk; }); //通过data事件拼接数据流得到数据
      res.on('end', () => { //end表示获取数据结束了
        try {  //捕获错误信息
          // console.log(rawData); //输出数据
          resolve(JSON.parse(rawData))
        } catch (e) {
          reject(e)
          // console.error(e.message);
        }
      });
    }).on('error', (e) => {
      reject(e)
      // console.error(`出现错误: ${e.message}`);
    });
  })
}

export default httpGet