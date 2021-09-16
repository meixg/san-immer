import type { Patch } from "immer"

export function patchesToDiff(patches: Patch[]) {
    const diff = {} as any

    for (let patch of patches) {
        const patchPath = patch.path

        let cur = diff
        for (let p of patchPath) {
            if (!cur[p]) {
                cur[p] = {}
            }

            cur = cur[p]
        }
        cur.$change = true
    }

    return diff
}