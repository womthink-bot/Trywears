import React, { useState } from "react";
import { X, Trash2, ShoppingBag, ShieldCheck, Truck, CreditCard, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"form" | "loading" | "success">("form");
  
  // Checkout Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [card, setCard] = useState("");

  const subtotal = cartItems.reduce((acc, item) => {
    const priceNum = parseFloat(item.product.price.replace(/[^\d.]/g, ""));
    return acc + priceNum * item.quantity;
  }, 0);

  const shipping = subtotal > 150 ? 0 : 25;
  const total = subtotal + shipping;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address) return;

    setCheckoutStep("loading");
    setTimeout(() => {
      setCheckoutStep("success");
    }, 2000);
  };

  const handleFinalize = () => {
    setIsCheckoutOpen(false);
    setCheckoutStep("form");
    onClearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay background */}
          <motion.div
            id="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 backdrop-blur-xs cursor-pointer"
          />

          {/* Cart Drawer */}
          <motion.div
            id="cart-drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-900 z-50 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#E21D1D]" />
                <h3 className="font-display font-bold text-lg dark:text-white uppercase tracking-tight">Active Shipment Bag</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-500 dark:text-neutral-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-neutral-400" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold dark:text-white">YOUR SHIPMENT IS EMPTY</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-[250px] mx-auto">
                      Explore our premium combat collections and customizer to load elite performance gear.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-xs font-mono font-bold text-[#E21D1D] hover:underline tracking-widest uppercase cursor-pointer"
                  >
                    CONTINUE DISCOVERY
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${idx}`}
                    className="flex gap-4 bg-neutral-50 dark:bg-neutral-900/40 p-4 rounded-xl border border-neutral-200/60 dark:border-neutral-900 relative group overflow-hidden"
                  >
                    {/* Security Overlay for Image */}
                    <div className="absolute inset-0 z-10 bg-transparent select-none pointer-events-none" />

                    {/* Image */}
                    <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden shrink-0 relative">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 z-20 bg-transparent select-none pointer-events-auto" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-display font-bold text-neutral-950 dark:text-white truncate pr-4">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="p-1 rounded text-neutral-400 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 shrink-0 cursor-pointer"
                          title="Remove from shipment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-1 flex items-center justify-between">
                        <span>Size / Weight: {item.selectedSize}</span>
                        <span className="font-bold text-neutral-950 dark:text-neutral-200">
                          {item.product.price}
                        </span>
                      </div>

                      {/* Customized Specifications List */}
                      {item.customization && (
                        <div className="mt-2 bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-850 p-2 rounded text-[10px] font-mono text-neutral-500 dark:text-neutral-400 space-y-0.5">
                          <div><span className="text-[#E21D1D]">Chassis:</span> {item.customization.outerColor}</div>
                          <div><span className="text-[#E21D1D]">Cuff:</span> {item.customization.cuffMaterial}</div>
                          <div><span className="text-[#E21D1D]">Trim:</span> {item.customization.accentTrim}</div>
                          <div><span className="text-[#E21D1D]">Lock:</span> {item.customization.laceStyle}</div>
                        </div>
                      )}

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-[10px] font-mono font-bold uppercase text-neutral-400">Qty:</span>
                        <div className="flex items-center border border-neutral-200 dark:border-neutral-800 rounded bg-white dark:bg-neutral-950">
                          <button
                            onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                            className="px-2 py-0.5 text-xs text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-mono font-bold dark:text-neutral-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Total Calculations & Actions */}
            {cartItems.length > 0 && !isCheckoutOpen && (
              <div className="p-6 border-t border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950/40 space-y-4">
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-neutral-500">
                    <span>Gear Subtotal</span>
                    <span className="dark:text-neutral-200">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>Premium Air Dispatch</span>
                    <span className="dark:text-neutral-200">
                      {shipping === 0 ? "FREE (OVER $150)" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="h-[1px] bg-neutral-200 dark:bg-neutral-800 my-2" />
                  <div className="flex justify-between text-sm font-bold font-display dark:text-white uppercase">
                    <span>Total Investment</span>
                    <span className="text-[#E21D1D]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-neutral-950 dark:bg-[#E21D1D] hover:bg-neutral-900 dark:hover:bg-red-700 text-white dark:text-white font-display font-bold py-3.5 rounded-xl tracking-wider uppercase text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-neutral-950/10 dark:shadow-[#E21D1D]/5"
                >
                  <span>PROCEED TO SECURE SHIPMENT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* SECURE CHECKOUT FORM OVERLAY */}
            <AnimatePresence>
              {isCheckoutOpen && (
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 220 }}
                  className="absolute inset-x-0 bottom-0 top-[73px] bg-white dark:bg-neutral-950 z-30 flex flex-col p-6"
                >
                  <div className="flex items-center justify-between mb-6 border-b border-neutral-200 dark:border-neutral-900 pb-4">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-[#E21D1D]" />
                      <h4 className="font-display font-bold text-md dark:text-white uppercase">SECURE DISPATCH MANIFEST</h4>
                    </div>
                    <button
                      onClick={() => setIsCheckoutOpen(false)}
                      className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-500 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {checkoutStep === "form" && (
                    <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-bold">
                            Champion Full Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. MARCUS THOMPSON"
                            value={name}
                            onChange={(e) => setName(e.target.value.toUpperCase())}
                            className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs font-mono tracking-wide dark:text-white focus:outline-none focus:ring-1 focus:ring-[#E21D1D]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-bold">
                            Secure Contact Email
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. SLEDGE@MARCUSTHOMPSON.COM"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs font-mono tracking-wide dark:text-white focus:outline-none focus:ring-1 focus:ring-[#E21D1D]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-bold">
                            Destination Address
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="STREET ADDRESS, CITY, STATE, ZIP"
                            value={address}
                            onChange={(e) => setAddress(e.target.value.toUpperCase())}
                            className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-xs font-mono tracking-wide dark:text-white focus:outline-none focus:ring-1 focus:ring-[#E21D1D]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-bold flex items-center justify-between">
                            <span>Simulated Payment Details</span>
                            <span className="text-[9px] text-[#E21D1D] font-bold">DEMO SECURE SYSTEM</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              placeholder="•••• •••• •••• ••••"
                              value={card}
                              onChange={(e) => setCard(e.target.value)}
                              className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-xs font-mono tracking-wide dark:text-white focus:outline-none focus:ring-1 focus:ring-[#E21D1D]"
                            />
                            <CreditCard className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                          </div>
                        </div>

                        <div className="bg-[#E21D1D]/5 dark:bg-[#E21D1D]/10 border border-[#E21D1D]/10 p-3 rounded-lg flex gap-2">
                          <ShieldCheck className="w-4 h-4 text-[#E21D1D] shrink-0 mt-0.5" />
                          <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono leading-relaxed">
                            Elite protection system verified. This transaction is processed inside a simulated secure sandbox environment. No actual charges are made.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 pt-6 border-t border-neutral-100 dark:border-neutral-900">
                        <div className="flex justify-between items-center text-xs font-mono font-bold dark:text-white uppercase">
                          <span>Verified Total:</span>
                          <span className="text-[#E21D1D] text-lg">${total.toFixed(2)}</span>
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold py-3.5 rounded-xl tracking-wider uppercase text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-600/10"
                        >
                          <span>COMPLETE SECURE LOCK-IN</span>
                          <ShieldCheck className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  )}

                  {checkoutStep === "loading" && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-12 h-12 border-2 border-neutral-200 border-t-[#E21D1D] rounded-full animate-spin" />
                      <div>
                        <h5 className="font-display font-bold text-sm dark:text-white uppercase tracking-widest">
                          AUTHENTICATING SECURITY ENVELOPE
                        </h5>
                        <p className="text-[10px] font-mono text-neutral-400 mt-1">
                          Securing physical assets and registering biometric logistics...
                        </p>
                      </div>
                    </div>
                  )}

                  {checkoutStep === "success" && (
                    <div className="flex-1 flex flex-col justify-between py-6">
                      <div className="text-center space-y-4 my-auto">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                          <ShieldCheck className="w-8 h-8 text-emerald-500 animate-pulse" />
                        </div>
                        <div className="space-y-2">
                          <h5 className="font-display font-bold text-lg dark:text-white uppercase tracking-wide">
                            SHIPMENT REGISTERED FOR DISPATCH
                          </h5>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-[280px] mx-auto leading-relaxed">
                            Logistics code <span className="font-mono font-bold text-[#E21D1D]">#TRY-7981</span> is locked into the priority dispatch sequence.
                          </p>
                        </div>
                        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-900/60 max-w-[320px] mx-auto">
                          <div className="flex gap-3 text-left">
                            <Truck className="w-5 h-5 text-[#E21D1D] shrink-0" />
                            <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 leading-normal">
                              <div><strong>CONSIDERED IN SHIPMENT:</strong></div>
                              <div>Destination: {address}</div>
                              <div>Contact: {email}</div>
                              <div className="mt-1 text-emerald-500 font-bold">ESTIMATED PRIORITY DELIVERY: 48 HOURS</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleFinalize}
                        className="w-full bg-neutral-950 dark:bg-[#E21D1D] text-white dark:text-white font-display font-bold py-3 rounded-xl tracking-wider uppercase text-xs transition-all cursor-pointer"
                      >
                        RETURN TO CAMP
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
