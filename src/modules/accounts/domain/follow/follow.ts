import { Entity } from '@core/domain/Entity'

interface IFollowProps {
  userId: string
  followingId: string
}

export class Follow extends Entity<IFollowProps> {
  get userId() {
    return this.props.userId
  }

  get followingId() {
    return this.props.followingId
  }

  private constructor(props: IFollowProps, id?: string) {
    super(props, id)
  }

  static create(props: IFollowProps, id?: string): Follow {
    const follow = new Follow(props, id)

    return follow
  }
}
