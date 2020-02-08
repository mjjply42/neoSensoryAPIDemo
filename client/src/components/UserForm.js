import React, { useEffect, useState } from 'react'
import { Route, Link, useRouteMatch, useParams, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export const UserForm = () => {

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
        let result = await fetch('http://0.0.0.0:3001/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
        })
    }

    function handleChange(event)
    {
        let newUserDataObj = JSON.parse(JSON.stringify(userData))
        newUserDataObj[event.target.name] = event.target.value
        updateUserData(newUserDataObj)
    }

    return (
        <form onSubmit={handleSubmit} style={styles.formStyle}>
            <label>Name: 
                <input onChange={handleChange} type="text" name="name" />
            </label>
            <label>Email: 
                <input onChange={handleChange} type="text" name="email" />
            </label>
            <label>Notes: 
                <input onChange={handleChange} type="text" name="notes" />
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
    }
}