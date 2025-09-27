import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserForm.css';

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
    const [seasoningImage, setSeasoningImage] = useState<File | null>(null);
    const [country, setCountry] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<Message>({ type: '', text: '' });

    const navigate = useNavigate();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
            setMessage({ type: '', text: '' });
        } else {
            setImage(null);
        }
    };

    const handleSeasoningImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSeasoningImage(e.target.files[0]);
            setMessage({ type: '', text: '' });
        } else {
            setSeasoningImage(null);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        if (!image || !seasoningImage) {
            setMessage({ type: 'error', text: 'Please upload an image of your fridge contents.' });
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('country', country);
        formData.append('image', image, 'fridge_contents_image.jpg');
        formData.append('seasoningImage', seasoningImage, 'seasoning_contents_image.jpg');

        try {
            const resp = await fetch('http://localhost:8000/send_info', {
                method: 'POST',
                body: formData,
            });

            if (resp.ok) {
                setMessage({ type: 'success', text: 'Upload successful! Getting your recipes...' });
                setCountry('');
                setImage(null);
                setSeasoningImage(null);
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
    };

    const getFlagDataURL = (flag: string) => {
        const canvas = document.createElement('canvas');
        canvas.width = 20;
        canvas.height = 15;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.font = '15px sans-serif';
            ctx.fillText(flag, 0, 13);
        }
        return canvas.toDataURL();
    };

    return (
        <div className="fridge-wrapper">
            <form onSubmit={handleFormSubmit} className="fridge-form">
                <h1 className="fridge-title">What's in Your Fridge? 🍳</h1>

                {message.text && (
                    <div
                        className={`fridge-message ${message.type === 'success'
                            ? 'success'
                            : message.type === 'error'
                                ? 'error'
                                : ''
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                <div className="fridge-section">
                    <label className="fridge-label">🥗 Upload Fridge Contents:</label>

                    <label htmlFor="file-upload" className="fridge-input-wrapper">
                        <span>Select File here</span>
                        <div className="fridge-file-info">Files Supported: JPG, PNG</div>
                        <span className="fridge-choose-btn">Choose File</span>
                        {/* Show file name after upload */}
                        {image && (
                            <div className="fridge-file-name">
                                Selected: <strong>{image.name}</strong>
                            </div>
                        )}
                    </label>

                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="fridge-input-file"
                    />
                </div>

                <div className="fridge-section">
                    <label className="fridge-label">🧂 Upload Seasoning Contents:</label>

                    <label htmlFor="seasoning-upload" className="fridge-input-wrapper">
                        <span>Select File here</span>
                        <div className="fridge-file-info">Files Supported: JPG, PNG</div>
                        <span className="fridge-choose-btn">Choose File</span>
                        {/* Show file name after upload */}
                        {seasoningImage && (
                            <div className="fridge-file-name">
                                Selected: <strong>{seasoningImage.name}</strong>
                            </div>
                        )}
                    </label>

                    <input
                        id="seasoning-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleSeasoningImageChange}
                        className="fridge-input-file"
                    />
                </div>

                <div className="fridge-section">
                    <label className="fridge-label">🌍 Select Cuisine Preference:</label>
                    <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="fridge-select"

                    >
                        <option value="">-- Choose a country --</option>
                        {Object.entries(countryFlags).map(([cuisine, flag]) => (
                            <option key={cuisine} value={cuisine}>
                                {flag} {cuisine}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="fridge-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Getting Recipes...' : 'Get Recipes!'}
                </button>
            </form>
        </div>
    );
};

export default FridgeForm;
