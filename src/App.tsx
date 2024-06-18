import * as React from 'react';
import { Box, Container, formLabelClasses }from '@mui/material';
import Slider from '@mui/material/Slider';
import SWIFT from './assets/fonts/SWIFTVF.ttf';
import { AutoTextSize } from "auto-text-size";
import { useState } from "react";
import { ColorPicker, Saturation, Hue, Alpha, useColor } from "react-color-palette";
import "react-color-palette/css";
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ColorizeIcon from '@mui/icons-material/Colorize';
import Tooltip from '@mui/material/Tooltip';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import CloseIcon from '@mui/icons-material/Close';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
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


  
const loadmenu = event => {    
  if (document.querySelector('#hamburger-box')) {
  document.querySelector('#hamburger-box').classList.remove('hide') 
}
};
  
  const [squi, squiValue] = React.useState(0);
  const [slnt, slntValue] = React.useState(450);
  const [swgh, swghValue] = React.useState(450);
  const [twgh, twghValue] = React.useState(900);
  const [text, setText] = useState("SWIFT");
  var breakpointinputs = useState(["false"]);

  const [fgcolor, setfgColor] = useColor(theme.palette.text.primary);
  const compfgColor = (fgcolor.hex);
  const [bgcolor, setbgColor] = useColor(theme.palette.background.paper);
  const compbgColor = (bgcolor.hex);

  {document.body.style = 'background-color:'+compbgColor}

  {
    if (document.querySelector('.MuiSlider-root')) { 
    for (let i = 0; i < document.querySelectorAll('.MuiSlider-root').length; i++) 
      { 
    document.querySelectorAll('.MuiSlider-root')[i].style = 'color:'+compfgColor}
  }
}

const showfgcolor = event => {    
  hideMenu();
  if (document.querySelector('#fgcolor').classList.contains('on')) {}
  else { 
    if (innerWidth > 500) {
      document.querySelector('#fg-picker').classList.remove('mini');
      document.querySelector('#fg-picker').classList.add('full');      
      document.querySelector('#bg-picker').classList.remove('mini');
      document.querySelector('#bg-picker').classList.add('full');
    }
    if (innerWidth < 500) {
      document.querySelector('#fg-picker').classList.remove('full');
      document.querySelector('#fg-picker').classList.add('mini');
      document.querySelector('#bg-picker').classList.remove('full');
      document.querySelector('#bg-picker').classList.add('mini');
    }
    document.querySelector('#fgcolor').classList.add('slideup');
    setTimeout(() => document.querySelector('#fgcolor').classList.remove('slideup'), 500);
  }
  document.querySelector('#fgcolor').classList.add('on'); document.querySelector('#fg-picker').classList.add('on');  
  document.querySelector('#bg-picker').classList.remove('on');
  document.querySelector('button.MuiButton-root:nth-child(1)').classList.add('inactive-color-module-shadow'); 
  document.querySelector('button.MuiButtonBase-root:nth-child(2)').classList.remove('inactive-color-module-shadow'); 
  document.querySelector('button.MuiButton-root:nth-child(1)').classList.remove('active-color-module-highlight'); 
  document.querySelector('button.MuiButtonBase-root:nth-child(2)').classList.add('active-color-module-highlight'); 
};

const showbgcolor = event => {
  document.querySelector('#bg-picker').classList.add('on'); 
  document.querySelector('#fg-picker').classList.remove('on'); 
  document.querySelector('button.MuiButton-root:nth-child(2)').classList.add('inactive-color-module-shadow'); 
  document.querySelector('button.MuiButton-root:nth-child(2)').classList.remove('active-color-module-highlight'); 
  document.querySelector('button.MuiButton-root:nth-child(1)').classList.remove('inactive-color-module-shadow'); 
  document.querySelector('button.MuiButton-root:nth-child(1)').classList.add('active-color-module-highlight'); 
};

const closeColorModule = event => {  
  document.querySelector('#fgcolor').classList.add('slidedown');
setTimeout(() => (
  document.querySelector('#fgcolor').classList.remove('slidedown'),  
  document.querySelector('#fgcolor').classList.remove('on'), 
  document.querySelector('#fg-picker').classList.remove('on'), 
  document.querySelector('#bg-picker').classList.remove('on'),
  document.querySelector('#fg-picker').classList.remove('mini'),
  document.querySelector('#fg-picker').classList.remove('full'),
  document.querySelector('#bg-picker').classList.remove('mini'),
  document.querySelector('#bg-picker').classList.remove('full')
), 500);

};
const scaleColorModule = event => {
  document.querySelector('#fg-picker > div:nth-child(2) > div:nth-child(2) > section:nth-child(2)').classList.add('hide');
  document.querySelector('#fg-picker').classList.toggle('mini'),
  document.querySelector('#fg-picker').classList.toggle('full'),
  document.querySelector('#bg-picker').classList.toggle('mini'),
  document.querySelector('#bg-picker').classList.toggle('full')
  setTimeout(() => (
    document.querySelector('#fg-picker > div:nth-child(2) > div:nth-child(2) > section:nth-child(2)').classList.remove('hide')
  ), 100);
};



const hideMenu = event => {    
  document.querySelector('#color-selection-menu-item').classList.add('hide'),
  document.querySelector('#close-menu-button-container').classList.add('hide'),
  setTimeout(() => (
  document.querySelector('#hamburger').classList.remove('hide')  
), 100);  
setTimeout(() => (
  document.querySelector('#close-menu-button-container').classList.remove('undisplay')
), 0);  
};

