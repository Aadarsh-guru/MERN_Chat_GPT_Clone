import React, { useState } from 'react'
import { Box, Typography, TextField, useMediaQuery, styled, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const Component = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    '& > div': {
        padding: 10,
        marginTop: 10
    },
    '& > p': {
        marginTop: 10,
        fontSize: 14,
        color: 'green',
        '& > a': {
            textDecoration: 'none',
            fontSize: 14,
            color: 'red',
            fontWeight: 550
        }
    }
})

const Register = () => {

    const isNotMobile = useMediaQuery("(min-width:1000px)")
    const [data, setData] = useState({ username: '', email: '', password: '' })
    const navigate = useNavigate()

    const onSubmit = async () => {
        try {
            if (data) {
                const response = await axios.post('/api/v1/auth/register', data)
                if (response.status === 201) {
                    toast.success(response.data.message)
                    navigate('/login')
                } else {
                    toast.error(response.data.message)
                }
            }
        } catch (error) {
            console.log(error);
            toast.error('Required feilds can not be empty.')
        }
    }

    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    return (
        <Box width={isNotMobile ? '40%' : '80%'} p={'2rem'} m={'2rem auto'} borderRadius={5} sx={{ boxShadow: 5, backgroundColor: '' }} >
            <Typography variant='h4' textAlign={'center'} >Sign-Up</Typography>
            <Component>
                <TextField type='text' label='Username' required margin='normal' variant='standard' name='username' onChange={(e) => onValueChange(e)} />
                <TextField type='email' label='Email' required margin='normal' variant='standard' name='email' onChange={(e) => onValueChange(e)} />
                <TextField type='password' label='Password' required margin='normal' variant='standard' name='password' onChange={(e) => onValueChange(e)} />
                <Button onClick={() => onSubmit()} variant='contained' >Sign-Up</Button>
                <Typography textAlign={'center'} >Already have an account ? <Link to='/login' >Login</Link></Typography>
            </Component>
        </Box>
    )
}

export default Register