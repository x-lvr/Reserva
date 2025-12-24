import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const ACCENT = '#F59E0B';
const { width } = Dimensions.get('window');

const mockCategories = [
  { id: '1', title: 'Nails', emoji: '💅' },
  { id: '2', title: 'Dentist', emoji: '🦷' },
  { id: '3', title: 'Car Repair', emoji: '🔧' },
  { id: '4', title: 'Massage', emoji: '💆‍♀️' },
  { id: '5', title: 'Hair', emoji: '💇‍♂️' },
];

const mockNearby = [
  {
    id: 's1',
    name: 'Sunny Nails Studio',
    image: 'https://via.placeholder.com/160x120.png?text=Nails',
    rating: 4.7,
    distanceKm: 0.6,
  },
  {
    id: 's2',
    name: 'City Dental Care',
    image: 'https://via.placeholder.com/160x120.png?text=Dentist',
    rating: 4.5,
    distanceKm: 1.2,
  },
  {
    id: 's3',
    name: 'Rapid Auto Repair',
    image: 'https://via.placeholder.com/160x120.png?text=Auto',
    rating: 4.3,
    distanceKm: 2.3,
  },
];

const mockFeatured = [
  { id: 'f1', title: 'Holiday Mani — 20% Off', image: 'https://via.placeholder.com/320x140.png?text=Promo' },
];

const mockBookings = [
  { id: 'b1', service: 'Nails — Classic Mani', when: 'Today, 3:00 PM', location: 'Sunny Nails Studio' },
  { id: 'b2', service: 'Dentist — Checkup', when: 'Dec 25, 10:00 AM', location: 'City Dental Care' },
];

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [nearby, setNearby] = useState(mockNearby);

  useEffect(() => {
    // Placeholder for real location-based fetching.
    // Keep mock data for now; could call an API and setNearby()
  }, []);

  function renderCategory({ item }: any) {
    return (
      <Pressable style={styles.categoryCard} key={item.id} android_ripple={{ color: '#eee' }} onPress={() => {}}>
        <Text style={styles.categoryEmoji}>{item.emoji}</Text>
        <Text style={styles.categoryTitle}>{item.title}</Text>
      </Pressable>
    );
  }

  function renderService({ item }: any) {
    return (
      <View style={styles.serviceCard}>
        <Image source={{ uri: item.image }} style={styles.serviceImage} />
        <View style={styles.serviceBody}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.rating}>⭐ {item.rating}</Text>
            <Text style={styles.distance}>{item.distanceKm} km</Text>
          </View>
          <View style={styles.bookRow}>
            <Pressable onPress={() => alert('Book ' + item.name)} style={({ pressed }) => [styles.iosButton, pressed && styles.iosButtonPressed]}>
              <Text style={styles.iosButtonText}>Book Now</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'} />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.logo}>Reserva</Text>
            <Text style={styles.greeting}>Good morning — find services near you</Text>
          </View>
          <Pressable style={styles.avatar} onPress={() => alert('Open profile')}>
            <Text style={styles.avatarText}>R</Text>
          </Pressable>
        </View>

          <View style={styles.searchContainer}>
            <View style={styles.searchInner}>
              <Text style={styles.searchIcon}>🔎</Text>
              <TextInput
                placeholder="Search services or providers"
                value={query}
                onChangeText={setQuery}
                style={styles.searchInput}
                clearButtonMode="while-editing"
              />
            </View>
          </View>

          <View style={[styles.section, styles.card]}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
              {mockCategories.map((c) => renderCategory({ item: c }))}
            </ScrollView>
          </View>

          <View style={[styles.section, styles.card]}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ gap: 12 }}>
              {mockFeatured.map((f) => (
                <Pressable key={f.id} style={styles.featureCard} onPress={() => alert(f.title)}>
                  <Image source={{ uri: f.image }} style={styles.featureImage} />
                  <View style={styles.featureOverlay}>
                    <Text style={styles.featureText}>{f.title}</Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View style={[styles.section, styles.card]}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Nearby</Text>
              <Link href="/map">
                <Text style={styles.seeMap}>Open map</Text>
              </Link>
            </View>

            <FlatList
              data={nearby}
              keyExtractor={(i) => i.id}
              renderItem={renderService}
              horizontal={false}
              scrollEnabled={false}
            />
          </View>

          <View style={[styles.section, styles.card]}>
            <Text style={styles.sectionTitle}>Map Preview</Text>
            <Link href="/map">
              <Image
                source={{ uri: 'https://via.placeholder.com/600x200.png?text=Map+Preview' }}
                style={styles.mapPreview}
              />
            </Link>
          </View>

          <View style={[styles.section, styles.card]}>
            <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
            {mockBookings.map((b) => (
              <View key={b.id} style={styles.bookingCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.bookingService}>{b.service}</Text>
                  <Text style={styles.bookingMeta}>{b.when} • {b.location}</Text>
                </View>
                <Pressable onPress={() => alert('Open booking ' + b.id)} style={({ pressed }) => [styles.iosButton, pressed && styles.iosButtonPressed]}>
                  <Text style={styles.iosButtonText}>View</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingTop: 12, paddingHorizontal: 16 },
    header: { marginBottom: 12 },
    logo: { fontSize: 28, fontWeight: '700', color: '#111', marginBottom: 8 },
    searchRow: { flexDirection: 'row', alignItems: 'center' },
    searchInput: {
      flex: 1,
      backgroundColor: '#F3F4F6',
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
    },
    section: { marginTop: 16 },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
    categories: { flexDirection: 'row', gap: 12 },
    categoryCard: {
      width: 84,
      height: 92,
      backgroundColor: '#fff',
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    categoryEmoji: { fontSize: 28, marginBottom: 6 },
    categoryTitle: { fontSize: 13, fontWeight: '600' },
    featureCard: { width: width * 0.8, height: 140, borderRadius: 12, overflow: 'hidden', marginRight: 12 },
    featureImage: { width: '100%', height: '100%' },
    featureOverlay: { position: 'absolute', left: 12, bottom: 12 },
    featureText: { color: '#fff', fontWeight: '700', fontSize: 16 },
    sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    seeMap: { color: ACCENT, fontWeight: '600' },
    serviceCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, overflow: 'hidden' },
    serviceImage: { width: 120, height: 92 },
    serviceBody: { flex: 1, padding: 10, justifyContent: 'space-between' },
    serviceName: { fontSize: 16, fontWeight: '700' },
    metaRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
    rating: { color: '#374151', fontWeight: '600' },
    distance: { color: '#6B7280' },
    bookRow: { alignSelf: 'flex-start' },
    mapPreview: { width: '100%', height: 160, borderRadius: 12 },
    bookingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
    bookingService: { fontWeight: '700' },
    bookingMeta: { color: '#6B7280' },
    safe: { flex: 1, backgroundColor: '#fff' },
    iosButton: { backgroundColor: ACCENT, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
    iosButtonPressed: { opacity: 0.85 },
    iosButtonText: { color: '#fff', fontWeight: '700' },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 10, elevation: 3 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    greeting: { color: '#6B7280', marginTop: 2 },
    avatar: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFF6E5', alignItems: 'center', justifyContent: 'center' },
    avatarText: { color: '#B45309', fontWeight: '800' },
    searchContainer: { marginBottom: 12 },
    searchInner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 8, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, elevation: 1 },
    searchIcon: { marginRight: 8, fontSize: 18 },
    bookingCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  });
