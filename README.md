### To do, today
- Add user interface to create new files

### To do, soon
- Publish container to dockerhub
- Move to docker swarm for deployment

### To do, mid-term
- Move to monorepo model
- Styling and layout

### To do, long-term
- Error-handling, lol
- Fix ag/rg not working in vim
- Replace pbkdf2-password with node:crypto

### Done
- Migrate from dbName 'users' to 'breadbox'
- Secure mongodb instance with auth
- Fix production deploys
- Fix breadboxPath messiness in docker-compose.yaml
- Fix hostPort messiness
- Upgrade session store for express-session
- Fix local development
- Wrap fetch, needs to handle server-side redirects becoming client-side routing
- Set up docker for local development
- Containerize application for single host use
- Create repository
- Add markdown view/edit
- Add a database
- Add auth for users
- Add support for multiple users (split files/fs)
- Symlink my existing recipes in for my user
- Automatically log users in after they register
- Server hot reload
- Move server dependencies from top level package.json to server/package.json

### How do I do local development?
For local development, `docker compose --file ./compose-dev.yaml --env-file "./secrets.env" up`. This will use the containerized database, webserver, and vite webapp server. It watches and hot reloads both the webserver and the webapp. The recipe filesystem is written to `./fs/`.

### How do I deploy?
Great question, more info coming...

### Docker
#### Build
`docker build --tag breadbox --file Dockerfile .`

#### Compose
`docker compose up`
