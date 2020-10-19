import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {
  EventsListComponent,
  EventDetailsComponent,
  CreateSessionComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventService,
  EventsListResolver,
  EventThumbnailComponent,
  SessionListComponent,
  DurationPipe
}
  from './events/index'

import { NavBarComponent } from './nav/navbar.component'
import { Toastr, TOASTR_TOKEN } from './common/toastr.service'
import { CollapsibleComponentComponent } from './common/collapsible-well.component'

import { Error404Component } from './errors/404.component'
import { EventsAppComponent } from './events-app.component'
import { appRoutes } from './routes'
import { ReturnStatement } from '@angular/compiler';
import { AuthService } from './user/auth.service'

let toastr: Toastr = window['toastr']

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    CreateSessionComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    NavBarComponent,
    Error404Component,
    SessionListComponent,
    CollapsibleComponentComponent,
    DurationPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    EventRouteActivator,
    EventsListResolver,
    AuthService,
    { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty)
    return window.confirm('No se han guardado los cambios para este evento, realmente desea cancelar?')

  return true

}