import React, { useState } from 'react';
import { FaUserGraduate, FaUsers, FaChalkboardTeacher, FaAngleRight, FaAngleDown } from 'react-icons/fa';
import { BiMenuAltLeft } from 'react-icons/bi';
import { IoMdSettings, IoMdSpeedometer } from 'react-icons/io';
import { MdOutlineAccountBalanceWallet, MdOutlineMenuBook } from 'react-icons/md';

import schoolLogo from './beaconhouse-school-system-logo-B8DD760BF0-seeklogo.com.png';
import 'tailwindcss/tailwind.css';
import DashboardComponent from '../Dashbord./dashbord';
import StudentsTable from '../Students/AllStudents';
import StudentForm from '../Students/AddStudents';
import PromotionForm from '../Students/Promotion';
import ParentsData from '../Parents/parents';
import TeacherData from '../Teachers/AllTeacher';
import TeacherForm from '../Teachers/Add Teacher';
import FeesGroup from '../Account/FeesGroup';
import StudentsFee from '../Account/StudentsFees';
import Expenses from '../Account/Expense';
import AddExpenses from '../Account/AddExpense';
import SubjectComponent from "../subjects/subjects"
import AccountSettings from "../Setting/AccountSetting"



const Sidebar = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);

  const components = [
    <DashboardComponent />,
    <ParentsData />,
    <TeacherData />,
    <TeacherForm />,
    <FeesGroup />,
    <StudentsFee />,
    <Expenses />,
    <AddExpenses />,
    <SubjectComponent />,
    <AccountSettings />,
    <StudentsTable />,
    <StudentForm />,
    <PromotionForm />
  ];

  const handleMenuClick = (index) => {
    setActive(index);
  };

  return (
    <div className="flex">
      <div className="fixed bg-blue-900 text-white w-64 min-h-screen overflow-y-auto">
        <div className="bg-red-600 flex py-4">
          <img src={schoolLogo} alt="Logo" className="h-10 w-10 ml-6" />
          <div className='flex justify-end px-6 flex-1'>
            <BiMenuAltLeft size={"35"} className="cursor-pointer hover:text-orange-400" />
          </div>
        </div>

        {[
          { Icon: IoMdSpeedometer, name: 'Dashboard', componentIndex: 0 },
          { Icon: FaUserGraduate, name: 'Students', subItems: [
              { name: 'All Students', componentIndex: 10 },
              { name: 'Add Students', componentIndex: 11 },
              { name: 'Students Promotion', componentIndex: 12 }
            ]
          },
          { Icon: FaUsers, name: 'Parents', componentIndex: 1 },
          { Icon: FaChalkboardTeacher, name: 'Teachers',  subItems: [
              { name: 'All Teachers', componentIndex: 2 },
              { name: 'Add Teachers', componentIndex: 3 }
            ]
          },
          { Icon: MdOutlineAccountBalanceWallet, name: 'Account', subItems: [
              { name: 'Fees Group', componentIndex: 4 },
              { name: 'Students Fee', componentIndex: 5 },
              { name: 'Expenses', componentIndex: 6 },
              { name: 'Add Expenses', componentIndex: 7 }
            ]
          },
          { Icon: MdOutlineMenuBook, name: 'Subject', componentIndex: 8 },
          { Icon: IoMdSettings, name: 'Settings', componentIndex: 9 }
        ].map((item, index) => (
          <div key={index} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)}>
            <div
              className={`mt-2 p-3 cursor-pointer ${active === item.componentIndex ? 'bg-blue-800' : 'bg-blue-700'} hover:bg-blue-800`}
              onClick={() => !item.subItems && handleMenuClick(item.componentIndex)}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <item.Icon className='text-3xl' />
                  <h4 className='px-2 text-lg'>{item.name}</h4>
                </div>
                {item.subItems && (hovered === index ? <FaAngleDown /> : <FaAngleRight />)}
              </div>
            </div>
            {item.subItems && hovered === index && (
              <div className='ml-1'>
                {item.subItems.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    className={`mt-2 p-3 cursor-pointer ${active === subItem.componentIndex ? 'bg-blue-800' : 'bg-blue-600'} hover:bg-blue-800`}
                    onClick={() => handleMenuClick(subItem.componentIndex)}
                  >
                    <h4 className='text-lg'>{subItem.name}</h4>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex-1 p-4 ml-64 overflow-y-auto">
        {components[active !== null ? active : 0]}
      </div>
    </div>
  );
};

export default Sidebar;
