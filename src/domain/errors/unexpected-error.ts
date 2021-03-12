export class UnexpectedError extends Error {
  constructor () {
    super('Algo de errado aconteceu. Favor tente novamente em instantes')
    this.name = 'UnexpectedError'
  }
}
