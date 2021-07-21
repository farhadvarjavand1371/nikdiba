import React from "react";
import {MDBAlert, MDBBox, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import Logo from"../images/logo.png"
import "../styles/registerPage.scss"
import {loginUser, registerUser} from "../services/Services";
import {Link} from "react-router-dom";
import ErrorBox from "../component/errorBox";

class LoginPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',

            invalidPassword:true,
            onclickButton:false,

            passwordInvalidText:'گذرواژه الزامی است',

            showPassword:false,

            alertErrorText:'',
            alertErrorShow:false,


        }
    }

    setData = (event) =>{
        this.setState({[event.target.name]: event.target.value})
    }
    alertErrorShowCloseHandle=()=>{
        this.setState({alertErrorShow:!this.state.alertErrorShow})
    }
    render() {
        return(
            <MDBContainer className={"fv-login-page"} style={{maxWidth: '100%'}}>
                <MDBRow style={{backgroundColor: 'red',  height: '200px'}}>
                    {this.state.alertErrorShow?
                        <ErrorBox alertErrorText={this.state.alertErrorText} close={this.alertErrorShowCloseHandle}/>
                        :""}
                </MDBRow>

                <MDBRow className={"fv-login-page-center-body"}>
                    <MDBContainer>
                        <MDBRow className={"fv-login-page-img"}>
                            <img src={Logo}/>
                        </MDBRow>
                        <MDBRow>
                            <h6 style={{fontWeight:'500' , marginBottom:'5%', marginTop:'20%'}}>ورود</h6>
                        </MDBRow>
                        <MDBRow className={"fv-login-page-texts"}>
                            <p>نام کاربری یا شماره موبایل خود را وارد کنید</p>
                        </MDBRow>
                        <MDBRow>
                            <input type={'text'} placeholder={"نام کاربری"} name={"username"} value={this.state.username} onChange={(event)=>{
                                this.setData(event)
                            }}/>
                        </MDBRow>


                        <MDBRow className={"fv-login-page-texts"}>
                            <p>گذرواژه خود را وارد کنید</p>
                        </MDBRow>
                        <MDBRow className={this.state.invalidPassword && this.state.onclickButton? "fv-alert-right-of-placeholder fv-password-button" : 'fv-password-button'} >
                            <i className={this.state.invalidPassword && this.state.onclickButton ? "fa fa-exclamation-circle" : ""} />
                            <input type={this.state.showPassword?'text' : 'password'} placeholder={"گذرواژه"} name={"password"} value={this.state.password} onChange={(event)=>{
                                this.setData(event)
                                if(!event.target.value){
                                    this.setState({invalidPassword:true , passwordInvalidText:'گذرواژه الزامی است'})
                                }else if(event.target.value && event.target.value.length<5 || event.target.value.length>15){
                                    this.setState({invalidPassword:true , passwordInvalidText:'گذرواژه باید حداقل 6 و حداکثر 15 کاراکتر باشد'})
                                } else {
                                    this.setState({invalidPassword:false})
                                }
                            }}/>
                            {this.state.password && !this.state.showPassword ?
                                <a><i className="fas fa-eye" onClick={()=>{
                                    this.setState({showPassword:true})
                                }}/></a> : ''
                            }
                            {this.state.password && this.state.showPassword ?
                                <a><i className="fas fa-eye-slash" onClick={()=>{
                                    this.setState({showPassword:false})
                                }}/></a>
                                : ''
                            }

                        </MDBRow>
                        <MDBRow className={"fv-login-page-errors-texts"}>
                            {this.state.invalidPassword && this.state.onclickButton ?
                                <p>{this.state.passwordInvalidText}</p>
                                : ''
                            }
                        </MDBRow>

                        <MDBRow>
                            <input type={'button'} value={"ورود به نیک دیبا"} onClick={()=>{
                                this.setState({onclickButton:true})
                                if(!this.state.invalidPassword){
                                    const data ={
                                        mobile: this.state.username,
                                        password: this.state.password
                                    }
                                    loginUser(data)
                                        .then(res=> {
                                            if(res.status===200){

                                                const info = {
                                                    info: res.data.data.user
                                                }
                                                localStorage.setItem("token", res.data.data.token);
                                                localStorage.setItem("info", JSON.stringify(info));

                                                console.log(res)
                                                this.props.history.push("/")
                                            }
                                        })
                                        .catch(err=>{
                                            if(err.response.status===400){
                                                this.setState({alertErrorShow:true , alertErrorText:"اطاعات وارد شده اشتباه میباشد"})
                                            }
                                        })
                                }

                            }}/>
                        </MDBRow>
                        <MDBRow className={"fv-go-to-link"}>
                            <Link to={"/register"}> <a>ثبت نام در نیک دیبا</a> </Link>
                        </MDBRow>
                    </MDBContainer>
                </MDBRow>

            </MDBContainer>
        )
    }
}
export default LoginPage