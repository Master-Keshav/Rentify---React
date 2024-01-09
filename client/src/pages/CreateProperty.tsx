import React, { useState } from "react";

const CreateProperty: React.FC = () => {
    const [formData, setFormData] = useState({
        propertyName: "",
        description: "",
        propertyType: "",
        propertyPrice: 0,
        location: "",
        propertyPhoto: "",
        contactNumber: "",
        petFriendly: false,
        furnished: false,
        multiInputValues: [] as string[],
        multiInputCurrent: "",
    });

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
            // Handle file upload logic here
            console.log("File uploaded:", file);
        }
    };

    const handleMultiInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            multiInputCurrent: e.target.value,
        }));
    };

    const handleMultiInputAdd = () => {
        const { multiInputValues, multiInputCurrent } = formData;
        if (multiInputCurrent.trim() !== "" && !multiInputValues.includes(multiInputCurrent)) {
            setFormData((prevData) => ({
                ...prevData,
                multiInputValues: [...multiInputValues, multiInputCurrent],
                multiInputCurrent: "",
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
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
                                        name="multiInputCurrent"
                                        value={formData.multiInputCurrent}
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
                                        value={formData.multiInputValues.join(", ")}
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

export default CreateProperty;
