import React from "react";
import HeaderPage from "./HeaderPage";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import "../styles/profilePage.scss"


class ProfilePage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
        }
    }

    render() {
        let nameAndFamily = ""
        let email = ""
        let phoneNumber = ""
        const info = JSON.parse(localStorage.getItem("info"))
     //   console.log(info)
        if(info){
            nameAndFamily = info.info.name
            email=info.info.email
            phoneNumber=info.info.mobile
        }
        return(
            <div>
                <HeaderPage link={this.props}/>
                <div className={"fv-profile-page"}>
                    <MDBContainer className={"fv-profile-info"} >
                        <MDBRow>
                            <MDBCol md={2} sm={5} className={"fv-topic-profile-info"} >
                                <h5>اطلاعات کاربری</h5>
                            </MDBCol>
                            <MDBCol className={"fv-border-left"}>
                                <p></p>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{marginTop:'4%'}}>
                            <p>نام و نام خانوادگی : {nameAndFamily}</p>
                        </MDBRow>
                        <MDBRow>
                            <p>شماره موبایل : {phoneNumber}</p>
                        </MDBRow>
                        <MDBRow>
                            <p>ایمیل : {email}</p>
                        </MDBRow>

                    </MDBContainer>
                </div>

            </div>
        )
    }
}
export default ProfilePage