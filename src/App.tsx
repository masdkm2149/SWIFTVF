import * as React from 'react';
import { Box, Container }from '@mui/material';
import Slider from '@mui/material/Slider';
//import { AutoTextSize } from "auto-text-size";//
import { useState } from "react";
import "react-color-palette/css";
import useMediaQuery from '@mui/material/useMediaQuery';
import Tooltip from '@mui/material/Tooltip';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// CUSTOM APPS & COMPONENTS
import ColorApp from "./ColorApp"
import ContentEditableComponent from './ContentEditableComponent';

// ICONS
import ColorizeIcon from '@mui/icons-material/Colorize';
import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseIcon from '@mui/icons-material/Close';
// END IMPORTS

function hideMenu() {    
  document.querySelector('#color-selection-menu-item')?.classList.add('hide'),
  document.querySelector('#close-menu-button-container')?.classList.add('hide'),
  setTimeout(() => (
  document.querySelector('#hamburger')?.classList.remove('hide')  
), 100);  
setTimeout(() => (
  document.querySelector('#close-menu-button-container')?.classList.remove('undisplay')
), 0);  
};

export function showfgcolor() {    
  hideMenu();
   if (document.querySelector('#fgcolor')?.classList.contains('on')) {}
  else { 
    if (innerWidth > 500) {
      document.querySelector('#fg-picker')?.classList.remove('mini');
      document.querySelector('#fg-picker')?.classList.add('full');      
      document.querySelector('#bg-picker')?.classList.remove('mini');
      document.querySelector('#bg-picker')?.classList.add('full');
    }
    if (innerWidth < 500) {
      document.querySelector('#fg-picker')?.classList.remove('full');
      document.querySelector('#fg-picker')?.classList.add('mini');
      document.querySelector('#bg-picker')?.classList.remove('full');
      document.querySelector('#bg-picker')?.classList.add('mini');
   }
    document.querySelector('#fgcolor')?.classList.add('slideup');
    setTimeout(() => document.querySelector('#fgcolor')?.classList.remove('slideup'), 500);
  }
  document.querySelector('#draggable-area')?.classList.add('on'); document.querySelector('#fgcolor')?.classList.add('on'); document.querySelector('#fg-picker')?.classList.add('on');  
  document.querySelector('#bg-picker')?.classList.remove('on');
  document.querySelector('button.MuiButton-root:nth-child(1)')?.classList.add('inactive-color-module-shadow'); 
  document.querySelector('button.MuiButtonBase-root:nth-child(2)')?.classList.remove('inactive-color-module-shadow'); 
  document.querySelector('button.MuiButton-root:nth-child(1)')?.classList.remove('active-color-module-highlight'); 
  document.querySelector('button.MuiButtonBase-root:nth-child(2)')?.classList.add('active-color-module-highlight'); 
  (document.querySelector('.react-draggable#color-picker-app') as HTMLElement).style.setProperty('--colorpicker-box-height', document.querySelector('#fgcolor')?.clientHeight+'px');
  (document.querySelector('.react-draggable#color-picker-app') as HTMLElement).style.setProperty('--colorpicker-box-width', document.querySelector('#fgcolor')?.clientWidth+'px');
};

export default function SliderSizes() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        
        },
      }),
    [prefersDarkMode],
  );

const [squiValue, setSquiValue] = useState<number>(0); // Example with number state
const [slntValue, setSlntValue] = useState<number>(450); // Example with number state
const [swghValue, setSwghValue] = useState<number>(450); // Example with number state
const [twghValue, setTwghValue] = useState<number>(900); // Example with number state
let [text] = useState("SWIFT");

