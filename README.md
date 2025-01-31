# Personal Finance App

This project is a Personal Finance App built with Vue 3 and Vite. It helps users manage their finances by providing features such as transaction history, monthly summaries, and more.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Running End-to-End Tests](#running-end-to-end-tests)
- [Linting and Formatting](#linting-and-formatting)
- [Recommended IDE Setup](#recommended-ide-setup)
- [Customize Configuration](#customize-configuration)
- [License](#license)

## Features

- Transaction history table
- Monthly summary cards
- Transaction form and edit modal
- Responsive design
- Dark mode support

## Technologies Used

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Element Plus](https://element-plus.org/)
- [Chart.js](https://www.chartjs.org/)
- [Playwright](https://playwright.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Project Setup

To set up the project, run the following command:

```sh
npm install
```

## Development

To compile and hot-reload for development, run:

```sh
npm run dev
```

## Building for Production

To compile and minify for production, run:

```sh
npm run build
```

## Running End-to-End Tests

To run end-to-end tests with [Playwright](https://playwright.dev), follow these steps:

1. Install browsers for the first run:

    ```sh
    npx playwright install
    ```

2. When testing on CI, build the project first:

    ```sh
    npm run build
    ```

3. Run the end-to-end tests:

    ```sh
    npm run test:e2e
    ```

4. Run the tests only on Chromium:

    ```sh
    npm run test:e2e -- --project=chromium
    ```

5. Run the tests of a specific file:

    ```sh
    npm run test:e2e -- tests/example.spec.ts
    ```

6. Run the tests in debug mode:

    ```sh
    npm run test:e2e -- --debug
    ```

## Linting and Formatting

To lint the code with [ESLint](https://eslint.org/), run:

```sh
npm run lint
```

To format the code with [Prettier](https://prettier.io/), run:

```sh
npm run format
```

## Recommended IDE Setup

We recommend using [Visual Studio Code](https://code.visualstudio.com/) with the [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension (and disable Vetur).

## Customize Configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
