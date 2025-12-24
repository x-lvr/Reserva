import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme
} from 'react-native';

import { Colors } from '@/constants/theme';

const { width } = Dimensions.get('window');

const mockCategories = [
  { id: '1', title: 'Nails', icon: 'color-palette-outline', emoji: '💅' },
  { id: '2', title: 'Dentist', icon: 'medkit-outline', emoji: '🦷' },
  { id: '3', title: 'Car Repair', icon: 'car-sport-outline', emoji: '🔧' },
  { id: '4', title: 'Massage', icon: 'body-outline', emoji: '💆‍♀️' },
  { id: '5', title: 'Hair', icon: 'cut-outline', emoji: '💇‍♂️' },
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
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const accent = theme.tint;

  useEffect(() => {
    // Placeholder for real location-based fetching.
    // Keep mock data for now; could call an API and setNearby()
  }, []);

  function renderCategory({ item }: any) {
    return (
      <BlurView intensity={20} tint={colorScheme === 'dark' ? 'dark' : 'light'} style={styles.categoryBlurContainer} key={item.id}>
        <Pressable
          style={({ pressed }) => [styles.categoryCard, pressed && { opacity: 0.7 }]}
          onPress={() => { }}
        >
          <View style={[styles.iconContainer, { backgroundColor: accent + '15' }]}>
            <Ionicons name={item.icon} size={24} color={accent} />
          </View>
          <Text style={[styles.categoryTitle, { color: theme.text }]}>{item.title}</Text>
        </Pressable>
      </BlurView>
    );
  }

  function renderService({ item }: any) {
    return (
      <Pressable style={[styles.serviceCard, { backgroundColor: theme.background, borderColor: theme.icon + '20', borderWidth: 1 }]}>
        <Image source={{ uri: item.image }} style={styles.serviceImage} />
        <View style={styles.serviceBody}>
          <Text style={[styles.serviceName, { color: theme.text }]}>{item.name}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={[styles.rating, { color: theme.text, marginLeft: 4 }]}>{item.rating}</Text>
            <Text style={[styles.distance, { color: theme.icon }]}>• {item.distanceKm} km</Text>
          </View>
          <View style={styles.bookRow}>
            <Pressable onPress={() => alert('Book ' + item.name)} style={({ pressed }) => [styles.iosButton, { backgroundColor: accent }, pressed && styles.iosButtonPressed]}>
              <Text style={styles.iosButtonText}>Book</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 12 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.logo, { color: accent }]}>Reserva</Text>
            <Text style={[styles.greeting, { color: theme.icon }]}>Good morning — find services near you</Text>
          </View>
          <Pressable style={[styles.avatar, { backgroundColor: accent + '20' }]} onPress={() => alert('Open profile')}>
            <Text style={[styles.avatarText, { color: accent }]}>R</Text>
          </Pressable>
        </View>

        <View style={styles.searchContainer}>
          <View style={[styles.searchInner, { backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#F8FAFC' }]}>
            <Ionicons name="search" size={20} color={theme.icon} style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Search services..."
              placeholderTextColor={theme.icon}
              value={query}
              onChangeText={setQuery}
              style={[styles.searchInput, { color: theme.text }]}
              clearButtonMode="while-editing"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
            {mockCategories.map((c) => renderCategory({ item: c }))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Featured</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 16 }}>
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

        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Nearby</Text>
            <Link href="/map" asChild>
              <Pressable>
                <Text style={[styles.seeMap, { color: accent }]}>See All</Text>
              </Pressable>
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

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Map Preview</Text>
          <Link href="/map" asChild>
            <Pressable>
              <Image
                source={{ uri: 'https://via.placeholder.com/600x200.png?text=Map+Preview' }}
                style={styles.mapPreview}
              />
            </Pressable>
          </Link>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Upcoming Bookings</Text>
          {mockBookings.map((b) => (
            <View key={b.id} style={[styles.bookingCard, { borderBottomColor: theme.icon + '20' }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.bookingService, { color: theme.text }]}>{b.service}</Text>
                <Text style={[styles.bookingMeta, { color: theme.icon }]}>{b.when} • {b.location}</Text>
              </View>
              <Pressable onPress={() => alert('Open booking ' + b.id)} style={({ pressed }) => [styles.viewButton, { borderColor: accent }, pressed && { opacity: 0.5 }]}>
                <Text style={[styles.viewButtonText, { color: accent }]}>View</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 8 },
  logo: { fontSize: 32, fontWeight: '800', letterSpacing: -0.5 },
  greeting: { fontSize: 14, fontWeight: '500', marginTop: 4 },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontWeight: '700', fontSize: 18 },
  searchContainer: { marginBottom: 24 },
  searchInner: { flexDirection: 'row', alignItems: 'center', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14 },
  searchInput: { flex: 1, fontSize: 16, fontWeight: '500' },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  categories: { flexDirection: 'row', overflow: 'visible' },
  categoryBlurContainer: { borderRadius: 16, marginRight: 16, overflow: 'hidden' },
  categoryCard: {
    width: 100,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'transparent' - BlurView handles bg approximation or we can add explicit semi-transparent
  },
  iconContainer: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  categoryTitle: { fontSize: 13, fontWeight: '600' },
  featureCard: { width: width * 0.85, height: 160, borderRadius: 24, overflow: 'hidden', marginRight: 16, backgroundColor: '#000' },
  featureImage: { width: '100%', height: '100%', opacity: 0.8 },
  featureOverlay: { position: 'absolute', left: 20, bottom: 20 },
  featureText: { color: '#fff', fontWeight: '800', fontSize: 20 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  seeMap: { fontSize: 14, fontWeight: '600' },
  serviceCard: { flexDirection: 'row', borderRadius: 20, marginBottom: 16, overflow: 'hidden', padding: 12 },
  serviceImage: { width: 100, height: 100, borderRadius: 16 },
  serviceBody: { flex: 1, marginLeft: 16, justifyContent: 'center' },
  serviceName: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  rating: { fontSize: 14, fontWeight: '600' },
  distance: { fontSize: 14, marginLeft: 4 },
  bookRow: { flexDirection: 'row' },
  iosButton: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 50 },
  iosButtonPressed: { opacity: 0.8 },
  iosButtonText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  mapPreview: { width: '100%', height: 180, borderRadius: 24 },
  bookingCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1 },
  bookingService: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  bookingMeta: { fontSize: 14 },
  viewButton: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  viewButtonText: { fontSize: 13, fontWeight: '600' },
});
