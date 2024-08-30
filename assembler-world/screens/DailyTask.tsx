import Ratio from "react-bootstrap/Ratio";
import { StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import Layout from "./Layout";

const DailyTask: React.FC = () => {
  const stylesDaily = StyleSheet.create({
    video: {
      width: "auto",
      height: "auto",
      padding: 20,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: useThemeColor({}, "background")
    },
    h1: {
      textAlign: "center",
      color: useThemeColor({}, "text")
    },
  });
  return (
    // <Layout>
      <div style={stylesDaily.container}>
        <div style={stylesDaily.video}>
          <Ratio aspectRatio="16x9">
            <iframe
              id="dailyVideo"
              src="https://www.youtube.com/embed/9wvzEOq1imo?enablejsapi=1&origin=http://localhost:8081/"
            ></iframe>
          </Ratio>
        </div>
        <h1 style={stylesDaily.h1}>Problema del dia</h1>
      </div>
    // </Layout>
  );
}

export default DailyTask;