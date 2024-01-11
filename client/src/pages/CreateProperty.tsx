import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { setUser } from '../actions/userActions';
import axios from "axios";

const CreateProperty: React.FC = (props: any) => {
    const host = import.meta.env.VITE_API_HOST as string;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const url = `${host}/api/user`;
                const response = await axios.get(url, {
                    headers: {
                        'x-auth-token': localStorage.getItem('token'),
                    },
                });
                props.setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    const [formData, setFormData] = useState({
        propertyName: '',
        description: '',
        propertyType: '',
        propertyPrice: 0,
        location: '',
        propertyPhoto: '',
        contactNumber: '',
        petFriendly: false,
        furnished: false,
        facilities: [] as string[],
        facility: '',
        imageURL: '',
    });

    const user_id = props.user._id
    const [imageFile, setImageFile] = useState<File>();
    const facilityOptions = ["Park", "School", "Hospital", "Supermarket", "Security Guard", "Surveillance Camera"];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isChecked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? isChecked : value,
        }));
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

    const handleMultiInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            facility: e.target.value,
        }));
    };

    const handleMultiInputAdd = () => {
        const { facilities, facility } = formData;
        if (facility.trim() !== "" && !facilities.includes(facility)) {
            setFormData((prevData) => ({
                ...prevData,
                facilities: [...facilities, facility],
                facility: "",
            }));
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
        await handleImgBBUpload();
        try {
            let data = {
                'user': user_id,
                'name': formData.propertyName,
                'description': formData.description,
                'type': formData.propertyType,
                'price': formData.propertyPrice,
                'location': formData.location,
                'imageURL': formData.imageURL,
                'phone': formData.contactNumber,
                'isPetFriendly': formData.petFriendly,
                'isFurnished': formData.furnished,
                'facilities': formData.facilities,
            }
            const url = `${host}/api/property/create`;
            const { data: res } = await axios.post(url, data);
            console.log("API response:", res.message);
            // Optionally, you can reset the form or perform other actions after successful submission
        } catch (error) {
            console.error("Error submitting form:", error);
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
                    <div className="pfp-multi">
                        <div className="pet-furnished-photo">
                            <div className="pet label">
                                <div className="label-text">
                                    Pet-Friendly:
                                </div>
                                <div className="lable-input">
                                    <input type="checkbox" name="petFriendly" checked={formData.petFriendly} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="furnished label">
                                <div className="label-text">
                                    Furnished:
                                </div>
                                <div className="lable-input">
                                    <input type="checkbox" name="furnished" checked={formData.furnished} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="photo label">
                                <div className="label-text">
                                    Property Photo:
                                    <span className="required"> *</span>
                                </div>
                                <div className="lable-input">
                                    <input type="file" name="propertyPhoto" accept="image/*" onChange={handleFileChange} />
                                </div>
                            </div>
                        </div>
                        <div className="multi">
                            <div className="input-box label">
                                <div className="label-text">
                                    Select Available Facilites: (if any)
                                </div>
                                <div className="label-input">
                                    <select
                                        name="facility"
                                        value={formData.facility}
                                        onChange={handleMultiInputChange}
                                        style={{ height: '31px' }}
                                    >
                                        <option value="">Select Option</option>
                                        {facilityOptions.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="add-button">
                                    <button type="button" onClick={handleMultiInputAdd}>
                                        Add
                                    </button>
                                </div>
                            </div>
                            <div className="display-box label">
                                <div className="label-text">
                                    Selected Facilities:
                                </div>
                                <div className="label-input">
                                    <textarea
                                        readOnly
                                        placeholder="No Facilities Added"
                                        style={{ height: '2rem', width: '16rem' }}
                                        value={formData.facilities.join(", ")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="submit">
                        <button type="submit" className="submit-button">
                            Submit
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
};

const mapStateToProps = (state: any) => {
    return {
        user: state.user.user,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setUser: (user: any) => dispatch(setUser(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProperty);
