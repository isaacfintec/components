import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const Thead = (props) => {
  const {
    columns,
    classes,
  } = props;

  return (
    <TableHead className={clsx(classes.thead)}>
      <TableRow>
        {columns.map(column => {
          const {
            id,
            align,
            minWidth,
            maxWidth,
            label,
          } = column;
          return (
            <TableCell
              key={id}
              align={align}
              style={
                { minWidth: minWidth || '100px', maxWidth: maxWidth || '150px' }
              }>
                <Typography variant={'body2'} >
                  {label}
                </Typography>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default Thead;
