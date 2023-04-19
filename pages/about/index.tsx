import AboutAlgorithms from "@/components/AboutAlgorithms";
import AboutCells from "@/components/AboutCells";
import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout title="About">
      <AboutCells/>
      <AboutAlgorithms/>
    </Layout>
  );
};

export default About;
