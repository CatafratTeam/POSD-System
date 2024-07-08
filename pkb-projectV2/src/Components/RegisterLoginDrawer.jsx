import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { API_URL } from "../constants";
import { useState } from "react";
import { useDataFetching } from "../utils/dataFetching";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: '0px 0px 5px #fa1e4e',
    p: 4,
    color: 'customTextColor.secondary',
    borderRadius: '10px',
    backdropFilter: 'blur(15px)', // Blur effect
    webkitBackdropFilter: 'blur(15px)' // For Safari support
};


export default function CenteredDrawer({ open, handleClose }) {
    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: ''
    });

    const { postData } = useDataFetching();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const toggleMode = () => {
        setIsRegister(!isRegister);
        setFormData({
            email: '',
            username: '',
            password: ''
        });
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isRegister) {
            try {
                const { confirmPassword, ...dataToSend } = formData;
                const response = await postData(`${API_URL}/auth/local/register`, dataToSend);

                console.log('Success:', response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            try {
                const response = await postData(`${API_URL}/auth/local`, {
                    identifier: formData.email,
                    password: formData.password
                });
                console.log('Login success!');

                // It returns a JWT token that you can store in localStorage
                localStorage.setItem('token', response.jwt);

                console.log('User data:', response.user);
                console.log('Token:', localStorage.getItem('token'));

                // Redirect to the home page
                window.location.href = '/';

            } catch (error) {
                console.error('Login error:', error);
            }
        }

        setFormData({
            email: '',
            username: '',
            password: ''
        });
        handleClose();
    };

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ boxShadow: '0px 0px 10px #fa1e4e' }}
        >
            <Box sx={style}>
                <IconButton onClick={handleClose} sx={{ color: '#ffffff', position: 'absolute', top: 8, right: 8 }}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h4" component="h5" fontFamily="fontFamily" sx={{ color: "customTextColor.main", mb: 1 }}>
                    <b>{isRegister ? 'Register' : 'Welcome!'}</b>
                </Typography>
                <Typography variant="body1" fontFamily="fontFamily" sx={{ mb: 3 }}>
                    {isRegister ? 'Create a new account.' : 'Login to continue.'}
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {isRegister && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                            <TextField
                                label="Username"
                                variant="outlined"
                                placeholder='Mario'
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                color="secondary"
                                focused
                                InputLabelProps={{ style: { color: '#e7edf1' } }}
                                InputProps={{ style: { color: '#e7edf1' } }}
                                sx={{ flex: 1 }}
                            />
                        </Box>
                    )}
                    <TextField
                        autoComplete="new-password"
                        label="Email"
                        variant="outlined"
                        placeholder='mario.rossi@gmail.com'
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        fullWidth
                        color="secondary"
                        focused
                        InputLabelProps={{ style: { color: '#e7edf1' } }}
                        InputProps={{ style: { color: '#e7edf1' } }}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label={isRegister ? 'Create password' : 'Password'}
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        fullWidth
                        color="secondary"
                        focused
                        InputLabelProps={{ style: { color: '#e7edf1' } }}
                        InputProps={{
                            style: { color: '#e7edf1' },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        sx={{ color: 'customTextColor.secondary' }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        sx={{ mb: 2 }}
                    />
                    <Typography variant="body2">
                        {isRegister ? (
                            <>
                                Already registered? <Button variant="contained" onClick={toggleMode} sx={{ '&:hover': { color: 'customTextColor.main' } }}>Login</Button>
                            </>
                        ) : (
                            <>
                                Not registered yet? <Button variant="contained" onClick={toggleMode} sx={{ '&:hover': { color: 'customTextColor.main' } }}>Register</Button>
                            </>
                        )}
                    </Typography>
                    <Button variant="contained" type="submit" sx={{ mt: 2, backgroundColor: "customTextColor.main", '&:hover': { backgroundColor: 'customTextColor.hover' } }}>
                        <b>{isRegister ? 'Register' : 'Login'}</b>
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}