import React from "react";
import {MDBAlert, MDBBox, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import Logo from"../images/logo.png"
import "../styles/loginPage.css"
import {registerUser} from "../services/Services";
import {Link} from "react-router-dom";

class LoginPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            nameAndFamily:'',
            email:'',
            phoneNumber:'',
            password:'',

            invalidNameAndFamily:true,
            invalidPhoneNumber:true,
            invalidPassword:true,
            onclickButton:false,

            mobileInvalidText:'شماره موبایل الزامی است',
            passwordInvalidText:'گذرواژه الزامی است',

            showPassword:false,


        }
    }
    setData = (event) =>{
        this.setState({[event.target.name]: event.target.value})
    }
    render() {
        return(
           <MDBContainer className={"fv-login-page"}>
               <MDBRow style={{backgroundColor: 'red',  height: '200px'}}>
               </MDBRow>

               <MDBRow className={"fv-login-page-center-body"}>
                   <MDBContainer>
                       <MDBRow className={"fv-login-page-img"}>
                           <img src={Logo}/>
                       </MDBRow>
                       <MDBRow>
                           <h6 style={{fontWeight:'500' , marginBottom:'5%'}}>ثبت نام</h6>
                       </MDBRow>
                       <MDBRow className={"fv-login-page-texts"}>
                           <p>نام و نام خانوادگی</p>
                       </MDBRow>
                       <MDBRow>
                           <input type={'text'} placeholder={"نام و نام خانوادگی"} name={"nameAndFamily"} value={this.state.nameAndFamily} onChange={(event)=>{
                               this.setData(event)
                               if(event.target.value){
                                   this.setState({invalidNameAndFamily:false})
                               }else {
                                   this.setState({invalidNameAndFamily:true})
                               }
                           }}/>
                       </MDBRow>
                       <MDBRow className={"fv-login-page-errors-texts"}>
                           {this.state.invalidNameAndFamily && this.state.onclickButton ?
                               <p>نام و نام خانوادگی الزامی است</p>
                               : ''
                           }
                       </MDBRow>

                       <MDBRow className={"fv-login-page-texts"}>
                           <p>ایمیل خود را وارد کنید</p>
                       </MDBRow>
                       <MDBRow>
                           <input type={'email'} placeholder={"ایمیل"} name={"email"} value={this.state.email} onChange={(event)=>{
                               this.setData(event)
                           }}/>
                       </MDBRow>
                       <MDBRow className={"fv-login-page-texts"}>
                           <p>شماره موبایل خود را وارد کنید</p>
                       </MDBRow>
                       <MDBRow>
                           <input type={'number'} placeholder={"شماره موبایل"} name={"phoneNumber"} value={this.state.phoneNumber} onChange={(event)=>{
                               this.setData(event)
                               if(!event.target.value){
                                   this.setState({invalidPhoneNumber:true , mobileInvalidText:"شماره موبایل الزامی است"})
                               }else if(event.target.value && event.target.value.length!==11){
                                   this.setState({invalidPhoneNumber:true , mobileInvalidText:"شماره موبایل را با فرمت درست وارد نمایید"})
                               } else{
                                   this.setState({invalidPhoneNumber:false})
                               }
                           }}/>
                       </MDBRow>
                       <MDBRow className={"fv-login-page-errors-texts"}>
                           {this.state.invalidPhoneNumber && this.state.onclickButton ?
                           <p>{this.state.mobileInvalidText}</p>
                               : ''
                           }
                       </MDBRow>

                       <MDBRow className={"fv-login-page-texts"}>
                           <p>گذرواژه خود را وارد کنید</p>
                       </MDBRow>
                       <MDBRow className={"fv-password-button"}>
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
                           <input type={'button'} value={"عضویت در نیک دیبا"} onClick={()=>{
                               this.setState({onclickButton:true})
                               if(!this.state.invalidNameAndFamily && !this.state.invalidPhoneNumber && !this.state.invalidPassword ){
                                   this.setState({invalidData:false})
                                   const data ={
                                       email: this.state.email,
                                       mobile: this.state.phoneNumber,
                                       name: this.state.nameAndFamily,
                                       password: this.state.password

                                   }
                                   registerUser(data)
                                       .then(res=> {
                                           if(res.status===200){
                                               alert("اطلاعات شما ثبت شد")
                                               this.props.history.push("/")
                                           }
                                       })
                                       .catch(err=>{
                                           if(err.response.status===400){
                                               alert("این اطلاعات قبلا ثبت شده است - اطلاعات به درستی وارد نشده است")
                                           }
                                       })
                               }

                           }}/>
                       </MDBRow>
                       <MDBRow className={"fv-go-to-link"}>
                           <Link to={"/"}><a>ورود به نیک دیبا</a> </Link>
                       </MDBRow>
                   </MDBContainer>
               </MDBRow>

           </MDBContainer>
        )
    }
}
export default LoginPage