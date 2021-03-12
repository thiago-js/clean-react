import { HttpPostClient, HttpPostParams } from '@/application/interfaces/http/http-post-client'
import { HttpResponse, HttpStatusCode } from '@/application/interfaces/http/http-response'

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    stastusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return await Promise.resolve(this.response)
  }
}
