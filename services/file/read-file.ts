import { readFile as fsReadFile } from 'node:fs/promises';

const readFile = (url, type):Promise<any> => {
  const filePath = new URL(url, import.meta.url)
  const filePromise = fsReadFile(filePath, { encoding: 'utf8' });
  if (type === 'json') {
    return new Promise((res, rej)=> {
      filePromise.then(result => {
        res(JSON.parse(result))
      }, err => rej(err))
    })
  }
  return filePromise
}

export default readFile