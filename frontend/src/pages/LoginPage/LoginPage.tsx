import './LoginPage.css'
import awarenessImage from '../../assets/images/awareness_of_waste_recycling.png'
import { useState,  } from 'react'
import { useNavigate } from 'react-router-dom'


const LoginPageDetails = [
    { "label": "UserName", "type": "text", "placeholder": "Name" },
    { "label": "Email", "type": "email", "placeholder": "Email" },
    { "label": "Password", "type": "password", "placeholder": "Password" },
]

type PageState = "Login" | "SignUp"


export function LoginPage() {
    const [pageState, SetpageState] = useState<PageState>("Login")
    const navigate = useNavigate()

    const fieldsToShow = LoginPageDetails.filter(detail => {
        if (pageState === "Login") {
            return detail.label !== "Email"
        }
        return true
    })

    const togglePage = () => {
        SetpageState(prev => prev === "Login" ? "SignUp" : "Login")
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        navigate('/dashboard/wastage-classifier')
    }


    return (
        <div className="Login-page-bg">
            <div className='awarenessImage-container'>
                <img src={awarenessImage} alt="awarenessImage" />
            </div>
            <form className="login-page-container" onSubmit={handleSubmit}>
                <div className='login-page-input'>
                    {fieldsToShow.map((detail, index) => (
                        <>
                            <label className="login-page-input" key={index}>{detail.label}</label>
                            <input type={detail.placeholder} className="" required placeholder={detail.placeholder} key={index} />
                        </>
                    ))}
                </div>
                {pageState === "Login" ? <><div>Don't have an account? <span onClick={togglePage} className='toggle-link'>SignUp</span></div>
                    <button type="submit" className="" >{pageState}</button></>
                    : <><div> Already have an account? <span onClick={togglePage} className='toggle-link' >Login</span></div>
                        <button type="submit" className="" >{pageState}</button></>
                }
            </form>
        </div>
    )
}
