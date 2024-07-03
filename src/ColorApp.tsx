import React, { useState, useEffect, useRef } from "react";
import { ColorPicker, ColorService, useColor } from "react-color-palette";
import { Box }from '@mui/material';
import "react-color-palette/css";
import { suggestAAColorVariant, suggestAAAColorVariant, getContrast } from 'accessible-colors';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
//import Draggable from 'react-draggable';
import DraggableComponent from "./DraggableComponent"
import debounce from 'debounce';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import {createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import rgbaToRgb from 'rgba-to-rgb'
import { showfgcolor } from './App'; 

const ColorApp: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        
        },
      }),
    [prefersDarkMode],
  )
  const [fgcolor, setfgColor] = useColor(theme.palette.text.primary);
  
  const [bgcolor, setbgColor] = useColor(theme.palette.background.paper);
  
  const isAnimatingRef = useRef(false); // Manage isAnimating with useRef

  const [resizetooltipTitle, setResizeTooltipTitle] =  useState(() => {
    if (document.querySelector('#fg-picker')?.classList.contains('full') ||
        document.querySelector('#bg-picker')?.classList.contains('full')) {
      return "Expand";
    } else {
      return "Shrink";
    }
  });

  function setBodyBackgroundColor(color: string) {
    if (document.body && typeof document.body.style.setProperty === 'function') {
      document.body.style.setProperty('background-color', color);
    } else {
      console.error('setProperty is not supported on document.body.style');
      // Handle fallback or notify user of unsupported feature
    }
  }
  setBodyBackgroundColor(bgcolor.hex);
  
  {
    if (document.querySelector('#Text')) {
    (document.querySelector('#Text') as HTMLElement).style.setProperty('color', fgcolor.hex)}
  }

function showbgcolor() {
    document.querySelector('#bg-picker')?.classList.add('on'); 
    document.querySelector('#fg-picker')?.classList.remove('on'); 
    document.querySelector('button.MuiButton-root:nth-child(2)')?.classList.add('inactive-color-module-shadow'); 
    document.querySelector('button.MuiButton-root:nth-child(2)')?.classList.remove('active-color-module-highlight'); 
    document.querySelector('button.MuiButton-root:nth-child(1)')?.classList.remove('inactive-color-module-shadow'); 
    document.querySelector('button.MuiButton-root:nth-child(1)')?.classList.add('active-color-module-highlight'); 
  };

  function closeColorModule() {  
    document.querySelector('#fgcolor')?.classList.add('slidedown');
  setTimeout(() => (
    document.querySelector('#fgcolor')?.classList.remove('slidedown'),  
    document.querySelector('#fgcolor')?.classList.remove('on'), 
    document.querySelector('#fg-picker')?.classList.remove('on'), 
    document.querySelector('#bg-picker')?.classList.remove('on'),
    document.querySelector('#draggable-area')?.classList.remove('on'),
    document.querySelector('#fg-picker')?.classList.remove('mini'),
    document.querySelector('#fg-picker')?.classList.remove('full'),
    document.querySelector('#bg-picker')?.classList.remove('mini'),
    document.querySelector('#bg-picker')?.classList.remove('full')
  ), 500);
}
  function scaleColorModule() {
    document.querySelector('#fg-picker')?.classList.toggle('mini'),
    document.querySelector('#fg-picker')?.classList.toggle('full'),
    document.querySelector('#bg-picker')?.classList.toggle('mini'),
    document.querySelector('#bg-picker')?.classList.toggle('full')
  
    if (document.querySelector('#fg-picker')?.classList.contains('mini')) {
      (document.querySelector('.react-draggable#color-picker-app') as HTMLElement).style.setProperty('--colorpicker-box-height', '430px');
      } 
      else if (document.querySelector('#fg-picker')?.classList.contains('full')) {
        (document.querySelector('.react-draggable#color-picker-app') as HTMLElement).style.setProperty('--colorpicker-box-height', '573px');
      } 
    const isShrinked = document.querySelector('#fg-picker')?.classList.contains('mini') ||
                       document.querySelector('#bg-picker')?.classList.contains('mini');
    const newTooltipTitle = isShrinked ? "Expand" : "Shrink";
    setResizeTooltipTitle(newTooltipTitle);
  };
  

