const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Mumbai", "Bangalore", "Hyderabad", "Pune"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40K", "42-1lakh", "1lakh-5lakh"],
  },
];
const FilterCard = () => {
  return (
    <div className="w-full p-3 rounded-md bg-white">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, index) => {
              return (
                <div key={index} className="flex items-center space-x-2 my-2">
                <input
                  type="radio"
                  name="filter"
                  value={item}
                  className="cursor-pointer"
                />
                <label htmlFor={item}>{item}</label>
              </div>
              );
            })}
          </div>
        ))}
    </div>
  );
};

export default FilterCard;
