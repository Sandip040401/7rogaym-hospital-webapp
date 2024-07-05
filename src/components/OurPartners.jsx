import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
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
        <div className="h-full w-full bg-gradient-to-r from-cyan-700 to-teal-500 py-6 pb-14">
            <div className="flex justify-center text-4xl font-bold mb-4">
                <span className="text-white">Our</span> <span className="pl-2 text-teal-200">Partners</span>
            </div>
            <div className="flex justify-center px-24 py-6 text-lg text-white text-center">
                <p>
                    We have partnered with some of the <span className="font-bold">best hospitals and clinics</span> across the country to provide quality healthcare services to our members. Our partner hospitals and clinics are carefully selected based on their <span className="font-bold">reputation for quality care, advanced technology,</span> and <span className="font-bold">experienced medical staff</span>.
                </p>
            </div>
            <div className="px-10 mt-12 md:px-12 relative">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    loop={true}
                    speed={600}
                    pagination={{ clickable: true }}
                    centeredSlides={true}
                    grabCursor={true}
                    slidesPerView={3}
                    spaceBetween={30}
                    autoplay={{ delay: 1000, disableOnInteraction: false }}
                    navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                >
                    {hospitals.map((hospital, index) => (
                        <SwiperSlide key={index}>
                            <HospitalCard hospital={hospital} className="h-64" />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div ref={prevRef} className="custom-swiper-button-prev swiper-button-prev text-white"></div>
                <div ref={nextRef} className="custom-swiper-button-next swiper-button-next text-white"></div>
            </div>
            <div className="flex justify-center mt-6">
                <Link to="/hospitals">
                    <button className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition duration-300">
                        Show More
                    </button>
                </Link>
            </div>
        </div>
    );
};
