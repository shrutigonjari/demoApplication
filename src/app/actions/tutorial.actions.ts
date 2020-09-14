import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Tutorial } from './../models/tutorial.model'

export const ADD_TUTORIAL       = '[TUTORIAL] Add'
export const REMOVE_TUTORIAL    = '[TUTORIAL] Remove'
export const UPDATE_TUTORIAL    = '[TUTORIAL] Update'

export class AddTutorial implements Action {
    readonly type = ADD_TUTORIAL

    constructor(public payload: Tutorial) {}
}

export class RemoveTutorial implements Action {
    readonly type = REMOVE_TUTORIAL

    constructor(public payload: []) {}
}
export class UpdateTutorial implements Action {
    readonly type = UPDATE_TUTORIAL

    constructor(public payload:any) {}
}

export type Actions = AddTutorial | RemoveTutorial | UpdateTutorial