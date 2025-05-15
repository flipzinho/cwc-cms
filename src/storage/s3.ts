import { s3Storage } from '@payloadcms/storage-s3'

export const s3StoragePlugin = s3Storage({
  collections: {
    media: true,
    // Adicione outras collections de upload aqui se necessário
    // exemplo: 'media-with-prefix': { prefix: 'uploads/' },
  },
  bucket:
    process.env.S3_BUCKET ??
    (() => {
      throw new Error('S3_BUCKET environment variable is not defined')
    })(),
  config: {
    credentials: {
      accessKeyId:
        process.env.S3_ACCESS_KEY_ID ??
        (() => {
          throw new Error('S3_ACCESS_KEY_ID environment variable is not defined')
        })(),
      secretAccessKey:
        process.env.S3_SECRET_ACCESS_KEY ??
        (() => {
          throw new Error('S3_SECRET_ACCESS_KEY environment variable is not defined')
        })(),
    },
    region: process.env.S3_REGION,
    // Outras configurações do S3 podem ser adicionadas aqui
  },
})
