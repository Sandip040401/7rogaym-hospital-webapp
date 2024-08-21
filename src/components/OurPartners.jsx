import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { HospitalCard } from './HospitalCard';

export const OurPartners = () => {
    const [hospitals, setHospitals] = useState([]);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

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

    useEffect(() => {
        if (prevRef.current && nextRef.current) {
            prevRef.current.swiper.update();
            nextRef.current.swiper.update();
        }
    }, [prevRef, nextRef]);

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
                    <Swiper
                        className='lg:ml-8 rounded-3xl'
                        modules={[Navigation, Pagination, Autoplay]}
                        loop={true}
                        speed={500}
                        centeredSlides={true}
                        grabCursor={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false
                        }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            1280: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                        }}
                    >
                        {hospitals.map((hospital, index) => (
                            <SwiperSlide key={index}>
                                <HospitalCard hospital={hospital} className="h-full" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
            <div className="flex justify-center mt-6">
                <Link to="/hospitals">
                    <button className="bg-teal-600 text-xl text-white px-4 py-2 text-sm rounded-md hover:bg-teal-700 transition duration-300 shadow-lg">
                        Show More
                    </button>
                </Link>
            </div>
        </div>
    );
};
