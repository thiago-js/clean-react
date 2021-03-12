import { HttpStatusCode } from '@/application/interfaces/http/http-response'
import { HttpPostClientSpy } from '@/application/test/mock-http-client'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credential-error'
import { mockAuthentication } from '@/domain/tests/mock-authentication'
import { RemoteAuthentication } from './remote-authentication'
import faker from 'faker'
import { UnexpectedError } from '@/domain/errors/unexpected-error'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('should call httpPostClient with corret URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should call httpPostClient with corret body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const AuthenticationParams = mockAuthentication()
    await sut.auth(AuthenticationParams)
    expect(httpPostClientSpy.body).toEqual(AuthenticationParams)
  })

  test('should throw InvalidCredentialErrors if httpPostClient return 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      stastusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('should throw UnexpectedErrors if httpPostClient return 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      stastusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedErrors if httpPostClient return 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      stastusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedErrors if httpPostClient return 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      stastusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
