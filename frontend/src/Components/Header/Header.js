import Logo from '../../assets/images/fp-logo.png';
import Navbar from '../NavComponent';

const Header = (props) => {
    return (
        <div className="row header">
            <div className="col-4 logo">
                <img src={Logo} alt="Logo" className="float-left" />
            </div>
            <div className="col-6"></div>
            <div className="col-2 align-self-center">
                <Navbar
                    logged_in = {props.logged_in}
                    handleLogin = {props.handleLogin}
                    handleLoginChange = {props.handleLoginChange}
                    handleLogout = {props.handleLogout}
                    username = {props.username}
                    displayed_form = {props.displayed_form}
                    display_form = {props.display_form}
                />
            </div>
        </div>
    )
}

export default Header;