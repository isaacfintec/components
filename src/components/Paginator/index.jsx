import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import IconButton from '@material-ui/core/IconButton';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LastPageIcon from '@material-ui/icons/LastPage';

import useStyles from './style';

const Paginator = ({
  currentPage,
  totalPages,
  step,
  onPageChange,
}) => {
  const classes = useStyles();

  const [page, setPage] = useState(currentPage);

  const pages = useMemo(() => {
    const mod = page % step;
    const initial = page - mod;
    const final = initial + step;

    let acumulator = 0;
    const values = [];

    while (acumulator < totalPages) {
      const nextAcumulator = acumulator + step;

      if (initial === acumulator && final === nextAcumulator) {
        Array(step - 1).fill(null).forEach((value, index) => {
          const element = initial + index + 1;
          if (element <= totalPages) values.push(initial + index + 1);
        });
      }

      if (values.length === 0) values.push(1);
      if (nextAcumulator <= totalPages) values.push(nextAcumulator);

      acumulator = nextAcumulator;
    }

    return values;
  }, [page, totalPages]);

  const onFirstPage = () => {
    const firstPage = 1;
    setPage(firstPage);
    onPageChange(firstPage);
  };

  const onBeforePage = () => {
    const beforePage = page > 1 ? page - 1 : 1;
    setPage(beforePage);
    onPageChange(beforePage);
  };

  const onSelectPage = selectedPage => () => {
    setPage(selectedPage);
    onPageChange(selectedPage);
  };

  const onNextPage = () => {
    const nextPage = page < totalPages ? page + 1 : totalPages;
    setPage(nextPage);
    onPageChange(nextPage);
  };

  const onLastPage = () => {
    const lastPage = totalPages;
    setPage(lastPage);
    onPageChange(lastPage);
  };

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  return (
    <div className={classes.paginator}>
      <IconButton
        className={classes.iconButton}
        onClick={onFirstPage}
      >
        <FirstPageIcon/>
      </IconButton>
      <IconButton
        className={classes.iconButton}
        onClick={onBeforePage}
      >
        <NavigateBeforeIcon/>
      </IconButton>
      {
        pages.map(_page => (
          <IconButton
            key={_page}
            className={clsx(
              classes.iconButton,
              { [classes.iconButtonActive]: page === _page },
            )}
            onClick={onSelectPage(_page)}
          >
            <span>
              { _page }
            </span>
          </IconButton>
        ))
      }
      <IconButton
        className={classes.iconButton}
        onClick={onNextPage}
      >
        <NavigateNextIcon/>
      </IconButton>
      <IconButton
        className={classes.iconButton}
        onClick={onLastPage}
      >
        <LastPageIcon/>
      </IconButton>
    </div>
  );
};

Paginator.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  step: PropTypes.number,
  onPageChange: PropTypes.func,
};

Paginator.defaultProps = {
  currentPage: 1,
  totalPages: 1,
  step: 10,
  onPageChange: () => {},
};

export default Paginator;
