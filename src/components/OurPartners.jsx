import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { HospitalCard } from './HospitalCard';

export const OurPartners = () => {
    const [hospitals, setHospitals] = useState([]);

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
            } catch (error) {
                console.error('Error fetching hospitals:', error);
            }
        };

        fetchHospitals();
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1280 },
            items: 3
        },
        desktop: {
            breakpoint: { max: 1280, min: 1024 },
            items: 2
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1
        }
    };

    return (
        <div className="h-full w-full bg-gradient-to-r from-cyan-700 to-teal-500 py-6 pb-14">
            <div className="flex justify-center text-4xl font-bold mb-4">
                <span className="text-white">Our</span> <span className="pl-2 text-teal-200">Partners</span>
            </div>
            <div className="flex justify-center px-4 lg:px-24 py-6 text-lg text-white text-center">
                <p>
                    We have partnered with some of the <span className="font-bold">best hospitals and clinics</span> across the country to provide quality healthcare services to our members. Our partner hospitals and clinics are carefully selected based on their <span className="font-bold">reputation for quality care, advanced technology,</span> and <span className="font-bold">experienced medical staff</span>.
                </p>
            </div>
            <div className="lg:ml-10 lg:px-10 px-2 mt-12 md:px-12 relative">
                {hospitals.length > 0 && (
                    <Carousel
                        responsive={responsive}
                        ssr={true}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={2000}
                        keyBoardControl={true}
                        customTransition="transform 300ms ease-in-out"
                        transitionDuration={300}
                        itemClass="carousel-item-padding-40-px"
                        pauseOnHover={false}  // Disable pause on hover
                        arrows={false}       // Disable navigation arrows
                    >
                        {hospitals.map((hospital, index) => (
                            <div key={index} className="lg:ml-8 rounded-3xl">
                                <HospitalCard hospital={hospital} className="h-full" />
                            </div>
                        ))}
                    </Carousel>
                )}
            </div>
            <div className="flex justify-center mt-6">
                <Link to="/hospitals">
                    <button className="bg-teal-600 text-xl text-white px-4 py-2 text-sm md:text-base rounded-md hover:bg-teal-700 transition duration-300 shadow-lg">
                        Show More
                    </button>
                </Link>
            </div>
        </div>
    );
};
