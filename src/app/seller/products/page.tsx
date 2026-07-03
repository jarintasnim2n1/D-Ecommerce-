"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, Search, Filter, Edit, Trash2, Eye, Package, X, CheckCircle2 } from "lucide-react";
import { products as initialProducts, Product } from "@/lib/data";

const emptyProduct: Omit<Product, "id" | "rating" | "reviews" | "sold"> = {
  name: "",
  price: 0,
  originalPrice: 0,
  image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
  images: [],
  category: "Electronics",
  badge: "",
  colors: [],
  description: "",
  specs: [],
  seller: { name: "", avatar: "", rating: 0, sales: 0, verified: false },
  stock: 0,
};

export default function SellerProductsPage() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState("");

  const filteredProducts = productList.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const handleAdd = (data: Omit<Product, "id" | "rating" | "reviews" | "sold">) => {
    const newProduct: Product = {
      ...data,
      id: String(Date.now()),
      rating: 0,
      reviews: 0,
      sold: 0,
    };
    setProductList([newProduct, ...productList]);
    setShowAddModal(false);
    showToast("Product added successfully!");
  };

  const handleEdit = (data: Product) => {
    setProductList(productList.map((p) => (p.id === data.id ? data : p)));
    setEditingProduct(null);
    showToast("Product updated successfully!");
  };

  const handleDelete = (id: string) => {
    setProductList(productList.filter((p) => p.id !== id));
    setDeletingProduct(null);
    showToast("Product deleted!");
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-[200] bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4" /> {toast}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-foreground">My Products</h1><p className="text-sm text-muted-foreground mt-1">{filteredProducts.length} products listed</p></div>
        <div className="flex items-center gap-3">
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="pl-10 pr-4 py-2.5 bg-card border border-border/50 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50 w-48" /></div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border/50 rounded-xl text-sm text-foreground/70 hover:bg-muted transition-colors"><Filter className="w-4 h-4" /> Filter</button>
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-champagne text-castleton-dark px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-champagne-light transition-colors"><Plus className="w-4 h-4" /> Add Product</button>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border/50 bg-muted/30">
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4">Product</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4">Price</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4">Stock</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4">Sold</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4">Rating</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider p-4">Actions</th>
            </tr></thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Image src={p.image} alt={p.name} width={44} height={44} className="rounded-lg object-cover" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4"><span className="text-sm font-bold text-foreground">${p.price.toFixed(2)}</span>{p.originalPrice ? <span className="text-xs text-muted-foreground line-through ml-1">${p.originalPrice.toFixed(2)}</span> : null}</td>
                  <td className="p-4"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${p.stock > 100 ? "bg-green-500/10 text-green-600" : p.stock > 20 ? "bg-orange-500/10 text-orange-500" : "bg-red-500/10 text-red-500"}`}>{p.stock}</span></td>
                  <td className="p-4"><span className="text-sm text-foreground">{p.sold.toLocaleString()}</span></td>
                  <td className="p-4"><div className="flex items-center gap-1"><span className="text-sm font-medium text-foreground">{p.rating}</span><span className="text-xs text-muted-foreground">({p.reviews.toLocaleString()})</span></div></td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setEditingProduct(p)} className="p-2 text-muted-foreground hover:text-champagne hover:bg-champagne/10 rounded-lg transition-all"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => setDeletingProduct(p)} className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && <ProductModal title="Add Product" onClose={() => setShowAddModal(false)} onSave={handleAdd} />}

      {/* Edit Product Modal */}
      {editingProduct && <ProductModal title="Edit Product" product={editingProduct} onClose={() => setEditingProduct(null)} onSave={(data) => handleEdit({ ...editingProduct, ...data })} />}

      {/* Delete Confirmation */}
      {deletingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeletingProduct(null)} />
          <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 border border-border/50 text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-8 h-8 text-red-500" /></div>
            <h3 className="font-bold text-foreground mb-1">Delete Product?</h3>
            <p className="text-sm text-muted-foreground mb-6">Are you sure you want to delete &quot;{deletingProduct.name}&quot;? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeletingProduct(null)} className="flex-1 border border-border/50 text-foreground px-4 py-3 rounded-xl font-bold text-sm hover:bg-muted transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deletingProduct.id)} className="flex-1 bg-red-500 text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductModal({ title, product, onClose, onSave }: {
  title: string;
  product?: Product;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    originalPrice: product?.originalPrice || 0,
    image: product?.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    category: product?.category || "Electronics",
    description: product?.description || "",
    stock: product?.stock || 0,
    badge: product?.badge || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    onSave({
      ...form,
      images: product?.images || [form.image],
      colors: product?.colors || [],
      specs: product?.specs || [],
      seller: product?.seller || { name: "My Store", avatar: "", rating: 0, sales: 0, verified: true },
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden border border-border/50">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <h2 className="font-bold text-foreground">{title}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-muted rounded-lg transition-colors"><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product Name *</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full mt-1.5 px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50" placeholder="e.g. Premium Wireless Headphones" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price ($) *</label><input required type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} className="w-full mt-1.5 px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50" /></div>
            <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Original Price ($)</label><input type="number" step="0.01" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: parseFloat(e.target.value) || 0 })} className="w-full mt-1.5 px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50" /></div>
          </div>
          <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Image URL</label><input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full mt-1.5 px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50" placeholder="https://..." /></div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full mt-1.5 px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50">
                {["Electronics", "Fashion", "Home", "Beauty", "Sports", "Accessories"].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Stock *</label><input required type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || 0 })} className="w-full mt-1.5 px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50" /></div>
          </div>
          <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Badge</label><input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className="w-full mt-1.5 px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50" placeholder="e.g. Best Seller, New, Sale" /></div>
          <div><label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</label><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full mt-1.5 px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-champagne/50 resize-none" placeholder="Describe your product..." /></div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-border/50 text-foreground px-4 py-3 rounded-xl font-bold text-sm hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" className="flex-1 bg-champagne text-castleton-dark px-4 py-3 rounded-xl font-bold text-sm hover:bg-champagne-light transition-colors">{product ? "Update" : "Add"} Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}
