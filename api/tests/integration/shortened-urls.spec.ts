describe('shortened-urls', () => {
  describe('get /shortened-urls', () => {
    it('should return a shortened url', async () => {
      const response = await fetch('http://localhost:3000/shortened-urls', {
        method: 'get'
      })

      const data = await response.json();
      data.forEach(({ shortenedUrl }) => {
        expect(shortenedUrl).toEqual(expect.stringMatching(/https?:\/\/.*/))
      })
    })
  })
})