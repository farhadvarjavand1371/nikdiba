import React from "react";
import HeaderPage from "./HeaderPage";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../styles/updateProfilePage.scss"
import {updateUserInfo} from "../services/Services";


class UpdateProfileinfoPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            nameAndFamily:"",
            phoneNumber:'',
            email:'',
            id:'',
            password:'',
            rePassword:'',


            passwordInvalidText:'گذرواژه الزامی است',

            clickButton:false,
            invalidPassword:true,
            invalidRePassword:true,
            onclickButton:false,


        }
    }
    componentDidMount() {
        let nameAndFamily = ""
        let email = ""
        let phoneNumber = ""
        const info = JSON.parse(localStorage.getItem("info"))
        //   console.log(info)
        if(info){
            nameAndFamily = info.info.name
            email=info.info.email
            phoneNumber=info.info.mobile
            this.setState({nameAndFamily:nameAndFamily , phoneNumber:phoneNumber , email:email , id:info.info.id})
        }
    }

    setData = (event) =>{
        this.setState({[event.target.name]: event.target.value})
    }
    render() {
        if(this.state.clickButton){
            this.setState({clickButton:false})
        }
        return(
            <div>
                <HeaderPage link={this.props} nameUpdate={this.state.nameAndFamily} clickUpdate={this.state.clickButton}/>
                <div className={"fv-profile-page fv-profile-update-page"}>
                    <MDBContainer className={"fv-profile-info fv-profile-update"} >
                        <MDBRow>
                            <MDBCol md={3} sm={7} className={"fv-topic-profile-info"} >
                                <h5>ویرایش اطلاعات کاربری</h5>
                            </MDBCol>
                            <MDBCol className={"fv-border-left"} >
                                <p></p>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{marginTop:'4%'}}>
                            <p>نام و نام خانوادگی : </p>
                            <input type={"text"} value={this.state.nameAndFamily} name={"nameAndFamily"} onChange={(event)=>{
                                this.setData(event)
                            }}/>
                        </MDBRow>

                        <MDBRow>
                            <p>شماره موبایل : </p>
                            <input type={"number"} disabled={true} value={this.state.phoneNumber} name={"phoneNumber"} onChange={(event)=>{
                                this.setData(event)
                            }}/>
                        </MDBRow>
                        <MDBRow>
                            <p>ایمیل : </p>
                            <input type={"email"} value={this.state.email} name={"email"} onChange={(event)=>{
                                this.setData(event)
                            }}/>
                        </MDBRow>
                        <MDBRow>
                            <p>گذرواژه : </p>

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
                                <a><i className="fas fa-eye"onClick={()=>{
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
                        <MDBRow className={"fv-error-password-text"}>
                            {this.state.invalidPassword && this.state.onclickButton ?
                                <p>{this.state.passwordInvalidText}</p>
                                : ''
                            }
                        </MDBRow>

                        <MDBRow>
                            <p>تکرار گذرواژه : </p>

                            <input type={this.state.showPassword?'text' : 'password'} placeholder={"تکرار گذرواژه"} name={"rePassword"} value={this.state.rePassword} onChange={(event)=>{
                                this.setData(event)
                                if(this.state.password===event.target.value){
                                    this.setState({invalidRePassword:false})
                                }else {
                                    this.setState({invalidRePassword:true})
                                }
                            }}/>
                            {this.state.password && !this.state.showPassword ?
                                <a><i className="fas fa-eye"onClick={()=>{
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
                        <MDBRow className={"fv-error-password-text"}>
                            {this.state.invalidRePassword && this.state.onclickButton ?
                                <p>{"تکرار گذرواژه با گذرواژه یکسان نمیباشد"}</p>
                                : ''
                            }
                        </MDBRow>

                        <MDBRow>
                            <input type={"button"} value={"ثبت اطلاعات"} onClick={()=>{
                                this.setState({onclickButton:true})
                                const data ={
                                    email: this.state.email,
                                    id: this.state.id,
                                    name: this.state.nameAndFamily,
                                    password: this.state.password
                                }
                                if(!this.state.invalidPassword && !this.state.invalidRePassword){
                                    updateUserInfo(data)
                                        .then(res=>{
                                            const info = {
                                                info: {
                                                    name:this.state.nameAndFamily,
                                                    email:this.state.email,
                                                    mobile:this.state.phoneNumber,
                                                    id:this.state.id
                                                }
                                            }
                                            localStorage.setItem("info", JSON.stringify(info));
                                            this.setState({clickButton:true})
                                            console.log(res)
                                            alert("اطلاعات با موفقیت ویرایش شد")
                                        })
                                        .catch(err=>alert("لطفا اطلاعات را به درستی وارد نمایید"))
                                }



                            }}/>
                        </MDBRow>
                    </MDBContainer>
                </div>

            </div>
        )
    }
}
export default UpdateProfileinfoPage