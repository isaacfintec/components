import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  makeStyles, ListItem, ListItemText, Divider,
} from '@material-ui/core';
import { FixedSizeList } from 'react-window';

const useStyles = makeStyles({
  container: {
    padding: 5,
  },
  title: {
    fontSize: 14,
  },
  inline: {
    display: 'inline',
    fontSize: 11,
  },
  item: {
    padding: 8,
  },
});

const HistoryCard = (props) => {
  const classes = useStyles();
  const { ticket } = props;
  const { history } = ticket;
  const listSize = history.length;

  const renderRow = (props) => {
    const { index } = props;
    return (
      <ListItem
        key={history[index]._id}
        alignItems="flex-start"
        className={classes.item}
      >
        <Fragment>
          <ListItemText
            primary={(
              <Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textSecondary"
                >
              Acción por:
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {` ${history[index].owner.fullName}`}
                </Typography>
              </Fragment>
          )}
            secondary={(
              <Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textSecondary"
                >
                  {history[index].description}
                </Typography>

              </Fragment>
            )}
          />
          <Divider variant="fullWidth" />
        </Fragment>

      </ListItem>
    );
  };

  return (
    <Paper className={classes.container}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
                Historial
      </Typography>
      <Divider variant="fullWidth" />
      <FixedSizeList height={200} width="100%" itemSize={46} itemCount={listSize}>
        {renderRow}
      </FixedSizeList>
    </Paper>
  );
};

HistoryCard.propTypes = {
  ticket: PropTypes.object.isRequired,
};

export default HistoryCard;
