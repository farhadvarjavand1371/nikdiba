import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import React from "react";

class errorBox extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <MDBContainer className={"fv-show-error-alert"}>
                <MDBRow className={"fv-show-error-alert-topic"}>
                    <MDBCol sm={7}>
                        <h5>خطا !!!</h5>
                    </MDBCol>
                    <MDBCol>
                        <a onClick={()=>{
                            this.props.close()
                        }}> <i className="fa fa-times" aria-hidden="true" style={{fontSize:"26px"}} /></a>
                    </MDBCol>
                </MDBRow>
                <MDBRow className={"fv-show-error-alert-text"}>
                    <p>{this.props.alertErrorText}</p>
                </MDBRow>
            </MDBContainer>
        )
    }
}
export default errorBox