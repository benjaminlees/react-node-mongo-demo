import { removeTestUrls, testUrl } from "./helper"

describe('shortened-urls', () => {
  afterAll(async () => {
    await removeTestUrls()
  })
  beforeAll(async () => {
    await fetch('http://localhost:3000/shorten-url', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: testUrl
      })
    })
  })
  describe('get /shortened-urls', () => {
    it('should return a shortened url', async () => {
      const response = await fetch('http://localhost:3000/shortened-urls', {
        method: 'get'
      })

      const data = await response.json();
      data.forEach(({ shortenedUrl }: { shortenedUrl: string }) => {
        expect(shortenedUrl).toEqual(expect.stringMatching(/https?:\/\/.*/))
      })
    })
  })
})