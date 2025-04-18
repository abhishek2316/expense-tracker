import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuths } from "../../hooks/useUserAuths";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import InfoCards from "../../components/Cards/InfoCards";
import { IoMdCard } from "react-icons/io";
import { FaMoneyBillWave, FaMoneyBillAlt } from "react-icons/fa";
import { addThousandsSeprator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";


const Home = () => {
  // Call the auth hook but don't depend on its return value
  const { user } = useUserAuths();
  const navigate = useNavigate();

  // Initialize with null or proper object structure
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [retryCount, setRetryCount] = useState(0);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went Wrong. Please try again", error);
    } finally {
      setLoading(true);
    }
  };

  // Fetch dashboard data with retry mechanism
  useEffect(() => {
    fetchDashboardData();

    return () => {};
  }, []);

  // Debug output
  // console.log("Dashboard Data:", dashboardData);

  // Only for debug visualization - to be removed in production
  // const isDevMode =
  //   window.location.hostname === "localhost" ||
  //   window.location.hostname === "127.0.0.1";

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCards
              icon={<IoMdCard />}
              label="Total Balance"
              // value={`$${addThousandsSeprator(dashboardData.totalBalance || 0)}`}
              value={addThousandsSeprator(dashboardData?.totalBalance || 0)}
              color="bg-primary"
            />

            <InfoCards
              icon={<FaMoneyBillWave />}
              label="Total Income"
              // value={`$${addThousandsSeprator(dashboardData.income || 0)}`}
              value={addThousandsSeprator(dashboardData?.income || 0)}
              color="bg-green-500"
            />

            <InfoCards
              icon={<FaMoneyBillAlt />}
              label="Total Expenses"
              // value={`$${addThousandsSeprator(dashboardData.expense || 0)}`}
              value={addThousandsSeprator(dashboardData?.expense || 0)}
              color="bg-red-500"
            />
          </div>

        {/* Recent Transaction started */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome={dashboardData?.income || 0}
          totalExpense={dashboardData?.expense || 0}
          /> 

          <ExpenseTransactions 
          transactions={dashboardData?.last30DaysExpenses?.transactions || []}
          onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
          data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions || []}
            totalIncome={dashboardData?.income || 0}
          />

          <RecentIncome
          transactions={dashboardData?.last60DaysIncome?.transactions || []}
          onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
