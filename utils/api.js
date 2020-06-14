import AsyncStorage from '@react-native-community/async-storage';
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from './_calendar';

export const submitEntry = async ({ entry, key }) => {
  return await AsyncStorage.setItem(
    CALENDAR_STORAGE_KEY,
    JSON.stringify({ [key]: entry })
  );
};

export const removeEntry = async (key) => {
  const data = JSON.parse(await AsyncStorage.getItem(CALENDAR_STORAGE_KEY));
  data[key] = undefined;
  delete data[key];
  return await AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
};

export const fetchCalendarResults = async () => {
  return formatCalendarResults(
    await AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
  );
};
