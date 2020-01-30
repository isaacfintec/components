import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import Popover from './Popover';

const ButtonVertIcon = (props) => {
  const {
    data,
    classes,
    label,
    componentRef,
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const doc = new JsPDF();

  const handleButtonIcon = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const newTab = () => {
    window.localStorage.setItem('fullWidthTable', JSON.stringify(data));
    window.open( "/test", "_blank");
  };

  const handleButtonActions = button => (e) => {
    if (button.id === 2) {
      doc.autoTable({ html: '#amortization-table-100' });
      doc.save('amortizationTable.pdf');
    }
    if (button.id === 1) {
      newTab();
    }
    if (button.id === 4) {
      /**
       * TODO: create share table action
       */
      console.log(button);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.labelButton}>
      <span>{label}</span>
      <IconButton onClick={handleButtonIcon} disableRipple={true} disableFocusRipple={true} size='small' style={{ display: 'inline-block', float: 'right' }} >
        <MoreVertIcon className={classes.vertIcon} />
      </IconButton>
      <Popover
        element={anchorEl}
        classes={classes}
        componentRef={componentRef}
        handleClose={handleClose}
        handleClickOnButton={handleButtonActions}
      />
    </div>
  );
};

export default ButtonVertIcon;
