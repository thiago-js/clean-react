import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import faker, { fake } from 'faker'
import { HttpPostParams } from '@/application/interfaces/http'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const makesut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL and verb', async () => {
    const sut = makesut()
    const post = mockPostRequest()
    await sut.post(post)
    expect(mockedAxios.post).toHaveBeenCalledWith(post.url)
  })
})
