import React, { useEffect, useState } from 'react'
import ActivityData from './ActivitiesData';
function App() {

  const [selected, setSelected] = useState(ActivityData.MaterialType[0]);
  const [activityOptions, setActivityOptions] = useState([]);
  const [itemsOptions, setItemsOptions] = useState([]);

  const handleChange = (e) => {
    setSelected(e.target.value);
  }

  useEffect(() => {

    if (selected === "Cable/Conductor") {
      setActivityOptions(ActivityData.ActivityListCableConductor)
      setItemsOptions(ActivityData.CableConductorItems)
    }
    else if (selected === "Pole") {
      setActivityOptions(ActivityData.ActivityListPole)
      setItemsOptions(ActivityData.PoleItems)
    }
    else if (selected === "VCB") {
      setActivityOptions(ActivityData.ActivityListVCB)
      setItemsOptions(ActivityData.VCBItems)
    }
  }, [selected])



  return (
    <div className='p-4 max-w-[600px]'>
      {ActivityData.MaterialType.map((option, index) => (
        <Radio
          key={index}
          label={option}
          checked={selected === option}
          onChange={handleChange}
          name="options"
        />
      ))}
      <Dropdown label="Name of Activity" options={activityOptions} />
      <Dropdown label="Name of Item" options={itemsOptions} />
      <div className='grid grid-cols-2 gap-2'>
        <Dropdown label="Name of Division" options={["Pithoragarh", "Dharchula", "Champawat"]} />
        <Dropdown label="Name of Sub-Division" options={["Pithoragarh", "Lohaghat"]} />
      </div>
      <div className='grid grid-cols-3 gap-2'>
        <InputField label="Date" type="date" />
        <InputField label="Erected Qty" type='number' />
        <InputField label="Unit" />
        <InputField label="Substation" />
        <InputField label="Location" />
        <InputField label="Name of Contractor" />
        <InputField label="Man Power" type='number' />
        <InputField label="Teams" type='number' />
      </div>
      <div className='pt-8 text-center'>
        <Button1 text='Submit' type="Submit"/>
      </div>
    </div>
  )
}

export default App



export function Dropdown({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

export function InputField({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}


export function Radio({ label, checked, onChange, name }) {
  return (
    <label
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${checked ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
        }`}
    >
      <input
        type="radio"
        name={name}
        value={label}
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 accent-white mr-3 cursor-pointer"
      />
      {label}
    </label>
  );
}

export function Button1({ text = "button", onClick,type }) {
  return (
    <button 
    className='cursor-pointer bg-blue-500 p-2 rounded text-white hover:bg-blue-400 duration-150' 
    onClick={onClick} type={type}>{text}</button>
  )
}