# Oscar's todo-app

Basically a TODO app, the instructions can be found in docs

Built using `create-electron-app` with `--template=webppack` 

# Development requirements

- Install NodeJS and make sure NPM is installed in case you install them separately
- Run `npm install`
- Copy `.env.sample` to a file named `.env`
- Install Sqlite3 if it's not available in your OS by default - follow instructions for your OS
- From the terminal run `sqlite3 todo.db < todoDB.sql`