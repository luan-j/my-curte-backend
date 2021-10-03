import cloudinary from 'cloudinary'
import { ReadStream } from 'fs'

import { IStorageProvider } from '@infra/providers/models/IStorageProvider'

export class CloudinaryProvider implements IStorageProvider {
  constructor() {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }

  async uploadMediaStream(stream: ReadStream): Promise<string> {
    try {
      let imageUrl: string

      await new Promise((resolve, reject) => {
        const loadStream = cloudinary.v2.uploader.upload_stream(
          (error, result) => {
            if (result) {
              imageUrl = result.url
              resolve(imageUrl)
            } else {
              reject(error.message)
            }
          }
        )

        stream.pipe(loadStream)
      })

      return imageUrl
    } catch (error) {
      throw new Error(error)
    }
  }
}
