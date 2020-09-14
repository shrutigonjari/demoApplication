import { Action } from '@ngrx/store'
import { Tutorial } from './../models/tutorial.model'
import * as TutorialActions from './../actions/tutorial.actions'

// const initialState: Tutorial = {}

export function reducer(state: Tutorial[] = [], action: TutorialActions.Actions) {
    switch (action.type) {
        case TutorialActions.ADD_TUTORIAL:
            return [...state, action.payload];
        case TutorialActions.UPDATE_TUTORIAL:
            return  state.map(
                (c, i) => (i === action.payload.key)
                    ? Object.assign({}, c, action.payload.data)
                    : c
            );
        case TutorialActions.REMOVE_TUTORIAL:
            // state.splice(action.payload, 1)
            state = action.payload;
            return state;
        default:
            return state;
    }
}