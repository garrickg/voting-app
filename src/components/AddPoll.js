import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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

  addOption = () => {
    const len = this.state.content.length;
    let updatedContent = [...this.state.content];
    updatedContent.push({title: `Option ${len}`, value:""});
    this.setState({
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
      />
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
          <TextField
            key={index}
            id={`${index}`}
            className="text_input"
            hintText={item.title}
            floatingLabelText={item.title}
            onChange={this.updateContent}
          />
      )})}
      <FloatingActionButton
        className="add_option_button"
        mini={true}
        secondary={true}
        onClick={this.addOption}
      >
        <ContentAdd />
      </FloatingActionButton>
      </Dialog>
    );
  }
}

export default AddPoll;
