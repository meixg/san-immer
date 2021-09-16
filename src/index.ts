import { produceWithPatches, enablePatches } from 'immer'
import { patchesToDiff } from './patchesToDiff'

enablePatches()

type Recipe<StateType> = (draft: StateType) => void
export function produce<T>(recipe: Recipe<T>) {
    return {
        buildWithDiff: () => realBuild
    }

    function realBuild(state: T) {
        const [nextState, patches] = produceWithPatches(state, recipe)
        const diff = patchesToDiff(patches)

        return [nextState, diff]
    }
}
// const OriginAddAction = Symbol('originAddAction')

// export function enable(store: any) {
//     if (store[OriginAddAction]) {
//         return;
//     }

//     store[OriginAddAction]= store.addAction;

//     store.addAsyncAction = store[OriginAddAction]

//     store.addAction = function<T> (name: string, fn: (payload: any, draft: T, dispatch: Function) => void) {
//         store[OriginAddAction](name, (payload: any, tool: {getState: () => T; dispatch: (action: string, payload: any) => void}) => {
//             return produce<T>(draft => {
//                 fn(payload, draft, tool.dispatch)
//             })
//         })
//     }
// }

// export function disable(store: any) {
//     if (!store[OriginAddAction]) {
//         return;
//     }

//     store.addAction = store[OriginAddAction];
//     delete store[OriginAddAction];
// }