const fs = require('fs')

const writeFile = function (filename, data) {
  return new Promise((res, rej) => {
    fs.writeFile(filename, JSON.stringify(data),  function(err) {
      if (err) {
        rej(err)
      }
      res({
        ok: true
      })
    });
  })
}

export default writeFile