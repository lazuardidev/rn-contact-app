import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TContact, TContactSectionData} from '../utils/type';

type TContactSection = {
  sections: TContactSectionData[];
  handleToogleFavorites: (item: TContact) => void;
  handleNavigateToDetail: (item: TContact) => void;
};

export const ContactSection = ({
  sections,
  handleNavigateToDetail,
  handleToogleFavorites,
}: TContactSection) => {
  const isValidUrl = (url: string) => {
    return url.startsWith('http') || url.startsWith('https');
  };

  return sections.map(({letter, items}) => (
    <View style={styles.section} key={letter}>
      <Text style={styles.sectionTitle}>{letter}</Text>
      <View style={styles.sectionItems}>
        {items.map((item: TContact) => {
          return (
            <View key={item.id} style={styles.cardWrapper}>
              <TouchableOpacity
                onPress={() => {
                  handleNavigateToDetail(item);
                }}>
                <View style={styles.card}>
                  {isValidUrl(item.photo) ? (
                    <Image
                      alt="avatar"
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
                      handleToogleFavorites(item);
                    }}>
                    {item.isFavorite ? (
                      <Ionicons color="purple" name="bookmark" size={32} />
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
  ));
};

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
