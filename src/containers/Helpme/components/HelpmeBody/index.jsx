import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import './HelpmeBody.css';

const HelpmeBody = ({
  sections,
  items,
  addMemory,
  currentSection,
  onChangeSection,
}) => {
  const getType = (item) => {
    switch (items.type) {
    case 'text':
      return (
        <>
          <Typography className="helpme-body__title-item" component="h1">{ items.title }</Typography>
          <Typography className="helpme-body__title-subt-title" component="h2">{ item.value }</Typography>
        </>
      );
    case 'url':
      return (
        <Link
          className="helpme-body__title-item text-center"
          href={items.value}
        >
          { items.title }
        </Link>
      );
    case 'ticket':
      return (
        <>
          <Typography className="helpme-body__title-item" component="h1">{ items.title }</Typography>
          <Link
            className="helpme-body__title-item text-center"
            href="#"
          >
            { items.value }
          </Link>
        </>
      );
    default:
      return null;
    }
  };

  return (
    <Paper className="helpme-body__container no-radius">
      <Grid container>
        <Grid item md={4}>
          <Stepper
            activeStep={currentSection}
            nonLinear
            orientation="vertical"
          >
            {
              sections.map((_section, index) => {
                const label = _section.label || _section.title;
                return (
                  <Step
                    key={`${label}-${index}`}
                    className="helpme-body__step"
                  >
                    <StepButton
                      onClick={onChangeSection(index)}
                    >
                      {label}
                    </StepButton>
                  </Step>
                );
              })
            }
          </Stepper>
        </Grid>
        <Grid item md={8}>
          {
            'label' in items && (
              <>
                <Typography className="helpme-body__title" component="h1">
                  { items.label }
                </Typography>
                <Grid container alignContent="center" justify="center" spacing={10}>
                  {
                    items.sections.map((itemSection, itemSectionIndex) => (
                      <Grid
                        key={`${itemSection.label}-${itemSectionIndex}`}
                        item
                        md={4}
                      >
                        <Typography className="helpme-body__sub-title" component="h2">
                          { itemSection.label }
                        </Typography>
                        <div>
                          {
                            itemSection.sections.map((subItemSection, subItemSectionIndex) => {
                              const subItemSectionLabel = subItemSection.label || subItemSection.title;
                              const keySubItem = `${subItemSectionLabel}-${subItemSectionIndex}`;
                              return (
                                <div
                                  key={keySubItem}
                                  className="helpme-body__option-title"
                                  onClick={() => {
                                    addMemory([itemSectionIndex, subItemSectionIndex]);
                                  }}
                                >
                                  { subItemSectionLabel }
                                </div>
                              );
                            })
                          }
                        </div>
                      </Grid>
                    ))
                  }
                </Grid>
              </>
            )
          }
          {
            'title' in items && getType(items)
          }
        </Grid>
      </Grid>
    </Paper>
  );
};

HelpmeBody.propTypes = {
  sections: PropTypes.array,
  items: PropTypes.object,
  addMemory: PropTypes.func.isRequired,
  currentSection: PropTypes.number.isRequired,
  onChangeSection: PropTypes.func.isRequired,
};

HelpmeBody.defaultProps = {
  sections: [],
  items: {},
};

export default HelpmeBody;
