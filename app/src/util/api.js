export function makeEndpoint(path) {
<<<<<<< HEAD
  const prefix = import.meta.env.PROD ? '/api' : '/api'
=======
  const prefix = import.meta.env.PROD ? '' : '/api'
>>>>>>> b6728ec... prepare for prod/dev env split
  return `${prefix}${path}`
}
