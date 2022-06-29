import { FontAwesome } from '@expo/vector-icons';

const GreenToday = [
  {
    icon: <FontAwesome name="clock-o" size={24} color="#4CBB17" key="green-clock" />,
    content: 'A green day allows you to eat or drink whatever you please',
    key: 'green-abc',
  },
  {
    icon: <FontAwesome name="heart" size={24} color="#4CBB17" key="green-heart" />,
    content: 'This may be a day of overindulgence where you treat yourself to favourite foods or just a no pressure day where you remain mindful of healthy food choices',
    key: 'green-def',
  },
  {
    icon: <FontAwesome name="exclamation-triangle" size={24} color="#4CBB17" key="green-caution" />,
    content: 'Regardless you earned this Green Day and it’s yours to enjoy.',
    key: 'green-ghi',
  },
];

export default GreenToday;
