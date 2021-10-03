import { CreateUserFollowValidator } from './CreateUserFollowValidation'

describe('RegisterUser Validator', () => {
  const validator = new CreateUserFollowValidator()
  const params = {
    userId: '123',
    toFollowUserId: '321',
  }

  it('should return no errors if receive all valid fields', () => {
    const err = validator.validate(params)
    expect(err.isRight()).toBeTruthy()
  })

  it('should return an error if any required field is missing', () => {
    const err = validator.validate({ ...params, userId: null })
    expect(err.isLeft()).toBeTruthy()
  })
})
