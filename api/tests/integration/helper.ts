export const removeTestUrls = async () => {
  const response = await fetch('http://localhost:3000/shortened-urls', {
    method: 'get'
  })

  const data = await response.json();
  await Promise.all(data.map(async ({ _id, originalUrl }: { _id: string, originalUrl: string}) => {
    if (originalUrl.includes('testing')) {
      await fetch(`http://localhost:3000/shorten-url/${_id}`, {
        method: 'delete',
      })
    }
  }))
}

export const testUrl = 'https://testing/123';