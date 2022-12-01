export default async function fetcher(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, init)

  if (response.status >= 400) {
    return { error: 'Something went wrong!' }
  }

  return await response.json()
}
