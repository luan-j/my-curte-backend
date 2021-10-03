export const auth = {
  secretKey:
    process.env.JWT_SECRET_KEY ||
    'arroz, feijão, batata frita, macarronada, hamburguer de siri',
  expiresIn: '1d',
}
