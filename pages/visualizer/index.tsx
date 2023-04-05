import AlgorithmSelector from "@/components/AlgorithmSelector";
import Layout from "@/components/Layout";
import {  useEffect, useState } from "react";

const Visualizer = () => {
  const [algorithm, setAlgorithm] = useState<Algorithm | null>(null);

  useEffect(() => {
    console.log(algorithm);
  }, [algorithm]);

  return (
    <Layout>
      <div className="container">
        <AlgorithmSelector onAlgorithmChange={setAlgorithm} />
      </div>
    </Layout>
  );
};

export default Visualizer;
