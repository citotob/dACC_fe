# refactoring-smaslab-web

New Design for Smaslab Web frontend repository

## Technologies used

### Linter:

- Prettier
- ESlint

### Boilerplate

- Skote template

## Installation

1. Installing all packages listed on `package.json`

```
npm install
```

2. Run repository on browser

```
npm start
```

3. Formatting all `js|jsx|css|md` files with prettier automatically

```
npm run format
```

3. Create a production build

```
npm run build
```

## How to Contribute:

### Get Ready

1. Make sure to use same prettier configuration as on `.prettierrc` at your `setting.json`
2. Make sure to create a `feature branch` from **develop** and name the branch (with format **{your_name}-{feature_name}**)

### Commit

3. Commit often! with short explanation about the commit or the file updated when commit
   i.e. `fix dashboard`,`updated Dashboard.js`

### Pull Request

4. Make PR to **develop**, `npm run format` before that due to formatting using prettier automatically.
5. Name PR with Card number based on Trello

### Release

6. Make Release from develop branch each sprint
