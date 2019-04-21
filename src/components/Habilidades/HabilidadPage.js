import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";

export class HabilidadPage extends Component{
    // constructor(props) {
    //     super(props)
    // }
    setupHabilidad(hab){
        if(navigator.language.includes("en")){
            return {
                name : hab.nameEn,
                short: hab.shortName,
                img: hab.img,
                desc: hab.descEn, 
            }
        }
        return {
            name : hab.nameEs,
            short: hab.shortName,
            img: hab.img,
            desc: hab.descEs, 
        }
    }

    render(){
        const habilidad = this.setupHabilidad(this.props.habilidad);
        return(
            <Fragment>
                <h1> {habilidad.name}</h1>
                <h2> {habilidad.desc}</h2>
                <u>
                    <a href="/quiz" action="replace" className="click-quiz">
                    <h3>
                            <FormattedMessage
                                id = "Habilidad.clickQuiz"
                                defaultMessage = "Haz click aquí para ir al único quiz disponible"
                            />
                    </h3>
                    </a>
                </u>
            </Fragment>

        );
    }

    
} 

export default HabilidadPage