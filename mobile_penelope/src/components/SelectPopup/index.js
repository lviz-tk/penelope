import React, { useEffect, useState } from 'react';
import { StyleSheet, Appearance } from 'react-native';
import Dropdown from 'react-native-input-select';

import { darkTheme, lightTheme } from "./style";

const SelectPopup = (props: options, variable, setVariable, ref) => {
  const [styles, setStyles] = useState(() => {
    const theme = Appearance.getColorScheme();
    if (theme === "light"){
      return lightTheme;
    }
    else {
      return darkTheme;
    }
  });

  useEffect(() => {
    const theme = Appearance.getColorScheme();
    if (theme === "light"){
      setStyles(lightTheme);
    }
    else {
      setStyles(darkTheme);
    }

    Appearance.addChangeListener(() => {
      const theme = Appearance.getColorScheme();
      if (theme === "light"){
        setStyles(lightTheme);
      }
      else {
        setStyles(darkTheme);
      }
    });
  }, []);

  return (
    <Dropdown
      options={props.options}
      selectedValue={props.variable}
      onValueChange={(value) => props.setVariable(value)}
      ref={props.ref}
      minSelectableItems={1}
      dropdownStyle={styles.dropdown}
      dropdownContainerStyle={styles.dropdownContainer}
      primaryColor={"green"}
      modalControls={{
        modalOptionsContainerStyle: styles.modalContainer,
      }}
      checkboxControls={{
        checkboxSize: 15,
        checkboxStyle: styles.checkbox,
        checkboxLabelStyle: styles.optionLabel,
      }}
    />
  );
}

export default SelectPopup;
