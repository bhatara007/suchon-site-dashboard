const DashboardCard = ({color, title, number, icon}) => {
    return (
      <div className={`text-black text-center w-1/4 bg-white relative h-36 rounded-xl overflow-hidden`}>
        <div className="">
          <p className="mx-6 mt-3 text-2xl"> {title} </p>
          <div className='space-x-3 flex flex-row justify-center'>
            <p className="mt-4 text-3xl">
              {number} 
            </p>
            <p className="mt-4 text-3xl text-gray-700">
              {icon}
            </p>
          </div>
        </div>
        <div
          className={`w-3 h-full flex absolute right-0 top-0`}
        ></div>
      </div>
    );
}

export default DashboardCard