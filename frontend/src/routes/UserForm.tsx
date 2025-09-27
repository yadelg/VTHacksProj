import { useState } from "react";
import styles from './UserForm.module.css'

function UserForm() {

    const [country, setCountry] = useState("");
    const [image, setImage] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0])
        }
        else {
            setImage(null);
        }
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!image) {
            console.warn("No image file inputted")
            return
        }
        
        const formData = new FormData()
        formData.append('country', country)
        formData.append('image', image)

        try {
            const resp = await fetch('http://localhost:8000/send_info', {
                method: 'POST',
                body: formData
            })

            if (resp.ok) {
                const result = await resp.json()
                console.log("Upload success", resp)
                setCountry('')
                setImage(null)
            } else {
                const err = await resp.json();
                console.error("Error: ", err)
            }
        }
        catch (err) {
            console.error("Error uploading: ", err)
        }
    }

    return (
        <>

        <form onSubmit={handleFormSubmit} className={styles.container}>
            <h1 className={styles.title}>Whats in your fridge?</h1>
            <div className={styles.ImageUpload}>
                <h2> Upload: </h2>
                <input type="file" accept="image/*" onChange={handleImageChange}/>
                {image && <p>Selected file: {image.name}</p>}
            </div>
            <div className={styles.CountrySelect}>
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
            <button type="submit" >Get Recipes!</button>
        </form>
        
        </>

    )

}
export default UserForm