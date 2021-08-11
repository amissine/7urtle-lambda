const MISSING = Symbol("Missing")

const curry = (
    fn,
    missingParameters = Array.from({ length: fn.length }, (_, i) => i),
    parameters = []
) => {
    return (...params) => {
        // Keeps a track of the values we haven't supplied yet
        const missing = [...missingParameters]
        // Keeps a track of the values we have supplied
        const values = [...parameters]

        // Loop through the new parameters
        let scan = 0
        for (let parameter of params) {
            // If it is missing move on
            if (parameter === MISSING) {
                scan++
                continue
            }
            // Update the value and the missing list
            values[missing[scan] ?? values.length] = parameter
            missing.splice(scan, 1)
        }
        // Call the function when we have enough params
        if (missing.length <= 0) {
            return fn(...values)
        } else {
            // Curry again? Yes please
            return curry(fn, missing, values)
        }
    }
}

