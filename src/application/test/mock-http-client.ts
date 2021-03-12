import { HttpPostClient, HttpPostParams } from '@/application/interfaces/http/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object

  async post (params: HttpPostParams): Promise<void> {
    this.url = params.url
    this.body = params.body
    return await Promise.resolve()
  }
}
