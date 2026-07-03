"use client";

import Image from "next/image";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { removeFromWishlist } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { useToast } from "@/components/Toast";

export default function WishlistPage() {
  const items = useAppSelector((s) => s.wishlist.items);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleAddToCart = (item: typeof items[0]) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    dispatch(removeFromWishlist(item.id));
    toast(`${item.name} moved to cart!`, "success", <ShoppingCart className="w-4 h-4" />);
  };

  const handleRemove = (item: typeof items[0]) => {
    dispatch(removeFromWishlist(item.id));
    toast(`${item.name} removed from wishlist`, "info", <Heart className="w-4 h-4" />);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">My Wishlist</h1><p className="text-sm text-muted-foreground mt-1">{items.length} items saved</p></div>
        {items.length > 0 && (
          <button onClick={() => {
            items.forEach((item) => {
              dispatch(addToCart({ ...item, quantity: 1 }));
              dispatch(removeFromWishlist(item.id));
            });
            toast("All items moved to cart!", "success", <ShoppingCart className="w-4 h-4" />);
          }} className="text-sm font-semibold text-castleton dark:text-champagne hover:underline">
            Move All to Cart
          </button>
        )}
      </div>
      {items.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border/50 p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4"><Heart className="w-7 h-7 text-muted-foreground" /></div>
          <h3 className="font-bold text-foreground mb-2">Your wishlist is empty</h3>
          <p className="text-sm text-muted-foreground mb-6">Browse products and save your favorites here.</p>
          <a href="/shop" className="inline-flex items-center gap-2 bg-castleton text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-castleton-light transition-colors">Browse Products</a>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-card rounded-2xl border border-border/50 p-4 hover:shadow-md transition-all">
              <div className="relative aspect-square bg-muted rounded-xl overflow-hidden mb-3">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <h3 className="font-bold text-foreground text-sm line-clamp-2 mb-2">{item.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-castleton dark:text-champagne">${item.price.toFixed(2)}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleAddToCart(item)} className="w-9 h-9 bg-castleton text-white rounded-lg flex items-center justify-center hover:bg-castleton-light transition-colors"><ShoppingCart className="w-4 h-4" /></button>
                  <button onClick={() => handleRemove(item)} className="w-9 h-9 bg-red-500/10 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
