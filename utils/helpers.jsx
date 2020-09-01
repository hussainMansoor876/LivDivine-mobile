const getFilterData = (obj) => Array.from(new Set(obj.map(s => s.id))).map(id => {
    return {
        ...obj.find(s => s.id === id)
    }
})

export {
    getFilterData
}