const [pickerHeight] = useState<number>(160); // Height of the ColorPicker box
  const resizeColorModuleButton = [
    <Box onClick={scaleColorModule} key="resize-color-button" id="resize-color-button"><Tooltip title={resizetooltipTitle} arrow><IconButton><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30" x="0px" y="0px"><path d="m19,4.25h-6c-.414,0-.75.336-.75.75s.336.75.75.75h4.189l-11.439,11.439v-4.189c0-.414-.336-.75-.75-.75s-.75.336-.75.75v6c0,.414.336.75.75.75h6c.414,0,.75-.336.75-.75s-.336-.75-.75-.75h-4.189l11.439-11.439v4.189c0,.414.336.75.75.75s.75-.336.75-.75v-6c0-.414-.336-.75-.75-.75Z"/></svg></IconButton></Tooltip></Box>,
  ]
    const buttons = [
      <Button onClick={showbgcolor} key="one"><ImageOutlinedIcon/>Background</Button>,
      <Button onClick={showfgcolor} key="two"><FormatColorTextIcon/>Text</Button>,
    ];


    const rgbStringToObject = (rgbString: string) => {
      const result = rgbString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*\.?\d+)?\)/);
      if (!result) {
        throw new Error(`Invalid color format: ${rgbString}`);
      }
      const [, r, g, b, a] = result;
      return { r: +r, g: +g, b: +b, a: a ? +a : 1 };
    };
    
    const rgbObjectToString = (rgbObject: { r: number; g: number; b: number; a?: number }) => {
      const { r, g, b, a } = rgbObject;
      if (a !== undefined) {
        return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
      }
      return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    };
    
    const foregroundRGBaString = rgbObjectToString(fgcolor.rgb);
    const backgroundRGBaString = rgbObjectToString(bgcolor.rgb);
    const forbackgroundcalc = rgbaToRgb('rgb(0, 0, 0)', backgroundRGBaString) // RGB string rgb(x, x, x) of the background color with computed and removed alpha channel 
    const blendedRGBColorsforFG = rgbaToRgb(forbackgroundcalc, foregroundRGBaString); // blends already calculated background value without alpha channel with uncalculated foreground channel that has an alpha channel
    
    const rgbObject = rgbStringToObject(blendedRGBColorsforFG);
    const rgbObjectWithAlpha = { ...rgbObject, a: rgbObject.a ?? 1 };
    
    const blendedHEXColorforFG = ColorService.convert("rgb", rgbObjectWithAlpha).hex;
    
    const isFgColorWithAlpha = fgcolor.hex.length === 9;
    const isBgColorWithAlpha = bgcolor.hex.length === 9;
    
    const bgHex = isBgColorWithAlpha
      ? ColorService.convert("rgb", rgbStringToObject(rgbaToRgb('rgb(0, 0, 0)', backgroundRGBaString))).hex
      : bgcolor.hex;
    
    const fgHex = isFgColorWithAlpha ? blendedHEXColorforFG : fgcolor.hex;
    const contrastRatio = getContrast(bgHex, fgHex); // Contrast between background and foreground color (Ex: 21:1)
      
    // Assign AA compliant background color to const 'suggestedBgColor'
      const suggestedBgColor = suggestAAColorVariant(bgHex, fgHex, true);
      const sanitizedBgColor = suggestedBgColor ? suggestedBgColor.replace('NaN', '') : '';
      
    // Assign AA compliant foreground color to const 'suggestedFgColor'
      const suggestedFgColor = suggestAAColorVariant(fgHex, bgHex, true);
      const sanitizedFgColor = suggestedFgColor ? suggestedFgColor.replace('NaN', '') : '';

    // Assign AA compliant foreground color to const 'suggestedFgColor'
    const suggestedAAAFgColor = suggestAAAColorVariant(fgHex, bgHex, true);
    const sanitizedAAAFgColor = suggestedAAAFgColor ? suggestedAAAFgColor.replace('NaN', '') : '';

  const handleContrastChange = debounce(() => {
    
    // Checks for foreground color with alpha channel (9 characters; 8 digit hexadecimal plus '#')  Ex. '#12345678'
    const contrastWarningElement = document.querySelector('#contrast-warning'); // Alert module for contrast accessibility handling
    
    if (contrastWarningElement) {   // Continue if contrast alert module exists

      const disablePointerEvents = () => { (document.querySelector('#color-picker-warning') as HTMLElement).style.setProperty('pointer-events', 'none') };

      const enablePointerEvents = () => { (document.querySelector('#color-picker-warning') as HTMLElement).style.setProperty('pointer-events', 'auto') };

      if (contrastRatio && contrastRatio >= 3 && !isAnimatingRef.current) {    // Continue if contrast is greater than 3 and not currently animating
        disablePointerEvents(); // Disable pointer events for alert module in animated state
  
        if (contrastWarningElement.classList.contains('on')) {
          isAnimatingRef.current = true;    // Set the flag to true to indicate intialized animation
          contrastWarningElement.classList.add('slidedown');    // Begin exit animation (add class '.slidedown' to alert module)
          disablePointerEvents(); // Disable pointer events for alert module in animated state

          setTimeout(() => { // Wait duration of animation(500ms) before removing temporary classes      
            contrastWarningElement.classList.remove('slidedown'); //Return to unanimated state 
            contrastWarningElement.classList.remove('on'); // Return to inactive state
            contrastWarningElement.classList.add('hide'); // Return to undisplayed state
            isAnimatingRef.current = false; // Reset the flag after animation
          }, 500);
        }

      } else if (contrastRatio && contrastRatio < 3 && !isAnimatingRef.current) { // Opens alert module when contrast below 3:1
        
        if (contrastWarningElement.classList.contains('hide')) {
          isAnimatingRef.current = true; // Set the flag to true to indicate animation
          contrastWarningElement.classList.add('slideup');
          contrastWarningElement.classList.remove('hide');
          contrastWarningElement.classList.add('on');
          disablePointerEvents(); // Disable pointer events for alert module in animated state
          
          setTimeout(() => {
            contrastWarningElement.classList.remove('slideup');
            enablePointerEvents(); // Enable pointer events for alert module after animation is finished
            isAnimatingRef.current = false; // Reset the flag after animation
          }, 500);

        }
      }
    }
  }, 50); // Adjust the debounce delay (in milliseconds) as needed

    useEffect(() => {
      updateCompliantColor();  // Handles color changes whenever fgcolor or bgcolor changes
       handleContrastChange(); // Handles Contrast Warning Module Display
    }, [fgcolor, bgcolor, showbgcolor, showfgcolor]);

    const updateCompliantColor = () => {
      
      // If the foreground color picker is open and contains class '.on'
      if (document.querySelector('#fg-picker')?.classList.contains('on')) {
 
        // Update #compliant-color-suggestion background to AA compliant foreground color
        (document.querySelector('#compliant-color-suggestion') as HTMLElement).style.background = sanitizedFgColor || ''; 
        
        // Slider Text color update to AAA compliant foreground color 
        for (let i = 0; i < document.querySelectorAll('#slidernamepadding').length; i++) { 
          (document.querySelectorAll('#slidernamepadding')[i] as HTMLElement).style.setProperty('--text-AAA-color', sanitizedAAAFgColor);
        }

        // Sliders color update to AA compliant foreground color
        for (let i = 0; i < document.querySelectorAll('.MuiSlider-root').length; i++) { 
          (document.querySelectorAll('.MuiSlider-root')[i] as HTMLElement).style.setProperty('--slider-fg-color', sanitizedFgColor); 
        } 
      } 
    // Else, if the background color picker is open and contains class '.on'  
    else if (document.querySelector('#bg-picker')?.classList.contains('on')) {

      // Update #compliant-color-suggestion background to AA compliant background-color
      (document.querySelector('#compliant-color-suggestion') as HTMLElement).style.background = sanitizedBgColor || ''; 
    
      // Slider Text color update to AAA compliant foreground color 
      for (let i = 0; i < document.querySelectorAll('#slidernamepadding').length; i++) { 
        (document.querySelectorAll('#slidernamepadding')[i] as HTMLElement).style.setProperty('--text-AAA-color', sanitizedAAAFgColor);
      }
      
      // Sliders color update to AA compliant foreground color
      for (let i = 0; i < document.querySelectorAll('.MuiSlider-root').length; i++) { 
        (document.querySelectorAll('.MuiSlider-root')[i] as HTMLElement).style.setProperty('--slider-fg-color', sanitizedFgColor); 
      } 
    }
  }
  

