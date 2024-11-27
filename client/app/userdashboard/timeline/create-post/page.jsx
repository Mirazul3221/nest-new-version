import React from "react";
import SuperHeader from "../../components/SuperHeader";
import ProtectRoute from "@/app/global/ProtectRoute";
import Footer from "@/app/components/Footer";
import AddQuestion from "./components/AddQuestion";

const page = () => {
  return (
    <div>
      <ProtectRoute>
        <div className="">
          <div className="header bg-white px-4 py-3 md:px-10">
            <SuperHeader />
          </div>
          <div className="md:px-10 border-t py-4 px-4 pt-2 md:pt-4 min-h-[80vh] bg-gray-50">
            <AddQuestion/>
          </div>
          <Footer />
        </div>
      </ProtectRoute>
    </div>
  );
};

export default page;
