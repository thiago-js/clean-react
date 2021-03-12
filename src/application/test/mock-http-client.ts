import { HttpPostClient, HttpPostParams } from '@/application/interfaces/http/http-post-client'
import { HttpResponse, HttpStatusCode } from '@/application/interfaces/http/http-response'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  response: HttpResponse = {
    stastusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body
    return await Promise.resolve(this.response)
  }
}
