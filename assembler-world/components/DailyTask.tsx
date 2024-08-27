import Ratio from "react-bootstrap/Ratio";

function DailyTask() {
  return (
    <div style={{ width: 660, height: "auto" }}>
      <Ratio aspectRatio="16x9">
        <iframe
          id="dailyVideo"
          width="640"
          height="360"
          src="https://www.youtube.com/embed/9wvzEOq1imo?enablejsapi=1&origin=http://localhost:8081/"
        ></iframe>
      </Ratio>
    </div>
  );
}

export default DailyTask;
