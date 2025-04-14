export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        LOGIN: '/api/v1/auth/login',
        REGISTER: '/api/v1/auth/register',
        GET_USER_INFO: '/api/v1/auth/getUser'
    },
    DASHBOARD: {
        GET_DATA: '/api/v1/dashboard'
    },
    INCOME: {
        ADD_INCOME: '/api/v1/income/add',
        GET_INCOME: '/api/v1/income/get',
        EXCEL_INCOME: '/api/v1/income/downloadexcel',
        DELETE_INCOME: (incomeID) => `/api/v1/income/${incomeID}`
    },
    EXPENSE: {
        ADD_EXPENSE: '/api/v1/expense/add',
        GET_EXPENSE: '/api/v1/expense/get',
        EXCEL_EXPENSE: '/api/v1/expense/downloadexcel',
        DELETE_EXPENSE: (expenseID) => `/api/v1/expense/${expenseID}`
    },
    UPLOAD: {
        UPLOAD_IMAGE: '/api/v1/auth/upload-image'
    }
}