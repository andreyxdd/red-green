import { FontAwesome } from '@expo/vector-icons';

const YellowDay = [
  {
    icon: <FontAwesome name="clock-o" size={24} color="#FFCD00" />,
    content: 'Today is a Yellow day because you are within a prescribed percentage of your target weight.',
  },
  {
    icon: <FontAwesome name="heart" size={24} color="#FFCD00" />,
    content: 'Today should be a time for mindful eating and caution. You are very close to your target weight and a Red Day is not necessary. Think about what you should eat today and make healthy decisions.',
  },
  {
    icon: <FontAwesome name="exclamation-triangle" size={24} color="#FFCD00" />,
    content: 'Enjoy a day of thoughtful eating and propel yourself back to the Green.',
  },
];

export default YellowDay;
