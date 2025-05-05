"use client";

import React, { useState, JSX } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store/store"; 
import { FaBars, FaInfoCircle, FaStickyNote, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IHeaderProps } from "@/app/common/components/interface/headerinterface";
import { logoutUser } from "@/app/portal/login/service/authService";

interface MenuItem {
  id: number;
  label: string;
  key: keyof typeof iconMap;
  path?: string;
  active?: boolean;
}

const iconMap: Record<string, JSX.Element> = {
  about: <FaInfoCircle className="mr-2" />,
  notes: <FaStickyNote className="mr-2" />,
  accounts: <FaUser className="mr-2" />,
  login: <FaUser className="mr-2" />,
};

const Header: React.FC<IHeaderProps> = ({ title = "Keep Notes" }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const auth = useSelector((state: RootState) => state.auth);
  const isLoggedIn = !!auth.user;

  const menuItems: MenuItem[] = [
    { id: 1, label: "About", key: "about", path: "/portal/notes" },
    {
      id: 2,
      label: "Notes",
      key: "notes",
      path: "/portal/notes",
      active: true,
    },
    { id: 3, label: "Accounts", key: "accounts", path: "/portal/notes" },
    { id: 4, label: "Login", key: "login", path: "/" },
  ];

  const handleMenuClick = (id: number, path?: string) => {
    if (path) {
      router.push(path);
    } else {
      router.push("/");
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser()); 
    router.push("/");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="flex justify-between w-full p-4 fixed z-40 shadow-md bg-purple-200">
        <button className="md:hidden" onClick={toggleMobileMenu}>
          <FaBars className="text-2xl" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 md:ml-10 lg:ml-40">
          {title}
        </h1>

        <div className="hidden md:flex gap-6 items-center">
          {menuItems
            .filter((item) =>
              isLoggedIn ? item.key !== "login" : item.key === "login"
            )
            .map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id, item.path)}
                className={`flex items-center text-lg font-medium ${
                  item.active ? "text-blue-600 font-bold" : "text-gray-800"
                }`}
              >
                {iconMap[item.key]}
                {item.label}
              </button>
            ))}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="flex items-center text-lg font-medium text-red-500"
            >
              <FiLogOut className="mr-2" /> Logout
            </button>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={toggleMobileMenu}
        >
          <div
            className="bg-white w-64 h-full p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {menuItems
              .filter((item) =>
                isLoggedIn ? item.key !== "login" : item.key === "login"
              )
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id, item.path)}
                  className={`flex items-center w-full text-left py-2 text-lg font-medium ${
                    item.active ? "text-blue-600 font-bold" : "text-gray-800"
                  }`}
                >
                  {iconMap[item.key]}
                  {item.label}
                </button>
              ))}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left py-2 text-lg font-medium text-red-500"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
