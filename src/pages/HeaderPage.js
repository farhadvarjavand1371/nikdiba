import React from "react";
import {MDBAlert, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {Link} from "react-router-dom";
import Logo from"../images/logo.png"
import Cart from"../images/cart.gif"
import "../styles/headerPage.scss"
import "../styles/smMdbCol.css"
import {authorize, logoutUser, updateUserInfo} from "../services/Services";

class HeaderPage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            openCascade:false,
            nameAndFamily:'',
        }
    }
    componentDidMount() {
        let nameAndFamily = ""
        const info = JSON.parse(localStorage.getItem("info"))
      //  console.log(info)
        if(info){
            this.setState({nameAndFamily:info.info.name})
        }
    }

    render() {
        if(this.props.nameUpdate && this.props.clickUpdate){
            this.setState({nameAndFamily:this.props.nameUpdate})
        }
        return(
            <MDBContainer className={"fv-header-page"} >
                <MDBRow className={"fv-header-top"}>
                    <MDBCol className={"fv-logo-page"} md={2} sm={6}>
                       <a> <img src={Logo} onClick={()=>{
                            this.props.link.history.push("/")
                        }}/> </a>
                    </MDBCol>
                    <MDBCol md={4} className={"fv-search-box"}>
                        <MDBRow className={"fv-search-box-page"}>
                            <MDBCol md={1} sm={1}>
                                <i className="fas fa-search" />
                            </MDBCol>
                            <MDBCol md={8} sm={8}>
                                <input type={"text"}/>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>

                    <MDBCol md={3} sm={6}>
                        {this.state.nameAndFamily ?
                            <h5 onClick={()=>  this.setState({openCascade:!this.state.openCascade})}><i style={{marginLeft:'2%' , fontSize:"15px"}} className="fa fa-user" />
                                <a style={{fontWeight:"350"}} >{this.state.nameAndFamily}</a>
                                {this.state.openCascade?
                                    <i style={{marginRight:'2%' , fontSize:"15px"}}className="fa fa-chevron-down" aria-hidden="true" />
                                    :
                                    <i style={{marginRight:'2%' , fontSize:"15px"}}className="fa fa-chevron-right" aria-hidden="true" />
                                }
                                </h5>
                            :
                            <Link to={"/login"} style={{color:'black'}}> <h5><i style={{marginLeft:'2%' , fontSize:"15px"}} className="fa fa-user" />
                                <a style={{fontWeight:"350"}} onClick={()=>{
                                    localStorage.removeItem("info")
                                    localStorage.removeItem("token")
                                }}>ورود به حساب کاربری |</a></h5> </Link>
                        }

                        {this.state.openCascade ?
                            <MDBContainer className={"fv-menu-cascade"}>
                                <MDBRow>
                                    <Link to={"/profile"} style={{color:'black'}}><a><p>پروفایل من</p></a></Link>
                                </MDBRow>
                                <MDBRow>
                                    <Link to={"/updateProfile"} style={{color:'black'}}><a><p>ویرایش پروفایل</p></a></Link>
                                </MDBRow>
                                <MDBRow className={"fv-exit-menu-text"}>
                                    <Link to={"/"} style={{color:'black'}}>   <a onClick={()=>{
                                        this.setState({nameAndFamily:'' , openCascade:false})
                                        localStorage.removeItem("info")
                                        localStorage.removeItem("token")
                                    }}><p><i className="fas fa-sign-out-alt" /> خروج از حساب کاربری </p></a> </Link>
                                </MDBRow>
                            </MDBContainer>
                            : ''
                        }


                    </MDBCol>

                    <MDBCol md={2} sm={12} >
                        <a >سبد خرید <img src={Cart} style={{width: '40px'}}/></a>
                    </MDBCol>
                </MDBRow>
                <MDBRow style={{marginTop:'3%' , borderTop: '1px solid rgba(0, 0, 0, 0.15)', paddingTop: '2%'}} className={"fv-header-button"}>
                    <MDBCol sm={1} >
                        <a>آرایشی</a>
                    </MDBCol>
                    <MDBCol sm={1} >
                        <a>بهداشتی</a>
                    </MDBCol>
                    <MDBCol sm={2} >
                        <a>تجهیزات سلامت محور</a>
                    </MDBCol>
                    <MDBCol sm={2} >
                        <a>لوازم شخصی برقی</a>
                    </MDBCol>
                    <MDBCol sm={1} >
                        <a>برندها</a>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}
export default HeaderPage