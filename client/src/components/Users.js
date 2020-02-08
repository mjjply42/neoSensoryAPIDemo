import React, { useEffect, useState } from 'react'
import { Route, Link, useRouteMatch, useParams, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PageTurn } from './PageTurn.js'
import { UserForm } from './UserForm.js'
import emptyUser from '../images/blank-profile.png';


export const Users = () => {

    const dispatch = useDispatch()
    const userStore = useSelector(state => state.navState.users)
    const [userForm, updateFormShow] = useState(false)
    const addNewUser = () => {
        updateFormShow(!userForm)
    }

    useEffect(() => {
        console.log("HERE")
        dispatch({type: 'update-users-saga-pusher'})
    },[])

    useEffect(() => {
    },[userStore])

    return (
        <>
        <PageTurn/>
        <button onClick={addNewUser} style={styles.addUserButton}>Add New User</button>
        {userForm && <UserForm  closeEdit={addNewUser}/>}
        <div style={styles.userMainContainer}>
            { userStore.length > 0 ? userStore.map((item, index) => {
                return (
                    <div onClick={() => {window.location.href = `/profiles/${item['uuid']}`}}
                        style={styles.userAv} key={index}>
                        <img style={styles.userImage} src={emptyUser}></img>
                        <div style={styles.userDesrip}>
                            <p style={styles.userName}>{item.name}</p>
                            <p style={styles.userDetails}>{item.email}</p>
                            <p style={styles.userDetails}>{item.notes}</p>
                        </div>
                    </div>
                )
            })
            :undefined}
        </div>
        <PageTurn />
        </>
    )
}

const styles = {
    addUserButton: {
        width: '50%',
        maxWidth: '400px',
        height: '70px',
        backgroundColor: '#02A853',
        color: 'white',
        fontSize: '20px',
        margin: '20px',
    },
    userMainContainer: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    userImage: {
        width: '100%',
    },
    userAv: {
        marginRight: '10px',
        marginLeft: '10px',
        marginBottom: '10px',
        maxWidth: '150px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        "&:hover": {
            background: "orange"
        },
    },
    userDesrip: {
        width: '100%',
    },
    userName: {
        fontSize: '20px',
        wordWrap: 'break-word',
    },
    userDetails: {
        fontSize: '12px',
        wordWrap: 'break-word',
    }
}
