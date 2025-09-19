import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import GradientBackground from '../../components/GradientBackground';
import Button from '../../components/Button';
import { ShoppingBag, Plus, Minus, ShoppingCart, Filter } from 'lucide-react-native';
import { shopItems } from '../../data/shopItems';
import { useCart } from '../../contexts/CartContext';
import { ShopItem } from '../../types/shop';

export default function ShopScreen() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'gems' | 'psychological' | 'physiological'>('all');
  const [showCart, setShowCart] = useState(false);
  const { cartItems, addToCart, removeFromCart, updateQuantity, getCartTotal, getCartItemCount, checkout } = useCart();

  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: ShopItem) => {
    addToCart(item);
    Alert.alert('Added to Cart', `${item.name} has been added to your cart!`);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart before checking out.');
      return;
    }

    const success = await checkout();
    if (success) {
      Alert.alert('Order Placed!', 'Your order has been placed successfully. Thank you for your purchase!');
      setShowCart(false);
    } else {
      Alert.alert('Checkout Failed', 'There was an error processing your order. Please try again.');
    }
  };

  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case 'gems': return 'Crystals & Gems';
      case 'psychological': return 'Psychological Materials';
      case 'physiological': return 'Physiological Materials';
      default: return 'All Items';
    }
  };

  if (showCart) {
    return (
      <GradientBackground>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <ShoppingCart size={48} color="#F59E0B" />
            <Text style={styles.title}>Shopping Cart</Text>
            <Text style={styles.subtitle}>Review your items</Text>
          </View>

          <View style={styles.content}>
            {cartItems.length === 0 ? (
              <View style={styles.emptyCart}>
                <ShoppingBag size={64} color="#6B7280" />
                <Text style={styles.emptyTitle}>Your cart is empty</Text>
                <Text style={styles.emptyText}>Add some items to get started!</Text>
               <View style={styles.emptyCartButton}>
                 <Button 
                   title="Continue Shopping" 
                   onPress={() => setShowCart(false)}
                   variant="primary"
                 />
               </View>
              </View>
            ) : (
              <>
                {cartItems.map((item) => (
                  <View key={item.id} style={styles.cartItem}>
                    <Image source={{ uri: item.image }} style={styles.cartItemImage} />
                    <View style={styles.cartItemInfo}>
                      <Text style={styles.cartItemName}>{item.name}</Text>
                      <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
                      <View style={styles.quantityControls}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={16} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} color="#FFFFFF" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeFromCart(item.id)}
                    >
                      <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                <View style={styles.cartSummary}>
                  <Text style={styles.totalText}>Total: ${getCartTotal().toFixed(2)}</Text>
                  <Button title="Checkout" onPress={handleCheckout} />
                  <View style={styles.spacing} />
                  <Button 
                    title="Continue Shopping" 
                    onPress={() => setShowCart(false)}
                    variant="secondary"
                  />
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <ShoppingBag size={48} color="#F59E0B" />
          <Text style={styles.title}>Cosmic Shop</Text>
          <Text style={styles.subtitle}>Enhance your spiritual journey</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.topBar}>
            <View style={styles.filterCard}>
              <Filter size={20} color="#F59E0B" />
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={selectedCategory}
                  onValueChange={setSelectedCategory}
                  style={styles.picker}
                >
                  <Picker.Item label="All Categories" value="all" color="#FFFFFF" />
                  <Picker.Item label="Crystals & Gems" value="gems" color="#FFFFFF" />
                  <Picker.Item label="Psychological" value="psychological" color="#FFFFFF" />
                  <Picker.Item label="Physiological" value="physiological" color="#FFFFFF" />
                </Picker>
              </View>
            </View>

            <TouchableOpacity style={styles.cartButton} onPress={() => setShowCart(true)}>
              <ShoppingCart size={24} color="#FFFFFF" />
              {getCartItemCount() > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{getCartItemCount()}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.categoryTitle}>{getCategoryDisplayName(selectedCategory)}</Text>

          <View style={styles.itemsGrid}>
            {filteredItems.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  <Button
                    title="Add to Cart"
                    onPress={() => handleAddToCart(item)}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#D1D5DB',
    marginTop: 8,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  filterCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  pickerWrapper: {
    flex: 1,
    marginLeft: 8,
  },
  picker: {
    color: '#FFFFFF',
    height: 40,
  },
  cartButton: {
    backgroundColor: '#6B46C1',
    padding: 12,
    borderRadius: 12,
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  itemsGrid: {
    gap: 16,
  },
  itemCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  itemInfo: {
    padding: 16,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
    marginBottom: 12,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 16,
  },
  // Cart styles
  emptyCart: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
  emptyCartButton: {
    marginTop: 24,
    width: '100%',
    maxWidth: 200,
  },
  cartItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#F59E0B',
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#6B46C1',
    padding: 8,
    borderRadius: 6,
  },
  quantityText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  removeButton: {
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '500',
  },
  cartSummary: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 16,
    marginTop: 16,
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  spacing: {
    height: 12,
  },
});