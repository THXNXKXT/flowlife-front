// components/AccountCard.tsx
"use client";

import type { AccountType } from "@/types/product";
import { useEffect, useState } from "react";

type AccountCardProps = {
  account: AccountType;
  onClick?: () => void;
  className?: string;
  variant?: "compact" | "detailed";
};

const getPlatformType = (platformId: string): string => {
  const platformMap: Record<string, string> = {
    "656f437c824eaca2136f3f2f": "VIU",
    "65753c6cabdf18dd6d8956f3": "Prime",
    "65841e7dac3c984ca6be467d": "YouTube",
    "658845d3a844488985ebd8b8": "Canva",
    "658848f7b81ca4d59cccef96": "iQiyi",
    "659ed394610988d54ed1fbd5": "WeTV",
    "65b87e09146660dbd825f3d7": "HBO Max",
  };
  return platformMap[platformId] || "อื่นๆ";
};

const safeDateParser = (dateString?: string): Date | null => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
};

export default function AccountCard({
  account,
  onClick,
  className,
  variant = "detailed",
}: AccountCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  const endDate = safeDateParser(account.endDate);
  const realStartDate = safeDateParser(account.realStartDate);
  const isExpired = endDate ? endDate < new Date() : false;
  const platformType = getPlatformType(account.platform);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`account-${account._id}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [account._id]);

  return (
    <div
      id={`account-${account._id}`}
      className={`bg-white rounded-xl border border-gray-200 transition-all cursor-pointer hover:shadow-lg ${
        isVisible ? "animate-fadeIn opacity-100" : "opacity-0"
      } ${className || ""}`}
      onClick={onClick}
    >
      <div className="p-4">
        {/* Header Section */}
        <div className="flex justify-between items-start gap-2 mb-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-800 truncate">
              {account.userName || "ไม่มีข้อมูลชื่อผู้ใช้"}
            </h3>
            <p className="text-sm text-gray-600 truncate mt-1">
              {platformType === "Canva" ? account.link : account.email}
            </p>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs flex-shrink-0 ${
              account.status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {account.status}
          </span>
        </div>

        {/* Content Section */}
        <div className="border-t pt-3 space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">วันหมดอายุ</span>
            <span
              className={`${isExpired ? "text-red-600" : "text-green-600"}`}
            >
              {endDate
                ? endDate.toLocaleDateString("th-TH")
                : "ไม่มีข้อมูลวันที่"}
              {isExpired && " (หมดอายุ)"}
            </span>
          </div>

          {variant === "detailed" && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">แพลตฟอร์ม</span>
                <span className="text-blue-600 capitalize">{platformType}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
