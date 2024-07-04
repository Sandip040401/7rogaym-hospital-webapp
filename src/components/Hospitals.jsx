import { HospitalCard } from "./HospitalCard";

export const Hospitals = () => {
    
    const hospitals = [
        {
            name: "Aadhaar Multi Speciality Hospital",
            address: "Plot No. 32, Radha Krishna Colony Near Karond Chouraha Bhopal",
            city: "Bhopal",
            state: "MP",
            zip: "462038",
            phone: "9174884411",
            image: "/path/to/image1.jpg",
            discounts: {
                ipd: 20,
                opd: 10,
                medicine: 10,
                diagnostic: 0
            }
        },
        {
            name: "Srijan General Hospital",
            address: "G-sector Near Sant. Thomas School Ayodhya Bhopal",
            city: "Bhopal",
            state: "MP",
            zip: "462041",
            phone: "9584958510",
            image: "/path/to/image2.jpg",
            discounts: {
                ipd: 20,
                opd: 10,
                medicine: 10,
                diagnostic: 0
            }
        },
        {
            name: "Harishankar Hospital Chorasiya Hospital",
            address: "54 Swarnakar Colony Vidisha",
            city: "Vidisha",
            state: "MP",
            zip: "464001",
            phone: "9425149299",
            image: "/path/to/image3.jpg",
            discounts: {
                ipd: 20,
                opd: 20,
                medicine: 10,
                diagnostic: 0
            }
        }
    ];
   
    return (
        <div className="flex flex-wrap justify-center h-full w-full mt-36">
        {hospitals.map((hospital, index) => (
            <HospitalCard key={index} hospital={hospital} />
        ))}
        </div>
    );
};
