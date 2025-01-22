"use client";
import React, { useState, useEffect, JSX } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Film, Music, Gamepad2, Moon, Sun, HeartPulse, Wallet, LayoutDashboard, CodeXml } from "lucide-react";

interface Service {
  icon: JSX.Element;
  title: string;
  href: string;
  color: string;
}

interface Category {
  title: string;
  icon: JSX.Element;
  services: Service[];
}

// Custom Hook
const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(savedTheme ? savedTheme === 'dark' : prefersDark);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDarkMode);
    root.style.backgroundColor = isDarkMode ? '#111827' : '#f9fafb';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode] as const;
};

// Theme Toggle Button
const ThemeToggleButton = ({ isDarkMode, toggle }: { isDarkMode: boolean; toggle: () => void }) => (
  <motion.button
    onClick={toggle}
    className={`p-2 rounded-lg transition-colors ${
      isDarkMode 
        ? 'bg-gray-800 hover:bg-gray-700 text-purple-400' 
        : 'bg-gray-100 hover:bg-gray-200 text-orange-400'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <AnimatePresence mode="wait" initial={false}>
      {isDarkMode ? (
        <motion.div
          key="moon"
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 30, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Moon className="w-6 h-6" />
        </motion.div>
      ) : (
        <motion.div
          key="sun"
          initial={{ rotate: 30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -30, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Sun className="w-6 h-6" />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

// Service Card
const ServiceCard = ({ service, isDarkMode }: { service: Service; isDarkMode: boolean }) => (
  <Link
    href={service.href}
    className={`group relative overflow-hidden rounded-xl p-6 ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } shadow-lg transition-all duration-300 hover:shadow-xl`}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
    <div className="relative z-10">
      <div className={`mb-4 ${isDarkMode ? 'text-gray-100' : 'text-black'}`}> {/* เปลี่ยนเป็น text-black */}
        {service.icon}
      </div>
      <h3 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {service.title}
      </h3>
    </div>
  </Link>
);

// Category Section
const CategorySection = ({ category, index, isDarkMode }: { category: Category; index: number; isDarkMode: boolean }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="mb-8"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        {React.cloneElement(category.icon, { 
          className: `w-5 h-5 ${isDarkMode ? 'text-gray-100' : 'text-black'}` // เปลี่ยนสีไอคอน
        })}
      </div>
      <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {category.title}
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {category.services.map((service: Service) => (
        <ServiceCard key={service.title} service={service} isDarkMode={isDarkMode} />
      ))}
    </div>
  </motion.section>
);

// Main Component
export default function FlowLifeDashboard() {
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  
  const categories = [
    {
      title: "ความบันเทิง",
      icon: <LayoutDashboard />,
      services: [
        {
          icon: <Film className="w-6 h-6" />,
          title: "บริการสตรีมมิ่ง",
          href: "/entertainment",
          color: "from-purple-500 to-blue-500"
        },
        {
          icon: <Music className="w-6 h-6" />,
          title: "เพลงและพอดแคสต์",
          href: "/entertainment/music",
          color: "from-pink-500 to-rose-500"
        },
        {
          icon: <Gamepad2 className="w-6 h-6" />,
          title: "เกมและความบันเทิง",
          href: "/entertainment/gaming",
          color: "from-green-500 to-cyan-500"
        }
      ]
    },
    {
      title: "สุขภาพ",
      icon: <HeartPulse />,
      services: [
        {
          icon: <HeartPulse className="w-6 h-6" />,
          title: "บันทึกสุขภาพ",
          href: "/health",
          color: "from-red-500 to-orange-500"
        }
      ]
    },
    {
      title: "การเงิน",
      icon: <Wallet />,
      services: [
        {
          icon: <Wallet className="w-6 h-6" />,
          title: "จัดการการเงิน",
          href: "/finance",
          color: "from-emerald-500 to-teal-500"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className={`p-4 border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-600' : 'bg-purple-500'}`}>
              <CodeXml className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-black'}`} /> {/* เปลี่ยนสีไอคอน */}
            </div>
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              THXNXKXT
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggleButton 
              isDarkMode={isDarkMode} 
              toggle={() => setIsDarkMode(!isDarkMode)} 
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4">
        {categories.map((category, index) => (
          <CategorySection 
            key={category.title}
            category={category}
            index={index}
            isDarkMode={isDarkMode}
          />
        ))}
      </main>
    </div>
  );
}