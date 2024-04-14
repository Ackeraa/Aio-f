import {
  ApplicationConfig,
  importProvidersFrom,
  APP_INITIALIZER,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

export function appInitializerFactory(
  translate: TranslateService
  //auth: AuthService
) {
  return () => {
    const translateInit = firstValueFrom(translate.getTranslation('en'));
    //console.log(auth);
    //const userInit = auth.setUser();
    //return Promise.all([translateInit, userInit]);
    return Promise.all([translateInit]);
  };
}

export const provideTranslation = () => ({
  defaultLanguage: environment.defaultLang,
  loader: {
    provide: TranslateLoader,
    useFactory: (http: HttpClient) => {
      return new TranslateHttpLoader(http, './assets/i18n/', '.json');
    },
    deps: [HttpClient],
  },
});

export const appInitializer = {
  provide: APP_INITIALIZER,
  useFactory: appInitializerFactory,
  deps: [TranslateService],
  multi: true,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom([
      //HttpClientModule,
      TranslateModule.forRoot(provideTranslation()),
    ]),
    //appInitializer,
  ],
};
