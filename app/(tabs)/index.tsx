import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Category {
  id: string;
  name: string;
  icon: any;
}

const categories: Category[] = [
  { id: '1', name: 'Hotels', icon: 'hotel' },
  { id: '2', name: 'Flights', icon: 'airplane' },
  { id: '3', name: 'Cars', icon: 'car' },
  { id: '4', name: 'Experiences', icon: 'hiking' },
  { id: '5', name: 'Restaurants', icon: 'food' },
  { id: '6', name: 'Cruises', icon: 'boat-cruise' },
  { id: '7', name: 'Trains', icon: 'train' },
  { id: '8', name: 'Buses', icon: 'bus' },
  { id: '9', name: 'Events', icon: 'ticket' },
];

function CategoryItem({ item }: { item: Category }) {
  return (
    <Link href={{ pathname: "/category/[id]", params: { id: item.id } }} asChild>
      <TouchableOpacity style={styles.categoryItem}>
        <MaterialCommunityIcons name={item.icon} size={30} color="#007AFF" />
        <Text style={styles.categoryText}>{item.name}</Text>
      </TouchableOpacity>
    </Link>
  );
}

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => <CategoryItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryText: {
    marginLeft: 15,
    fontSize: 18,
    color: '#333',
  },
});
