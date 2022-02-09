import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { useHistory, Link } from 'react-router-dom';


import { bindActionCreators } from 'redux';
// import { fetchProducts } from '../redux/actions/Actions';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: '#ededed',
    },
    gridList: {
        width: '100%',
        height: 'calc(100vh - 108px);',
    },
    gridListTitle: {
        backgroundColor: '#ededed',
        cursor: 'pointer'
    },
    gridListTitleBar: {
        backgroundColor: '#ededede0',
        color: '#000 !important',
    },
    icon: {
        color: '#000 !important',
    },
}));

function Feed({ fetchProducts, productsReducer }) {
    // console.log(typeof (products))
    // console.log(productsReducer)
    const classes = useStyles();
    let history = useHistory();

    // useEffect(() => {
    //     fetchProducts();
    // }, [fetchProducts])



    const handleOnClick = (item) => {
        // console.log('fdsfdsfdsfd', item)
        history.push(`/shop/${item.title}`)
    }

    return (

        <div className={classes.root}>
            <GridList className={classes.gridList}>
                {/* <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">December</ListSubheader>
                </GridListTile> */}
                {productsReducer.products.map((item) => (
                    <GridListTile
                        // onClick={() => console.log(item)}
                        onClick={() => handleOnClick(item)}
                        className={classes.gridListTitle}
                        key={item.img}
                        style={{ height: '100%' }}>
                        <img src={item.img} alt={item.name} />
                        <GridListTileBar
                            title={item.name}
                            subtitle={<span>cena: {item.price} PLN</span>}
                            className={classes.gridListTitleBar}
                            actionIcon={
                                <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>

    );
}

const mapStateToProps = (store) => {
    return {
        productsReducer: store.productsReducer,
    }
}

// const mapDispatchToProps = dispatch => (
//     bindActionCreators({ fetchProducts }, dispatch)
// )

export default connect(mapStateToProps)(Feed);