const showMenu = event => {    
    document.querySelector('#color-selection-menu-item').classList.remove('hide'),
    document.querySelector('#hamburger').classList.add('hide'),
    setTimeout(() => (
    document.querySelector('#close-menu-button-container').classList.remove('hide')
  ), 100);  
  setTimeout(() => (
    document.querySelector('#close-menu-button-container').classList.add('undisplay')
  ), 275);  
  };

  const handleChange = (event, newValue) => {
    squiValue(newValue);    
  };
  const handleChange1 = (event, newValue) => {
    slntValue(newValue);    
  };
  const handleChange2 = (event, newValue) => {
    swghValue(newValue);    
  };
  const handleChange3 = (event, newValue) => {
    twghValue(newValue);    
  };
  
const resizeColorModuleButton = [
  <Box onClick={scaleColorModule} id="resize-color-button"><Tooltip title="Shrink / Expand" arrow><IconButton><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30" x="0px" y="0px"><path d="m19,4.25h-6c-.414,0-.75.336-.75.75s.336.75.75.75h4.189l-11.439,11.439v-4.189c0-.414-.336-.75-.75-.75s-.75.336-.75.75v6c0,.414.336.75.75.75h6c.414,0,.75-.336.75-.75s-.336-.75-.75-.75h-4.189l11.439-11.439v4.189c0,.414.336.75.75.75s.75-.336.75-.75v-6c0-.414-.336-.75-.75-.75Z"/></svg></IconButton></Tooltip></Box>,
]

  const buttons = [
    <Button onClick={showbgcolor} key="one"><ImageOutlinedIcon/>Background</Button>,
    <Button onClick={showfgcolor} key="two"><FormatColorTextIcon/>Text</Button>,
  ];

  const navOptions = [
    <Box id="color-selection-menu-item" class="hide" onClick={showfgcolor} sx={{
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
  
  return (
    <ThemeProvider theme={theme}>
    <Container
    sx={{              
      padding: 0,
      flex: 1,
           }}>   
            <Box  sx={{
              fontFamily: 'SWIFT',
              textAlign: 'center',
              color: compfgColor,
              fontSize: {xs: '40vw', sm: '38vw', md: '35vw', lg: '35vw', xl:'25vw',},
              lineHeight: .6,
              fontVariationSettings: "'squi'"+squi+"," + "'swgh'"+swgh+"," +  "'twgh'"+twgh+"," +  "'slnt'"+slnt,
            }} >  

            
           <Box id="hamburger-box" sx={{display: 'contents'}}>    
           
           <IconButton id="hamburger" onClick={showMenu} ><MenuRoundedIcon  sx={{ cursor: 'Pointer' }}  fontSize="large"/>
           </IconButton>   
           {navOptions} 
               
                </Box>  
                <Box id="close-menu-button-container" class="hide">
                <Tooltip slotProps={{
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
      }} title="Exit" arrow><IconButton id="close-menu-button" onClick={hideMenu}><CloseIcon  sx={{ cursor: 'Pointer' }}  fontSize="large"/>
    </IconButton></Tooltip></Box>
            <span id="Text" spellCheck="false" contentEditable="true"> {text} </span>      
      </Box>

<Box sx={{
  flex: 1,
  padding: {xs: '0 20%', sm: '0 10%', md: '0 15%'},
   }}>



    <Box sx={{
      flex: 1,
      display: 'flex',
       }}>
          <p id="slidernamepadding">
              Squash:</p>
           <Slider 
           color={fgcolor.hex}
      defaultValue={0}   
      squi={squi}
       onChange={handleChange} 
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
   <p id="slidernamepadding">Slant:</p>
       <Slider

  defaultValue={450}   
  slnt={slnt}
   onChange={handleChange1} 
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
  swgh={swgh}
   onChange={handleChange2} 
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
  twgh={twgh}
   onChange={handleChange3} 
  min={0}
  max={900} 
  aria-label="Default" 
  valueLabelDisplay="auto" sx={{
    margin: 'auto',
  }} />
</Box>

</Box>     
<Box>  
<Box id="fgcolor">  <Box id="color-module-container-border"> <Box id="color-module-container"  sx={{color: theme.palette.background.default }}>
  
<p id="color-picker-header">Color Picker</p>
   <Box>       <ButtonGroup sx={{flexDirection:'row'}} 
        disableElevation
        orientation="vertical"
        aria-label="Vertical button group"
        variant="text"
      >
        {buttons}
      </ButtonGroup>

       </Box><Box id="fg-picker">
       <Saturation  height={160} color={fgcolor} onChange={setfgColor}   />
       <ColorPicker color={fgcolor} onChange={setfgColor}  />  </Box>
       <Box id="bg-picker">
       <Saturation  height={160} color={bgcolor} onChange={setbgColor}   />
       <ColorPicker color={bgcolor} onChange={setbgColor}  />  </Box>
       
 {resizeColorModuleButton}       
 <Box onClick={closeColorModule} id="close-color-button"><Tooltip title="Exit" arrow><IconButton><CancelRoundedIcon sx={{width: '2.25rem', height: '2.25rem'}} /></IconButton></Tooltip></Box>
</Box></Box></Box>
</Box>
</Container> 
</ThemeProvider>
  );  
}
