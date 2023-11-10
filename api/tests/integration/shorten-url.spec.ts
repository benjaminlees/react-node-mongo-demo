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

      expect(data).toEqual({
        _id: expect.stringMatching(/^[0-9a-fA-F]{24}$/),
        originalUrl: expect.stringMatching(/https?:\/\/.*/),
        shortenedUrl: expect.stringMatching(/https?:\/\/.*/)
      });
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
      const postResponse = await fetch('http://localhost:3000/shorten-url', {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: testUrl
        })
      })
      const postData = await postResponse.json();
      const deleteData = await (await fetch(`http://localhost:3000/shorten-url/${postData?._id}`, {
        method: 'delete',
      })).json()
      expect(deleteData).toEqual({ acknowledged: true, deletedCount: 1 });
    })
  })
})