function showMenu() {    
    document.querySelector('#color-selection-menu-item')?.classList.remove('hide'),
    document.querySelector('#hamburger')?.classList.add('hide'),
    setTimeout(() => (
    document.querySelector('#close-menu-button-container')?.classList.remove('hide')
  ), 100);  
  setTimeout(() => (
    document.querySelector('#close-menu-button-container')?.classList.add('undisplay')
  ), 275);  
  };

  const handleChangeSqui = (_event: Event, newValue: number | number[]) => {
    setSquiValue(newValue as number);
  };
  
  const handleChangeSlnt = (_event: Event, newValue: number | number[]) => {
    setSlntValue(newValue as number); // Update slntValue state with a number
  };
  
  const handleChangeSwgh = (_event: Event, newValue: number | number[]) => {
    setSwghValue(newValue as number); // Update swghValue state with a number
  };
  
  const handleChangeTwgh = (_event: Event, newValue: number | number[]) => {
    setTwghValue(newValue as number); // Update twghValue state with a number
  };


  const navOptions = [
    <Box key="color-selection-menu-item" id="color-selection-menu-item" className="hide" onClick={showfgcolor} sx={{
      cursor: 'Pointer', 
      width: 'fit-content',
      height: 24,
      margin: 'auto',
      display: 'flex',
      padding: .375,
      color: '#fff',
      }} >
        <Tooltip title="Select Colors" arrow>
        <IconButton><ColorizeIcon /></IconButton></Tooltip>
        </Box>
    ];

// Inside your functional component
const matchesXs = useMediaQuery(theme.breakpoints.only('xs'));
const matchesSm = useMediaQuery(theme.breakpoints.only('sm'));
const matchesMd = useMediaQuery(theme.breakpoints.only('md'));
const matchesLg = useMediaQuery(theme.breakpoints.only('lg'));
const matchesXl = useMediaQuery(theme.breakpoints.only('xl'));

const fontSize = {
  xs: '40vw',
  sm: '38vw',
  md: '35vw',
  lg: '35vw',
  xl: '25vw',
};

const getFontSize = () => {
  if (matchesXs) return fontSize.xs;
  if (matchesSm) return fontSize.sm;
  if (matchesMd) return fontSize.md;
  if (matchesLg) return fontSize.lg;
  return fontSize.xl; // fallback for xl and larger
};

// Constants for base translation and adjustments
const baseTranslation = 1.5; // Starting translateX percentage at slntValue = 0
const maxTranslation = -3.75; // Ending translateX percentage at slntValue = 900
const squiImpactAtZeroSlnt = 0; // Impact of squiValue when slntValue = 0
const squiImpactAtMaxSlnt = 1; // Impact of squiValue when slntValue = 900

// New constants for swghValue impact
const swghImpactAtZero = 0; // Impact of swghValue when swghValue = 0
const swghImpactAtMax = -1; // Impact of swghValue when swghValue = 900

// Calculate translateX percentage based on slntValue, squiValue, and swghValue
let translateXPercentage: number;

if (slntValue === 0) {
  // Interpolate based on squiValue impact only
  translateXPercentage = baseTranslation + (squiValue / 900) * squiImpactAtZeroSlnt;
} else if (slntValue === 900) {
  // Interpolate based on squiValue and swghValue impacts
  const squiImpact = (squiValue / 900) * squiImpactAtMaxSlnt;
  const swghImpact = (swghValue / 900) * swghImpactAtMax;
  translateXPercentage = maxTranslation + squiImpact + swghImpact;
} else {
  // Interpolate translateXPercentage based on slntValue, squiValue, and swghValue
  const slntFactor = slntValue / 900;
  const squiFactor = squiValue / 900;
  const swghFactor = swghValue / 900;

  // Smooth interpolation using a combination of slntValue, squiValue, and swghValue impacts
  translateXPercentage =
    baseTranslation * (1 - slntFactor) +
    maxTranslation * slntFactor +
    (squiFactor * (squiImpactAtZeroSlnt + (squiImpactAtMaxSlnt - squiImpactAtZeroSlnt) * slntFactor)) +
    (swghFactor * (swghImpactAtZero + (swghImpactAtMax - swghImpactAtZero) * slntFactor));
}

