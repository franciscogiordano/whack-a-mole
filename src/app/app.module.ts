import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreBarComponent } from './components/score-bar/score-bar.component';
import { GameCoreComponent } from './components/game-core/game-core.component';
import { StoreModule } from '@ngrx/store';
import { gameCoreReducer } from './components/game-core/state/game-core.reducer';

@NgModule({
  declarations: [AppComponent, ScoreBarComponent, GameCoreComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ gameCore: gameCoreReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
