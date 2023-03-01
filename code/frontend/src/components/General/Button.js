import {react} from 'react'

export default function Button(props){
    const {text , size} = props
    return(
        <div>
            <button className={`button-${size} button`}>
                <span>
                    {text}    
                </span>
            </button>
        </div>

)}