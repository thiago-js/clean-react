import { AxiosHttpClient } from './axios-http-client'
import { HttpPostParams } from '@/application/interfaces/http'
import { mockAxiosPost } from '@/infra/test'
import faker, { fake } from 'faker'
import axios from 'axios'
import { mockPostRequest } from '@/application/test'

jest.mock('axios')

type sutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makesut = (): sutTypes => ({
  sut: new AxiosHttpClient(),
  mockedAxios: mockAxiosPost()
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const { sut, mockedAxios } = makesut()
    const request = mockPostRequest()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the corret statusCode and body', () => {
    const { sut, mockedAxios } = makesut()
    const httpResponse = sut.post(mockPostRequest())
    const responseToPost = mockedAxios.post.mock.results[0].value
    expect(httpResponse).toEqual(responseToPost)
  })
})
