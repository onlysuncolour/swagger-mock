const fs = require('fs')

const writeFile = function (filename, data) {
  fs.writeFile(filename, data,  function(err) {
    if (err) {
        return console.error(err);
    }
    console.log(filename, "数据写入成功！");
  });
}

export default writeFile