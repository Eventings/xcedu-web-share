import { getOSSKey, loadDetailBatchByIds } from '@/api/index'
import OSS from 'ali-oss'

var client = null;
const region = 'oss-cn-shenzhen'
const bucket = 'gtyzfile'

function getClient () {
  return new Promise((resolve, reject) => {
    if (!client) {
      getOSSKey().then(res => {
        client = new OSS({
          region: region,
          accessKeyId: res.accessKeyId,
          accessKeySecret: res.accessKeySecret,
          bucket: bucket
        })
        resolve(client)
      }).catch(() => reject())
    } else {
      resolve(client)
    }
  })
}

function batchDownloadOSS (ids) {
  loadDetailBatchByIds({ idList: ids }).then(data => {
    getClient().then(client => {
      for (var i = 0; i < data.length; i++) {
        var result = client.signatureUrl(data[i].url.replace(/.*\.com\//, ''), {
          response: {
            'content-disposition': 'attachment; filename="' + data[i].displayName + '"'
          }
        });
        setTimeout(function (link) {
          window.location = link;
        }.bind(null, result), i * 1200);
      }
    });
  });
}

export default { batchDownloadOSS, OSS }
