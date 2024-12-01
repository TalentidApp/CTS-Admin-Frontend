import {
  ColumnDirective,
  ColumnsDirective,
  Edit,
  Filter,
  GridComponent,
  Inject,
  Page,
  Selection,
  Sort,
  Toolbar,
  ExcelExport,
  PdfExport, // Import ExcelExport and PdfExport services
} from '@syncfusion/ej2-react-grids';
import React, { useEffect, useState } from 'react';
import { Header } from '../components';
import { allUsersGrid } from '../data/dummy'; // Ensure this matches the data structure
import axios from 'axios';

import Loader from '../components/common/Loader';

import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Customers = () => {

  const [loading,setLoading] = useState(false);

  const userData = useSelector((state)=>state.user.data);
  
  console.log("user data is ",userData);

  const apiUrl = process.env.REACT_APP_BACKEND_URL;
  const selectionSettings = { persistSelection: true };
  const toolbarOptions = ['Delete', 'Update', 'Search', 'ExcelExport', 'PdfExport']; // Added ExcelExport and PdfExport
  const editing = { allowDeleting: true, allowEditing: true };

  const [allUsersData, setAllUsersData] = useState(null);
  

  // Function to handle user deletion
  const userDeleteHandler = async (selectedData) => {
    try {
      console.log("selectedData in delete", selectedData);
      // Your API call to delete users goes here.
      fetchAllUsersData();
    } catch (error) {
      console.error('Error deleting users:', error.message);
    }
  };

  // Function to fetch all users data
  const fetchAllUsersData = async () => {
    try {

      setLoading(true); // Show loading spinner before API call
      const response = await axios.get(`${apiUrl}/api/users/fetchAllusers`);
      setAllUsersData(response.data.data);

      toast.success("all users fetched successfully");
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
    finally{
      setLoading(false);
    }
    
  };

  // Effect to fetch users data on component mount
  useEffect(() => {
    fetchAllUsersData();
  }, []);

  const userUpdateHandler = async (currentData, previousData) => {
    const changedFields = {};
    Object.keys(currentData).forEach((key) => {
      if (currentData[key] !== previousData[key] && key !== "createdAt") {
        changedFields[key] = currentData[key]; // Store the changed fields
      }
    });

    if (Object.keys(changedFields).length === 0) {
      console.log('No fields were updated.');
      return;
    }

    changedFields.adminUserId = userData._id;
    changedFields.userId = currentData["_id"];

    try {

      setLoading(true); // Show loading spinner before API call

      const response = await axios.post(`${apiUrl}/api/users/updateUserData`, {
        ...changedFields, // Only send the fields that were actually updated
      });

      toast.success("Use data updated successfully");

      console.log('User updated successfully:', response.data);
    } catch (error) {

      toast.error("Error updating user data. Please try again.");
      console.error('Error updating user:', error.message);
    }
    finally{

      setLoading(false);

    }
  };

  // Handle action complete for update and delete operations
  const handleActionComplete = (args) => {
    if (args.requestType === "save") {
      userUpdateHandler(args.data, args.previousData); // Call update handler
    } else if (args.requestType === 'delete') {

      console.log("call the update handler")
      userDeleteHandler(args.data); // Call delete handler
    }
  };

  // Handle toolbar click event for exporting
  const toolbarClick = (args) => {
    if (args.item.id.includes('excelexport')) {
      gridInstance.excelExport(); // Trigger Excel export
    }
    if (args.item.id.includes('pdfexport')) {
      gridInstance.pdfExport(); // Trigger PDF export
    }
  };

  let gridInstance; // Reference to the grid component

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

      {

        loading && <Loader></Loader>
      }
      <Header category="Page" title="Contact Queries" />
      <GridComponent
        ref={(g) => (gridInstance = g)} // Attach grid instance to trigger export methods
        dataSource={allUsersData}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionSettings}
        toolbar={toolbarOptions}
        toolbarClick={toolbarClick} // Add toolbarClick handler
        editSettings={editing}
        allowSorting
        allowFiltering={true}
        actionComplete={handleActionComplete}
      >
        <ColumnsDirective>
          {/* Make sure each column corresponds to a field in allUsersData */}
          {allUsersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter, ExcelExport, PdfExport]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
