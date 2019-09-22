let asicId = 0;

export const addAsic = (asic) => ({
    type: 'ADD_ASIC',
    id: asicId++,
    asic
});



export const clearAsics = () => ({
    type: 'CLEAR_ASICS'
});
