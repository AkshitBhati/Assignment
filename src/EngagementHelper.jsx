const engagementHelper = {
    engagementMessageOverTimeChartOptions: (messageCountList, channels) => {
      const uniqueDatesByChannel = {};
  
      // Calculate the number of unique dates for each channel
      for (const message of messageCountList) {
        const channelId = message.channelId;
        const date = new Date(message.timeBucket).toLocaleDateString('en-IN', {
          month: 'short',
          day: 'numeric',
        });
  
        if (!uniqueDatesByChannel[channelId]) {
          uniqueDatesByChannel[channelId] = new Set();
        }
  
        uniqueDatesByChannel[channelId].add(date);
      }
  
      // Filter channels with messages on more than one date
      const channelsWithMultipleDates = channels.filter((channel) => {
        const channelId = channel.id;
        const uniqueDates = uniqueDatesByChannel[channelId];
        return uniqueDates && uniqueDates.size > 1;
      });
  
      const seriesData = channelsWithMultipleDates.map((channel) => {
        const channelId = channel.id;
        const uniqueDates = new Set(messageCountList
          .filter((message) => message.channelId === channelId)
          .map((message) => new Date(message.timeBucket).toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
          }))
        );
  
        return {
          name: channel.name,
          data: Array.from(uniqueDates).map((date) => ({
            x: new Date(date).getTime(),
            y: uniqueDates.size,
          })),
        };
      });
  
      const options = {
        chart: {
          type: 'line',
        },
        title: {
          text: 'Engagement Messages Over Time',
        },
        xAxis: {
          type: 'datetime',
          labels: {
            format: '{value:%b %e}', // Short month and day (e.g., Jan 1)
          },
        },
        yAxis: {
          title: {
            text: 'Number of Unique Dates',
          },
          min: 0,
          allowDecimals: false,
        },
        series: seriesData,
      };
  
      return options;
    },
  };
  
  export default engagementHelper;
  