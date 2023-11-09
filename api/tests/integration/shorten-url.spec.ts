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
    it('should error if url is not provided', async () => {
      const response = await fetch('http://localhost:3000/shorten-url', {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        }
      })
      const message = await response.text();
      expect(response.status).toEqual(400);
      expect(message).toEqual('Error: url is required');
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
      const testData = getData.find(({ originalUrl }) => originalUrl === testUrl);
      expect(testData).toBeDefined();
      const deleteData = await (await fetch(`http://localhost:3000/shorten-url/${testData?._id}`, {
        method: 'delete',
      })).json()
      expect(deleteData).toEqual({ acknowledged: true, deletedCount: 1 });
    })
  })
})