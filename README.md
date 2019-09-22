##### Install

1. Install dependencies
    ```bash
    npm install
    npm run rebuild
    ```
2. Start in developer mode in browser
    ```bash
    npm run start
    ```
3. Start electron app in developer mode
    ```bash
    npm run start-electron
    ```
4. Create database with dev env
    ```bash
    db-migrate db:create hlor
    ```
5. Create database with prod env
    ```bash
    db-migrate db:create hlor -e prod
    ```
6. Up migrations
    ```bash
    db-migrate up --config database.json -e prod
    ```

## Compilation
rm -r dist && yarn build && ./node_modules/.bin/electron-builder -wl
rm -r dist && yarn build && ./node_modules/.bin/electron-builder -w --ia32
