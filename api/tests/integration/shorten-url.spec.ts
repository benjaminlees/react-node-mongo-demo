describe('shorten-url', () => {
  describe('POST /shorten-url', () => {
    it('should return a shortened url', async () => {
      const response = await fetch('http://localhost:3000/shorten-url', {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: 'https://testing/124'
        })
      })

      const data = await response.json();

      expect(data).toEqual({ acknowledged: true, insertedId: expect.stringMatching(/^[0-9a-fA-F]{24}$/)});
    })
  })
  describe('DELETE /shorten-url', () => {
    it('should delete a shortened url', async () => {
      const testUrl = 'https://testing/123';
      await fetch('http://localhost:3000/shorten-url', {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: testUrl
        })
      })
      const getData = await(await fetch('http://localhost:3000/shortened-urls', {
        method: 'get'
      })).json()
      expect(getData.find(({ originalUrl }) => originalUrl === testUrl)).toBeDefined();
      const deleteData = await (await fetch('http://localhost:3000/shorten-url', {
        method: 'delete',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: testUrl
        })
      })).json()
      expect(deleteData).toEqual({ acknowledged: true, deletedCount: 1 });
    })
  })
})