import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';

import Version from '../../../../../package.json';
import './Banner.css';
import theme from '../../theme';

const useStyles = makeStyles({
  h1: {
    position: 'absolute',
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    opacity: 0.85,
    fontSize: '12vw',
    top: theme.spacing(25),
    left: theme.spacing(8),
  },
});

function ScrollDown(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div onClick={handleClick} role="presentation">
      {children}
    </div>
  );
}

ScrollDown.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Banner() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Toolbar id="scroll-down-anchor" />
      <div className="heroBanner">
        <div className="bannerImg"></div>
        <ThemeProvider>
          <Typography variant="h1" className={classes.h1}>
            {'Telescope'}
          </Typography>
        </ThemeProvider>
        <div className="version">v {Version.version}</div>
        <div className="icon">
          <ScrollDown>
            <Fab color="primary" size="medium" aria-label="scroll-down">
              <KeyboardArrowDownIcon />
            </Fab>
          </ScrollDown>
        </div>
      </div>
    </React.Fragment>
  );
}
