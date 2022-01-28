import {classes} from './Header.module.css';

function Header()
{
    return (
        <div className='header-outer d-flex justify-conetent-between align-items-center'>
            <div className='left-part'>
              <div className='logo'>logo</div>
            </div>
            <div className="right-part">
                 <div className='cart'></div>
                 <div className='log-out'></div>
            </div>
           
        </div>
    )
}

export default Header;

