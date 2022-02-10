import * as React from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";




class PageHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPassword: false,
            setOpen: false,
            value: 0,
            userValue: {
                login: "",
                email: "",
                password: "",
            },
        }

        this.handleNewUser = this.handleNewUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeTabs = this.handleChangeTabs.bind(this);
        this.a11yProps = this.a11yProps.bind(this);
        this.TabPanel = this.TabPanel.bind(this);
        this.loginForm = this.loginForm.bind(this);
        this.signUpForm = this.signUpForm.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }


    handleNewUser = () => {
        console.log("NEW");
        const newUser = this.state.userValue;

        fetch(`http://localhost:8000/signup`, {
            method: 'post',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(newUser)
        });
    };

    handleLogin = () => {
        console.log("LOGIN")

        const newUser = this.state.userValue;

        fetch(`http://localhost:8000/login`, {
            method: 'post',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(newUser)
        });
    };

    handleChange = (e) => {
        console.log(e.target.id, e.target.value)
        const {id, value} = e.target;
        this.setState(prevState => {
            let userValue = Object.assign({}, prevState.userValue);
            userValue[id] = value;
            return { userValue }
        })
        console.log(this.state.userValue);
    }

    handleClickShowPassword = () => {
        const password = (this.state.showPassword ? false : true)
        this.setState({
            showPassword: password
        })
    };

    handleClickOpen = () => {
        this.setState({setOpen: true});
    };

    handleClose = () => {
        this.setState({setOpen: false});
    };

    handleChangeTabs = (e, newValue) => {
        this.setState({
            value: newValue
        })
    };

    a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    };

    TabPanel(props) {
        const { children, value, index } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    };

    loginForm = () => {

        return (
            <div>
                    <FormControl sx={{ m: 1, width: '25ch' }} >
                        <TextField
                            id="login"
                            label="Login"
                            onChange={this.handleChange}
                            variant="outlined"
                            margin="normal"
                            sx={{ mx: 1}}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                            <TextField
                                id="password"
                                label="Password"
                                onChange={this.handleChange}
                                type={this.state.showPassword ? "text" : "password"}
                                variant="outlined"
                                margin="normal"
                                sx={{ mx: 1}}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={this.handleClickShowPassword}>
                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        <Button
                            onClick={this.handleLogin}
                            variant="contained"
                            color="success"
                            fullWidth="true"
                            sx={{ my:1 }}
                        >Login</Button>
                    </FormControl>
            </div>

                )
    };

    signUpForm = () => {
        return (

                <div>
                    <FormControl sx={{ m: 1, width: '25ch' }} >
                    <TextField
                        id="login"
                        label="Login"
                        onChange={this.handleChange}
                        variant="outlined"
                        margin="normal"
                        sx={{ mx: 1}}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        id="email"
                        label="Email"
                        onChange={this.handleChange}
                        variant="outlined"
                        margin="normal"
                        sx={{ mx: 1}}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            )
                        }}
                    />

                    <TextField
                        id="password"
                        label="Password"
                        onChange={this.handleChange}
                        type={this.state.showPassword ? "text" : "password"}
                        variant="outlined"
                        margin="normal"
                        sx={{ mx: 1}}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        onClick={this.handleNewUser}
                        variant="contained"
                        color="success"
                        fullWidth="true"
                        sx={{my: 1}}
                    >Register</Button>
                    </FormControl>
                </div>


        )
    };


    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        TEST
                    </Typography>
                    <div>
                        <Tooltip title="Account">
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={this.handleClickOpen}
                            >
                                <AccountCircleIcon />
                            </IconButton>
                        </Tooltip>
                        <Dialog open={this.state.setOpen} onClose={this.handleClose}>
                            <AppBar position="static">
                                <Tabs
                                    value={this.state.value}
                                    onChange={this.handleChangeTabs}
                                    indicatorColor="secondary"
                                    textColor="inherit"
                                    variant="fullWidth"
                                    aria-label="LoginTabs"
                                >
                                    <Tab label="Login" {...this.a11yProps(0)} />
                                    <Tab label="Sing Up" {...this.a11yProps(1)}/>
                                </Tabs>
                            </AppBar>
                            <DialogContent>
                                <this.TabPanel value={this.state.value} index={0}>
                                    <this.loginForm />
                                </this.TabPanel>
                                <this.TabPanel value={this.state.value} index={1}>
                                    <this.signUpForm />
                                </this.TabPanel>
                            </DialogContent>
                        </Dialog>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default PageHeader