function contrastWarningOff() {

    document.querySelector('#contrast-warning')?.classList.remove('on');
    if (document.querySelector('#contrast-warning:not(.hide)')) { 
      document.querySelector('#contrast-warning')?.classList.add('slidedown');}
      setTimeout(() => {
        document.querySelector('#contrast-warning')?.classList.remove('slidedown');
        document.querySelector('#contrast-warning')?.classList.add('hide');
      }, 500);
    }


      function useSuggestedAA() {

        if (document.querySelector('#fg-picker')?.classList.contains('on')) {
          useSuggestedAAfg();
        } else if (document.querySelector('#bg-picker')?.classList.contains('on')) {
          useSuggestedAAbg();
        }
        // Update #compliant-color-suggestion background
        updateCompliantColor();
      }
  
      const useSuggestedAAbg = () => {
      
        // Calculate suggested background color and apply it
        setbgColor(ColorService.convert("hex", suggestedBgColor || ''));
    
      };
    
      const useSuggestedAAfg = () => {
         // Calculate suggested background color and apply it
        setfgColor(ColorService.convert("hex", suggestedFgColor || ''));

        // Update main text element related to foreground color change
        (document.querySelector('#Text') as HTMLElement).style.setProperty('color', suggestedFgColor);
      };
    
    const compliantcolorsuggestion = [
      <Box key="compliant-color-suggestion" id="compliant-color-suggestion" sx={{background: ''}}></Box>,
      <Box id="reject-compliant-color-suggestion" key="reject-compliant-color-suggestion"><Tooltip title="Reject/Close" arrow><IconButton onClick={contrastWarningOff}><CancelRoundedIcon sx={{width: '2.25rem', height: '2.25rem'}} /></IconButton></Tooltip></Box>,
      <Box id="accept-compliant-color-suggestion" key="accept-compliant-color-suggestion"><Tooltip title="Accept/Use" arrow><IconButton onClick={useSuggestedAA} ><CheckCircleRoundedIcon sx={{width: '2.25rem', height: '2.25rem'}} /></IconButton></Tooltip>
      </Box>
    ];   
    
    const lowcontrastwarningmodule = (
      <div id="contrast-warning" className="hide">
        <Box sx={{ right: '3.5rem', position: 'absolute', top: '.5rem', padding: '1rem' }}>
          <ErrorOutlineOutlinedIcon sx={{ width: '2.25rem', height: '2.25rem' }} />
        </Box>
        <Box sx={{ right: '0rem', position: 'absolute', top: 0, padding: '1rem' }}>
          <Tooltip title="Minimize" arrow>
            <IconButton onClick={contrastWarningOff}>
              <RemoveRoundedIcon sx={{ width: '2.25rem', height: '2.25rem' }} />
            </IconButton>
          </Tooltip>
        </Box>
        <div>
          <h3 id="contrast-warning-text">Attention: Low Contrast</h3>
          <div id="asjk158">
            <p id="contrast-warning-text">
              The current{' '}
              <Tooltip
                title="Contrast Ratio measures the relative luminance between a background over which the text is rendered. The values can range from 1 to 21 (commonly written 1:1 to 21:1)."
                arrow
              >
                <span id="low-context-ratio-value">
                  <a href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html#top">
                    contrast ratio
                  </a>
                </span>
              </Tooltip>{' '}
              of {getContrast(bgHex, fgHex)} is below the recommended level.
            </p>
            <p id="contrast-warning-text">
              A contrast ratio greater than 3 (AA) is recommended by WCAG for optimal readability.
            </p>
            <p id="contrast-warning-text">You can also choose to select the nearest compliant color:</p>
            <div>
              <div id='suggest-AA-color-module-container'>
                <p id="suggested-color-text" key="suggested-color-text">Suggested Color:</p>
                {compliantcolorsuggestion}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    
    

  {
    document.documentElement.style.setProperty('color', suggestAAColorVariant(fgcolor.hex, bgcolor.hex, true))
    document.documentElement.style.setProperty('--color-module-bordercolor-AA', suggestAAColorVariant(getComputedStyle(document.documentElement).getPropertyValue('--color-module-bordercolor'), bgcolor.hex, true))
    document.documentElement.style.setProperty('--color-module-bordercolor-hover-AA', suggestAAColorVariant(getComputedStyle(document.documentElement).getPropertyValue('--color-module-bordercolor-hover'), bgcolor.hex, true))
    document.documentElement.style.setProperty('--active-button-state-color-AAA', suggestAAAColorVariant(getComputedStyle(document.documentElement).getPropertyValue('--active-button-state-color'), bgcolor.hex, true))
  }

  return (
  
  <div id="color-picker-module">  
    <Box
      id="draggable-area"
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        margin: 0,
        top: 0,
        left: 0
      }}
    >
        
  <DraggableComponent 
        axis="both" 
        id="color-picker-warning"
        handle=".react-draggable" 
        cancel="#contrast-warning"
        centered={true}
        sx={{
          right: 0,
          bottom: 0,
        //  padding: '1.5rem', // Default padding for all sizes
        } as any} // Casting sx to any to bypass TypeScript error
      >
   {lowcontrastwarningmodule} 
   </DraggableComponent>
      <DraggableComponent 
        axis="both" 
        id="color-picker-app"
        handle=".react-draggable" 
        cancel="#fgcolor"
        sx={{
        //  padding: '1.5rem', // Default padding for all sizes
        } as any} // Casting sx to any to bypass TypeScript error
      >

<div id="fgcolor">  
 <div id="color-module-container-border"> <div id="color-module-container" key="color-module-container">
  
<p id="color-picker-header">Color Picker</p>
   <div>       <ButtonGroup sx={{flexDirection:'row'}} 
        disableElevation
        orientation="vertical"
        aria-label="Vertical button group"
        variant="text"
      >
        {buttons}
      </ButtonGroup>

       </div><div id="fg-picker">
       <ColorPicker color={fgcolor} height={pickerHeight} onChange={setfgColor}  />  
       </div>
       <div id="bg-picker">
       <ColorPicker color={bgcolor} height={pickerHeight}  onChange={setbgColor}  />  
       </div>
       
 {resizeColorModuleButton}       
 <div onClick={closeColorModule} id="close-color-button"><Tooltip title="Exit" arrow><IconButton><CancelRoundedIcon sx={{width: '2.25rem', height: '2.25rem'}} /></IconButton></Tooltip></div>
</div></div></div>
</DraggableComponent></Box></div>
  );
};
export default ColorApp;
