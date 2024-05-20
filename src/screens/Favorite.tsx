import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TContact} from '../utils/type';
import {toggleFavorite} from '../hooks/actions/favorite';
import {SCREENS} from '../utils/constants';
import {NoData, ContactSection, Header} from '../components';

const Favorite = ({navigation}: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [sections, setSections] = useState<any>([]);
  const favoriteContacts = useSelector((state: any) =>
    state.contacts.contacts.filter(contact => contact.isFavorite),
  );

  const dispatch = useDispatch();

  const handleAddToFavorites = (contact: TContact) => {
    dispatch(toggleFavorite(contact.id));
    refreshData();
  };

  const refreshData = () => {
    setRefreshing(true);
    const sectionsMap = Array.isArray(favoriteContacts)
      ? favoriteContacts.reduce((acc, item) => {
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
    setRefreshing(false);
  };

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    refreshData();
  };

  const handleNavigateToDetail = (item: TContact) => {
    navigation.navigate(SCREENS.DETAIL, {
      id: item.id,
      onEditComplete: () => {},
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <Header title="Favorites" />
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
    </SafeAreaView>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    backgroundColor: '#f2f2f2',
    height: '100%',
  },
});
