import React from "react"
import ptw from './resources/ptw.png';
import bepro from './resources/bepro.png';
import sponsor from './resources/sponsor.png'

const Header = (props) => {

    return(
        <header className="App-header">
            <div className="logo">
                <img src={ptw} height="60px" alt=""/>
                <img src={bepro} height="60px" alt=""/>
                <img src={sponsor} height="60px" alt=""/>
            </div>
            <div id="header-links" className="flex tall wide">
                <div className={"header-link" + (props.activePage === "Assessment" ? " selected" : "")} onClick={() => {props.setActivePage("Assessment")}}><p>Assessment</p></div>
                <div className={"header-link" + (props.activePage === "Morphology" ? " selected" : "")} onClick={() => {props.setActivePage("Morphology")}}><p>Morphologie</p></div>
            </div>
        </header>
    )
}
export default Header;