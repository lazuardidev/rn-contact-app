import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getContacts} from '../utils/api';
import {TContact} from '../utils/type';
import {useSelector, useDispatch} from 'react-redux';
import {addContacts, toggleFavorite} from '../hooks/actions/favorite';
import {SCREENS} from '../utils/constants';
import ButtonAdd from '../components/ButtonAdd';

const Home = ({navigation}: {navigation: any}) => {
  const [sections, setSections] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const {contacts} = useSelector(state => state.contacts);
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
    const foundContact = sections.reduce((acc, section) => {
      const foundItem = section.items.find(item => item.id === contact.id);
      return foundItem ? foundItem : acc;
    }, null);
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

  const isValidUrl = (url: string) => {
    const pattern =
      /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.&+=%#?]*)*$/i;
    return !!pattern.test(url);
  };

  const onRefetch = async () => {
    await fetchContacts();
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{backgroundColor: '#f2f2f2', height: '100%'}}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefetch} />
        }>
        <View style={styles.header}>
          <Text style={styles.title}>Contacts</Text>
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
                          navigation.navigate(SCREENS.DETAIL, {
                            id: item.id,
                            onEditComplete: onRefetch,
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
                              handleAddToFavorites(item);
                            }}>
                            {item.isFavorite ? (
                              <Ionicons
                                color="purple"
                                name="bookmark"
                                size={32}
                              />
                            ) : (
                              <Ionicons
                                color="grey"
                                name="bookmark-outline"
                                size={28}
                              />
                            )}
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
