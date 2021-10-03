import { ReadStream } from 'fs'

export interface IStorageProvider {
  uploadMediaStream(strean: ReadStream): Promise<string>
}