// Adjust for special cases
if (slntValue === 900 && squiValue === 900) {
  if (swghValue === 900) {
    translateXPercentage = -4.75; // Special case when all values are at their maximum
  } else if (swghValue === 0) {
    translateXPercentage = -1; // Special case when squiValue and slntValue are maximum, but swghValue is minimum
  }
}

// "for debugging" console.log("TranslateX Percentage:", translateXPercentage);


  return (

    <ThemeProvider theme={theme}>
 
    <Container
    sx={{              
      padding: '0 clamp(32px, 10%, 160px)!important',
      lineBreak: 'anywhere',
      margin: 0,
      flex: 1,
           }}>   
<Box id="hamburger-box" sx={{ display: 'contents' }}>
    <IconButton id="hamburger" onClick={showMenu}>
      <MenuRoundedIcon sx={{ cursor: 'Pointer' }} fontSize="large" />
    </IconButton>
    {navOptions}
  </Box>
  <Box id="close-menu-button-container" className="hide">
    <Tooltip
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -6],
              },
            },
          ],
        },
      }}
      title="Exit"
      arrow
    >
      <IconButton id="close-menu-button" onClick={hideMenu}>
        <CloseIcon sx={{ cursor: 'Pointer' }} fontSize="large" />
      </IconButton>
    </Tooltip>
  </Box>
<div
  style={{
    fontFamily: 'SWIFT',
    textAlign: 'center',
    display: 'flex',
    fontSize: getFontSize(),
    lineHeight: 0.6,
    fontVariationSettings:
      `'squi' ${squiValue}, ` +
      `'swgh' ${swghValue}, ` +
      `'twgh' ${twghValue}, ` +
      `'slnt' ${slntValue}`,
  
        // Centering adjustment for italic or slanted text
        transform: `translateX(${translateXPercentage}%)`,
  }}
>
  <ContentEditableComponent id="Text" spellCheck={false} text={text} />
</div>

<Box sx={{
  flex: 1,
  margin: 'auto',
  paddingRight: '10px', // Offset width for slider circle handle
  maxWidth: '50vw',
   }}>



    <Box 
      sx={{
        flex: 1,
        display: 'flex',
       }}>
      <p id="slidernamepadding">Squash:</p>
      <Slider 
        defaultValue={0}   
        value={squiValue}
        onChange={handleChangeSqui} 
        min={0}
        max={900} 
        aria-label="Squash" 
        valueLabelDisplay="auto"
        sx={{
          margin: 'auto',
        }} 
      />
   </Box>      



<Box sx={{
      flex: 1,
      display: 'flex',
   }}>
   <p id="slidernamepadding">Slant:</p>
       <Slider

  defaultValue={450}   
  value={slntValue}
   onChange={handleChangeSlnt} 
  min={0}
  max={900} 
  aria-label="Default" 
  valueLabelDisplay="auto" sx={{
    margin: 'auto',
  }} />
</Box>
<Box sx={{
      flex: 1,
      display: 'flex',
   }}>
   <p id="slidernamepadding">X-Weight:</p>
       <Slider
       
  defaultValue={450}   
  value={swghValue}
   onChange={handleChangeSwgh} 
  min={0}
  max={900} 
  aria-label="Default" 
  valueLabelDisplay="auto" sx={{
    margin: 'auto',
  }} />
</Box>

<Box sx={{
      flex: 1,
      display: 'flex',
   }}>
   <p id="slidernamepadding">Y-Weight:</p>
       <Slider
       
  defaultValue={900}   
  value={twghValue}
   onChange={handleChangeTwgh} 
  min={0}
  max={900} 
  aria-label="Default" 
  valueLabelDisplay="auto" sx={{
    margin: 'auto',
  }} />
</Box>

</Box>     

<ColorApp />
</Container> 
</ThemeProvider>
  );  
}
