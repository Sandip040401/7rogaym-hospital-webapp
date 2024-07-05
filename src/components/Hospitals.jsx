import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HospitalCard } from "./HospitalCard";

export const Hospitals = () => {
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await axios.get('https://asia-south1-arogyam-super.cloudfunctions.net/app/hospitals?lat=0.0&lon=0.0&token=arogyam');
                if (response.data.status === "success") {
                    const transformedData = response.data.data
                        .filter(hospital => hospital.status === "ENABLE")
                        .map(hospital => ({
                            image: hospital.images[0] || '/hospital.png', // Assuming the first image is the main one
                            name: hospital.entity_name,
                            address: hospital.address,
                            city: hospital.city,
                            state: hospital.state,
                            zip: hospital.pincode,
                            phone: hospital.tel_no || hospital.mobile_no, // Use tel_no if available, otherwise mobile_no
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
            } catch (error) {
                console.error('Error fetching hospitals:', error);
            }
        };

        fetchHospitals();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center h-full w-full mt-28 px-10 lg:px-20 pb-20">
            {hospitals.map((hospital, index) => (
                <HospitalCard key={index} hospital={hospital} />
            ))}
        </div>
    );
};
