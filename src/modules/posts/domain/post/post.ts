import { Entity } from '@core/domain/Entity'
import { Either, right } from '@core/logic/Either'

import { Content } from './content'
import { InvalidContentLengthError } from './errors/InvalidContentLengthError'

export interface IPostProps {
  authorId: string
  content: Content
  mediaSourceUrl?: string[]
  replyForPostId?: string
  repostForPostId?: string
}

export class Post extends Entity<IPostProps> {
  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get mediaSourceUrl() {
    return this.props.mediaSourceUrl
  }

  get replyForPostId() {
    return this.props.replyForPostId
  }

  get repostForPostId() {
    return this.props.repostForPostId
  }

  private constructor(props: IPostProps, id?: string) {
    super(props, id)
  }

  static create(
    props: IPostProps,
    id?: string
  ): Either<InvalidContentLengthError, Post> {
    const post = new Post(props, id)

    return right(post)
  }
}
