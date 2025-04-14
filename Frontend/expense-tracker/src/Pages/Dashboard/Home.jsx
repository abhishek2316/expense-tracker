import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useUserAuths } from "../../hooks/useUserAuths";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPath";
import InfoCards from "../../components/Cards/InfoCards";
import { IoMdCard } from "react-icons/io";
import { FaMoneyBillWave, FaMoneyBillAlt } from "react-icons/fa";
import { addThousandsSeprator } from "../../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
// import FinanceOverview from "../../components/Dashboard/FinanceOverview";

const Home = () => {
  // Call the auth hook but don't depend on its return value
  const { user } = useUserAuths();
  const navigate = useNavigate();

  // Initialize with null or proper object structure
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Fetch dashboard data with retry mechanism
  useEffect(() => {
    if (!user) return;

    let isMounted = true;
    let retryTimeout;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setDashboardData(null); // 👈 reset when re-fetching
        const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);

        // console.log("Test response",response.data);

        if (response.data && isMounted) {
          setDashboardData(response.data);
          setError(null);
        }
      } catch (error) {
        if (error.response?.status === 401 && retryCount < 3) {
          if (isMounted) {
            retryTimeout = setTimeout(() => {
              setRetryCount((prev) => prev + 1);
            }, 1000);
          }
        } else if (isMounted) {
          setError("Failed to load dashboard data");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
      if (retryTimeout) clearTimeout(retryTimeout);
      setDashboardData(null); // 👈 optional: cleanup on unmount
    };
  }, [user, retryCount]);

  // Debug output
  // console.log("Dashboard Data:", dashboardData);

  // Only for debug visualization - to be removed in production
  const isDevMode =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="text-lg font-medium">
              {retryCount > 0
                ? `Loading dashboard data (retry ${retryCount}/3)...`
                : "Loading dashboard data..."}
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-40">
            <div className="text-lg font-medium text-red-500">{error}</div>
          </div>
        ) : dashboardData && typeof dashboardData === "object" ? (
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
        ) : (
          <div className="flex justify-center items-center h-40">
            <div className="text-lg font-medium">
              No dashboard data available
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          
        </div>
        {/* <FinanceOverview
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome={dashboardData?.income || 0}
          totalExpense={dashboardData?.expense || 0}
          />  */}
      </div>
    </DashboardLayout>
  );
};

export default Home;
