import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import '../css/App.css';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import AddPoll  from './AddPoll'
import Polls from './Polls';
import base from '../base';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import RandomColor from 'randomcolor';
import ShortId from 'shortid';

const addIcon = <FontIcon className="fa fa-4x fa-plus-circle" />;

injectTapEventPlugin();

class Login extends Component {
    static muiName = 'FlatButton';
    render() {
        return (<FlatButton {...this.props} label="Login"/>);
    }
}

class App extends Component {

  state = {
    open: false,
    chartData: {}
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  saveNewPoll = (newPoll) => {
    const polls = {...this.state.chartData};
    const timestamp = 0 - Date.now();
    const colors = RandomColor({
      count: (newPoll.length-1),
      luminosity: 'light'
    })
    polls[timestamp] = {
      title: newPoll[0].value,
      data: new Array(newPoll.length-1).fill(0),
      labels: newPoll.splice(1).map(a => a.value),
      owner: "garrick",
      colors: colors,
      id: ShortId.generate()
    };
    this.setState({
      open: false,
      chartData: polls
    });
  };

  componentWillMount() {
    this.ref = base.syncState(`polls`
      , {
        context: this,
        state: 'chartData'
      });
      const pollRef = base.database().ref('polls');
      pollRef
        .orderByKey()
        .once('value', (snapshot) => {
            this.setState({
              chartData: snapshot.val()
            });
        });
  }

  render() {
      return (
          <MuiThemeProvider>
              <div>
                  <AppBar title="FCC Voting App" iconElementRight={< Login />}/>
                  <Polls chartData={this.state.chartData} />
                  <BottomNavigation className="footer" selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                      className="footer_item"
                      label="Add Poll"
                      icon={addIcon}
                      onTouchTap={this.handleOpen}
                    />
                  </BottomNavigation>
                  <AddPoll
                    open={this.state.open}
                    handleOpen={this.handleOpen}
                    handleClose={this.handleClose}
                    saveNewPoll={this.saveNewPoll}
                    />
              </div>
          </MuiThemeProvider>
      );
  }
}

export default App;
