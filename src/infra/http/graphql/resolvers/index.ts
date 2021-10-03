import { authenticationResolver } from './authentication'
import { baseResolver } from './base'
import { followsResolver } from './follows'
import { postResolver } from './post'

export default [
  baseResolver,
  authenticationResolver,
  postResolver,
  followsResolver,
]
