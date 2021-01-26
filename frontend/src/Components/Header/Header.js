import Logo from '../../assets/images/fp-logo.png';
import Navbar from '../NavComponent';
import UserContext from '../../UserContext';


const Header = (props) => {
    return (
        <div className="row header">
            <div className="col-4 logo">
                <img src={Logo} alt="Logo" className="float-left" />
            </div>
            <div className="col-6"></div>
            <div className="col-2 align-self-center">
                <UserContext.Consumer>
                    {
                        (value) => <Navbar
                            logged_in = {value.logged_in}
                            handleLogout = {value.handleLogout}
                            display_form = {props.display_form}
                        />
                    }
                </UserContext.Consumer>
            </div>
        </div>
    )
}

export default Header;