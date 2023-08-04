import Highcharts from 'highcharts/highstock'

const engagementHelper = {
  engagementMessageOverTimeChartOptions: (messageCountList, channels) => {
    // Filter channels that have messages for more than one date
    const channelsWithMultipleDates = channels.filter((channel) => {
      const messageCountForChannel = messageCountList.filter(
        (message) => message.channelId === channel.value
      )
      return messageCountForChannel.length > 1
    })

    // Create data arrays for each channel
    const seriesData = channelsWithMultipleDates.map((channel) => {
      const messageCountForChannel = messageCountList.filter(
        (message) => message.channelId === channel.value
      )

      // Format data for Highcharts series
      const data = messageCountForChannel.map((message) => ({
        x: new Date(message.timeBucket).getTime(),
        y: parseInt(message.count),
      }))
      

      return {
        name: channel.name,
        data,
        
      }
    })

    const options = {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Engagement Messages Over Time for Channel',
      },
      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value:%e %b}', 
        },
      },
      yAxis: {
        title: {
          text: 'Number of Messages',
        },
        min: 0,
      },
      tooltip: {
        formatter: function () {
          return (
            '<b>' +
            Highcharts.dateFormat('%e %b', this.x) + 
            '</b><br>' +
            'Messages: ' +
            this.y
          )
        },
      },
      series: seriesData,
     
    }

    return options;
  },
}

export default engagementHelper;
