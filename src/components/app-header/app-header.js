import React from 'react';
import cartIcon from './shopping-cart-solid.svg';
import './app-header.scss';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import WithRestoService from '../hoc';

const AppHeader = ({total, items, RestoService}) => {
    return (
        <header className="header">
            <Link to={'/'} className="header__link" href="#">
                Menu
            </Link>
            <Link to='/cart' className="header__link" href="#">
                <img className="header__cart" src={cartIcon} alt="cart"></img>
                Total: {total} $
            </Link>
            <button 
                onClick ={() => {
                    console.log(items);
                    RestoService.postOrder(JSON.stringify(items))
                        .then(res => console.log(res));
                }}
                className='header__button'>Make order</button>
        </header>
    )
};

const mapStateToProps = (state) => {
    return {
        total: state.total,
        items: state.items,
    }
}
export default WithRestoService()(connect(mapStateToProps)(AppHeader));