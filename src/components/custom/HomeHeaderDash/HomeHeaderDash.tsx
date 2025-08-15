import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, Text, TextStyle, View, ViewStyle } from 'react-native';
import { FadeInDown } from 'react-native-reanimated';

export default function HomeHeaderDash({
  goalCount,
  taskCount,
  todayTaskCount,
}: {
  goalCount: number;
  taskCount: number;
  todayTaskCount: number;
}) {
  return (
    <LinearGradient
      colors={colors.gradient.primary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.heroGradient}
    >
      <View style={styles.heroContent}>
        <Text style={styles.heroTitle}>Welcome Back!</Text>
        <Text style={styles.heroSubtitle}>
          Ready to achieve your goals today?
        </Text>
        <View style={styles.heroStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{goalCount}</Text>
            <Text style={styles.statLabel}>Active Goals</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{taskCount}</Text>
            <Text style={styles.statLabel}>Tasks Completed</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{todayTaskCount}</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = {
  heroGradient: {
    padding: 24,
    borderRadius: 20,
  } as ViewStyle,

  heroContent: {
    alignItems: 'center',
  } as ViewStyle,

  heroTitle: {
    fontSize: fonts.sizes.xxxl,
    // fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  } as TextStyle,

  heroSubtitle: {
    fontSize: fonts.sizes.lg,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.9,
  } as TextStyle,

  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  statItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  } as ViewStyle,

  statNumber: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
  } as TextStyle,

  statLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    marginTop: 4,
    opacity: 0.8,
  } as TextStyle,

  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  } as ViewStyle,
};
