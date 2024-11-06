import React, { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';
import Papa from 'papaparse';
import districtData from './district.csv';
import './Districts.css';

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderColor: '#4B0082',
    boxShadow: 'none',
    width: '200px', 
    padding: '0',  
    '&:hover': {
      borderColor: '#E0FFFF',
    },
  }),
  menu: (provided) => ({
    ...provided,
    border: '1px solid #4B0082',
    zIndex: 100,
    width: '200px',  
    padding: '0', 
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#4B0082' : state.isFocused ? '#E0FFFF' : null,
    color: state.isSelected ? '#E0FFFF' : '#000',
    padding: '0', 
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#4B0082',
    padding: '0',
  }),
  input: (provided) => ({
    ...provided,
    color: '#000',
    padding: '0',  
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#A9A9A9',
    padding: '0',  
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none', 
  }),
};

const DistrictSelection = () => {
  const [districtDataArray, setDistrictDataArray] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);

  useEffect(() => {
    const loadDistricts = async () => {
      try {
        const response = await fetch(districtData);
        const csvText = await response.text();
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            setDistrictDataArray(results.data);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
          }
        });
      } catch (error) {
        console.error("Error fetching CSV:", error);
      }
    };

    loadDistricts();
  }, []);

  const districts = useMemo(() => {
    const uniqueDistricts = [...new Set(districtDataArray.map(item => item.district))];
    return uniqueDistricts.map(district => ({ value: district, label: district }));
  }, [districtDataArray]);

  const divisions = useMemo(() => {
    if (!selectedDistrict) return [];
    return districtDataArray
      .filter(item => item.district === selectedDistrict.value)
      .map(item => ({ value: item.polling_division, label: item.polling_division }));
  }, [districtDataArray, selectedDistrict]);

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    setSelectedDivision(null); 
  };

  const handleDivisionChange = (selectedOption) => {
    setSelectedDivision(selectedOption);
  };

  return (
    <div className="container district-selection-container">
      <div className="row">
        <div className="col-12 mb-3">
          <Select
            id="district-select"
            className="select"
            styles={customStyles}
            options={districts}
            value={selectedDistrict}
            onChange={handleDistrictChange}
            placeholder="Select a District"
            isSearchable
            isClearable
          />
        </div>
        {selectedDistrict && (
          <div className="col-12 mb-3">
            <Select
              id="division-select"
              className="select"
              styles={customStyles}
              options={divisions}
              value={selectedDivision}
              onChange={handleDivisionChange}
              placeholder="Select a Division"
              isSearchable
              isClearable
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DistrictSelection;
