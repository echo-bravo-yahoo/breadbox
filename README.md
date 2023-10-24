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

### Docker
#### Build
`docker build --tag breadbox --file Dockerfile .`

#### Compose
`docker compose up`
