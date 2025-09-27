

import { useState } from "react";
import './UserForm.css'

function UserForm() {

    const [country, setCountry] = useState("");



    return (
        <>

        <div className="container">

            <h1 className="title">Whats in your fridge?</h1>


            <div className="ImageUpload">

                <h2> Upload: </h2>

                <input type="file" accept="image/*" />


            </div>

            <div className="CountrySelect">
                <h2> Country: </h2>
                <select value={country} onChange={e => setCountry(e.target.value)}>
                    <option value="American">USA</option>
                    <option value="British">UK</option>
                    <option value="Canadian">Canada</option>
                    <option value="Chinese">China</option>
                    <option value="Croatian">Croatia</option>
                    <option value="Dutch">Netherlands</option>
                    <option value="Egyptian">Egypt</option>
                    <option value="Filipino">Phillipines</option>
                    <option value="Greek">Greece</option>
                    <option value="Indian">India</option>
                    <option value="Irish">Ireland</option>
                    <option value="Italian">Italy</option>
                    <option value="Jamaiacan">Jamaica</option>
                    <option value="Japanese">Japan</option>
                    <option value="Kenyan">Kenya</option>
                    <option value="Malaysian">Malaysia</option>
                    <option value="Mexican">Mexico</option>
                    <option value="Moroccan">Morocco</option>
                    <option value="Polish">Poland</option>
                    <option value="Portuguese">Portugal</option>
                    <option value="Russian">Russia</option>
                    <option value="Spanish">Spain</option>
                    <option value="Thai">Thailand</option>
                    <option value="Tunisian">Tunisia</option>
                    <option value="Turkish">Turkey</option>
                    <option value="Ukranian">Ukraine</option>
                    <option value="Uruguayan">Uruguay</option>
                    <option value="Vietnamese">Vietnam</option>

                </select>

                


            </div>






        </div>
        
        
        
        
        
        
        
        
        
        </>





    )

    

}
export default UserForm