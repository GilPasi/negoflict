import "../styles/case_form_page.css"
import Header from "../components/general/Header"
import TextInput from "../components/general/TextInput"
import Button from "../components/general/Button"
import DropdownSelector from "../components/general/DropdownSelector.js"

const CaseFormPage = () =>{
    //Mock Id , to be replaced by backend
    const caseID = 100777
    const mediatorName = "Full Name"

    
        return(
    
            <article className="cfp">
                <Header isLarge={false} />
                <center>
                    <h1 className="cfp--title">New Case <br/> I.D {caseID}</h1>
                    <h2 >Mediator name</h2>
                    <h3 className="cfp--m-name">{mediatorName}</h3>
                    <h2 >Conflict name</h2>
                    <TextInput placeHolder="Free Text"></TextInput>    

                    <h2 >Choose a Category</h2>
                    <DropdownSelector placHolder="Select Areas of Mediation" options={["Politics" , "Financial" , "Family"]} />


                    <h2 >Subcategory</h2>
                    <TextInput placeHolder="Free Text"></TextInput>
                    <Button size="small" text="Next"/>

                </center>



    
    
    
                
    
                
            </article>
        )


}

export default CaseFormPage