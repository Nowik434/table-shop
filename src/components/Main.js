import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { MenuList } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import Logout from './auth/Logout';
import Login from './auth/Login';
import Feed from './Feed';
import Product from './Product';
import OrderDetails from './OrderDetails';
import Cart from './Cart';
import PaymentDetails from './PaymentDetails';
import { fetchProducts } from '../redux/actions/Actions';

import { ProtectedRoute } from './protectedRoute';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter
} from "react-router-dom";

import { fetchUser } from '../redux/actions/Actions';
import firebase from 'firebase'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
        backgroundColor: '#ededed',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    primaryMenu: {
        display: 'inline-flex',
    },
    primaryMenuLink: {
        color: 'black',
        textDecoration: 'none',
    },
}));





function Main({ store, fetchUser, fetchProducts }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const classes = useStyles();
    // const state = store.getState()


    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // console.log(user)
            setIsAuthenticated(true)
            fetchUser()
        } else {
            setIsAuthenticated(false)
        }
    })

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts])


    console.log(store.getState())

    return (
        <BrowserRouter>
            <Router>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton> */}
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" className={classes.title}>
                                        SKLEP ZE STOLIKAMI
                        </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <nav>
                                        <MenuList className={classes.primaryMenu}>
                                            <MenuItem >
                                                <Link className={classes.primaryMenuLink} to="/login">Login</Link>
                                            </MenuItem >
                                            <MenuItem>
                                                <Link className={classes.primaryMenuLink} to="/">Sklep</Link>
                                            </MenuItem>
                                            <MenuItem>
                                                <Link className={classes.primaryMenuLink} to="/pro">protected</Link>
                                            </MenuItem>
                                        </MenuList>
                                        <Logout />

                                    </nav>
                                </Grid>

                            </Grid>
                            <Cart />
                        </Toolbar>
                    </AppBar>
                </div>


                <div>


                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/shop/:product" aaa={'fdsfds'} component={Product} />
                        <Route exact path="/">
                            <Feed />
                        </Route>
                        <Route exact path="/payment">
                            <PaymentDetails />
                        </Route>
                        <ProtectedRoute exact path="/pro" user={isAuthenticated} component={OrderDetails} />
                    </Switch>
                </div>
            </Router>

        </BrowserRouter>
    )
}

// const mapStateToProps = (store) => {
//     return {
//         cart: store.productsReducer.cart,
//     }
// }

const mapDispatchToProps = dispatch => (
    bindActionCreators({ fetchUser, fetchProducts }, dispatch)
)

export default connect(null, mapDispatchToProps)(Main);