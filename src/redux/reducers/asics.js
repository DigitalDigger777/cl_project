const asics = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ASIC':
            return [
                ...state,
                {
                    id: action.id,
                    asic: action.asic
                }
            ]
        case 'DELETE_ASIC':
            return state.map(todo =>
                (todo.id === action.id)
                    ? {...todo, completed: !todo.completed}
                    : todo
            );
        case 'CLEAR_ASICS':
            return [];
        default:
            return state
    }
}

export default asics
