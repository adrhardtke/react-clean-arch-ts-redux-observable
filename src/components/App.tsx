import React from 'react';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { ITodoItem, ApiStatus } from '../models';
import Paper from '@material-ui/core/Paper';
import { CircularProgress, Typography } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  wrap: {
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    width: 500
  },
  addButton: {
    marginTop: "1rem"
  },
  divider: {
    marginTop: "1rem",
    marginBottom: "1rem"
  }
});

class App extends React.Component<AppProps> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      desc: '' 
    }
  }
  
  componentDidMount() {
    // Load todos on mount
    this.props.loadTodos();
  }

  addTodo = () => {
    this.props.addTodo(this.state.desc); 
  }

  onDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      desc: e.target.value
    });
  }

  render() {
    const { classes, todos, loadingStatus } = this.props;
    
    return (
      <div className={classes.wrap}>
        <div className={classes.content}>

          <div>
            <TextField multiline placeholder="Enter todo message" rows="5" variant="outlined" onChange={this.onDescChange} value={this.state.desc} fullWidth />
            <Button className={classes.addButton} color="primary" variant="contained" onClick={this.addTodo} fullWidth>Add Todo</Button>
          </div>
          
          <Divider className={classes.divider} />

          <div>
            {loadingStatus === ApiStatus.LOADING && <CircularProgress />}

            {loadingStatus === ApiStatus.FAILED && <Typography color="error">Failed to load todos</Typography>}

            {loadingStatus === ApiStatus.LOADED && todos.map(todo => (
              <Paper key={todo.id}>
                {todo.description}
              </Paper>
            ))}
          </div>
    
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);

// Define props coming from redux store
export interface IAppStateProps {
  loadingStatus: ApiStatus;
  todos: ITodoItem[];
}

// Define props that are action creators
export interface IAppDispatchProps {
  loadTodos: () => void;
  addTodo: (todo: ITodoItem) => void;
}

type AppProps = IAppStateProps & IAppDispatchProps & WithStyles<typeof styles>