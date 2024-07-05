const Card = ({ imageSrc, title, description, color, height, width , circle, textSize, descSize}) => {
    return (
        <div className={`shadow-black shadow-sm border-r-2 border-b-2 border-black rounded-tl-xl rounded-tr-3xl rounded-br-xl rounded-bl-xl ${height} ${width} p-4 flex flex-col items-start transform transition-transform duration-300 hover:scale-105 ${color}`}>
            <div className={`w-14 h-14 ${circle} rounded-full flex items-center justify-center mb-4`}>
                <img className="w-10 h-10" src={imageSrc} alt={title} />
            </div>
            <div className={`font-bold  ${textSize} mb-2`}>{title}</div>
            <div className={` ${descSize} font-semibold text-gray-600`}>{description}</div>
        </div>
    );
}

export const BannerCards = ({ data, height = "h-48", width = "w-56", feature = false }) => {
    return (
        <div className="w-full flex flex-wrap pt-16 space-x-6">
            {data.map((item, index) => (
                <div key={index} className={`relative ${feature && index % 2 === 1 ? 'mt-16' : ''}`}>
                    <Card
                        imageSrc={item.imageSrc}
                        title={item.title}
                        description={item.description}
                        color={item.color}
                        height={height}
                        width={width}
                        circle={item.circle}
                        textSize = {item.textSize}
                        descSize = {item.descSize}
                    />
                </div>
            ))}
        </div>
    );
}
