const DashboardCard = ({color, title, number, icon}) => {
    return(
        <div className={`bg-${color}-400 text-white text-center w-1/4`}>
            <div className=''>
                <p className='mx-6 mt-3 text-2xl font-semibold'> {title} </p>
                <p className='mt-4 text-3xl font-bold'> {number} {icon}</p>
            </div>
            <div className='h-10 mt-6 relative'>
                <div className={`w-full h-6 bg-${color}-600 flex absolute bottom-0`}>
                </div>
            </div>
        </div>
    );
}

export default DashboardCard