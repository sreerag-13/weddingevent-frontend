import React, { useState } from 'react';
import axios from 'axios';

const Usersignup = () => {
    const [data, setData] = useState({
        UName: '',
        Email: '',
        Password: '',
        Phone: '',
        uaddress: '',
        state: '',
        City: '',
        Gender: ''
    });

    // Mapping of states to cities/districts
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
        'Meghalaya': ['Shillong', 'Tura', 'Nongpoh', 'Jowai', 'Williamnagar', 'Berlengna', 'Mairang', 'Nongstoin', 'Mahendraganj', ' Resubelpara'],
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
        'Puducherry': ['Puducherry', 'Karaikal', 'Mahe', 'Yanam']
    };

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = () => {
        // Prepare data for API
        const newInput = {
            UName: data.UName,
            Email: data.Email,
            Password: data.Password,
            Phone: data.Phone,
            uaddress: data.uaddress,
            state: data.state,
            City: data.City,
            Gender: data.Gender
        };

        // Make POST request to the backend API
        axios.post("http://localhost:8082/usersignup", newInput)
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "success") {
                    alert("Registration successful!");
                } else if (response.data.status === "email already exists") {
                    alert("Email already exists. Please try a different email.");
                } else {
                    alert("An error occurred. Please try again.");
                }
            })
            .catch((error) => {
                console.error("There was an error with the registration!", error);
                alert("An error occurred. Please try again.");
            });
    };

    return (
        <div className="container">
            <div className="row">
                <h1>User Registration</h1>
                <h4><center>Register</center></ h4>
                <div className="row g-3">
                    <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label>User Name:</label>
                        <input type="text" className="form-control" placeholder="User Name" name="UName" onChange={inputHandler} required />
                    </div>
                    <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label>Email:</label>
                        <input type="email" className="form-control" placeholder="Email" name="Email" onChange={inputHandler} required />
                    </div>
                    <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Password" name="Password" onChange={inputHandler} required />
                    </div>
                    <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label>Phone:</label>
                        <input type="text" className="form-control" placeholder="Phone" name="Phone" onChange={inputHandler} required />
                    </div>
                    <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label>Address:</label>
                        <input type="text" className="form-control" placeholder="Address" name="uaddress" onChange={inputHandler} required />
                    </div>
                    <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label>State:</label>
                        <select className="form-select" name="state" onChange={inputHandler} required>
                            <option value="">Select State</option>
                            {Object.keys(stateCityMap).map((state, index) => (
                                <option key={index} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label>City:</label>
                        <select className="form-select" name="City" onChange={inputHandler} required>
                            <option value="">Select City</option>
                            {data.state && stateCityMap[data.state]?.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label>Gender:</label>
                        <div className="form-check">
                            <input type="radio" className="form-check-input" name="Gender" value="Male" onChange={inputHandler} required />
                            <label className="form-check-label">Male</label>
                        </div>
                        <div className="form-check">
                            <input type="radio" className="form-check-input" name="Gender" value="Female" onChange={inputHandler} required />
                            <label className="form-check-label">Female</label>
                        </div>
                        <div className="form-check">
                            <input type="radio" className="form-check-input" name="Gender" value="Other" onChange={inputHandler} required />
                            <label className="form-check-label">Other</label>
                        </div>
                    </div>
                    <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                    <div className="col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-3">
                        <button type="button" className="btn btn-secondary" onClick={() => window.location.href = '/'}>Home</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Usersignup;