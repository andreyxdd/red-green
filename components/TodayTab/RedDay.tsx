import { FontAwesome } from '@expo/vector-icons';

const RedToday = [
  {
    icon: <FontAwesome name="clock-o" size={24} color="#FF0000" key="red-clock" />,
    content: 'Today should be a day of fasting.',
    key: 'red-abc',

  },
  {
    icon: <FontAwesome name="heart" size={24} color="#FF0000" key="red-heart" />,
    content: 'For most a Red or fasting day is difficult. Today you are encouraged to eat nothing so that you can quickly fall back into step with your target weight. While you take on the day without food consider some alternatives to distract your hunger like a cup of tea or a glass of wine.',
    key: 'red-def',
  },
  {
    icon: <FontAwesome name="exclamation-triangle" size={24} color="#FF0000" key="red-caution" />,
    content: 'After your day of fasting you will most certainly feel great in the morning. Without a doubt you will feel empowered by your own discipline. You will know that you have got this, your target is real and enduring.',
    key: 'red-ghi',
  },
];

export default RedToday;
