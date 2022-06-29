import { StyleSheet, View, ScrollView } from 'react-native';
import { Headline, Subheading } from 'react-native-paper';
import { SvgCss } from 'react-native-svg';
import useInterfaceStore, { IInterfaceStore } from '../../../hooks/useInterfaceStore';
import { SIGNS } from '../../../types/enums';
import GreenDay from '../../../components/TodayTab/GreenDay';
import YellowDay from '../../../components/TodayTab/YellowDay';
import RedDay from '../../../components/TodayTab/RedDay';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
});

interface IIconColors{
  main: string;
  back: string;
}

const roundIconXML = ({ main, back }:IIconColors) => `<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>yellow-status</title> <g id="Designs" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Today---Yellow" transform="translate(-32.000000, -111.000000)"> <g id="Group-2" transform="translate(32.000000, 108.000000)"> <g id="yellow-status" transform="translate(0.000000, 3.000000)"> <circle id="Oval-Copy-2" fill="${back}" fill-rule="nonzero" cx="12" cy="12" r="12"></circle> <circle id="Oval-Copy-2" fill="${main}" cx="12" cy="12" r="7"></circle> </g> </g> </g> </g> </svg>`;

const iconColors = (sign: SIGNS) => {
  switch (sign) {
    case SIGNS.GREEN: {
      return { back: 'rgba(76,187,23, 0.4)', main: '#4CBB17' };
    }
    case SIGNS.YELLOW: {
      return { back: 'rgba(255,205,0, 0.4)', main: '#FFCD00' };
    }
    case SIGNS.RED: {
      return { back: 'rgba(255,0,0,0.4)', main: '#FF0000' };
    }
    default: {
      return { back: 'rgba(51,161,255, 0.4)', main: '#33A1FF' };
    }
  }
};

const contentArray = (sign: SIGNS) => {
  switch (sign) {
    case SIGNS.GREEN: {
      return GreenDay;
    }
    case SIGNS.YELLOW: {
      return YellowDay;
    }
    case SIGNS.RED: {
      return RedDay;
    }
    default: {
      return [];
    }
  }
};

function TodayScreen() {
  const sign = useInterfaceStore((state:IInterfaceStore) => state.sign);

  return (
    <ScrollView contentContainerStyle={[styles.container, { flex: 1 }]}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginHorizontal: 20,
        marginVertical: 12,
      }}
      >
        <SvgCss
          xml={roundIconXML(iconColors(sign))}
          width={28}
          height={28}
          style={{ marginRight: 20 }}
        />
        <Headline
          style={{ marginVertical: 12 }}
        >
          {sign}
          {' '}
          DAY
        </Headline>
      </View>
      {contentArray(sign).map((item) => (
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
          marginVertical: 12,
        }}
        >
          {item.icon}
          <Subheading style={{
            flex: 1,
            flexWrap: 'wrap',
            marginHorizontal: 20,
          }}
          >
            {item.content}

          </Subheading>
        </View>
      ))}
    </ScrollView>
  );
}

export default TodayScreen;
