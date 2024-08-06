import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HospitalCard } from "./HospitalCard";
import { ClipLoader } from 'react-spinners';

export const Hospitals = ({ searchQuery }) => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await axios.get('https://asia-south1-arogyam-super.cloudfunctions.net/app/hospitals?lat=0.0&lon=0.0&token=arogyam');
                if (response.data.status === "success") {
                    const transformedData = response.data.data
                        .filter(hospital => hospital.status === "ENABLE")
                        .map(hospital => ({
                            image: hospital.images[0] || '/hospital.png',
                            name: hospital.entity_name,
                            address: hospital.address,
                            city: hospital.city,
                            state: hospital.state,
                            zip: hospital.pincode,
                            phone: hospital.tel_no || hospital.mobile_no,
                            discounts: {
                                ipd: hospital.discount_ipd,
                                opd: hospital.discount_opd,
                                medicine: hospital.discount_medicine,
                                diagnostic: hospital.discount_diagnostic
                            },
                            category: hospital.category,
                            uid: hospital.uid,
                            map_link: hospital.map_link
                        }));
                    setHospitals(transformedData);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching hospitals:', error);
                setLoading(false);
            }
        };

        fetchHospitals();
    }, []);

    const filteredHospitals = hospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col items-center justify-center mt-8 px-10 lg:px-20 pb-20">
            {loading ? (
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center w-full">
                    {filteredHospitals.map((hospital, index) => (
                        <HospitalCard key={index} hospital={hospital} />
                    ))}
                </div>
            )}
        </div>
    );
};
