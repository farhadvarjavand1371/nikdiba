import React from "react";
import Sloder1 from"../images/slider1.png"
import Sloder2 from"../images/slider2.png"
import Sloder3 from"../images/slider3.png"
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import HeaderPage from "./HeaderPage";
import "../styles/slider.css"
import "../styles/headerPage.scss"


class MainPage extends React.Component{
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
        if(info){
            this.setState({nameAndFamily:info.info.name})
        }
    }

    render() {
        return(
            <div>
              <HeaderPage link={this.props}/>
                <AwesomeSlider style={{ height: '355px' , marginTop: '3%'}}>
                    <div data-src={Sloder1} />
                    <div data-src={Sloder2} />
                    <div data-src={Sloder3} />
                </AwesomeSlider>
            </div>
        )
    }
}
export default MainPage