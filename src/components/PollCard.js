import React from 'react';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import '../css/PollCard.css';
import Chart from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.defaults.global.responsive = true;
Chart.defaults.global.legend.display = false;
Chart.defaults.global.tooltips.enabled = false;
Chart.defaults.global.hoverc = false;

class PollCard extends React.Component {
  render() {
    const data = this.props.chartData.data;
    const pollData = data.reduce((a, b) => a + b, 0) > 0 ? data : new Array(data.length).fill(1);
    return(
      <Card className="poll_card">
        <Pie data={{
          labels: this.props.chartData.labels,
          datasets: [
              {
                  data: pollData,
                  backgroundColor: this.props.chartData.colors
              }]
          }} />
        <CardTitle className="poll_title" title={this.props.chartData.title} />
        <CardActions>
          <FlatButton
            className="poll_link"
            label="View Poll"
            href={`/polls/${this.props.chartData.id}`}/>
        </CardActions>
      </Card>
    )
  }
}

export default PollCard;
