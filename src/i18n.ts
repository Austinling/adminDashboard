import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        Grade: "Grade",
        Time_Period: "Time Period",
        Class_Date: "Class Date",
        Payment_Status: "Payment Status",
        Payments: "Payments",
        Number_Of_Payments: "Number of Payments",
        Tuition_Fee: "Tuition Fee",
        Change_Mode: "Change Mode",
        Total: "Total",
        Months: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        Month: "Month",
        Day: "Day",
        Paid: "Paid",
        Unpaid: "Unpaid",
        Admin_Panel: "Rong Admin Panel",
      },
    },

    ch: {
      translation: {
        Grade: "年级",
        Time_Period: "上课时间",
        Class_Date: "上课日期",
        Payment_Status: "付款状态",
        Payments: "付款",
        Number_Of_Payments: "付款次数",
        Tuition_Fee: "学费",
        Change_Mode: "改变模式",
        Total: "总计数",
        Months: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月",
        ],
        Month: "月",
        Day: "天",
        Paid: "付了",
        Unpaid: "没付",
        Admin_Panel: "蓉中文学校管理面板",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});
