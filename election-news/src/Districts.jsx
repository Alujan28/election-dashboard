import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Papa from 'papaparse';
import districtData from './district.csv';
import './Districts.css';

const DistrictSelection = () => {
  const [districts, setDistricts] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [districtDataArray, setDistrictDataArray] = useState([]);

  useEffect(() => {
    const loadDistricts = () => {
      Papa.parse(districtData, {
        header: true,
        download: true,
        complete: (results) => {
          console.log("Parsed data:", results.data);
          setDistrictDataArray(results.data);
          
          const uniqueDistricts = [...new Set(results.data.map(item => item.district))];
          setDistricts(uniqueDistricts.map(district => ({ value: district, label: district })));
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        }
      });
    };

    loadDistricts();
  }, []);

  const handleDistrictChange = (selectedOption) => {
    console.log("Selected District:", selectedOption);
    setSelectedDistrict(selectedOption);
   
    const filteredDivisions = districtDataArray
      .filter(item => item.district === selectedOption.value)
      .map(item => ({ value: item.polling_division, label: item.polling_division }));
    
    console.log("Filtered Divisions:", filteredDivisions);
    setDivisions(filteredDivisions);
    setSelectedDivision(null);
  };

  const handleDivisionChange = (selectedOption) => {
    console.log("Selected Division:", selectedOption);
    setSelectedDivision(selectedOption);
  };

  return (
    <div className="district-selection-container">
      <Select
        className="select"
        options={districts}
        onChange={handleDistrictChange}
        placeholder="Select a District"
      />
      {selectedDistrict && (
        <Select
          className="select"
          options={divisions}
          onChange={handleDivisionChange}
          placeholder="Select a Division"
        />
      )}
    </div>
  );
};

export default DistrictSelection;
