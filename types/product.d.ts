export interface ProductType {
    _id: string;
    id: string; // เพิ่มฟิลด์นี้ตามข้อมูลจาก API
    name: string;
    type: {
      dayType: number;
      cost: number;
      price: number;
      agentPrice: number; // เพิ่มฟิลด์นี้จากข้อมูล API
      _id: string;
    }[];
    screen: number;
    colorPrimary: string;
    logoImage: string;
    remark: string;
    createdAt: string; // เพิ่มจาก API
    updatedAt: string; // เพิ่มจาก API
    __v: number; // เพิ่มจาก API
    openPreOrder: boolean; // เพิ่มจาก API
  }
  
  export interface AccountType {
    _id: string;
    email?: string; // สำหรับแพลตฟอร์มที่ใช้ email
    password?: string; // สำหรับแพลตฟอร์มที่ใช้ password
    link?: string; // เฉพาะ Canva
    dayType: number;
    platform: string;
    startDate: string;
    endDate: string;
    realStartDate: string;
    realEndDate: string;
    status: 'used' | 'active' | 'expired';
    userId: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    amount: number;
    cost: number;
    couponId: string;
    userName: string;
    paymentDate: string;
    screenName?: string; // เฉพาะ Prime
    pin?: string; // เฉพาะ Prime
  }