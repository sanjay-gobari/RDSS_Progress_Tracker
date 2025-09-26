import React, { useEffect, useState } from 'react'
import ActivityData from './ActivitiesData';
import 'remixicon/fonts/remixicon.css'
import "./App.css"
import Navbar from './Navbar';

const formFields = [
    { name: "NameOfActivity", label: "Name of Activity", type: "dropdown" },
    { name: "NameOfItem", label: "Name of Item", type: "dropdown" },
    { name: "NameOfDivision", label: "Name of Division", type: "dropdown" },
    { name: "NameOfSubDivision", label: "Name of Sub-Division", type: "dropdown" },
    { name: "Date", label: "Date", type: "date" },
    { name: "ErectedQty", label: "Erected Qty", type: "number" },
    { name: "Unit", label: "Unit", type: "dropdown" },
    { name: "Substation", label: "Substation", type: "dropdown" },
    { name: "Feeder", label: "Feeder", type: "dropdown" },
    { name: "Location", label: "Location", type: "text" },
    { name: "NameOfContractor", label: "Name of Contractor", type: "text" },
    { name: "ManPower", label: "Man Power", type: "number" },
    { name: "Teams", label: "Teams", type: "number" },
];



function AddProgress() {

    const [selected, setSelected] = useState(ActivityData.MaterialType[0]);
    const [activityOptions, setActivityOptions] = useState([]);
    const [itemsOptions, setItemsOptions] = useState([]);

    const [formData, setFormData] = useState({});

    const [dailyProgress, setDailyProgress] = useState([])

    const handleChange = (e) => {
        setSelected(e.target.value);
    }

    const handleDelete = (index) => {
        setDailyProgress((prev) => prev.filter((_, i) => i !== index));
    };

    const handleProgressSubmit = async () => {
        const c = confirm("Are you sure");
        if (c && dailyProgress.length != 0) {
            console.log(dailyProgress);
            await fetch("http://localhost:5000/append", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dailyProgress)
            });

            // Get saved data
            const res = await fetch("http://localhost:5000/data");
            const savedData = await res.json();
            console.log(savedData);



        }
    };

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

    const handleAddProgress = (e) => {
        e.preventDefault();
        const localFormData = new FormData(e.currentTarget);
        const data = {};
        formFields.forEach(elm => {
            data[elm.name] = localFormData.get(elm.name);
        });
        setFormData(data);
        setDailyProgress((progress) => [...progress, data])
    };

    return (

        <div className='h-full flex p-4 gap-4 bg-gray-100 '>
            <div className='w-[500px] rounded-lg bg-white p-2'>
                <div>
                    <h2 className='text-center text-2xl'>Enter Progress</h2>
                </div>
                <div className='my-4 grid grid-cols-3 place-items-center border border-gray-300 rounded-lg'>
                    {ActivityData.MaterialType.map((option, index) => (
                        <Radio
                            key={index}
                            label={option}
                            checked={selected === option}
                            onChange={handleChange}
                            name="options"
                        />
                    ))}
                    <hr className='my-hr' />
                </div>
                <form onSubmit={handleAddProgress} autoComplete="off" >
                    <div className='grid grid-cols-6 gap-2'>
                        {formFields.map((field, idx) => {

                            let myclass = "col-span-2";
                            if (field.type === "dropdown") {
                                let options = [];
                                if (field.name === "NameOfActivity") { options = activityOptions; myclass = "col-span-6" }
                                else if (field.name === "NameOfItem") { options = itemsOptions; myclass = "col-span-6" }
                                else if (field.name === "NameOfDivision") { options = ActivityData.Division; myclass = "col-span-3" }
                                else if (field.name === "NameOfSubDivision") { options = ActivityData.SubDivision; myclass = "col-span-3" }
                                else if (field.name === "Unit") options = ActivityData.Units;
                                else if (field.name === "Substation") options = ActivityData.Substation;
                                else if (field.name === "Feeder") options = ActivityData.Feeders;
                                return <Dropdown key={idx} name={field.name} label={field.label} options={options} myclass={myclass} />
                            } else {
                                return <InputField key={idx} name={field.name} label={field.label} type={field.type} myclass={myclass} />
                            }
                        })}
                    </div>
                    <div className='pt-8 text-center '>
                        <Button1 type="Submit" title="Add Progress">Add</Button1>
                    </div>
                </form>

            </div>
            <div className='flex-1 bg-white rounded-lg p-2'>
                <h2 className='w-full text-center text-2xl'>Today Progress</h2>
                <DisplayDailyProgress data={dailyProgress} handleDelete={handleDelete} />
                <div className='text-center p-2'>
                    <Button1 type="button" onClick={handleProgressSubmit} title="submit all Progress">Submit</Button1>
                </div>
            </div>
        </div>
    )
}
export default AddProgress


