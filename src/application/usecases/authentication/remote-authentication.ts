import { AuthenticationParams } from '@/domain/usecases/authentication'
import { HttpPostClient } from '@/application/interfaces/http/http-post-client'
import { HttpStatusCode } from '@/application/interfaces/http/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credential-error'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) { }

  async auth (params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.stastusCode) {
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: return await Promise.resolve()
    }
  }
}
