export const someAsync = async <T>(arr: T[], fn: (item: T) => Promise<boolean>): Promise<boolean> => {
    const mapped = arr.map(fn)

    for (const item of mapped) {
        if (await item) return true
    }

    return false
}

export const findIndexAsync = async <T>(arr: Array<T>, asyncCallback: (item: T) => Promise<any>): Promise<number> => {
    for (let i = 0; i < arr.length; i++) {
        if (await asyncCallback(arr[i])) return i
    }

    return -1
}

export const findAsync = async <T>(arr: Array<T>, asyncCallback: (item: T) => Promise<any>): Promise<T | undefined> => {
    const mapped = arr.map(asyncCallback)
    const index = await findIndexAsync(mapped, result => result)
    return arr[index]
}
