import router from '../router'

function makeEndpoint(path) {
  return `/api${path}`
}

export async function call(args) {
  return fetch(makeEndpoint(args.url),
    {
      credentials: 'include',
      method: args.method || 'GET',
      body: JSON.stringify(args.body),
      mode: 'cors',
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      if (res.redirected) {
        router.push(new URL(res.url).pathname)
        throw res
      } else {
        return res
      }
    }).then((res) => res.json())
}
