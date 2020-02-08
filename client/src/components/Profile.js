import React, { useEffect, useState } from 'react'
import { Route, Link, useRouteMatch, useParams, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import emptyUser from '../images/blank-profile.png'


export const Profile = () => {
    const [profileUser, updateProfileUser] = useState()
    const [editOpen, updateEdit] = useState(false)
    const [editFields, updateEditFields] = useState({
        email: '',
        name: '',
        notes: '',
    })
    const [noUser, updateNoUser] = useState(false)

    const getProfileUser = async (user) => {
        let result = await fetch(`http://0.0.0.0:3001/users/${user}`)
        if (result.status === 200)
        {
            let information = await result.json()
            updateProfileUser(information)
            let newEdit = {}
            Object.keys(editFields).forEach((item, index) => {
                newEdit[item] = information.user[item]
            })
            updateEditFields(newEdit)
        }
        else if (result.status === 404)
            updateNoUser(true)
    }

    const handleClick = () => {
        if (editOpen)
        {
            console.log("HERE")
            let revertEdits = JSON.parse(JSON.stringify(editFields))
            Object.keys(revertEdits).forEach((item, index) => {
                revertEdits[item] = profileUser.user[item]
            })
            updateEditFields(revertEdits)
        }
        updateEdit(!editOpen)

    }

    const handleChange = (event) => {
        let newEditValue = JSON.parse(JSON.stringify(editFields))
        newEditValue[event.target.name] = event.target.value
        updateEditFields(newEditValue)
    }

    const updateUser = async () => {
        let result = await fetch(`http://0.0.0.0:3001/users/${profileUser.user['uuid']}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(editFields)
        })
        if (result.status === 200)
        {
            let update = JSON.parse(JSON.stringify(profileUser))
            Object.keys(editFields).forEach((item, index) => {
                update.user[item] = editFields[item]
            })
            updateProfileUser(update)
            updateEdit(!editOpen)
        }
    }

    useEffect(() => {
        let pathSplit = window.location.pathname.split('/')
        getProfileUser(pathSplit[2])
    },[])

    return (
        <>
        <div style={styles.userMainContainer}>
            {!noUser &&
            <>
            <img style={styles.userImage} src={emptyUser}></img>
            <div style={styles.profileInfoContain}>
                {profileUser && !editOpen &&
                <>
                    <p>{profileUser.user['name']}</p>
                    <p>{profileUser.user['email']}</p>
                    <p>{profileUser.user['notes']}</p>
                </>
                }
                {editOpen && 
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label>Name: 
                        <textarea onChange={handleChange} value={editFields['name']} type="text" name="name" />
                    </label>
                    <label>Email: 
                        <textarea onChange={handleChange} value={editFields['email']} type="text" name="email" />
                    </label>
                    <label>Notes: 
                        <textarea onChange={handleChange} value={editFields['notes']} type="text" name="notes" />
                    </label>
                    </div>
                }
                <button onClick={handleClick}>{editOpen ? 'Cancel':'Edit Profile'}</button>
                {editOpen && <button onClick={updateUser}>Update</button>}
            </div>
            </>
            }
            <>
            {noUser &&
                <>
                <div>No User Found!!!</div>
                </>
            }
            </>
        </div>
        </>
    )
}
const styles = {
    userMainContainer: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    userImage: {
        width: '80%',
        height: 'auto',
        maxWidth: '400px',
    },
    profileInfoContain: {
        width: '50%',
    }
}