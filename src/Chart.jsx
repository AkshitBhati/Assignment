import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import engagementHelper from "./EngagementHelper";
import { channels, messageCountList } from "./Data";

const EngagementMessagesOverTime = ()=>{
  const options = engagementHelper.engagementMessageOverTimeChartOptions(messageCountList, channels)
    console.log(options)
	return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default EngagementMessagesOverTime