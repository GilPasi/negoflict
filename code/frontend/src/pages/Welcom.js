import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import React from 'react'

const Welcom = () => {

    const user = useSelector(state=>state.user)

    const welcom = user.id>0? `Welcom ${user.username}!`:'Welcom'

    const contant = (
        <section className="welcome">
            <h1>{welcom}</h1>
           
        </section>
    )

    return contant
 
}

export default Welcom