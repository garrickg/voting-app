import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'

class AddPoll extends React.Component {

  getState = () => {
    return {
      filled: false,
      content: [
        {title: "Poll title", value:""},
        {title: "Option 1", value:""},
        {title: "Option 2", value:""},
      ]
    }
  }

  state = this.getState();

  updateContent = (e) => {
    const updatedContent = this.state.content;
    updatedContent[e.target.id].value = e.target.value;
    const filled = updatedContent[0].value && updatedContent[1].value && updatedContent[2].value ? true : false;
    this.setState({
      filled: filled,
      content: updatedContent
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        disabled={!this.state.filled}
        onTouchTap={() => {
          this.props.saveNewPoll(this.state.content);
          this.setState(this.getState())
        }}
      />,
    ];

    return (
      <Dialog
        title="Create a new poll"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.handleClose}
      >
      {this.state.content.map((item, index) => {
        return (
          <div key={index}>
          <TextField
            id={`${index}`}
            hintText={item.title}
            floatingLabelText={item.title}
            onChange={this.updateContent}
          />
          <br />
          </div>
      )})}
      </Dialog>
    );
  }
}

export default AddPoll;
