// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCcdZODBvZkDJR88p3tkwu5foM79egbXcc',
    authDomain: 'ng-fitness-sks.firebaseapp.com',
    databaseURL: 'https://ng-fitness-sks.firebaseio.com',
    projectId: 'ng-fitness-sks',
    storageBucket: 'ng-fitness-sks.appspot.com',
    messagingSenderId: '272452071448'
  }
};
