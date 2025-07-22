import React from "react";
import "./Home.css";
import Layout from "../../components/layout/Layout";
import Featured from "../../components/featured/Featured";

const Home = () => {
  return (
    <div>
      <Layout>
        <div className="w-full homeContainer">
          <Featured />
          <h1 className="text-2xl font-semibold mb-5">
            Bowse by property type
          </h1>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