function Dropdown({ name, label, options, value, myclass }) {
    const containerRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState(value || "");

    React.useEffect(() => {
        setSearch(value || "");
    }, [value]);

    useEffect(() => {
        setSearch("");
        console.log("option change detected")
    }, [options])

    // Close dropdown when clicking outside
    React.useEffect(() => {
        function handleOutside(e) {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, []);

    const filteredOptions = options.filter(opt =>
        opt.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div ref={containerRef} className={`flex flex-col w-full relative ${myclass}`}>
            <label className="text-gray-700">{label}</label>
            <div className='border border-gray-300 rounded-lg flex items-center pr-2'>
                <input
                    type="text"
                    name={name}
                    className="outline-none p-2 w-full  rounded-lg bg-white cursor-text"
                    onClick={() => setOpen(true)}
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    placeholder="Select"
                    required
                />
                <button type='button'
                    title='clear field'
                    className='cursor-pointer duration-150 text-gray-400 hover:text-gray-800 rounded '
                    onClick={() => setSearch("")}
                >
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>
                </button>
            </div>

            {open && filteredOptions.length > 0 && (
                <div className="absolute top-full left-0 w-full border rounded-lg bg-white mt-1 max-h-100 overflow-y-auto z-10">
                    {filteredOptions.map((opt, idx) => (
                        <div
                            key={idx}
                            className="p-2 hover:bg-blue-100 cursor-pointer"
                            onMouseDown={(e) => e.preventDefault()} // prevent losing focus
                            onClick={() => {
                                setSearch(opt);                // put option into box
                                setOpen(false);                // close dropdown
                            }}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}



export function InputField({ name, label, type = "text", value, onChange, placeholder, myclass }) {
    if (type === "date") {
        value = new Date().toISOString().split("T")[0];
    }
    return (
        <div className={`flex flex-col space-y-1 w-full ${myclass}`}>
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>
    );
}


export function Radio({ label, checked, onChange, name }) {
    return (
        <label
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 `}
        >
            <input
                type="radio"
                name={name}
                value={label}
                checked={checked}
                onChange={onChange}
                className="w-5 h-5  mr-3 cursor-pointer"
            />
            {label}
        </label>
    );
}

export function Button1({ onClick, type, title, children }) {
    return (
        <button
            className='cursor-pointer bg-blue-500 py-2 px-6 text-white hover:bg-blue-400 duration-150 rounded-full'
            onClick={onClick}
            title={title}
            type={type}>
            {children}
        </button>
    )
}

export const DisplayDailyProgress = ({ data, handleDelete }) => {

    return (
        <>
            <div className='border p-2'>
                <div className='grid grid-cols-[2fr_repeat(13,1fr)] gap-1 place-items-center'>
                    {
                        formFields.map((elm, i) => (
                            <span key={i} className=''>{elm.label}</span>
                        ))
                    }
                    <span className=''>Action</span>

                </div>
                {data.length != 0 && (
                    data.map((elm, i) => (
                        <div key={i} className='grid grid-cols-[2fr_repeat(13,1fr)] gap-1 place-items-center border-b my-2'>
                            <span>{elm.NameOfActivity}</span>
                            <span>{elm.NameOfItem}</span>
                            <span>{elm.NameOfDivision}</span>
                            <span>{elm.NameOfSubDivision}</span>
                            <span>{elm.Date}</span>
                            <span>{elm.ErectedQty} </span>
                            <span>{elm.Unit}</span>
                            <span>{elm.Substation}</span>
                            <span>{elm.Feeder}</span>
                            <span>{elm.Location}</span>
                            <span>{elm.NameOfContractor}</span>
                            <span>{elm.ManPower}</span>
                            <span>{elm.Teams}</span>
                            <div className='flex gap-3 text-xl'>
                                <button className='cursor-pointer text-green-600' title='Edit'><i className="ri-edit-line"></i></button>
                                <button className='cursor-pointer text-red-600' title='Delete' onClick={() => { handleDelete(i) }}><i className="ri-delete-bin-2-line"></i></button>
                            </div>
                        </div>
                    ))
                )}
                {data.length == 0 && (
                    <div>
                        <p className='text-center text-xl'>No Progress</p>
                    </div>
                )}
            </div>
        </>);
}

