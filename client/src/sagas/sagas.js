import { call, all, put, takeLatest, select } from 'redux-saga/effects'
import config from '../utils/config.json'

//const delay = (ms) => new Promise(res => setTimeout(res, ms))
function fetchUsers (page) {
    return fetch(`${config.API_URL}/users?offset=${page}&limit=10`, {
        method: 'GET',
        headers: {
                'Content-Type': 'application/json',}})  
}

function* hydrateUsersState() {
    const pages = yield select(state => state.navState.page)
    const limit = yield select(state => state.navState.limit)
    let response = yield call (fetchUsers, pages, limit)
    let result = yield response.json()


    yield put({ type: 'update-users', data: result.data})
    yield put({ type: 'update-total-users', data: result.total})
}

function* getUsersSaga() {
    yield takeLatest('update-users-saga-pusher', hydrateUsersState)
}

export default function* rootSaga() {
    yield all([
        getUsersSaga(),
    ]);
}