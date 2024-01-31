export function makeEndpoint(path) {
  const prefix = import.meta.env.PROD ? '/api' : '/api'
  return `${prefix}${path}`
}
