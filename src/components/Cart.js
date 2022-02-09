import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import CartItems from './CartItems';
import { getTotals } from '../redux/actions/Actions';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    title: {
        margin: theme.spacing(2, 4, 2),
    },
    header: {
        margin: theme.spacing(2, 4, 2),
    },
}));


const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);


function Cart({ cart, getTotals }) {
    const classes = useStyles();
    // const [cartCount, setCartCount] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [totalItems, setTotalItems] = useState();
    const [state, setState] = useState({
        cartIsOpen: false,
    });
    let history = useHistory();

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, cartIsOpen: open });
    };

    // useEffect(() => {
    //     getTotals();
    //     let count = 0;
    //     cart.products.forEach((item) => {
    //         count += item.price;
    //     });

    //     setCartCount(count)
    // }, [cart, cartCount])

    useEffect(() => {
        let items = 0;
        let price = 0;

        cart.products.forEach(item => {
            items += item.amount;
            price += item.amount * item.price;
        });
        console.log(price)
        setTotalPrice(price)
        setTotalItems(items)
        // getTotals()
    }, [cart, totalPrice, setTotalPrice, totalItems, setTotalItems, getTotals])


    const toOrderDetails = () => {
        history.push("/payment");
    }

    return (
        <div>
            <React.Fragment key='right'>
                <IconButton aria-label="cart" onClick={toggleDrawer('right', true)}>
                    <StyledBadge badgeContent={totalItems} color="secondary">
                        <ShoppingCartIcon />
                    </StyledBadge>
                </IconButton>
                <Drawer className={classes.drawer} anchor='right' open={state['cartIsOpen']} onClose={toggleDrawer('cartIsOpen', false)}>
                    <Typography variant="h6" className={classes.header}>
                        KOSZYK
                    </Typography>
                    {cart.items === 0 ? <h4>Nic nie ma w koszyku</h4> :
                        cart.products.map(item => (
                            <CartItems key={item.name} item={item} />
                        ))
                    }
                    <Typography variant="h6" className={classes.title}>
                        CENA PRODUKTÓW: {totalPrice} PLN
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        DOSTAWA: OD {cart.delivery} PLN
                    </Typography>
                    <List>
                        <ListItem button key='gfd'>
                            <ListItemIcon>{4 % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText onClick={() => toOrderDetails()} primary='PRZEJDŹ DO KASY' />
                        </ListItem>
                    </List>
                </Drawer>
            </React.Fragment>

        </div>
    );
}

const mapStateToProps = (store) => {
    return {
        cart: store.productsReducer.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTotals: (items, price) => dispatch(getTotals(items, price))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);