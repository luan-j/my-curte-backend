import { ReadStream } from 'fs'

import { IStorageProvider } from '@infra/providers/models/IStorageProvider'

export class InMemoryStorageProvider implements IStorageProvider {
  async uploadMediaStream(_: ReadStream): Promise<string> {
    return 'imageUrl'
  }
}
