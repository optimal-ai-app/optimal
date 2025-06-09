import React, { useRef, useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent
} from 'react-native'

import { styles } from './InputCarousel.styles'

interface CarouselOption {
  id: string
  text: string
  action?: () => void
}

interface InputCarouselProps {
  options: CarouselOption[]
  onOptionSelect: (option: CarouselOption) => void
  autoScroll?: boolean
  scrollInterval?: number
}

const { width: screenWidth } = Dimensions.get('window')

export const InputCarousel: React.FC<InputCarouselProps> = ({
  options,
  onOptionSelect,
  autoScroll = false,
  scrollInterval = 4000
}) => {
  const scrollViewRef = useRef<ScrollView>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollViewWidth, setScrollViewWidth] = useState(0)

  const itemWidth = 144 // 120 min width + 12 margin + 12 padding

  // Auto-scroll functionality
  useEffect(() => {
    if (!autoScroll || options.length <= 1 || isScrolling) return

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % options.length
      setCurrentIndex(nextIndex)

      scrollViewRef.current?.scrollTo({
        x: nextIndex * itemWidth,
        animated: true
      })
    }, scrollInterval)

    return () => clearInterval(interval)
  }, [autoScroll, options.length, scrollInterval, currentIndex, isScrolling])

  // Handle scroll
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const newIndex = Math.round(contentOffsetX / itemWidth)
    setCurrentIndex(newIndex)
  }

  // Handle scroll end
  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x
    const newIndex = Math.round(contentOffsetX / itemWidth)
    setCurrentIndex(newIndex)
    setIsScrolling(false)
  }

  // Handle scroll begin
  const handleScrollBegin = () => {
    setIsScrolling(true)
  }

  // Handle option press
  const handleOptionPress = (option: CarouselOption, index: number) => {
    onOptionSelect(option)
    option.action?.()
  }

  // Handle layout to get scroll view width
  const handleLayout = (event: any) => {
    setScrollViewWidth(event.nativeEvent.layout.width)
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onLayout={handleLayout}
        onScroll={handleScroll}
        onScrollBeginDrag={handleScrollBegin}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        decelerationRate='normal'
        snapToInterval={itemWidth}
        snapToAlignment='center'
        contentContainerStyle={styles.carouselContent}
        style={styles.scrollView}
        pagingEnabled={false}
        bounces={true}
      >
        {options.map((option, index) => (
          <TouchableOpacity
            key={`${option.id}-${index}`}
            style={styles.optionButton}
            onPress={() => handleOptionPress(option, index)}
            activeOpacity={0.7}
          >
            <Text style={styles.optionText} numberOfLines={2}>
              {option.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
