import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import {getContacts} from '../utils/api';
import {TContact, TContactSectionData} from '../utils/type';
import {useDispatch} from 'react-redux';
import {addContacts, toggleFavorite} from '../hooks/actions/favorite';
import {SCREENS} from '../utils/constants';
import {
  ButtonAdd,
  ContactSection,
  Header,
  Loading,
  NoData,
} from '../components';

const Home = ({navigation}: any) => {
  const [sections, setSections] = useState<TContactSectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  // const {contacts} = useSelector(state => state.contacts);
  const dispatch = useDispatch();

  const fetchContacts = async () => {
    try {
      setRefreshing(true);
      setLoading(true);
      const response = await getContacts();
      const data: TContact[] = response.data.data.map((contact: TContact) => ({
        ...contact,
        isFavorite: contact.isFavorite ?? false,
      }));
      dispatch(addContacts(data));

      const sectionsMap = Array.isArray(data)
        ? data.reduce((acc, item) => {
            const firstChar = item.firstName.charAt(0).toUpperCase();
            if (!acc[firstChar]) {
              acc[firstChar] = [];
            }
            acc[firstChar].push(item);
            return acc;
          }, {})
        : [];

      const newSections = Object.entries(sectionsMap)
        .map(([letter, items]) => ({
          letter,
          items,
        }))
        .sort((a, b) => a.letter.localeCompare(b.letter));
      setSections(newSections);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToFavorites = (contact: TContact) => {
    dispatch(toggleFavorite(contact.id));
    // const foundContact = sections.reduce((acc, section) => {
    //   const foundItem = section.items.find(item => item.id === contact.id);
    //   return foundItem ? foundItem : acc;
    // }, null);
    setSections(
      sections.map(section => ({
        ...section,
        items: section.items.map(item =>
          item.id === contact.id
            ? {...item, isFavorite: !item.isFavorite}
            : item,
        ),
      })),
    );

    ToastAndroid.showWithGravityAndOffset(
      !contact.isFavorite
        ? 'Data added to favorite'
        : 'Data removed from favorite',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      0,
    );
  };

  const handleNavigateToDetail = (item: TContact) => {
    navigation.navigate(SCREENS.DETAIL, {
      id: item.id,
      onEditComplete: onRefetch,
    });
  };

  const onRefetch = async () => {
    await fetchContacts();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefetch} />
        }>
        <Header title="Contacts" />
        {sections.length < 1 ? (
          <NoData />
        ) : (
          <ContactSection
            sections={sections}
            handleNavigateToDetail={handleNavigateToDetail}
            handleToogleFavorites={handleAddToFavorites}
          />
        )}
      </ScrollView>
      <ButtonAdd
        onPress={() => {
          navigation.navigate(SCREENS.ADD, {
            onAddComplete: onRefetch,
          });
        }}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    backgroundColor: '#f2f2f2',
    height: '100%',
  },
});
