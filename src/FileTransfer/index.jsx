/*
base64转file文件有两种方式
1.base64->file，存在兼容性问题
2.base64->blob->file，不存在兼容性问题
*/

function base64ToFile(base64Data, fileName) {
  let arr, mime, bstr, n, u8arr;
  // 将base64Data分割成两部分，一部分是数据，一部分是文件类型
  arr = base64Data.split(',');
  mime = arr[0].match(/:(.*?);/)[1];
  bstr = atob(arr[1]); // 用atob对base64数据进行解码
  n = bstr.length;
  u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime }); // 生成file文件
}

function base64ToBlob(base64Data) {
  let arr, mime, bstr, n, u8arr;
  arr = base64Data.split(',');
  mime = arr[0].match(/:(.*?);/)[1];
  bstr = atob(arr[1]);
  n = bstr.length;
  u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

function blobToFile(blob, fileName) {
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return new File([blob], fileName, {
    type: blob.type,
    lastModified: blob.lastModifiedDate,
  });
}

export default { base64ToFile, base64ToBlob, blobToFile };
