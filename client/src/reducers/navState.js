const defaultState = {
    users: {},
    page: 0,
    limit: 10,
    totalUsersAvailable: 0,
}

const navState = (state = defaultState, action) => {
    switch (action.type) {
        case 'update-users':
            return {
                ...state,
                users: action.data
            }
        case 'update-total-users':
            return {
                ...state,
                totalUsersAvailable: action.data
            }
        case 'update-users-saga-pusher':
            return state
        case 'increase-page-number':
            return {
                ...state,
                page: state.page += 10
            }
        case 'decrease-page-number':
            return {
                ...state,
                page: state.page -= 10
            }
        default:
            return state
    }
}

export default navState