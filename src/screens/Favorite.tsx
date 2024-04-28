import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {TContact} from '../utils/type';
import {toggleFavorite} from '../hooks/actions/favorite';
import {SCREENS} from '../utils/constants';

const Favorite = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [sections, setSections] = useState<any>([]);
  const favoriteContacts = useSelector(state =>
    state.contacts.contacts.filter(contact => contact.isFavorite),
  );

  console.log(favoriteContacts, ' favoriteContacts2222=====');
  // console.log(contacts, ' contacts22222=====');

  const dispatch = useDispatch();

  const handleAddToFavorites = (contact: TContact) => {
    dispatch(toggleFavorite(contact.id));
    refreshData();
  };

  const isValidUrl = (url: string) => {
    const pattern =
      /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.&+=%#?]*)*$/i;
    return !!pattern.test(url);
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
    console.log(JSON.stringify(newSections, null, 2), ' newSections');
  };

  useEffect(() => {
    refreshData();
    console.log('mapData========');
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    refreshData();
  };

  return (
    <SafeAreaView style={{backgroundColor: '#f2f2f2', height: '100%'}}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <View style={styles.header}>
          <Text style={styles.title}>Favorites</Text>
        </View>

        {sections.length < 1 ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '70%',
            }}>
            <Text style={styles.textNoData}>No Data</Text>
            <Text style={styles.textNoData}>Pull to Refresh</Text>
          </View>
        ) : (
          sections.map(({letter, items}) => (
            <View style={styles.section} key={letter}>
              <Text style={styles.sectionTitle}>{letter}</Text>
              <View style={styles.sectionItems}>
                {items.map((item: TContact) => {
                  return (
                    <View key={item.id} style={styles.cardWrapper}>
                      <TouchableOpacity
                        onPress={() => {
                          // handle onPress
                          handleAddToFavorites(item);
                          navigation.navigate(SCREENS.DETAIL, {
                            id: item.id,
                            onEditComplete: () => {},
                          });
                        }}>
                        <View style={styles.card}>
                          {isValidUrl(item.photo) ? (
                            <Image
                              alt=""
                              resizeMode="cover"
                              source={{uri: item.photo}}
                              style={styles.cardImg}
                            />
                          ) : (
                            <View style={[styles.cardImg, styles.cardAvatar]}>
                              <Text style={styles.cardAvatarText}>
                                {item.firstName[0]}
                              </Text>
                            </View>
                          )}
                          <View style={styles.cardBody}>
                            <Text style={styles.cardTitle}>
                              {item.firstName + ' ' + item.lastName}
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={styles.cardAction}
                            onPress={() => {
                              console.log('handleAddToFavorites', item.id);
                              handleAddToFavorites(item);
                            }}>
                            <Ionicons
                              color="purple"
                              name="bookmark"
                              size={32}
                            />
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
          ))
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
  },
  header: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  /** Section */
  section: {
    marginTop: 12,
    paddingLeft: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  sectionItems: {
    marginTop: 8,
  },
  textNoData: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  /** Card */
  card: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardWrapper: {
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
  },
  cardImg: {
    width: 42,
    height: 42,
    borderRadius: 12,
  },
  cardAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9ca1ac',
  },
  cardAvatarText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardBody: {
    marginRight: 'auto',
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  cardPhone: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    color: '#616d79',
    marginTop: 3,
  },
  cardAction: {
    paddingRight: 16,
  },
});
