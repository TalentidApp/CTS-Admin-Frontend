import React, { useEffect, useState } from 'react';
import {
  GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu,
  Filter, Page, ExcelExport, PdfExport, Edit, Inject
} from '@syncfusion/ej2-react-grids';
import { contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';
import axios from "axios";
import { contactUsGrid } from '../data/dummy';

import {Dateformatter} from "../utils/index";

import {useSelector} from "react-redux";

import Loader from '../components/common/Loader';

import toast from 'react-hot-toast';

const Orders = () => {

  const [loading,setLoading] = useState(false);
  const editing = { allowDeleting: true, allowEditing: true };
  const [allFormData, setAllFormData] = useState(null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    async function fetchContactFormData() {
      try {

        setLoading(true);
        const response = await axios.get(`${apiUrl}/api/users/getAllContactUsForm`);
        setAllFormData(response.data.data);

        toast.success("all contact us form data fetch successfully ");

        console.log("res ka data ", response.data);

      } catch (error) {

        toast.error("Error fetching contact form data: ", error.message);
        console.error("Error fetching contact form data: ", error);

      }
      finally{

        setLoading(false);

      }
    }
    fetchContactFormData();
  }, []);

  const handleActionComplete = async (args) => {

    console.log("args ka data ",args.data);

    if (args.requestType === 'save') {
      const updatedData = args.data;

      console.log("Updated contact form data: ", updatedData);

      try {
        const resposne = await axios.post(`${apiUrl}/api/users/updateContactUsStatus`, {
          updatedStatus: updatedData.status,
          contactUsId: updatedData._id
        });

        console.log("res ka data: " + resposne.data);

        
        console.log("Data updated successfully");
        
      } catch (error) {

        console.error("Error updating data: ", error);
      }
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">

      {loading && <Loader />}
      <Header category="Page" title="Orders" />
      <div className="w-full">
        <GridComponent
          id="gridcomp"
          dataSource={allFormData}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
          editSettings={editing}
          width="auto"
          actionComplete={handleActionComplete} // Link the actionComplete event
        >
          <ColumnsDirective>
            {contactUsGrid.map((item, index) => (
              <ColumnDirective
                key={index}
                {...item}
                allowEditing={item.field === 'status'} // Adjust as needed
              />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Orders;
