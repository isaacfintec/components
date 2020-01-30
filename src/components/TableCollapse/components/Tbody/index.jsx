/* eslint-disable react/no-array-index-key */

import React, { useMemo, useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import useStyles from './style';

const Table = ({
  headers,
  items,
  onClickRow,
  editedRow,
}) => {
  const classes = useStyles();
  const [openings, setOpenings] = useState({});
  const [localeditedRow, setEditedRow] = useState(-1);

  /**
   *
   * @param {String} type
   * @returns {Boolean}
   */
  const isChildren = type => type === 'children';

  const childrenKey = useMemo(() => {
    const header = headers.find(element => isChildren(element.type)) || {};
    return header.key;
  }, [headers]);

  /**
   *
   * @param {String} key
   * @returns {Boolean}
   */
  const isOpen = key => Boolean(openings[key]);

  /**
   *
   * @param {String} id
   * @returns {Function}
   */
  const toggleOpen = (id) => {
    const newOpenings = { ...openings, [id]: !isOpen(id) };
    setOpenings(newOpenings);
  };

  /**
   *
   * @param {Any} item
   * @param {Number} index
   */
  const handleOnClickRow = (item, index) => () => {
    onClickRow(item, index);
  };

  /**
   *
   * @param {Any} item
   * @param {Number} index
   */
  const handleOnClickArrow = id => (event) => {
    event.stopPropagation();
    event.preventDefault();
    toggleOpen(id);
  };

  /**
   *
   * @param {String} type
   * @param {String} id
   * @returns {Component}
   */
  const renderCollapseButton = (type, id) => (
    childrenKey && type === 'options' && (
      <IconButton onClick={handleOnClickArrow(id)}>
        { isOpen(id) ? <ArrowDropUpIcon /> : <ArrowDropDownIcon /> }
      </IconButton>
    )
  );

  /**
   *
   * @param {Array} item
   * @param {Number} index
   * @returns {Component}
   */
  const renderColumns = (item, index, id) => (
    headers.map(({ key, type = '' }) => (
      !isChildren(type) && (
        <td
          key={`td-${key}-${item[key]}-${index}`}
          className={classes.td}
        >
          <Typography variant="body1" component="span">
            { renderCollapseButton(type, id) }
            { item[key] }
          </Typography>
        </td>
      )
    ))
  );

  /**
   *
   * @param {Array} item
   * @param {Number} index
   * @returns {Component}
   */
  const renderChildren = (item, id) => {
    const children = item[childrenKey];
    const colSpan = headers.length;
    return children && (
      <tr>
        <td colSpan={colSpan}>
          <Collapse
            in={isOpen(id)}
            unmountOnExit
            className={clsx(
              { [classes.collapseActive]: isOpen(id) },
            )}
          >
            <div className={classes.collapse}>
              { children }
            </div>
          </Collapse>
        </td>
      </tr>
    );
  };

  /**
   * @param {Number} row
   */
  const selectEditedRow = (row) => {
    toggleOpen(`tr-${row}`);
    setEditedRow(row);
  };

  useEffect(() => {
    selectEditedRow(editedRow);
  }, [editedRow]);

  return (
    <tbody>
      {
        items.map((item, index) => {
          const trId = `tr-${index}`;
          return (
            <Fragment key={trId}>
              <tr
                className={clsx(
                  classes.tr,
                  { [classes.trActive]: isOpen(trId) },
                  { [classes.trEdited]: index === localeditedRow },
                )}
                onClick={handleOnClickRow(item, index)}
              >
                { renderColumns(item, index, trId) }
              </tr>
              { renderChildren(item, trId) }
            </Fragment>
          );
        })
      }
    </tbody>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  items: PropTypes.array,
  onClickRow: PropTypes.func,
  editedRow: PropTypes.number,
};

Table.defaultProps = {
  headers: [],
  items: [],
  onClickRow: () => {},
  editedRow: -1,
};

export default Table;
