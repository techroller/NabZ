import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const UrlInput = (props) => {
  const {
    onUrlChanged,
    onSubmitSite
  } = props;

  const useStyles = makeStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginTop: 8,
      marginLeft: 8,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      width: 1,
      height: 28,
      margin: 4,
    },
  });

  const classes = useStyles();

  return (
    <Paper>
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <IconButton className={classes.iconButton} aria-label="Menu">
            <MenuIcon />
          </IconButton>
        </Grid>
        <Grid item xs={10}>
          <InputBase className={classes.input} fullWidth placeholder="Nab URL" onChange={onUrlChanged} />
        </Grid>
        <Grid item xs={1}>
          <IconButton className={classes.iconButton} aria-label="Search" onClick={onSubmitSite}>
            <SearchIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UrlInput
