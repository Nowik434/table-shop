import React from 'react'
import { Button } from '@material-ui/core';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchUser } from '../../redux/actions/Actions';

const handleClick = (e) => {
    e.preventDefault();
    firebase.auth().signOut()
        .then(() => {
            console.log('logout');

            return <Redirect to={{ pathname: '/login' }} />
        });
    fetchUser();
}

function Logout() {
    return (
        <Button onClick={(e) => handleClick(e)}>Wyloguj</Button>
    )
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({ fetchUser }, dispatch)
)


export default connect(null, mapDispatchToProps)(Logout);