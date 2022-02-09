import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { addItemToCart } from '../redux/actions/Actions';



const useStyles = makeStyles((theme) => ({
    image: {
        width: '100%',
    },
    name: {
        textTransform: 'uppercase',
        paddingTop: '40px',
    },
    container: {
        paddingLeft: '70px',
    },
    button: {
        marginTop: '50px',
        marginBottom: '50px',
    },
}));


const Product = ({ productsReducer, product, addItemToCart }) => {
    const classes = useStyles();
    // console.log(product)

    return (
        <div>
            {product ?
                <Grid container >
                    <Grid item xs={12} sm={6} md={6}>
                        <img src={product.img} alt={product.title} className={classes.image} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Container maxWidth="md" className={classes.container}>
                            <Typography variant="h4" component="h1" className={classes.name}>
                                {product.name}
                            </Typography>
                            <Typography variant="h5" component="h3" className={classes.name}>
                                {product.price} PLN
                            </Typography>
                            <Button onClick={() => addItemToCart(product)} variant="outlined" className={classes.button}>DODAJ DO KOSZYKA</Button>
                            <Typography variant="h5" component="h3" className={classes.name}>
                                OPIS
                            </Typography>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim tempore blanditiis sit harum consequuntur ducimus, temporibus cupiditate nam eos aut odit facilis corrupti ut. Consequatur mollitia veritatis nihil magnam nobis aperiam assumenda doloremque facere, ea quisquam explicabo, nostrum molestias illo? Inventore ad sed facere ab tempora eligendi quis, atque vel amet error illum culpa! Vel praesentium qui ratione exercitationem et, soluta tenetur sit asperiores blanditiis quam unde odio itaque eum non earum?</p>
                        </Container>
                    </Grid>
                </Grid> : <p>Loading...</p>}
        </div>
    );
}

const mapStateToProps = (store, ownProps) => {
    let id = ownProps.match.params.product
    // console.log(id)
    return {
        productsReducer: store.productsReducer,
        product: store.productsReducer.products.find(product => product.title === id)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => dispatch(addItemToCart(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);