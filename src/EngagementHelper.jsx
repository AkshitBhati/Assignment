import Highcharts from 'highcharts/highstock'

const engagementHelper = {
  engagementMessageOverTimeChartOptions: (messageCountList, channels) => {
    
    const generalChannelId = channels.find(channel => channel.name === "general")?.id;
    const generalChannelMessages = messageCountList.filter(
      (message) => message.channelId === generalChannelId
    );

    
    const generalChannelData = Array.from(new Set(generalChannelMessages.map((message) => {
      return {
        x: new Date(message.timeBucket).getTime(),
        y: parseInt(message.count),
      };
    })));

    const options = {
      chart: {
        type: "line",
      },
      title: {
        text: "Engagement Messages Over Time for General Channel",
      },
      xAxis: {
        type: "datetime",
        labels: {
          format: "{value:%b %e}", 
        },
      },
      yAxis: {
        title: {
          text: "Number of Messages",
        },
        min: 0,
      },
      tooltip: {
        formatter: function () {
          return (
            "<b>" +
            Highcharts.dateFormat("%b %e", this.x) +
            "</b><br>" +
            "Messages: " +
            this.y
          )
        },
      },
      series: [
        {
          name: "General Channel",
          data: generalChannelData,
        },
      ],
    }

    return options;
  },
};

export default engagementHelper;
