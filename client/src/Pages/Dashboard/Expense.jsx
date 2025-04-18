import React, { useEffect, useState } from 'react'
import { useUserAuths } from '../../hooks/useUserAuths';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';

const Expense = () => {
  useUserAuths();
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false)

  // Get all Expense details
  const fetchExpenseDetails = async () => {
    if(loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_EXPENSE);

      if(response.data){
        setExpenseData(response.data)
      }
    } catch (error) {
      console.log("Something went Wrong. please try again later", error);
      
    } finally {
      setLoading(false);
    }
  }

  //  Add Income
  const addExpense = async (expense) => {
    const {category, amount, date, icon} = expense;

    if(!category.trim()){
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
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount: Number(amount),
        createdAt: date,
        icon
      });
      
      setOpenAddExpenseModel(false);
      toast.success("Expense Added Successfully")
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error adding expense:",
        error.response?.data?.message || error.message 
      );
    }
  };

  // Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({
        data: null,
        show: false
      });
      toast.success("Expense details deleted successfully")
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting Expense:",
        error.response?.data?.message || error.message 
      );
    }
  }

  // handle Download Income 
  const downloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.EXCEL_EXPENSE, {
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense details. Please try again later.")
    }
  };

  useEffect(() => {
    fetchExpenseDetails()
    return () => {
    }
  }, [])
  
  return (
    <DashboardLayout activeMenu="Expense">
      <div className="container mx-auto my-6 px-4">
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div>
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModel(true)}
            />
          </div>

          <ExpenseList 
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id
              });
            }}
            onDownload={downloadExpenseDetails}
          />
        </div>
        <Modal 
          isOpen={openAddExpenseModel}
          onClose={() => setOpenAddExpenseModel(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={addExpense} /> 
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({
            show: false,
            data: null
          })}
          title="Delete Expense"
        >
          <DeleteAlert 
            content="Are you sure you want to delete this income detail?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
    
  )
}

export default Expense