import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Dimensions
} from 'react-native';
import Animated, { 
  FadeIn, 
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Grid, 
  XAxis, 
  YAxis 
} from 'react-native-svg-charts';
import { ChevronDown, ChevronUp, Share } from 'lucide-react-native';

import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Button } from '@/src/components/Button';
import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';

// Get screen width
const screenWidth = Dimensions.get('window').width;

export default function AnalyticsScreen() {
  // State for expanded sections
  const [isWeeklyWrapExpanded, setIsWeeklyWrapExpanded] = useState(false);
  
  // Animation values
  const wrapHeight = useSharedValue(0);
  const wrapOpacity = useSharedValue(0);
  const progressValue = useSharedValue(0);
  
  // Animate progress on mount
  React.useEffect(() => {
    progressValue.value = withTiming(0.75, { duration: 1500 });
  }, []);
  
  // Toggle weekly wrap expansion
  const toggleWeeklyWrap = () => {
    const newIsExpanded = !isWeeklyWrapExpanded;
    setIsWeeklyWrapExpanded(newIsExpanded);
    
    wrapHeight.value = withTiming(newIsExpanded ? 180 : 0, { duration: 300 });
    wrapOpacity.value = withTiming(newIsExpanded ? 1 : 0, { duration: 300 });
  };
  
  // Share analytics
  const shareAnalytics = () => {
    // In a real app, implement sharing functionality
    alert('Sharing analytics...');
  };
  
  // Animated styles
  const wrapStyle = useAnimatedStyle(() => {
    return {
      height: wrapHeight.value,
      opacity: wrapOpacity.value,
      overflow: 'hidden',
    };
  });
  
  const progressCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progressValue.value * 360}deg` }],
    };
  });
  
  // Sample data for charts
  const barData = [
    { value: 50, label: 'Mon' },
    { value: 80, label: 'Tue' },
    { value: 90, label: 'Wed' },
    { value: 70, label: 'Thu' },
    { value: 60, label: 'Fri' },
    { value: 85, label: 'Sat' },
    { value: 75, label: 'Sun' },
  ];
  
  const lineData = [
    { value: 65 },
    { value: 70 },
    { value: 80 },
    { value: 75 },
    { value: 78 },
    { value: 82 },
    { value: 85 },
    { value: 90 },
    { value: 88 },
    { value: 95 },
  ];
  
  const pieData = [
    {
      key: 1,
      value: 50,
      svg: { fill: colors.button.primary },
      arc: { outerRadius: '100%', cornerRadius: 5 }
    },
    {
      key: 2,
      value: 30,
      svg: { fill: colors.button.accent },
      arc: { outerRadius: '100%', cornerRadius: 5 }
    },
    {
      key: 3,
      value: 20,
      svg: { fill: colors.status.success },
      arc: { outerRadius: '100%', cornerRadius: 5 }
    }
  ];
  
  return (
    <View style={styles.container}>
      <Header title="Analytics" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(500).delay(100)}>
          <Card style={styles.progressCard}>
            <View style={styles.progressCardHeader}>
              <Text style={styles.progressCardTitle}>Weekly Progress</Text>
              <TouchableOpacity 
                style={styles.shareButton}
                onPress={shareAnalytics}
              >
                <Share size={20} color={colors.text.primary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressCircleContainer}>
                <View style={styles.progressCircle}>
                  <Animated.View 
                    style={[styles.progressIndicator, progressCircleStyle]} 
                  />
                  <View style={styles.progressInnerCircle}>
                    <Text style={styles.progressPercentage}>75%</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.progressStatsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>23/30</Text>
                  <Text style={styles.statLabel}>Tasks Completed</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>5</Text>
                  <Text style={styles.statLabel}>Days Streak</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>15h</Text>
                  <Text style={styles.statLabel}>Focus Time</Text>
                </View>
              </View>
            </View>
          </Card>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(200)}>
          <Card style={styles.chartCard}>
            <Text style={styles.chartTitle}>Daily Activity</Text>
            
            <View style={styles.barChartContainer}>
              <YAxis
                data={barData.map(item => item.value)}
                contentInset={{ top: 10, bottom: 10 }}
                svg={{ fontSize: 10, fill: colors.text.muted }}
                numberOfTicks={5}
                formatLabel={(value) => value}
              />
              
              <View style={styles.barChart}>
                <BarChart
                  style={{ flex: 1, height: 200 }}
                  data={barData.map(item => item.value)}
                  svg={{ fill: colors.button.primary }}
                  contentInset={{ top: 10, bottom: 10 }}
                  spacing={0.2}
                  gridMin={0}
                >
                  <Grid />
                </BarChart>
                
                <XAxis
                  style={{ marginTop: 10 }}
                  data={barData}
                  formatLabel={(_, index) => barData[index].label}
                  contentInset={{ left: 10, right: 10 }}
                  svg={{ fontSize: 10, fill: colors.text.muted }}
                />
              </View>
            </View>
          </Card>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(300)}>
          <Card style={styles.chartCard}>
            <Text style={styles.chartTitle}>Focus Trend</Text>
            
            <View style={styles.lineChartContainer}>
              <YAxis
                data={lineData.map(item => item.value)}
                contentInset={{ top: 10, bottom: 10 }}
                svg={{ fontSize: 10, fill: colors.text.muted }}
                numberOfTicks={5}
                formatLabel={(value) => value}
              />
              
              <View style={styles.lineChart}>
                <LineChart
                  style={{ flex: 1, height: 200 }}
                  data={lineData.map(item => item.value)}
                  svg={{ stroke: colors.button.accent, strokeWidth: 3 }}
                  contentInset={{ top: 20, bottom: 20 }}
                >
                  <Grid />
                </LineChart>
              </View>
            </View>
          </Card>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(400)}>
          <Card style={styles.chartCard}>
            <Text style={styles.chartTitle}>Task Distribution</Text>
            
            <View style={styles.pieChartContainer}>
              <PieChart
                style={{ height: 200, width: 200 }}
                data={pieData}
                innerRadius={30}
                padAngle={0.02}
              />
              
              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: colors.button.primary }]} />
                  <Text style={styles.legendText}>Work (50%)</Text>
                </View>
                
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: colors.button.accent }]} />
                  <Text style={styles.legendText}>Health (30%)</Text>
                </View>
                
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: colors.status.success }]} />
                  <Text style={styles.legendText}>Personal (20%)</Text>
                </View>
              </View>
            </View>
          </Card>
        </Animated.View>
        
        <Animated.View entering={FadeInDown.duration(500).delay(500)}>
          <Card style={styles.wrapCard}>
            <TouchableOpacity 
              style={styles.wrapHeader}
              onPress={toggleWeeklyWrap}
            >
              <Text style={styles.wrapTitle}>Weekly Wrap</Text>
              {isWeeklyWrapExpanded ? (
                <ChevronUp size={20} color={colors.text.primary} />
              ) : (
                <ChevronDown size={20} color={colors.text.primary} />
              )}
            </TouchableOpacity>
            
            <Animated.View style={wrapStyle}>
              <Text style={styles.wrapText}>
                Great job this week! You've completed 75% of your scheduled tasks,
                which is a 5% improvement from last week. Your focus time has increased
                by 2 hours, and you've maintained a 5-day streak. Keep up the good work!
              </Text>
              
              <Button
                title="View Detailed Report"
                variant="secondary"
                style={styles.wrapButton}
              />
            </Animated.View>
          </Card>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  
  scrollView: {
    flex: 1,
  },
  
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  
  progressCard: {
    padding: 16,
  },
  
  progressCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  progressCardTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
  },
  
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.container,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  progressCircleContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  progressCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    borderColor: colors.background.container,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  
  progressIndicator: {
    position: 'absolute',
    width: 8,
    height: 50,
    backgroundColor: colors.button.primary,
    borderRadius: 4,
    bottom: 50,
    transformOrigin: 'bottom',
  },
  
  progressInnerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  progressPercentage: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
  },
  
  progressStatsContainer: {
    flex: 1,
    marginLeft: 16,
  },
  
  statItem: {
    marginBottom: 12,
  },
  
  statValue: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
  },
  
  statLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
  },
  
  chartCard: {
    padding: 16,
    marginTop: 16,
  },
  
  chartTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 16,
  },
  
  barChartContainer: {
    flexDirection: 'row',
    height: 250,
  },
  
  barChart: {
    flex: 1,
    marginLeft: 10,
  },
  
  lineChartContainer: {
    flexDirection: 'row',
    height: 250,
  },
  
  lineChart: {
    flex: 1,
    marginLeft: 10,
  },
  
  pieChartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  
  legendContainer: {
    marginLeft: 20,
  },
  
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  
  legendText: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
  },
  
  wrapCard: {
    marginTop: 16,
  },
  
  wrapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  
  wrapTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
  },
  
  wrapText: {
    fontSize: fonts.sizes.md,
    color: colors.text.secondary,
    lineHeight: 24,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  
  wrapButton: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
});