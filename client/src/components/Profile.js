import React, { useEffect, useState } from 'react'
import { Route, Link, useRouteMatch, useParams, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import config from '../utils/config.json'
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
        let result = await fetch(`${config.API_URL}/users/${user}`)
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
        let result = await fetch(`${config.API_URL}/users/${profileUser.user['uuid']}`,{
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

    const backString = "< Back"
    return (
        <>
        <div style={styles.rofileBackButtonDiv}>
            <h7 style={styles.profileBackButton} onClick={()=> {window.history.back()}}>{backString}</h7>
        </div>
        <div style={styles.userMainContainer}>
            {!noUser &&
            <>
            <img style={styles.userImage} src={emptyUser}></img>
            <div style={styles.profileInfoContain}>
                {profileUser && !editOpen &&
                <>
                    <h3 style={styles.profileDescription}>{profileUser.user['name']}</h3>
                    <p style={styles.profileDescription}>{profileUser.user['email']}</p>
                    <p style={styles.profileDescription}>{profileUser.user['notes']}</p>
                </>
                }
                {editOpen && 
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label>Name: 
                        <textarea style={styles.textArea} onChange={handleChange} value={editFields['name']} type="text" name="name" />
                    </label>
                    <label>Email: 
                        <textarea style={styles.textArea} onChange={handleChange} value={editFields['email']} type="text" name="email" />
                    </label>
                    <label>Notes: 
                        <textarea style={styles.textArea} onChange={handleChange} value={editFields['notes']} type="text" name="notes" />
                    </label>
                    </div>
                }
                <button style={styles.editProfile} onClick={handleClick}>{editOpen ? 'Cancel':'Edit Profile'}</button>
                {editOpen && <button style={styles.editProfile} onClick={updateUser}>Update</button>}
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
    editProfile: {
        fontSize: '20px',
        marginRight: '10px',
        marginLeft: '10px',
    },
    textArea: {
        fontSize: '20px',
        minWidth: '90%',
        marginBottom: '20px',
    },
    userMainContainer: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    userImage: {
        width: '80%',
        height: 'auto',
        maxWidth: '400px',
    },
    profileInfoContain: {
        width: '50%',
        marginLeft: '30px',
    },
    profileDescription: {
        textAlign: 'left',
        wordWrap: 'break-word',
    },
    rofileBackButtonDiv: {
        width: '80%',
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '40px',
    },
    profileBackButton: {
        textAlign: 'left',
    },
}