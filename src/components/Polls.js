import React from 'react';
import PollCard from './PollCard';

class Polls extends React.Component {
  renderPoll = (key) => {
    const poll = this.props.chartData[key];
    return(
      <PollCard key={key} chartData={poll} />
    )
  }
    render() {
        return (
          <div className="poll_container">
            {Object.keys(this.props.chartData).map(this.renderPoll)}
          </div>
        )
    }
}

export default Polls;
