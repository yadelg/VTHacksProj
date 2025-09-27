import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"

const countryFlags: { [key: string]: string } = {
    American: '🇺🇸',
    British: '🇬🇧',
    Canadian: '🇨🇦',
    Chinese: '🇨🇳',
    Croatian: '🇭🇷',
    Dutch: '🇳🇱',
    Egyptian: '🇪🇬',
    Filipino: '🇵🇭',
    Greek: '🇬🇷',
    Indian: '🇮🇳',
    Irish: '🇮🇪',
    Italian: '🇮🇹',
    Jamaican: '🇯🇲',
    Japanese: '🇯🇵',
    Kenyan: '🇰🇪',
    Malaysian: '🇲🇾',
    Mexican: '🇲🇽',
    Moroccan: '🇲🇦',
    Polish: '🇵🇱',
    Portuguese: '🇵🇹',
    Russian: '🇷🇺',
    Spanish: '🇪🇸',
    Thai: '🇹🇭',
    Tunisian: '🇹🇳',
    Turkish: '🇹🇷',
    Ukrainian: '🇺🇦',
    Uruguayan: '🇺🇾',
    Vietnamese: '🇻🇳',
};

interface Message {
    type: 'success' | 'error' | '';
    text: string;
}

const FridgeForm: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [country, setCountry] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<Message>({ type: '', text: '' });

    const navigate = useNavigate();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
            setMessage({ type: '', text: '' }); // Clear message on new file select
        } else {
            setImage(null);
        }
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        if (!image) {
            setMessage({ type: 'error', text: "Please upload an image of your fridge contents." });
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('country', country);
        const constantFilename = "fridge_contents_image.jpg"; // Define your constant filename
        formData.append('image', image, constantFilename); // Append the file with the desired filename

        try {
            const resp = await fetch('http://localhost:8000/send_info', {
                method: 'POST',
                body: formData
            });

            if (resp.ok) {
                const result = await resp.json(); // Assuming you don't need the result for display here
                setMessage({ type: 'success', text: "Upload successful! Getting your recipes..." });
                setCountry('');
                setImage(null);
                //const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                // if (fileInput) {
                //     fileInput.value = '';
                // }
                navigate('/recipes');

            } else {
                const err = await resp.json();
                setMessage({ type: 'error', text: `Error: ${err.message || 'Something went wrong.'}` });
            }
        } catch (err: any) {
            setMessage({ type: 'error', text: `Error uploading: ${err.message || 'Network error.'}` });
        } finally {
            setIsLoading(false);
        }
    }

    // A simple style object for visual appeal - you'd likely use a CSS-in-JS library or actual CSS files
    const formStyles: React.CSSProperties = {
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        maxWidth: '500px',
        margin: '50px auto',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
        border: '1px solid #e0e0e0',
    };

    const titleStyles: React.CSSProperties = {
        textAlign: 'center',
        color: '#2c3e50',
        marginBottom: '20px',
        fontSize: '2em',
        fontWeight: '700',
    };

    const sectionStyles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    };

    const labelStyles: React.CSSProperties = {
        color: '#34495e',
        fontSize: '1.1em',
        fontWeight: '600',
    };

    const inputStyles: React.CSSProperties = {
        padding: '12px 15px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontSize: '1em',
        transition: 'border-color 0.3s ease-in-out',
        cursor: 'pointer',
    };

    const selectStyles: React.CSSProperties = {
        ...inputStyles,
        backgroundColor: '#f8f8f8',
        paddingLeft: '40px', // Make space for the flag
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '10px center',
        backgroundSize: '20px 15px',
    };

    const buttonStyles: React.CSSProperties = {
        padding: '15px 25px',
        backgroundColor: '#28a745', // Green for success/action
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.2em',
        fontWeight: '700',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.3s ease-in-out, transform 0.2s ease-in-out',
        marginTop: '15px',
        opacity: isLoading ? 0.7 : 1,
    };

    const buttonHoverStyles: React.CSSProperties = isLoading ? {} : {
        backgroundColor: '#218838',
        transform: 'translateY(-2px)',
    };

    const messageStyles: React.CSSProperties = {
        padding: '10px 15px',
        borderRadius: '8px',
        fontWeight: '500',
        fontSize: '0.95em',
        textAlign: 'center',
    };

    const successMessageStyles: React.CSSProperties = {
        backgroundColor: '#d4edda',
        color: '#155724',
        border: '1px solid #c3e6cb',
    };

    const errorMessageStyles: React.CSSProperties = {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        border: '1px solid #f5c6cb',
    };

    // Function to get a data URL for a given flag emoji
    const getFlagDataURL = (flag: string) => {
        const canvas = document.createElement('canvas');
        canvas.width = 20; // Adjust as needed
        canvas.height = 15; // Adjust as needed
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.font = '15px sans-serif'; // Adjust font size to fit the canvas
            ctx.fillText(flag, 0, 13); // Adjust position as needed
        }
        return canvas.toDataURL();
    };


    return (
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <form onSubmit={handleFormSubmit} style={formStyles}>
                <h1 style={titleStyles}>What's in Your Fridge? 🍳</h1>

                {message.text && (
                    <div style={{ ...messageStyles, ...(message.type === 'success' ? successMessageStyles : errorMessageStyles) }}>
                        {message.text}
                    </div>
                )}

                <div style={sectionStyles}>
                    <label style={labelStyles}>📸 Upload Fridge Contents:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ ...inputStyles, border: 'none', padding: '0', cursor: 'pointer' }}
                    />
                    {image && <p style={{ fontSize: '0.9em', color: '#555' }}>Selected: <span style={{ fontWeight: '600' }}>{image.name}</span></p>}
                </div>

                <div style={sectionStyles}>
                    <label style={labelStyles}>🌍 Select Cuisine Preference:</label>
                    <select
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        style={{
                            ...selectStyles,
                            backgroundImage: country ? `url(${getFlagDataURL(countryFlags[country])})` : 'none'
                        }}
                    >
                        <option value="">-- Choose a country --</option>
                        {Object.entries(countryFlags).map(([cuisine, flag]) => (
                            <option key={cuisine} value={cuisine} style={{ backgroundImage: `url(${getFlagDataURL(flag)})`, backgroundRepeat: 'no-repeat', backgroundPosition: '5px center', backgroundSize: '20px 15px', paddingLeft: '30px' }}>
                                {flag} {cuisine}
                            </option>
                        ))}
                    </select>
                </div>
                    <button
                        type="submit"
                        style={buttonStyles}
                        onMouseEnter={(e) => { if (!isLoading) Object.assign(e.currentTarget.style, buttonHoverStyles); }}
                        onMouseLeave={(e) => { if (!isLoading) Object.assign(e.currentTarget.style, buttonStyles); }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Getting Recipes...' : 'Get Recipes!'}
                    </button>
            </form>
        </div>
    );
}

export default FridgeForm;