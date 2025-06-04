import React, { useState, useEffect } from 'react';
import { View, Text, PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  runOnJS 
} from 'react-native-reanimated';

import { styles } from './Slider.styles';
import { colors } from '../../constants/colors';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onValueChange: (value: number) => void;
  label?: string;
  leftLabel?: string;
  rightLabel?: string;
  showValue?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onValueChange,
  label,
  leftLabel,
  rightLabel,
  showValue = false
}) => {
  // Calculate initial position
  const calculatePosition = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };
  
  // State for thumb position and value
  const position = useSharedValue(calculatePosition(value));
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderValue, setSliderValue] = useState(value);
  
  // Update position when value changes externally
  useEffect(() => {
    position.value = calculatePosition(value);
    setSliderValue(value);
  }, [value, min, max, position]);
  
  // Update value when position changes
  const updateValue = (pos: number) => {
    const percentage = Math.max(0, Math.min(100, pos));
    const rawValue = min + (percentage / 100) * (max - min);
    
    // Apply step if provided
    const steppedValue = step > 0
      ? Math.round(rawValue / step) * step
      : rawValue;
      
    // Ensure value is within bounds
    const newValue = Math.max(min, Math.min(max, steppedValue));
    
    setSliderValue(newValue);
    onValueChange(newValue);
  };
  
  // Pan responder for handling gestures
  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      
      onPanResponderGrant: () => {
        // Highlight thumb on touch
      },
      
      onPanResponderMove: (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (sliderWidth === 0) return;
        
        // Calculate percentage based on gesture
        const newPosition = (gestureState.moveX - gestureState.x0) / sliderWidth * 100 + calculatePosition(value);
        position.value = Math.max(0, Math.min(100, newPosition));
        
        // Update value
        runOnJS(updateValue)(position.value);
      },
      
      onPanResponderRelease: () => {
        // Apply spring animation to final position
        position.value = withSpring(calculatePosition(sliderValue));
      }
    })
  ).current;
  
  // Measure track width on layout
  const onTrackLayout = (event: any) => {
    setSliderWidth(event.nativeEvent.layout.width);
  };
  
  // Handle track press
  const onTrackPress = (event: any) => {
    if (sliderWidth === 0) return;
    
    const trackX = event.nativeEvent.locationX;
    const newPercentage = (trackX / sliderWidth) * 100;
    
    position.value = withSpring(newPercentage);
    updateValue(newPercentage);
  };
  
  // Animated styles
  const thumbStyle = useAnimatedStyle(() => {
    return {
      left: `${position.value}%`
    };
  });
  
  const trackFillStyle = useAnimatedStyle(() => {
    return {
      width: `${position.value}%`
    };
  });
  
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={styles.sliderContainer}>
        {leftLabel && <Text style={styles.endLabel}>{leftLabel}</Text>}
        
        <View style={styles.trackContainer}>
          <View 
            style={styles.track} 
            onLayout={onTrackLayout}
            onStartShouldSetResponder={() => true}
            onResponderGrant={onTrackPress}
          />
          
          <Animated.View style={[styles.trackFill, trackFillStyle]} />
          
          <Animated.View 
            style={[styles.thumb, thumbStyle]} 
            {...panResponder.panHandlers}
          />
        </View>
        
        {rightLabel && <Text style={styles.endLabel}>{rightLabel}</Text>}
      </View>
      
      {showValue && (
        <Text style={styles.valueText}>{sliderValue}</Text>
      )}
    </View>
  );
};