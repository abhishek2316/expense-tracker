import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuths } from '../../hooks/useUserAuths';


const Income = () => {
  useUserAuths();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false)

  // Get all Income details
  const fetchIncomeDetails = async () => {
    if(loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_INCOME);

      if(response.data){
        setIncomeData(response.data)
      }
    } catch (error) {
      console.log("Something went Wrong. please try again later", error);
      
    } finally {
      setLoading(false);
    }
  }

  //  Add Income
  const addIncome = async (income) => {
    const {source, amount, date, icon} = income;

    if(!source.trim()){
      toast.error("Source is Required");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount should be a valid number greater than 0");
      return;
    }

    if(!date) {
      toast.error("Date is required");
      return;
    }

    if(!icon) {
      toast.error("Icon is required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount: Number(amount),
        createdAt: date,
        icon
      });
      
      setOpenAddIncomeModel(false);
      toast.success("Income Added Successfully")
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error adding Income:",
        error.response?.data?.message || error.message 
      );
    }
  }

  // Delete Income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({
        data: null,
        show: false
      });
      toast.success("Income details deleted successfully")
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting Income:",
        error.response?.data?.message || error.message 
      );
    }
  }

  // handle Download Income 
  const downloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.EXCEL_INCOME, {
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details. Please try again later.")
    }
  };
  
  useEffect(() => {
    fetchIncomeDetails()
  
    return () => {
    }
  }, [])
  
  
  return (
    <DashboardLayout activeMenu="Income">
      <div className="container mx-auto my-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>

          <IncomeList 
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id
              });
            }}
            onDownload={downloadIncomeDetails}
          /> 
        </div>
        <Modal 
          isOpen={openAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={addIncome} /> 
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({
            show: false,
            data: null
          })}
          title="Delete Income"
        >
          <DeleteAlert 
            content="Are you sure you want to delete this income detail?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income