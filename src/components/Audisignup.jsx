import React, { useState } from 'react';
import axios from 'axios';

const Audisignup = () => {
    const [data, setData] = useState({
        aName: '',
        Email: '',
        Password: '',
        Phone: '',
        aaddress: '',
        state: '',
        City: '',
        experience: '',
        Description: '',
        aimage: null,
    });

    const stateCityMap = {
        'Andhra Pradesh': ['Amaravati', 'Visakhapatnam', 'Vijayawada', 'Tirupati', 'Guntur', 'Nellore', 'Kakinada', 'Kadapa', 'Rajahmundry', 'Eluru'],
        'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat', 'Aalo', 'Ziro', 'Bomdila', 'Tezpur', 'Dirang', 'Changlang', 'Tawang'],
        'Assam': ['Guwahati', 'Dibrugarh', 'Silchar', 'Tezpur', 'Jorhat', 'Nagaon', 'Karimganj', 'Tinsukia', 'Goalpara', 'Bongaigaon'],
        'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Purnia', 'Sitamarhi', 'Saharsa', 'Samastipur', 'Vaishali'],
        'Chhattisgarh': ['Raipur', 'Bilaspur', 'Durg', 'Korba', 'Rajnandgaon', 'Dantewada', 'Jagdalpur', 'Kanker', 'Mungeli', 'Balod'],
        'Goa': ['Panaji', 'Margao', 'Mapusa', 'Ponda', 'Verna', 'Vasco da Gama', 'Bardez', 'Sanguem', 'Quepem', 'Canacona'],
        'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Anand', 'Gandhinagar', 'Junagadh', 'Patan', 'Navsari'],
        'Haryana': ['Chandigarh', 'Faridabad', 'Gurugram', 'Ambala', 'Hisar', 'Karnal', 'Panchkula', 'Rohtak', 'Sonipat', 'Panipat'],
        'Himachal Pradesh': ['Shimla', 'Dharamshala', 'Mandi', 'Kullu', 'Solan', 'Hamirpur', 'Bilaspur', 'Una', 'Nahan', 'Chamba'],
        'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Dumka', 'Giridih', 'Hazaribagh', 'Palamu', 'Ramgarh'],
        'Karnataka': ['Bengaluru', 'Mysuru', 'Hubli-Dharwad', 'Mangalore', 'Belgaum', 'Shimoga', 'Tumkur', 'Kolar', 'Chikmagalur', 'Mandya'],
        'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kollam', 'Thrissur', 'Malappuram', 'Palakkad', 'Kottayam', 'Idukki', 'Wayanad'],
        'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Satna', 'Dewas', 'Chhindwara', 'Khargone'],
        'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane', 'Solapur', 'Ahmednagar', 'Jalna', 'Ratnagiri'],
        'Manipur': ['Imphal', 'Churachandpur', 'Thoubal', 'Bishnupur', 'Senapati', 'Tamenglong', 'Ukhrul', 'Jiribam', 'Kakching', 'Chandel'],
        'Meghalaya': ['Shillong', 'Tura', 'Nongpoh', 'Jowai', 'Williamnagar', 'Berlengna', 'Mairang', 'Nongstoin', 'Mahendraganj', 'Resubelpara'],
        'Mizoram': ['Aizawl', 'Lunglei', 'Saiha', 'Serchhip', 'Khawzawl', 'Champhai', 'Mamit', 'Lawngtlai', 'Kolasib', 'Saitual'],
        'Nagaland': ['Kohima', 'Dimapur', 'Wokha', 'Tuensang', 'Mon', 'Phek', 'Zunheboto', 'Kiphire', 'Longleng', 'Mokokchung'],
        'Odisha': ['Bhubaneswar', 'Cuttack', 'Berhampur', 'Sambalpur', 'Rourkela', 'Puri', 'Balasore', 'Kendujhar', 'Angul', 'Dhenkanal'],
        'Punjab': ['Chandigarh', 'Amritsar', 'Ludhiana', 'Patiala', 'Jalandhar', 'Mohali', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Kapurthala'],
        'Rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur', 'Ajmer', 'Bikaner', 'Kota', 'Alwar', 'Sikar', 'Tonk', 'Chittorgarh'],
        'Sikkim': ['Gangtok', 'Namchi', 'Mangan', 'Pelling', 'Jorethang', 'Singhik', 'Rangpo', 'Sombaria', 'Yuksom', 'Gyalshing'],
        'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Vellore', 'Thoothukudi', 'Kanyakumari', 'Dindigul'],
        'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Mahbubnagar', 'Rangareddy', 'Medak', 'Adilabad', 'Nalgonda'],
        'Tripura': ['Agartala', 'Dharmanagar', 'Ambassa', 'Belonia', 'Udaipur', 'Kailashahar', 'Khowai', 'Jirania', 'Ranirbazar', 'Sabroom'],
        'Uttar Pradesh': ['Lucknow', 'Varanasi', 'Agra', 'Ghaziabad', 'Kanpur', 'Noida', 'Bareilly', 'Aligarh', 'Meerut', 'Moradabad'],
        'Uttarakhand': ['Dehradun', 'Haridwar', 'Nainital', 'Rudrapur', 'Haldwani', 'Kashipur', 'Pithoragarh', 'Champawat', 'Tehri Garhwal', 'Uttarkashi'],
        'West Bengal': ['Kolkata', 'Siliguri', 'Durgapur', 'Asansol', 'Howrah', 'Malda', 'Bardhaman', 'Birbhum', 'Nadia', 'Murshidabad'],
        'Delhi': ['Delhi'],
        'Puducherry': ['Puducherry', 'Karaikal', 'Mahe', 'Yanam'],
    };

    const inputHandler = (event) => {
        const { name, value, type, files } = event.target;
        if (type === 'file') {
            setData({ ...data, [name]: files[0] });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const handleSubmit = () => {
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }

        axios.post('http://localhost:8082/audisignup', formData)
            .then((response) => {
                if (response.data.status === 'success') {
                    alert('Auditorium registration successful!');
                    window.location.href = '/'; // Redirect to home page
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error with registration:', error);
                alert('An error occurred. Please try again.');
            });
    };

    return (
        <div className="container">
            <h1 className="text-center">Auditorium Registration</h1>
            <div className="row g-3">
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label>Auditorium Name:</label>
                    <input type="text" className="form-control" name="aName" onChange={inputHandler} required />
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label>Email:</label>
                    <input type="email" className="form-control" name="Email" onChange={inputHandler} required />
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label>Password:</label>
                    <input type="password" className="form-control" name="Password" onChange={inputHandler} required />
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label>Phone:</label>
                    <input type="text" className="form-control" name="Phone" onChange={inputHandler} required />
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label>Address:</label>
                    <input type="text" className="form-control" name="aaddress" onChange={inputHandler} required />
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label>State:</label>
                    <select className="form-select" name="state" onChange={inputHandler} required>
                        <option value="">Select State</option>
                        {Object.keys(stateCityMap).map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label>City:</label>
                    <select className="form-select" name="City" onChange={inputHandler} required disabled={!data.state}>
                        <option value="">Select City</option>
                        {data.state && stateCityMap[data.state].map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label>Experience:</label>
                    <input type="text" className="form-control" name="experience" onChange={inputHandler} required />
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label>Description:</label>
                    <textarea className="form-control" name="Description" onChange={inputHandler} required></textarea>
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <label>Upload Image:</label>
                    <input type="file" className="form-control" name="aimage" onChange={inputHandler} required />
                </div>

                {/* Submit and Home Buttons */}
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-3">
                    <button className="btn btn-primary" onClick={handleSubmit}>Register</button>
                </div>
                <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-3">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => window.location.href = '/'}
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Audisignup;
