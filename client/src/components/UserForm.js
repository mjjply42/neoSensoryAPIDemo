import React, { useEffect, useState } from 'react'
import { Route, Link, useRouteMatch, useParams, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import config from '../utils/config.json'

export const UserForm = (props) => {

    const [userData, updateUserData] = useState({
        email: '',
        name: '',
        notes: '',
    })

    async function handleSubmit(event)
    {
        event.preventDefault()
        if (userData.email === "")
            return
        let result = await fetch(`${config.API_URL}/users`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
        })
        props.closeEdit()

    }

    function handleChange(event)
    {
        let newUserDataObj = JSON.parse(JSON.stringify(userData))
        newUserDataObj[event.target.name] = event.target.value
        updateUserData(newUserDataObj)
    }

    return (
        <form onSubmit={handleSubmit} style={styles.formStyle}>
            <label style={styles.newUserLabel}>Name: 
                <textarea style={styles.newUserInput} onChange={handleChange} type="text" name="name" />
            </label>
            <label style={styles.newUserLabel}>Email: 
                <textarea style={styles.newUserInput} onChange={handleChange} type="text" name="email" />
            </label>
            <label style={styles.newUserLabel}>Notes: 
                <textarea style={styles.newUserInput} onChange={handleChange} type="text" name="notes" />
            </label>
                <input style={{marginTop: '10px'}} type="submit" value="Submit" />
        </form>
    )
}

const styles = {
    formStyle: {
        marginBottom: '30px',
        display: 'flex',
        flexDirection: 'column',
    },
    newUserInput: {
        marginBottom: '20px',
        fontSize: '20px',
        width: '80%',
        maxWidth: '400px',
    },
    newUserLabel: {
        display: 'flex',
        flexDirection: 'row'
    }
}