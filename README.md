# Management app with Angular 4 + Angular CLI + Angular Material + Travis CI

### DEMO

Live DEMO [here](http://18.220.205.15/)!

## Usage

**Warning: we strongly recommend node >=v6.9.0 and npm >=3.0.0**

`npm i` - Installs everything needed

`npm start` - Starts the app. Then, go to `localhost:4200`

`npm run test` - Runs unit tests with karma and jasmine

`npm run e2e` - Runs end to end tests with protractor

`npm run build` - Builds the app for production

`npm run lint` - Runs the linter (tslint)

`npm run ci` - Executes linter and tests

`npm run deploy` - Builds the app and deploy it to Github pages (angular-cli-ghpages) (fork to do this)

`npm run sme` - Builds and runs source map explorer, really cool :)

`npm run release` - Creates a new release using standard-version

**Windows: use precompilation to speed up**

`tsc --project tsconfig.json`
`npm start`

## Features
* Responsive layout
* Internationalization
* Lazy loading modules
* Progress bar active, if a request is pending (events)
* CRUD: create, update and remove heroes
* Search bar, to look for heroes
* Modal and toasts (snakbar)!
* Sample unit tests with Jasmine and Karma including code coverage
* End-to-end tests with Protractor
* ES6 Promises
* Github pages deploy ready
* Following the [best practices](https://angular.io/guide/styleguide)!

## Travis CI
We use Travis CI to run this tasks in order:
* Linter
* Tests e2e
* Build for production
* Deploy in Github pages
:)

## Contributing
- Please see the CONTRIBUTING file for guidelines.
- Create **pull requests, submit bugs, suggest new features** or documentation updates :wrench:

## Server

This repo is using an API which is [a minimal app](https://github.com/Ismaestro/nodejs-example-app) in NodeJS deployed on Heroku and using PostGreSQL, to create, modify and delete heroes.

## Contributors

Thanks to all contributors and they support!

## License

MIT

Enjoy :metal:

We are always happy to hear your feedback!
