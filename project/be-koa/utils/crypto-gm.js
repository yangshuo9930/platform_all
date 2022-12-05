const { SM2, SM3 } = require('gm-crypto')

const inputEncoding = 'utf8'
const outputEncoding = 'hex'

/** =====================sm2非对称加解密====================  */

// sm2 公私钥 需要和后端保持一致
const sm2PublicKey =
  '0426177d516489d53edf24d763f81fc4d4e96fec60b707d75cf617c7f3239420e8b6329fbbf29d475fc35a799032affa34a16a7946955e7e50729a48dc1434ef17'
const sm2PrivateKey = 'b7af0a7811a8c05ba048c58681ee944a32af76d6bf299d3ac08f86d98e728fb7'
// 入参：加密原始数据
const sm2Encrypted = (originalData) =>
  SM2.encrypt(originalData, sm2PublicKey, {
    inputEncoding,
    outputEncoding
  })
// 入参：需解密密文
const sm2Decrypted = (encryptedData) =>
  SM2.decrypt(encryptedData, sm2PrivateKey, {
    inputEncoding: outputEncoding,
    outputEncoding: inputEncoding
  })

module.exports = {
  sm2Encrypted,
  sm2Decrypted
}

/** =====================sm3消息摘要=====================  */

// const sm3Digest = (originalData) => SM3.digest(originalData, '', 'hex')

/** =====================sm4对称加解密=====================  */
// let SM4 = new SM4Tool()
// SM4.secretKey = '3561009105fb446394f7484553171bcd'
// SM4.iv = '31313131313131313131313131313131'
// // SM4 cbc解密
// export const sm4CbcDecrypted = (encryptedData) => SM4.decryptData_CBC(encryptedData)
// // SM4 cbc加密
// export const sm4CbcEncrypted = (originalData) => SM4.encryptData_CBC(originalData)

// // key 需要和后端保持一致
// const key = '64EC7C763AB7BF64E2D75FF83A319918'

// // ECB方式
// export const sm4EcbEncrypted = originalData => SM4.encrypt(originalData, key, {
//   inputEncoding,
//   outputEncoding
// })

// export const sm4EcbDecrypted = encryptedData => SM4.decrypt(encryptedData, key, {
//   inputEncoding: outputEncoding,
//   outputEncoding: inputEncoding
// })

// // CBC方式 需增加iv
// // 前后端统一
// const iv = '31313131313131313131313131313131'

// export const sm4CbcEncrypted = originalData => SM4.encrypt(originalData, key, {
//   iv,
//   mode: SM2.constants.CBC,
//   inputEncoding,
//   outputEncoding
// })

// export const sm4CbcDecrypted = encryptedData => SM4.decrypt(encryptedData, key, {
//   iv,
//   mode: SM2.constants.CBC,
//   inputEncoding: outputEncoding,
//   outputEncoding: inputEncoding
// })
