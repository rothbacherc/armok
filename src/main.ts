import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

/* Color Schemes:
Light shade: Foggy Gray: #CFCABB
Light accent: Sirocco: #697C76
Main brand: Cape Cod: #43426
Dark accent: Blue Bayoux: #4E6877
Dark shades: Heavy Metal: #141A16
*/

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));