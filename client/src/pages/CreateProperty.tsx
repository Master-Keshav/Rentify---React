import React, { useState } from "react";
import axios from "axios";

interface CreatePropertyProps {
    user: String,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProperty: React.FC<CreatePropertyProps> = (props) => {
    const host = import.meta.env.VITE_API_HOST as string;

    const [formData, setFormData] = useState({
        propertyName: '',
        description: '',
        propertyType: '',
        propertyPrice: 0,
        location: '',
        propertyPhoto: '',
        contactNumber: '',
        facilities: [] as string[],
        facility: '',
        imageURL: '',
    });

    const { user: user_id, setIsLoading } = props
    const [imageFile, setImageFile] = useState<File>();
    const facilityOptions = ["Pet Friendly", "Furnished", "Park", "School", "Hospital", "Supermarket", "Security Guard", "Surveillance Camera"];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const isChecked = (e.target as HTMLInputElement).checked;
            setFormData((prevData) => {
                if (isChecked) {
                    return {
                        ...prevData,
                        facilities: [...prevData.facilities, name],
                    };
                } else {
                    return {
                        ...prevData,
                        facilities: prevData.facilities.filter((facility) => facility !== name),
                    };
                }
            });
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            console.log('File uploaded:', file);
            setImageFile(file)
        }
        else {
            console.log("File not uploaded!")
        }
    };

    const handleImgBBUpload = async () => {
        try {
            const IMG_BB_API_KEY = import.meta.env.VITE_IMG_BB_API_KEY
            if (imageFile) {
                const formData = new FormData();
                formData.append('key', IMG_BB_API_KEY);
                formData.append('image', imageFile);

                const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success) {
                    const imageUrl = response.data.data.url;
                    setFormData((prevData) => ({
                        ...prevData,
                        imageURL: imageUrl,
                    }));
                    return imageUrl
                } else {
                    console.error('ImgBB upload failed. Response:', response.data);
                }
            } else {
                console.error('No image file to upload.');
            }
        } catch (error) {
            console.error('Error uploading image to ImgBB:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const imageURL = await handleImgBBUpload();
        try {
            setIsLoading(true);
            let data = {
                'user': user_id,
                'name': formData.propertyName,
                'description': formData.description,
                'type': formData.propertyType,
                'price': formData.propertyPrice,
                'location': formData.location,
                'imageURL': imageURL,
                'phone': formData.contactNumber,
                'facilities': formData.facilities,
            }
            const url = `${host}/api/property/create`;
            const { data: res } = await axios.post(url, data);
            console.log("API response:", res.message);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    };

    return (
        <div className="container">
            <div className="title">
                Create Property
            </div>
            <div className="create-property">
                <form onSubmit={handleSubmit}>
                    <div className="name label">
                        <div className="label-text">
                            Enter Property Name:
                        </div>
                        <div className="label-input">
                            <input
                                type="text"
                                name="propertyName"
                                placeholder="Enter Property Name"
                                value={formData.propertyName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="description label">
                        <div className="label-text">
                            Enter Description:
                        </div>
                        <div className="label-input">
                            <textarea
                                name="description"
                                placeholder="Enter Property Description"
                                value={formData.description}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className="property-type label">
                        <div className="label-text">
                            Select Property Type:
                        </div>
                        <div className="label-input">
                            <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
                                <option value="">Select Property Type</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                            </select>
                        </div>
                    </div>
                    <div className="price-location-contact">
                        <div className="price label">
                            <div className="label-text">
                                Enter Property Price:
                            </div>
                            <div className="label-input">
                                <input
                                    type="number"
                                    placeholder="Enter Price"
                                    name="propertyPrice"
                                    value={formData.propertyPrice != 0 ? formData.propertyPrice : ""}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className="location label">
                            <div className="label-text">
                                Enter Location:
                            </div>
                            <div className="label-input">
                                <input
                                    type="text"
                                    placeholder="Enter Property Location"
                                    name="location" value={formData.location} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="contact label">
                            <div className="label-text">
                                Contact Number:
                            </div>
                            <div className="label-input">
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    placeholder="Enter Contact Number"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    pattern="[0-9]{10}"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="facilities">
                        {facilityOptions.map((facility) => (
                            <div className="label" key={facility}>
                                <div className="label-text">
                                    {facility}:
                                </div>
                                <div className="lable-input">
                                    <input type="checkbox" name={facility} checked={formData.facilities.includes(facility)} onChange={handleChange} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="upload-submit">
                        <div className="photo label">
                            <div className="label-text">
                                Property Photo:
                                <span className="required"> *</span>
                            </div>
                            <div className="lable-input">
                                <input type="file" name="propertyPhoto" accept="image/*" onChange={handleFileChange} />
                            </div>
                        </div>
                        <div className="submit">
                            <button type="submit" className="submit-button">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProperty;
