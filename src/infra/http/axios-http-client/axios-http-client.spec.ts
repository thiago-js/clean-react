import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const makesut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL and verb', async () => {
    const sut = makesut()
    const url = faker.internet.url()
    await sut.post({ url })
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })

  test('Should call axios with correct body', async () => {
    const sut = makesut()
    const url = faker.internet.url()
    await sut.post({ url })
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })
})
