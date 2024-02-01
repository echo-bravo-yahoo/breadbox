### To do, today
- Fix breadboxPath messiness
- Fix production deploys
- Fix hostPort messiness

### To do, soon
- Publish container to dockerhub
- Secure mongodb instance with auth
- Migrate from dbName 'users' to 'recipeTool'
- Fix local development

### To do, mid-term
- Wrap fetch, needs to handle server-side redirects becoming client-side routing
- Add user interface to create new files
- Error-handling, lol
- Move to monorepo model

### To do, long-term
- Fix ag/rg not working in vim
- Styling and layout
- Replace pbkdf2-password with node:crypto
- Upgrade session store for express-session

### Done
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
For local development, `docker compose --file ./compose-dev.yaml up`. This will use the containerized database, webserver, and vite webapp server. It watches and hot reloads both the webserver and the webapp. The recipe filesystem is written to `./fs/`.

### How do I deploy?
Great question, more info coming...

### Docker
#### Build
`docker build --tag breadbox --file Dockerfile .`

#### Compose
`docker compose up`
