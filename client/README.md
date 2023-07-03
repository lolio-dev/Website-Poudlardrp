# PoudlardRP - Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/389463fc-aaf6-4aa2-9aed-42839ab7cf1e/deploy-status)](https://ade523d051288db54a9d613.netlify.app)

## Description

PoudlardRP mainly uses to buy items for the minecraft server and get the news.

## Configuration

Some parameters can be configured with environment variables.

| Variable              | Description                            | Default |
|-----------------------|----------------------------------------|---------|

## Environment

### Framework

**[React](https://reactjs.org/)** with **[Typescript](https://www.typescriptlang.org/)**

### Deployment

**[Netlify](https://netlify.com)** - Starter team plan

- Build minutes: 300 included/month
- Bandwidth: 100GB

## Continuous Integration

CI/CD is managed via Jenkins.

### Push on production branch:

The production branch is `master`.

1. Build the app
2. Run unit tests
3. Release project
4. Deploy to the server

### Push on special branches:

Special branches are:
- `develop`

1. Build the app
2. Run unit tests
3. Deploy to Netlify preview app

> The url of the preview app will be `https://ade523d051288db54a9d613.netlify.app/`

### Pull requests:

Runs on all pull requests except those whose head branch is a special branch.

1. Build the app
2. Run unit tests
3. Create the pull request
4. Deploy to Netlify preview app

> The url of the preview app will be `https://deploy-preview-{pull-request-number}--ade523d051288db54a9d613.netlify.app`

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Requirements

- **[NodeJS](https://nodejs.org/)** `v16.13.1` version
- **[Yarn](https://yarnpkg.com/)** package manager

### Installation

#### Create your personal access token

Create a [Gitlab personal access token](https://gitlab.com/-/profile/personal_access_tokens) with at least `repo` and `read:packages` scopes.

#### Install dependencies

```bash
yarn
```

### Running the app

```bash
# development
yarn start
```

### Test

```bash
# unit test (watch mode)
yarn test
```

### Build

```bash
# build the app for production
yarn build
```

## License

PoudlardRP - Website is [MIT licensed](LICENSE).
