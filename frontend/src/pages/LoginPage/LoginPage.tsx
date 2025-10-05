import './LoginPage.css'
import awarenessImage from '../../assets/awareness_of_waste_recycling.png'

export function LoginPage() {
    return (
        <div className="Login-page-bg">
            <div className='awarenessImage-container'>
                <img src={awarenessImage} alt="awarenessImage" />
            </div>
            <form className="login-page-container">
                <div className='login-page-input'>
                    <label className="" >UserName</label>
                    <input type="text" className="" required placeholder='Name'/>
                </div>
                <div className='login-page-input'>
                    <label className="login-page-input" >Email</label>
                    <input type="email" className="" required placeholder='Email'/>
                </div>
                <div className='login-page-input'>
                    <label className="login-page-input" >Password</label>
                    <input type="password" className="" required placeholder='Password' />
                </div >
                <div>
                    Don't have an account?<span> Sign up</span>

                </div>
                <button type="submit" className="">
                    Login
                </button>
            </form>

        </div>
    )
}
