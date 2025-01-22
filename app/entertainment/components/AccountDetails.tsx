"use client";

import type { AccountType } from "@/types/product";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function AccountDetails({
  account,
  onClose,
}: {
  account: AccountType;
  onClose: () => void;
}) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // ฟังก์ชันแปลงวันที่อย่างปลอดภัย
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date
        .toLocaleDateString("th-TH", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })
        .replace(/\s/g, "");
    } catch {
      return "ไม่มีข้อมูลวันที่";
    }
  };

  // ตรวจสอบประเภทแพลตฟอร์ม
  const getPlatformType = (platformId: string) => {
    const platformMap: { [key: string]: string } = {
      "656f437c824eaca2136f3f2f": "VIU",
      "65753c6cabdf18dd6d8956f3": "Prime",
      "65841e7dac3c984ca6be467d": "YouTube",
      "658845d3a844488985ebd8b8": "Canva",
      "658848f7b81ca4d59cccef96": "Iqiyi",
      "659ed394610988d54ed1fbd5": "WeTV",
      "65b87e09146660dbd825f3d7": "HBO Max",
    };
    return platformMap[platformId] || "อื่นๆ";
  };

  // ฟังก์ชันคัดลอกข้อความแบบรองรับทุกอุปกรณ์
  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      if (navigator.clipboard) {
        // วิธีใหม่สำหรับเบราว์เซอร์ที่ทันสมัย
        await navigator.clipboard.writeText(text);
      } else {
        // วิธีสำรองสำหรับเบราว์เซอร์เก่า
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 1500);
    } catch (err) {
      alert("ไม่สามารถคัดลอกได้ กรุณาลองอีกครั้ง");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-xl w-full mx-4 overflow-hidden shadow-xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">รายละเอียดบัญชี</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* ข้อมูลพื้นฐาน */}
            <DetailItem
              label="แพลตฟอร์ม"
              value={getPlatformType(account.platform)}
            />
            <DetailItem label="สถานะ" value={account.status} />

            {/* ข้อมูลเฉพาะแพลตฟอร์ม */}
            {account.link && (
              <DetailItem
                label="ลิงก์"
                value={account.link}
                onCopy={() => copyToClipboard(account.link || "", "link")}
                showCopy={!!account.link}
                copied={copiedField === "link"}
              />
            )}
            {account.screenName && (
              <DetailItem label="ชื่อจอ" value={account.screenName} />
            )}
            {account.pin && <DetailItem label="PIN" value={account.pin} />}

            {/* ข้อมูลการล็อกอิน */}
            <DetailItem
              label="อีเมล/เบอร์โทร"
              value={account.email || "ไม่มีข้อมูล"}
              onCopy={() => copyToClipboard(account.email || "", "email")}
              showCopy={!!account.email}
              copied={copiedField === "email"}
            />
            <DetailItem
              label="รหัสผ่าน"
              value={account.password || "ไม่มีข้อมูล"}
              onCopy={() => copyToClipboard(account.password || "", "password")}
              showCopy={!!account.password}
              copied={copiedField === "password"}
            />

            {/* ข้อมูลวันที่ */}
            <DetailItem
              label="วันที่เริ่มต้น"
              value={formatDate(account.startDate)}
            />
            <DetailItem
              label="วันที่สิ้นสุด"
              value={formatDate(account.endDate)}
            />
          </div>

          {/* ข้อมูลการชำระเงิน */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">
              ข้อมูลการชำระเงิน
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <DetailItem
                label="ค่าบริการ"
                value={
                  typeof account.cost === "number"
                    ? `฿${account.cost}`
                    : "ไม่มีข้อมูล"
                }
              />
              <DetailItem
                label="วันที่ชำระเงิน"
                value={
                  account.paymentDate
                    ? formatDate(account.paymentDate)
                    : "ไม่มีข้อมูล"
                }
              />
              <DetailItem label="จำนวนวัน" value={`${account.dayType} วัน`} />
              <DetailItem
                label="ประเภทแพ็กเกจ"
                value={account.dayType === 28 ? "แบบ 28 วัน" : "แบบ 30 วัน"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DetailItem = ({
  label,
  value,
  onCopy,
  showCopy = false,
  copied = false,
}: {
  label: string;
  value: string | number;
  onCopy?: () => void;
  showCopy?: boolean;
  copied?: boolean;
}) => (
  <div className="space-y-1">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="text-gray-900 break-all flex items-center gap-2">
      <span>{value || "-"}</span>
      {showCopy && (
        <button
          onClick={onCopy}
          className="text-gray-400 hover:text-blue-500 transition-colors"
          aria-label="คัดลอก"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      )}
    </dd>
  </div>
);
