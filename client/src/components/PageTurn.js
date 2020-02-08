import React, { useEffect, useState } from 'react'
import { Route, Link, useRouteMatch, useParams, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export const PageTurn = () => {
    const dispatch = useDispatch()
    const totalUsersAvailable = useSelector(state => state.navState.totalUsersAvailable)
    const page = useSelector(state => state.navState.page)
    const prev = '< Previous'
    const next = 'Next >'

    const increase = () => {
        if ((page + 10) < totalUsersAvailable)
        {
            dispatch({type:'increase-page-number'})
            dispatch({type: 'update-users-saga-pusher'})
        }
    }
    const decrease = () => {
        if ((page - 10) > 0)
        {
            dispatch({type:'decrease-page-number'})
            dispatch({type: 'update-users-saga-pusher'})
        }
    }
    return (
        <>
        <div style={styles.navButtons}>
            <p onClick={decrease} style={styles.singleButton}>{prev}</p>
            <p onClick={increase} style={styles.singleButton}>{next}</p>
        </div>
        </>
    )
}

const styles = {
    navButtons: {
        display: 'flex',
        flexDirection: 'row'
    },
    singleButton: {
        marginRight: '10px',
        marginLeft: '10px',
    }
}