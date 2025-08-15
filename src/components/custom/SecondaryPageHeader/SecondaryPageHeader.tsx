import { TouchableOpacity, View } from 'react-native';
import { Header } from '../../default/Header';

export default function SecondaryPageHeader({
  title,
  showBackButton = true,
  rightActionChildren,
}: {
  title: string;
  showBackButton?: boolean;
  rightActionChildren?: React.ReactNode;
}) {
  return (
    <Header
      title={title}
      showBackButton={showBackButton}
      rightAction={<View>{rightActionChildren}</View>}
    />
  );
}
