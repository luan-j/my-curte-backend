import { SignInValidator } from './SignInValidation'

describe('AuthenticateUser Validator', () => {
  const validator = new SignInValidator()

  it('should return no errors if receive all valid fields', () => {
    const err = validator.validate({
      email: 'johndoe@mail.com',
      password: '123456',
    })
    expect(err.isRight()).toBeTruthy()
  })

  it('should return an error if any required field is missing', () => {
    let err = validator.validate({ email: null, password: '123456' })
    expect(err.isLeft()).toBeTruthy()

    err = validator.validate({ email: 'johndoe@mail.com', password: null })
    expect(err.isLeft()).toBeTruthy()
  })

  it('should return an error if receive any invalid field', () => {
    let err = validator.validate({ email: 'johndoe@mail.com', password: 'p  ' })
    expect(err.isLeft()).toBeTruthy()

    err = validator.validate({ email: 'johndoe@mail', password: '123456' })
    expect(err.isLeft()).toBeTruthy()
  })
})
