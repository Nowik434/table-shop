import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { decrease, increase, remove } from '../redux/actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        // margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    inlineFlex: {
        display: 'flex',
        margin: 'auto',
    },
    counter: {
        marginRight: '20px',
    },
    m_auto: {
        margin: 'auto',
        fontWeight: 'bold',
        marginLeft: '0px',
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0 0px 0 25px',
    },
    removeButton: {
        flexDirection: 'column',
        margin: 'auto',
        marginRight: '30px',
        marginLeft: '30px',
    }
}));



function CartItems({ item, increase, decrease, remove }) {
    const classes = useStyles();

    // const [count, setCount] = React.useState(1);
    // // console.log(item)

    // const eee = (e) => {
    //     console.log(e.target)
    // }

    return (
        <Paper className={classes.paper} onClick={() => console.log(item.id)}>
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase className={classes.image}>
                        <img className={classes.img} alt="complex" src={item.img} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs className={classes.flexColumn}>
                            <Typography gutterBottom variant="subtitle1" className={classes.m_auto}>
                                {item.name}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" className={classes.m_auto}>
                                Cena: {item.price}
                            </Typography>
                            <Typography variant="body2" gutterBottom className={classes.inlineFlex} >
                                <Typography variant="subtitle1" className={classes.counter}>
                                    {item.amount}
                                </Typography>
                                <ButtonGroup>
                                    <Button
                                        aria-label="reduce"
                                        onClick={() => {
                                            decrease(item.id);
                                            // setCount(Math.max(count - 1, 0));
                                        }}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </Button>
                                    <Button
                                        aria-label="increase"
                                        onClick={() => {
                                            increase(item.id);
                                            // setCount(count + 1);
                                        }}
                                    >
                                        <AddIcon fontSize="small" />
                                    </Button>
                                </ButtonGroup>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.removeButton}>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon onClick={() => remove(item.id)} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

const mapStateToProps = (store) => {
    return {
        cart: store.productsReducer.cart
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({ increase, decrease, remove }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);